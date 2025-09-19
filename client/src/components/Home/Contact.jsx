import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaPhoneAlt, FaEnvelope, FaWhatsapp } from "react-icons/fa";
import axios from "axios";
import { API_BASE_URL } from "../../../api";

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    const errors = {};
    if (!formData.name.trim()) errors.name = "Name is required";
    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "Invalid email format";
    }
    if (!formData.message.trim()) errors.message = "Message is required";
    return errors;
  };

  useEffect(() => {
    if (success || error) {
      const timer = setTimeout(() => {
        setSuccess("");
        setError("");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [success, error]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm();
    setFormErrors(errors);
    setError("");
    setSuccess("");

    if (Object.keys(errors).length > 0) return;

    setLoading(true);
    try {
      await axios.post(`${API_BASE_URL}/contact`, formData);
      setFormData({ name: "", email: "", message: "" });
      setSuccess("✅ Message sent successfully!");
    } catch (err) {
      console.error("Contact form submission error:", err);
      setError(
        err.response?.data?.message ||
          "⚠️ An error occurred while sending the message"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setFormErrors((prev) => ({ ...prev, [name]: "" }));
  };

  return (
    <section className="relative px-6 md:px-16 text-white overflow-hidden">
      {/* Title */}
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative text-4xl md:text-5xl font-extrabold mb-16 text-center z-10"
      >
        Contact <span className="text-cyan-400">Us</span>
      </motion.h2>

      {/* Grid Layout */}
      <div className="relative pb-10 gap-12 max-w-xl mx-auto z-10">
        {/* Contact Form */}
        <motion.form
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          onSubmit={handleSubmit}
          className="shadow-cyan-300 shadow-md hover:shadow-xl duration-300 transform grid grid-cols-1 gap-6 bg-black/60 border border-blue-500/40 backdrop-blur-lg p-10 rounded-2xl"
        >
          <div>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your Name"
              className={`w-full px-4 py-3 rounded-xl bg-black/70 border ${
                formErrors.name ? "border-red-500" : "border-blue-500/40"
              } focus:outline-none focus:ring-2 focus:ring-cyan-400 text-white placeholder-gray-400 transition duration-200`}
              aria-label="Your name"
              aria-required="true"
            />
            {formErrors.name && (
              <p className="text-red-400 text-sm mt-1">{formErrors.name}</p>
            )}
          </div>
          <div>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Your Email"
              className={`w-full px-4 py-3 rounded-xl bg-black/70 border ${
                formErrors.email ? "border-red-500" : "border-blue-500/40"
              } focus:outline-none focus:ring-2 focus:ring-cyan-400 text-white placeholder-gray-400 transition duration-200`}
              aria-label="Your email"
              aria-required="true"
            />
            {formErrors.email && (
              <p className="text-red-400 text-sm mt-1">{formErrors.email}</p>
            )}
          </div>
          <div>
            <textarea
              rows="4"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Your Message"
              className={`w-full px-4 py-3 rounded-xl bg-black/70 border ${
                formErrors.message ? "border-red-500" : "border-blue-500/40"
              } focus:outline-none focus:ring-2 focus:ring-cyan-400 text-white placeholder-gray-400 transition duration-200`}
              aria-label="Your message"
              aria-required="true"
            ></textarea>
            {formErrors.message && (
              <p className="text-red-400 text-sm mt-1">{formErrors.message}</p>
            )}
          </div>

          {success && (
            <div className="px-4 py-2 rounded-lg bg-blue-500/20 border border-blue-500 text-blue-400 text-sm">
              {success}
            </div>
          )}
          {error && (
            <div className="px-4 py-2 rounded-lg bg-red-500/20 border border-red-500 text-red-400 text-sm">
              {error}
            </div>
          )}

          <motion.button
            whileHover={{
              scale: 1.05,
              boxShadow: "0px 0px 25px rgba(34, 211, 238, 0.7)", // cyan glow
            }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            disabled={loading}
            className={`cursor-pointer w-full py-3 rounded-xl font-semibold text-lg bg-gradient-to-r from-cyan-400 to-cyan-300 text-black shadow-[0_0_20px_rgba(34,211,238,0.6)] hover:shadow-[0_0_30px_rgba(34,211,238,0.9)] transition-all duration-300 ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            aria-label={loading ? "Submitting" : "Send message"}
          >
            {loading ? "Sending..." : "Send"}
          </motion.button>
        </motion.form>
      </div>
    </section>
  );
};

export default ContactSection;
