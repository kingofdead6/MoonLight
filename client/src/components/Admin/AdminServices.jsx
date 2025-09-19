import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaPlus, FaTrash, FaEye, FaEyeSlash, FaEdit, FaSearch, FaStar, FaStarHalf } from 'react-icons/fa';
import axios from 'axios';
import { API_BASE_URL } from '../../../api';

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const modalVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
};

const AdminServicesPage = () => {
  const [services, setServices] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState({
    title: '',
    properties: '',
    price: '',
    monthprice: '',
    button: '',
    popular: false,
    showOnMainPage: false,
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Fetch services
  const fetchServices = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/services`);
      setServices(res.data || []);
    } catch (error) {
      setError('Failed to load services. Please try again.');
      console.error('Error fetching services:', error);
    }
  };

  // Fetch services on mount
  useEffect(() => {
    fetchServices();
  }, []);

  // Handle form submission (add or edit)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const properties = form.properties ? form.properties.split(',').map(prop => prop.trim()).filter(prop => prop) : [];
    if (!form.title) return setError('Title is required');
    if (!properties.length) return setError('At least one property is required');
    if (!form.price) return setError('Price is required');
    if (!form.monthprice) return setError('Monthly price is required');
    if (!form.button) return setError('Button text is required');

    const formData = {
      title: form.title,
      properties: form.properties,
      price: form.price,
      monthprice: form.monthprice,
      button: form.button,
      popular: form.popular.toString(),
      showOnMainPage: form.showOnMainPage.toString(),
    };

    try {
      const token = localStorage.getItem('token');
      if (isEditMode) {
        // Update existing service
        const res = await axios.put(`${API_BASE_URL}/services/${editId}`, formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setServices(services.map(service => (service._id === editId ? res.data : service)));
        setSuccess('Service updated successfully!');
      } else {
        // Add new service
        const res = await axios.post(`${API_BASE_URL}/services`, formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setServices([...services, res.data]);
        setSuccess('Service added successfully!');
      }
      setForm({ title: '', properties: '', price: '', monthprice: '', button: '', popular: false, showOnMainPage: false });
      setShowModal(false);
      setIsEditMode(false);
      setEditId(null);
    } catch (error) {
      console.error('Frontend error:', error.response?.data, error);
      setError(error.response?.data?.message || 'Failed to save service. Please try again.');
    }
  };

  // Handle edit button
  const handleEdit = (service) => {
    setForm({
      title: service.title,
      properties: service.properties.join(', '),
      price: service.price,
      monthprice: service.monthprice,
      button: service.button,
      popular: service.popular,
      showOnMainPage: service.showOnMainPage,
    });
    setEditId(service._id);
    setIsEditMode(true);
    setShowModal(true);
  };

  // Toggle showOnMainPage
  const handleToggleShowOnMainPage = async (id) => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.patch(`${API_BASE_URL}/services/${id}/toggle`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setServices(services.map(service => (service._id === id ? res.data : service)));
    } catch (error) {
      setError('Failed to toggle visibility. Please try again.');
    }
  };

  // Toggle popular
  const handleTogglePopular = async (id) => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.patch(`${API_BASE_URL}/services/${id}/toggle-popular`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setServices(services.map(service => (service._id === id ? res.data : service)));
    } catch (error) {
      setError('Failed to toggle popular status. Please try again.');
    }
  };

  // Delete service
  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this service?')) return;
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${API_BASE_URL}/services/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setServices(services.filter(service => service._id !== id));
      setSuccess('Service deleted successfully!');
    } catch (error) {
      setError('Failed to delete service. Please try again.');
    }
  };

  const filteredServices = services.filter(service =>
    service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    service.properties.some(prop => prop.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  useEffect(() => {
    if (success || error) {
      const timer = setTimeout(() => {
        setSuccess('');
        setError('');
      }, 3000);

      return () => clearTimeout(timer); 
    }
  }, [success, error]);

  return (
    <section className="relative py-24 px-6 md:px-16 text-white overflow-hidden">
      {/* Styles */}
      <style>{`
        .glass-card {
          background: rgba(0, 0, 0, 0.5);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(59, 130, 246, 0.3);
          transition: all 0.3s ease;
        }
        .glass-card:hover {
          box-shadow: 0 0 25px rgba(59, 130, 246, 0.6);
        }
        .neon-button {
          background: linear-gradient(45deg, #3b82f6, #60a5fa);
          box-shadow: 0 0 15px rgba(59, 130, 246, 0.5);
        }
        .neon-button:hover {
          background: linear-gradient(45deg, #2563eb, #3b82f6);
          box-shadow: 0 0 25px rgba(59, 130, 246, 0.8);
        }
        .delete-button {
          background: linear-gradient(45deg, #ef4444, #dc2626);
          box-shadow: 0 0 15px rgba(239, 68, 68, 0.5);
        }
        .delete-button:hover {
          background: linear-gradient(45deg, #dc2626, #b91c1c);
          box-shadow: 0 0 25px rgba(239, 68, 68, 0.8);
        }
        .edit-button {
          background: linear-gradient(45deg, #10b981, #059669);
          box-shadow: 0 0 15px rgba(16, 185, 129, 0.5);
        }
        .edit-button:hover {
          background: linear-gradient(45deg, #059669, #047857);
          box-shadow: 0 0 25px rgba(16, 185, 129, 0.8);
        }
        .popular-button {
          background: linear-gradient(45deg, #facc15, #eab308);
          box-shadow: 0 0 15px rgba(250, 204, 21, 0.5);
        }
        .popular-button:hover {
          background: linear-gradient(45deg, #eab308, #ca8a04);
          box-shadow: 0 0 25px rgba(250, 204, 21, 0.8);
        }
        .input-field {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(59, 130, 246, 0.4);
          color: white;
          transition: all 0.3s ease;
        }
        .input-field:focus {
          outline: none;
          border-color: rgba(59, 130, 246, 0.9);
          box-shadow: 0 0 15px rgba(59, 130, 246, 0.7);
        }
        .modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.8);
          z-index: 1000;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .alert {
          position: fixed;
          bottom: 20px;
          right: 20px;
          padding: 0.75rem 1rem;
          border-radius: 8px;
          z-index: 1001;
        }
        .alert-success {
          background: rgba(59, 130, 246, 0.2);
          border: 1px solid #3b82f6;
          color: #3b82f6;
        }
        .alert-error {
          background: rgba(239, 68, 68, 0.2);
          border: 1px solid #ef4444;
          color: #ef4444;
        }
      `}</style>

      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="relative max-w-7xl mx-auto"
      >
        {/* Header */}
        <h2 className="text-4xl md:text-6xl font-extrabold mb-16 text-center">
          Manage Services
        </h2>

        {/* Search and Add Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="cursor-pointer neon-button px-4 py-2 text-white font-semibold rounded-lg flex items-center gap-2 text-sm sm:text-base"
            onClick={() => {
              setIsEditMode(false);
              setForm({ title: '', properties: '', price: '', monthprice: '', button: '', popular: false, showOnMainPage: false });
              setShowModal(true);
            }}
            aria-label="Add new service"
          >
            <FaPlus />
            Add Service
          </motion.button>
        </motion.div>

        {/* Alerts */}
        {success && (
          <div className="alert alert-success text-sm sm:text-base">{success}</div>
        )}
        {error && (
          <div className="alert alert-error text-sm sm:text-base">{error}</div>
        )}

        {/* Services Grid */}
        <div className="grid md:grid-cols-3 gap-10">
          {filteredServices.length === 0 ? (
            <p className="text-gray-300 col-span-full text-center text-lg md:text-xl">
              No services found.
            </p>
          ) : (
            filteredServices.map((service, i) => (
              <motion.div
                key={service._id}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                transition={{ duration: 0.6, delay: i * 0.2 }}
                className="glass-card p-8 rounded-3xl flex flex-col"
              >
                <h3 className="text-xl md:text-2xl font-semibold text-white mb-4">{service.title}</h3>
                <p className="text-lg text-gray-200 mb-4">
                  <span className="font-semibold text-blue-400">Price:</span> {service.price}
                </p>
                <p className="text-lg text-gray-200 mb-4">
                  <span className="font-semibold text-blue-400">Monthly Price:</span> {service.monthprice}
                </p>
                <p className="text-lg text-gray-200 mb-4">
                  <span className="font-semibold text-blue-400">Button:</span> {service.button}
                </p>
                <div className="text-lg text-gray-200 mb-6">
                  <span className="font-semibold text-blue-400">Features:</span>
                  <ul className="list-disc list-inside mt-2">
                    {service.properties.map((prop, index) => (
                      <li key={index} className="text-gray-300">{prop}</li>
                    ))}
                  </ul>
                </div>
                <div className="flex gap-3 mt-auto">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="cursor-pointer neon-button p-3 rounded-full"
                    onClick={() => handleToggleShowOnMainPage(service._id)}
                    title={service.showOnMainPage ? 'Hide from main page' : 'Show on main page'}
                    aria-label={service.showOnMainPage ? 'Hide from main page' : 'Show on main page'}
                  >
                    {service.showOnMainPage ? <FaEye size={18} /> : <FaEyeSlash size={18} />}
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="cursor-pointer popular-button p-3 rounded-full"
                    onClick={() => handleTogglePopular(service._id)}
                    title={service.popular ? 'Remove popular status' : 'Mark as popular'}
                    aria-label={service.popular ? 'Remove popular status' : 'Mark as popular'}
                  >
                    {service.popular ? <FaStar size={18} /> : <FaStarHalf size={18} />}
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="cursor-pointer edit-button p-3 rounded-full"
                    onClick={() => handleEdit(service)}
                    title="Edit service"
                    aria-label="Edit service"
                  >
                    <FaEdit size={18} />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="cursor-pointer delete-button p-3 rounded-full"
                    onClick={() => handleDelete(service._id)}
                    title="Delete service"
                    aria-label="Delete service"
                  >
                    <FaTrash size={18} />
                  </motion.button>
                </div>
              </motion.div>
            ))
          )}
        </div>

        {/* Add/Edit Service Modal */}
        {showModal && (
          <div className="modal-overlay backdrop-blur-md">
            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              className="glass-card p-6 md:p-8 rounded-3xl w-11/12 max-w-md max-h-[80vh] overflow-y-auto"
            >
              <h3 className="text-2xl md:text-3xl font-bold text-blue-400 mb-6">
                {isEditMode ? 'Edit Service' : 'Add New Service'}
              </h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-gray-200 mb-1 text-sm md:text-base">Title</label>
                  <input
                    type="text"
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    className="input-field w-full px-4 py-2 rounded-lg text-sm md:text-base"
                    placeholder="e.g., Essential Package"
                    required
                    aria-required="true"
                  />
                </div>
                <div>
                  <label className="block text-gray-200 mb-1 text-sm md:text-base">Features (comma-separated)</label>
                  <textarea
                    value={form.properties}
                    onChange={(e) => setForm({ ...form, properties: e.target.value })}
                    className="input-field w-full px-4 py-2 rounded-lg text-sm md:text-base"
                    placeholder="e.g., Website, SEO, 24/7 Support"
                    rows="3"
                    required
                    aria-required="true"
                  />
                </div>
                <div>
                  <label className="block text-gray-200 mb-1 text-sm md:text-base">Price</label>
                  <input
                    type="text"
                    value={form.price}
                    onChange={(e) => setForm({ ...form, price: e.target.value })}
                    className="input-field w-full px-4 py-2 rounded-lg text-sm md:text-base"
                    placeholder="e.g., $5000"
                    required
                    aria-required="true"
                  />
                </div>
                <div>
                  <label className="block text-gray-200 mb-1 text-sm md:text-base">Monthly Price</label>
                  <input
                    type="text"
                    value={form.monthprice}
                    onChange={(e) => setForm({ ...form, monthprice: e.target.value })}
                    className="input-field w-full px-4 py-2 rounded-lg text-sm md:text-base"
                    placeholder="e.g., $500/month"
                    required
                    aria-required="true"
                  />
                </div>
                <div>
                  <label className="block text-gray-200 mb-1 text-sm md:text-base">Button Text</label>
                  <input
                    type="text"
                    value={form.button}
                    onChange={(e) => setForm({ ...form, button: e.target.value })}
                    className="input-field w-full px-4 py-2 rounded-lg text-sm md:text-base"
                    placeholder="e.g., Subscribe"
                    required
                    aria-required="true"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={form.popular}
                    onChange={(e) => setForm({ ...form, popular: e.target.checked })}
                    className="cursor-pointer form-checkbox h-5 w-5 text-blue-400"
                    aria-label="Mark as popular"
                  />
                  <label className="text-gray-200 text-sm md:text-base">Mark as Popular</label>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={form.showOnMainPage}
                    onChange={(e) => setForm({ ...form, showOnMainPage: e.target.checked })}
                    className="cursor-pointer form-checkbox h-5 w-5 text-blue-400"
                    aria-label="Show on main page"
                  />
                  <label className="text-gray-200 text-sm md:text-base">Show on Main Page</label>
                </div>
                <div className="flex gap-3">
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="cursor-pointer neon-button w-full px-4 py-2 text-white font-semibold rounded-lg text-sm md:text-base"
                    aria-label={isEditMode ? 'Update service' : 'Add service'}
                  >
                    {isEditMode ? 'Update' : 'Add'}
                  </motion.button>
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="cursor-pointer delete-button w-full px-4 py-2 text-white font-semibold rounded-lg text-sm md:text-base"
                    onClick={() => {
                      setShowModal(false);
                      setIsEditMode(false);
                      setForm({ title: '', properties: '', price: '', monthprice: '', button: '', popular: false, showOnMainPage: false });
                      setEditId(null);
                    }}
                    aria-label="Cancel"
                  >
                    Cancel
                  </motion.button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </motion.div>
    </section>
  );
};

export default AdminServicesPage;