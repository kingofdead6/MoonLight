import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaStar } from 'react-icons/fa';
import axios from 'axios';
import { API_BASE_URL } from '../../../api';

const cardVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.6 } },
};

const formatPrice = (price) => {
  if (!price || isNaN(parseFloat(price))) return 'N/A';
  return parseFloat(price).toLocaleString({ minimumFractionDigits: 0 }) + '€';
};

const Services = () => {
  const [services, setServices] = useState([]);
  const [error, setError] = useState('');

  const fetchServices = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/services`);
      const mainPageServices = res.data.filter(service => service.showOnMainPage);
      setServices(mainPageServices || []);
    } catch (error) {
      setError('Failed to load services. Please try again.');
      console.error('Error fetching services:', error);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  // Split first 3 services and the rest
  const firstRow = services.slice(0, 3);
  const remaining = services.slice(3);

  return (
    <section className="relative py-24 px-6 md:px-16 text-white overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="relative max-w-7xl mx-auto text-center"
      >
        <h2 className="text-4xl md:text-6xl font-extrabold mb-16">Our Services</h2>

        {error && (
          <div className="fixed top-5 right-5 bg-red-200 border border-red-600 text-red-600 px-4 py-2 rounded-md z-50">
            {error}
          </div>
        )}

        {/* First row - 3 cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12 mb-10">
          {firstRow.map((service, i) => (
            <motion.div
              key={service._id}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              transition={{ duration: 0.6, delay: i * 0.2 }}
              className={`relative flex flex-col items-center w-full max-w-sm rounded-3xl shadow-cyan-300 shadow-md p-8 backdrop-blur-md bg-black/50 border border-blue-500/30 ${
                service.popular ? 'border-cyan-400 shadow-lg shadow-cyan-400/50' : ''
              }`}
            >
              {service.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-cyan-400 text-black font-bold px-4 py-1 rounded-full flex items-center gap-1 shadow-lg z-10">
                  <FaStar /> Popular
                </div>
              )}
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 mt-6 text-center">
                {service.title}
              </h3>
              <p className="text-2xl md:text-3xl font-extrabold text-blue-400 mb-6 text-center">
                {service.monthprice && service.monthprice !== '0'
                  ? `${formatPrice(service.price)} + ${formatPrice(service.monthprice)}/month`
                  : formatPrice(service.price)}
              </p>
              <ul className="list-disc list-inside text-left text-gray-300 w-full mb-6">
                {service.properties.map((prop, index) => (
                  <li key={index}>{prop}</li>
                ))}
              </ul>
              <a
                href="/consultation"
                className="mt-auto px-6 py-3 rounded-2xl bg-gradient-to-r from-blue-500 to-blue-400 shadow-lg hover:from-blue-600 hover:to-blue-500 text-white font-medium text-center transition-all"
                aria-label={`Subscribe to service ${service.title}`}
              >
                {service.button}
              </a>
            </motion.div>
          ))}
        </div>

        {/* Remaining cards (centered if only 1) */}
        {remaining.length > 0 && (
          <div className="flex justify-center">
            {remaining.map((service, i) => (
              <motion.div
                key={service._id}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                transition={{ duration: 0.6, delay: i * 0.2 }}
                className={`relative shadow-cyan-300 shadow-md flex flex-col items-center w-full max-w-sm rounded-3xl p-8 backdrop-blur-md bg-black/50 border border-blue-500/30 ${
                  service.popular ? 'border-cyan-400 shadow-lg shadow-cyan-400/50' : ''
                }`}
              >
                {service.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-cyan-400 text-black font-bold px-4 py-1 rounded-full flex items-center gap-1 shadow-lg z-10">
                    <FaStar /> Popular
                  </div>
                )}
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 mt-6 text-center">
                  {service.title}
                </h3>
                <p className="text-2xl md:text-3xl font-extrabold text-blue-400 mb-6 text-center">
                  {service.monthprice && service.monthprice !== '0'
                    ? `${formatPrice(service.price)} + ${formatPrice(service.monthprice)}/month`
                    : formatPrice(service.price)}
                </p>
                <ul className="list-disc list-inside text-left text-gray-300 w-full mb-6">
                  {service.properties.map((prop, index) => (
                    <li key={index}>{prop}</li>
                  ))}
                </ul>
                <a
                  href="/consultation"
                  className="mt-auto px-6 py-3 rounded-2xl bg-gradient-to-r from-blue-500 to-blue-400 shadow-lg hover:from-blue-600 hover:to-blue-500 text-white font-medium text-center transition-all"
                  aria-label={`Subscribe to service ${service.title}`}
                >
                  {service.button}
                </a>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </section>
  );
};

export default Services;
