import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaTrash, FaSearch } from 'react-icons/fa';
import axios from 'axios';
import { API_BASE_URL } from '../../../api';

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const AdminNewsletterPage = () => {
  const [newsletters, setNewsletters] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIds, setSelectedIds] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const fetchNewsletters = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get(`${API_BASE_URL}/newsletters`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNewsletters(res.data || []);
    } catch (error) {
      setError('Failed to load subscriptions. Please try again.');
      console.error('Error fetching newsletters:', error);
    }
  };

  useEffect(() => {
    fetchNewsletters();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this subscription?')) return;
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${API_BASE_URL}/newsletters/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNewsletters(newsletters.filter(newsletter => newsletter._id !== id));
      setSelectedIds(selectedIds.filter(selectedId => selectedId !== id));
      setSuccess('Subscription deleted successfully!');
      setTimeout(() => setSuccess(''), 3000);
    } catch (error) {
      setError('Failed to delete subscription. Please try again.');
      console.error('Error deleting newsletter:', error);
      setTimeout(() => setError(''), 3000);
    }
  };

  const handleBulkDelete = async () => {
    if (selectedIds.length === 0) {
      setError('No subscriptions selected.');
      setTimeout(() => setError(''), 3000);
      return;
    }
    if (!window.confirm(`Are you sure you want to delete ${selectedIds.length} subscription(s)?`)) return;
    try {
      const token = localStorage.getItem('token');
      const res = await axios.delete(`${API_BASE_URL}/newsletters`, {
        headers: { Authorization: `Bearer ${token}` },
        data: { ids: selectedIds },
      });
      setNewsletters(newsletters.filter(newsletter => !selectedIds.includes(newsletter._id)));
      setSelectedIds([]);
      setSuccess(res.data.message);
      setTimeout(() => setSuccess(''), 3000);
    } catch (error) {
      setError('Failed to delete subscriptions. Please try again.');
      console.error('Error deleting multiple newsletters:', error);
      setTimeout(() => setError(''), 3000);
    }
  };

  const handleCheckboxChange = (id) => {
    setSelectedIds(prev =>
      prev.includes(id) ? prev.filter(selectedId => selectedId !== id) : [...prev, id]
    );
  };

  const filteredNewsletters = newsletters.filter(newsletter =>
    newsletter.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section className="min-h-screen py-24 px-6 md:px-16 text-white">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="max-w-7xl mx-auto"
      >
        <h2 className="text-4xl md:text-6xl font-extrabold mb-12 text-center">
          Manage Newsletter Subscriptions
        </h2>

        {/* Search + Bulk Delete */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10">
          <div className="relative w-full max-w-xs">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400" />
            <input
              type="text"
              placeholder="Search by email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg bg-gray-800 border border-blue-500 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <button
            className={`cursor-pointer flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all ${
              selectedIds.length === 0
                ? 'bg-red-500/50 cursor-not-allowed'
                : 'bg-red-500 hover:bg-red-600'
            }`}
            onClick={handleBulkDelete}
            disabled={selectedIds.length === 0}
          >
            <FaTrash />
            Delete Selected
          </button>
        </div>

        {/* Alerts */}
        {success && (
          <div className="fixed bottom-5 right-5 bg-blue-500/20 border border-blue-500 text-blue-500 px-4 py-2 rounded-md">
            {success}
          </div>
        )}
        {error && (
          <div className="fixed bottom-5 right-5 bg-red-500/20 border border-red-500 text-red-500 px-4 py-2 rounded-md">
            {error}
          </div>
        )}

        {/* Newsletters Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {filteredNewsletters.length === 0 ? (
            <p className="text-gray-400 col-span-full text-center text-lg md:text-xl">
              No subscriptions found.
            </p>
          ) : (
            filteredNewsletters.map((newsletter, i) => (
              <motion.div
                key={newsletter._id}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="bg-gray-800/60 backdrop-blur-md border border-blue-500 rounded-3xl p-6 flex items-center justify-between hover:shadow-lg hover:shadow-blue-500/50 transition-all"
              >
                {/* Left side: checkbox + email */}
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={selectedIds.includes(newsletter._id)}
                    onChange={() => handleCheckboxChange(newsletter._id)}
                    className="cursor-pointer form-checkbox h-5 w-5 text-blue-400"
                  />
                  <h3 className="text-lg md:text-xl font-semibold text-white break-all">
                    {newsletter.email}
                  </h3>
                </div>

                {/* Right side: delete button */}
                <button
                  onClick={() => handleDelete(newsletter._id)}
                  className="cursor-pointer p-3 rounded-full bg-red-500 hover:bg-red-600 transition-all"
                >
                  <FaTrash size={18} className="text-white" />
                </button>
              </motion.div>
            ))
          )}
        </div>
      </motion.div>
    </section>
  );
};

export default AdminNewsletterPage;
