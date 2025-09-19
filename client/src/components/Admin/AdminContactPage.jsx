import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaTrash, FaSearch, FaEye, FaEyeSlash } from 'react-icons/fa';
import axios from 'axios';
import { API_BASE_URL } from '../../../api';

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const AdminContactPage = () => {
  const [contacts, setContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIds, setSelectedIds] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Fetch contacts
  const fetchContacts = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get(`${API_BASE_URL}/contact`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setContacts(res.data || []);
    } catch (error) {
      setError('Failed to load contacts. Please try again.');
      console.error('Error fetching contacts:', error);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  // Auto-hide alerts after 3s
  useEffect(() => {
    if (error || success) {
      const timer = setTimeout(() => {
        setError('');
        setSuccess('');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [error, success]);

  // Handle single delete
  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this contact message?')) return;
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${API_BASE_URL}/contact/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setContacts((prev) => prev.filter((c) => c._id !== id));
      setSelectedIds((prev) => prev.filter((selectedId) => selectedId !== id));
      setSuccess('Contact deleted successfully!');
    } catch (error) {
      setError('Failed to delete contact. Please try again.');
      console.error('Error deleting contact:', error);
    }
  };

  // Handle toggle seen
  const handleToggleSeen = async (id) => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.patch(
        `${API_BASE_URL}/contact/${id}/toggle-seen`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setContacts((prev) =>
        prev.map((c) => (c._id === id ? res.data : c))
      );

      setSuccess(`Contact marked as ${res.data.seen ? 'seen' : 'unseen'}.`);
    } catch (error) {
      setError('Unable to change status.');
      console.error('Error toggling seen status:', error);
    }
  };

  // Filter contacts
  const filteredContacts = contacts.filter(
    (c) =>
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section className="relative py-24 px-6 md:px-16 text-white overflow-hidden ">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="relative max-w-7xl mx-auto"
      >
        {/* Header */}
        <h2 className="text-4xl md:text-6xl font-extrabold mb-16 text-center">
          Manage Contact Messages
        </h2>

        {/* Search */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
        >
          <div className="relative w-full max-w-xs">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400" />
            <input
              type="text"
              placeholder="Search by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg bg-gray-900 border border-gray-700 focus:outline-none focus:border-blue-400 text-white text-sm md:text-base placeholder-gray-500"
            />
          </div>
        </motion.div>

        {/* Alerts */}
        {success && (
          <div className="fixed bottom-5 right-5 px-4 py-2 rounded-lg bg-blue-500/20 border border-blue-500 text-blue-400 text-sm md:text-base z-[1001]">
            {success}
          </div>
        )}
        {error && (
          <div className="fixed bottom-5 right-5 px-4 py-2 rounded-lg bg-red-500/20 border border-red-500 text-red-400 text-sm md:text-base z-[1001]">
            {error}
          </div>
        )}

        {/* Contacts */}
        <div className="grid md:grid-cols-3 gap-10">
          {filteredContacts.length === 0 ? (
            <p className="text-gray-300 col-span-full text-center text-lg md:text-xl">
              No contact messages found.
            </p>
          ) : (
            filteredContacts.map((contact, i) => (
              <motion.div
                key={contact._id}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                transition={{ duration: 0.6, delay: i * 0.2 }}
                className="p-8 rounded-3xl bg-black/50 border border-blue-500/30 backdrop-blur-md hover:shadow-[0_0_25px_rgba(59,130,246,0.6)] transition-all duration-300 flex flex-col"
              >
                <div className="flex items-center mb-4">
                  <h3 className="text-xl md:text-2xl font-semibold text-white">{contact.name}</h3>
                </div>
                <p className="text-lg text-gray-200 mb-2">
                  <span className="font-semibold text-blue-400">Email:</span> {contact.email}
                </p>
                <p className="text-lg text-gray-200 mb-4">
                  <span className="font-semibold text-blue-400">Message:</span> {contact.message}
                </p>
                <p className="text-lg text-gray-200 mb-2">
                  <span className="font-semibold text-blue-400">Received on:</span>{' '}
                  {new Date(contact.receivedAt || contact.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>

                <div className="flex gap-3 mt-auto">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="cursor-pointer p-3 rounded-full bg-gradient-to-r from-blue-500 to-blue-700 hover:shadow-[0_0_12px_rgba(59,130,246,0.5)] transition-all duration-300"
                    onClick={() => handleToggleSeen(contact._id)}
                    title={contact.seen ? 'Mark as unseen' : 'Mark as seen'}
                  >
                    {contact.seen ? <FaEye size={18} /> : <FaEyeSlash size={18} />}
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="cursor-pointer p-3 rounded-full bg-gradient-to-r from-red-500 to-red-700 hover:shadow-[0_0_12px_rgba(239,68,68,0.5)] transition-all duration-300"
                    onClick={() => handleDelete(contact._id)}
                    title="Delete message"
                  >
                    <FaTrash size={18} />
                  </motion.button>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </motion.div>
    </section>
  );
};

export default AdminContactPage;
