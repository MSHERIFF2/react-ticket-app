// src/pages/Tickets.jsx

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Removed useNavigate
import toast from 'react-hot-toast';

// --- LocalStorage Helper Functions ---

const getTickets = () => {
  if (!localStorage.getItem('ticketapp_tickets')) {
    localStorage.setItem('ticketapp_tickets', JSON.stringify([]));
  }
  return JSON.parse(localStorage.getItem('ticketapp_tickets')) || [];
};

const saveTickets = (tickets) => {
  localStorage.setItem('ticketapp_tickets', JSON.stringify(tickets));
};

// --- Initial Form State ---
const initialTicketState = {
  id: null,
  title: '',
  description: '',
  status: 'open',
};

// --- Main Tickets Component ---
 export default function Tickets() {
  // const navigate = useNavigate(); // REMOVED: navigate is no longer declared
  const [tickets, setTickets] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTicket, setCurrentTicket] = useState(initialTicketState);

  // Load tickets on mount
  useEffect(() => {
    setTickets(getTickets());
  }, []); // Run only once on mount

  // Handler for form input changes
  const handleFormChange = (e) => {
    const { id, value } = e.target;
    setCurrentTicket(prev => ({
      ...prev,
      [id]: value,
    }));
  };

  // --- Modal Control ---

  const handleOpenModal = (ticket = initialTicketState) => {
    setCurrentTicket(ticket);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setCurrentTicket(initialTicketState);
    setIsModalOpen(false);
  };

  // --- CRUD Operations ---

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const { id, title, description, status } = currentTicket;

    if (!title.trim()) {
      toast.error('Ticket title is required.');
      return;
    }

    let updatedTickets;
    let toastMessage;

    if (id) {
      // EDIT Logic
      updatedTickets = tickets.map((t) =>
        t.id === id ? { ...t, title, description, status } : t
      );
      toastMessage = 'Ticket updated successfully!';
    } else {
      // ADD Logic
      const newTicket = {
        ...currentTicket,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
      };
      updatedTickets = [...tickets, newTicket];
      toastMessage = 'Ticket created successfully!';
    }

    setTickets(updatedTickets);
    saveTickets(updatedTickets);
    handleCloseModal();
    toast.success(toastMessage);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this ticket?")) {
      const updatedTickets = tickets.filter((t) => t.id !== id);
      setTickets(updatedTickets);
      saveTickets(updatedTickets);
      toast.error("Ticket deleted successfully!", {
        className: 'bg-red-600 text-white shadow-lg border-none',
      });
    }
  };

  // --- Render Functions ---

  const getStatusClasses = (status) => {
    switch (status) {
      case 'open':
        return 'bg-green-100 text-green-700';
      case 'in_progress':
        return 'bg-amber-100 text-amber-700';
      default:
        return 'bg-gray-200 text-gray-700';
    }
  };

  const TicketCard = ({ ticket }) => (
    <div className="bg-white rounded-xl shadow p-4 flex flex-col justify-between border-l-4 border-blue-600">
      <div className="p-2">
        <h3 className="text-lg font-semibold mb-2">{ticket.title}</h3>
        <p className="text-sm text-gray-600 mb-3">{ticket.description || "No description"}</p>
        <span className={`text-xs px-3 py-1 rounded-full ${getStatusClasses(ticket.status)}`}>
          {ticket.status.replace('_', ' ')}
        </span>
      </div>
      <div className="flex justify-end gap-3 mt-4">
        <button 
          onClick={() => handleOpenModal(ticket)}
          className="text-blue-600 text-sm hover:underline"
        >
          Edit
        </button>
        <button 
          onClick={() => handleDelete(ticket.id)}
          className="text-red-600 text-sm hover:underline"
        >
          Delete
        </button>
      </div>
    </div>
  );

  return (
    <section className="min-h-screen bg-gray-50 py-12 px-6">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-4">
            <Link
              to="/dashboard"
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
            >
              ← Back to Dashboard
            </Link>
            <h1 className="text-3xl font-bold text-gray-800">My Tickets</h1>
          </div>

          <button
            onClick={() => handleOpenModal()}
            id="addTicketBtn"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            + New Ticket
          </button>
        </div>

        {/* Ticket List */}
        <div id="ticketList" className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tickets.length === 0 ? (
            <p className="text-gray-500 md:col-span-3">No tickets yet. Click "+ New Ticket" to create one.</p>
          ) : (
            tickets.map(t => <TicketCard key={t.id} ticket={t} />)
          )}
        </div>
      </div>

      {/* Modal - Conditional Rendering */}
      {isModalOpen && (
        <div
          id="ticketModal"
          className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center"
        >
          <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-md" onClick={(e) => e.stopPropagation()}>
            <h2 id="modalTitle" className="text-2xl font-semibold mb-4">
              {currentTicket.id ? 'Edit Ticket' : 'Add Ticket'}
            </h2>
            <form onSubmit={handleFormSubmit} id="ticketForm" className="space-y-4">
              
              {/* Title */}
              <div>
                <label htmlFor="title" className="block mb-1 text-sm font-medium text-gray-700">Title</label>
                <input
                  type="text"
                  id="title"
                  value={currentTicket.title}
                  onChange={handleFormChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              {/* Description */}
              <div>
                <label htmlFor="description" className="block mb-1 text-sm font-medium text-gray-700">Description</label>
                <textarea
                  id="description"
                  value={currentTicket.description}
                  onChange={handleFormChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                  rows="3"
                ></textarea>
              </div>

              {/* Status */}
              <div>
                <label htmlFor="status" className="block mb-1 text-sm font-medium text-gray-700">Status</label>
                <select
                  id="status"
                  value={currentTicket.status}
                  onChange={handleFormChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="open">Open</option>
                  <option value="in_progress">In Progress</option>
                  <option value="closed">Closed</option>
                </select>
              </div>

              {/* Actions */}
              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  id="cancelBtn"
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  {currentTicket.id ? 'Save Changes' : 'Save'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}