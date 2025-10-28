import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast'; 

export default function Signup() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [fieldErrors, setFieldErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
    setFieldErrors(prevErrors => ({
      ...prevErrors,
      [name]: '',
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let hasError = false;
    let newFieldErrors = {};

    // --- Validation Logic ---
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
      newFieldErrors.email = 'Please enter a valid email.';
      hasError = true;
    }
    if (!formData.password || formData.password.length < 6) {
      newFieldErrors.password = 'Password must be at least 6 characters.';
      hasError = true;
    }
    if (formData.password !== formData.confirmPassword) {
      newFieldErrors.confirmPassword = 'Passwords do not match.';
      hasError = true;
    } else if (!formData.confirmPassword) {
      newFieldErrors.confirmPassword = 'Please confirm your password.';
      hasError = true;
    }

    if (hasError) {
      setFieldErrors(newFieldErrors);
      // 🌟 ADDED ID: Ensures only one validation toast is visible
      toast.error('Please fix the errors in the form.', { id: 'signup-validation-error' }); 
      return;
    }

    // --- SUCCESS & LOCALSTORAGE SIMULATION ---
    const userData = {
      email: formData.email,
      token: 'simulated-jwt-token-' + Math.random().toString(36).substring(2, 10),
    };

    localStorage.setItem('ticketapp_user', JSON.stringify(userData));

    // 🌟 Success toast does not need an ID since it redirects immediately.
    toast.success('Account created successfully! Redirecting to login...');

    // Programmatic Navigation after a short delay
    setTimeout(() => {
        navigate('/auth/login');
    }, 1500); 
  };

  // ---

  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      {/* 🌟 CUSTOMIZED TOASTER COMPONENT 🌟 
          Applying the custom background/text styles via toastOptions for success and error types. 
      */}
      <Toaster 
        position="top-center" 
        toastOptions={{
          success: {
            className: 'bg-green-600 text-white shadow-lg border-none',
            style: { padding: '16px', borderRadius: '8px' },
            iconTheme: { primary: '#fff', secondary: '#16a34a' },
          },
          error: {
            className: 'bg-red-600 text-white shadow-lg border-none',
            style: { padding: '16px', borderRadius: '8px' },
            iconTheme: { primary: '#fff', secondary: '#dc2626' },
          },
        }}
      /> 
      
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">Create an Account</h1>
        
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email Input Block */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            {fieldErrors.email && (<p className="text-red-600 text-sm mt-1">{fieldErrors.email}</p>)}
          </div>

          {/* Password Input Block */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              required
              value={formData.password}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            {fieldErrors.password && (<p className="text-red-600 text-sm mt-1">{fieldErrors.password}</p>)}
          </div>

          {/* Confirm Password Input Block */}
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              required
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            {fieldErrors.confirmPassword && (<p className="text-red-600 text-sm mt-1">{fieldErrors.confirmPassword}</p>)}
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Sign Up
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-6">
          Already have an account?
          <Link to="/auth/login" className="text-blue-600 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </section>
  );
};