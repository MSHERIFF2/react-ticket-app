// src/components/AuthGuard.jsx

import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import toast from 'react-hot-toast';

export default function AuthGuard({ children }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const user = localStorage.getItem('ticketapp_user');
    
    if (!user) {
      setIsAuthenticated(false);
      
      // Check if we just redirected to login to avoid repetitive toasts
      if (location.pathname !== '/auth/login') {
          // 🌟 ADDED ID: Ensures this specific toast only appears once
          toast.error('You must be logged in to view this page.', {
              id: 'auth-required-error' 
          });
      }
      
      navigate('/auth/login', { state: { from: location.pathname }, replace: true });

    } else {
      // If user logs in successfully, dismiss the persistent error toast
      toast.dismiss('auth-required-error'); 
      setIsAuthenticated(true);
    }

    setIsLoading(false);
    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname, navigate]);

  if (isLoading) {
    return (
        <div className="flex items-center justify-center min-h-screen">
            <p className="text-gray-500">Checking authorization...</p>
        </div>
    );
  }

  return isAuthenticated ? <>{children}</> : null; 
}