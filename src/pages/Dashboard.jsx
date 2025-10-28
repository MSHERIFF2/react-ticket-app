// src/pages/Dashboard.jsx

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export default function Dashboard() {
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState('');
  const [ticketCounts, setTicketCounts] = useState({
    open: 0,
    inProgress: 0,
    closed: 0,
  });

  // Load User Data and Ticket Counts from localStorage on mount
  useEffect(() => {
    // 1. Load User Email
    const userString = localStorage.getItem('ticketapp_user');
    if (userString) {
      const user = JSON.parse(userString);
      setUserEmail(user.email);
    } else {
      // AuthGuard should prevent this, but this is a fail-safe
      // The user object is needed to display the email
      setUserEmail('Guest'); 
    }

    // 2. Load Ticket Counts
    // The "session" is handled by AuthGuard, so we focus on data here.
    const tickets = JSON.parse(localStorage.getItem('ticketapp_tickets') || '[]');
    
    const open = tickets.filter((t) => t.status === 'open').length;
    const inProgress = tickets.filter((t) => t.status === 'in_progress').length;
    const closed = tickets.filter((t) => t.status === 'closed').length;

    setTicketCounts({ open, inProgress, closed });
  }, []); // Run only once on mount

  // Logout Handler
  const handleLogout = () => {
    // 1. Remove user data/session token
    localStorage.removeItem('ticketapp_user');
    // NOTE: We only stored 'ticketapp_user' which includes the token, 
    // so removing that is sufficient for our simulation.

    // 2. Show toast notification
    toast.success('Logged out successfully.');

    // 3. Redirect to login
    setTimeout(() => {
      navigate('/auth/login');
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="max-w-5xl mx-auto">
        <header className="mb-8 flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-gray-800">Dashboard</h1>
          <button 
            id="logoutBtn"
            onClick={handleLogout} // Use the React onClick handler
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
          >
            Logout
          </button>
        </header>

        <section className="bg-white rounded-2xl shadow p-6 mb-8">
          <p className="text-gray-700 text-lg">
            Welcome back, <span id="userEmail" className="font-semibold text-blue-600">{userEmail}</span> 👋
          </p>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-green-50 p-6 rounded-xl text-center border border-green-200">
            <h3 className="text-xl font-semibold text-green-700">Open</h3>
            <p id="openCount" className="text-3xl font-bold text-green-800 mt-2">{ticketCounts.open}</p>
          </div>

          <div className="bg-amber-50 p-6 rounded-xl text-center border border-amber-200">
            <h3 className="text-xl font-semibold text-amber-700">In Progress</h3>
            <p id="inProgressCount" className="text-3xl font-bold text-amber-800 mt-2">{ticketCounts.inProgress}</p>
          </div>

          <div className="bg-gray-50 p-6 rounded-xl text-center border border-gray-200">
            <h3 className="text-xl font-semibold text-gray-700">Closed</h3>
            <p id="closedCount" className="text-3xl font-bold text-gray-800 mt-2">{ticketCounts.closed}</p>
          </div>
        </section>

        <div className="mt-10 text-center">
          <button 
            onClick={() => navigate('/tickets')} // Use navigate for internal routing
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
          >
            Manage Tickets
          </button>
        </div>
      </div>
    </div>
  );
}