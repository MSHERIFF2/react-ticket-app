import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast'; 

export default function Login() {
  const navigate = useNavigate();
  
  // 1. State for form inputs
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  // 2. State for error messages
  const [error, setError] = useState(null);
  const [fieldErrors, setFieldErrors] = useState({
    emailError: '',
    passwordError: '',
  });

  // Handler for input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
    setError(null);
    setFieldErrors(prevErrors => ({
      ...prevErrors,
      [`${name}Error`]: '',
    }));
  };

  // Handler for form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Dismiss any existing general error toasts before the check
    toast.dismiss('login-error-toast'); 

    setError(null);
    setFieldErrors({ emailError: '', passwordError: '' });

    // Simple Client-Side Validation
    let hasError = false;
    let newFieldErrors = { emailError: '', passwordError: '' };

    if (!formData.email) {
      newFieldErrors.emailError = 'Please enter your email.';
      hasError = true;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newFieldErrors.emailError = 'Please enter a valid email.';
      hasError = true;
    }

    if (!formData.password) {
      newFieldErrors.passwordError = 'Password is required.';
      hasError = true;
    }

    if (hasError) {
      setFieldErrors(newFieldErrors);
      // 🌟 ADDED ID: Ensures only one validation toast is visible
      toast.error('Please fix the errors in the form.', { id: 'login-error-toast' });
      return;
    }

    // --- LOCALSTORAGE LOGIN SIMULATION ---
    const storedUserString = localStorage.getItem('ticketapp_user');
    
    if (!storedUserString) {
      setError('No user found. Please sign up first.');
      // 🌟 ADDED ID: Ensures only one "No account" toast is visible
      toast.error('No account found.', { id: 'login-error-toast' });
      return;
    }

    const storedUser = JSON.parse(storedUserString);

    // Verification (Email check)
    if (storedUser.email !== formData.email) {
      setError('Invalid email or password. Please try again.');
      // 🌟 ADDED ID: Ensures only one "Invalid credentials" toast is visible
      toast.error('Login failed. Invalid credentials.', { id: 'login-error-toast' }); 
      return;
    }

    // --- LOGIN SUCCESS ---
    console.log('Login successful! Stored token:', storedUser.token);
    
    // 🌟 Success toast does not need an ID since it redirects immediately.
    toast.success('Login successful! Redirecting...');

    // 5. Redirect to the Dashboard
    setTimeout(() => {
        navigate('/dashboard'); 
    }, 1000); 
  };


  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      {/* 🌟 CUSTOMIZED TOASTER COMPONENT 🌟 */}
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

      {/* ... (Rest of the JSX remains the same) ... */}
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">Login to TicketApp</h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}
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
            {/* Conditional Error Message */}
            {fieldErrors.emailError && (
              <p className="text-red-600 text-sm mt-1" id="emailError">
                {fieldErrors.emailError}
              </p>
            )}
          </div>

          {/* Password */}
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
            {/* Conditional Error Message */}
            {fieldErrors.passwordError && (
              <p className="text-red-600 text-sm mt-1" id="passwordError">
                {fieldErrors.passwordError}
              </p>
            )}
          </div>

          {/* Global Error Message */}
          {error && (
            <p id="errorMsg" className="text-red-600 text-sm text-center">
              {error}
            </p>
          )}

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-6">
          Don’t have an account?
          <Link to="/auth/signup" className="text-blue-600 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </section>
  );
};