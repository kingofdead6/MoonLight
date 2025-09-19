import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { API_BASE_URL } from "../../../api";

const ConsultationsPage = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    company: "",
    projectType: "",
    otherProjectType: "",
    timeline: "",
    description: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  // Auto-hide alerts after 3s
  useEffect(() => {
    if (error || success) {
      const timer = setTimeout(() => {
        setError("");
        setSuccess("");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [error, success]);

  const projectTypes = [
    "AI Website – Starter",
    "AI Website – Professional",
    "AI Closer Agent",
    "Ultimate Pack",
    "Other",
  ];

  const validateForm = () => {
    const errors = {};
    if (!formData.fullName.trim()) errors.fullName = "Full name is required";
    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      errors.email = "Invalid email format";
    }
    if (!formData.projectType) errors.projectType = "Project type is required";
    if (formData.projectType === "Other" && !formData.otherProjectType.trim()) {
      errors.otherProjectType = "Please specify the project type";
    }
    if (!formData.timeline) errors.timeline = "Timeline is required";
    return errors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setFormErrors((prev) => ({ ...prev, [name]: "" }));

    if (name === "projectType" && value !== "Other") {
      setFormData((prev) => ({ ...prev, otherProjectType: "" }));
      setFormErrors((prev) => ({ ...prev, otherProjectType: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm();
    setFormErrors(errors);
    setError("");
    setSuccess("");

    if (Object.keys(errors).length > 0) return;

    setLoading(true);
    try {
      await axios.post(`${API_BASE_URL}/consultations`, formData);
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        company: "",
        projectType: "",
        otherProjectType: "",
        timeline: "",
        description: "",
      });
      setSuccess("✅ Consultation request sent successfully!");
    } catch (err) {
      console.error("Consultation form submission error:", err);
      const errorMessages =
        err.response?.data?.errors?.map((e) => e.msg).join("; ") ||
        err.response?.data?.message ||
        "⚠️ An error occurred while sending your request";
      setError(errorMessages);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative py-24 px-6 md:px-16 text-white overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="relative max-w-6xl mx-auto"
      >
        {/* Header */}
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-4xl md:text-5xl font-extrabold mb-16 text-center"
        >
          Request a <span className="text-cyan-400">Consultation</span>
        </motion.h2>

        {/* Form */}
        <motion.form
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-black/60 border border-cyan-500/40 backdrop-blur-lg p-10 rounded-2xl shadow-cyan-300 shadow-md hover:shadow-xl transition-all duration-300"
        >
          {/* Full Name */}
          <div>
            <label htmlFor="fullName" className="block text-sm font-medium text-gray-200 mb-1">
              Full Name <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Enter your full name"
              className={`w-full px-4 py-3 rounded-xl bg-black/70 border ${
                formErrors.fullName ? "border-red-500" : "border-cyan-500/40"
              } focus:outline-none focus:ring-2 focus:ring-cyan-400 text-white placeholder-gray-400 transition duration-200`}
            />
            {formErrors.fullName && (
              <p className="text-red-400 text-sm mt-1">{formErrors.fullName}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-200 mb-1">
              Email <span className="text-red-400">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className={`w-full px-4 py-3 rounded-xl bg-black/70 border ${
                formErrors.email ? "border-red-500" : "border-cyan-500/40"
              } focus:outline-none focus:ring-2 focus:ring-cyan-400 text-white placeholder-gray-400 transition duration-200`}
            />
            {formErrors.email && (
              <p className="text-red-400 text-sm mt-1">{formErrors.email}</p>
            )}
          </div>

          {/* Phone */}
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-200 mb-1">
              Phone
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Your phone number"
              className="w-full px-4 py-3 rounded-xl bg-black/70 border border-cyan-500/40 focus:outline-none focus:ring-2 focus:ring-cyan-400 text-white placeholder-gray-400 transition duration-200"
            />
          </div>

          {/* Company */}
          <div>
            <label htmlFor="company" className="block text-sm font-medium text-gray-200 mb-1">
              Company
            </label>
            <input
              type="text"
              id="company"
              name="company"
              value={formData.company}
              onChange={handleChange}
              placeholder="Your company name"
              className="w-full px-4 py-3 rounded-xl bg-black/70 border border-cyan-500/40 focus:outline-none focus:ring-2 focus:ring-cyan-400 text-white placeholder-gray-400 transition duration-200"
            />
          </div>

          {/* Project Type */}
          <div>
            <label htmlFor="projectType" className="block text-sm font-medium text-gray-200 mb-1">
              Project Type <span className="text-red-400">*</span>
            </label>
            <select
              id="projectType"
              name="projectType"
              value={formData.projectType}
              onChange={handleChange}
              className={`w-full px-4 py-3 rounded-xl bg-black/70 border ${
                formErrors.projectType ? "border-red-500" : "border-cyan-500/40"
              } focus:outline-none focus:ring-2 focus:ring-cyan-400 text-white placeholder-gray-400 transition duration-200`}
            >
              <option value="" disabled>
                Select a project type
              </option>
              {projectTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
            {formErrors.projectType && (
              <p className="text-red-400 text-sm mt-1">{formErrors.projectType}</p>
            )}
          </div>

          {/* Other Project Type */}
          {formData.projectType === "Other" && (
            <div>
              <label htmlFor="otherProjectType" className="block text-sm font-medium text-gray-200 mb-1">
                Other Project Type <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                id="otherProjectType"
                name="otherProjectType"
                value={formData.otherProjectType}
                onChange={handleChange}
                placeholder="Please specify"
                className={`w-full px-4 py-3 rounded-xl bg-black/70 border ${
                  formErrors.otherProjectType ? "border-red-500" : "border-cyan-500/40"
                } focus:outline-none focus:ring-2 focus:ring-cyan-400 text-white placeholder-gray-400 transition duration-200`}
              />
              {formErrors.otherProjectType && (
                <p className="text-red-400 text-sm mt-1">{formErrors.otherProjectType}</p>
              )}
            </div>
          )}

          {/* Timeline */}
          <div>
            <label htmlFor="timeline" className="block text-sm font-medium text-gray-200 mb-1">
              Project Timeline <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              id="timeline"
              name="timeline"
              value={formData.timeline}
              onChange={handleChange}
              placeholder="e.g., 2 months, ASAP, end of year..."
              className={`w-full px-4 py-3 rounded-xl bg-black/70 border ${
                formErrors.timeline ? "border-red-500" : "border-cyan-500/40"
              } focus:outline-none focus:ring-2 focus:ring-cyan-400 text-white placeholder-gray-400 transition duration-200`}
            />
            {formErrors.timeline && (
              <p className="text-red-400 text-sm mt-1">{formErrors.timeline}</p>
            )}
          </div>

          {/* Description */}
          <div className="md:col-span-2">
            <label htmlFor="description" className="block text-sm font-medium text-gray-200 mb-1">
              Project Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              placeholder="Describe your project..."
              className="w-full px-4 py-3 rounded-xl bg-black/70 border border-cyan-500/40 focus:outline-none focus:ring-2 focus:ring-cyan-400 text-white placeholder-gray-400 transition duration-200"
            ></textarea>
          </div>

          {/* Alerts */}
          {success && (
            <div className="md:col-span-2 px-4 py-2 rounded-lg bg-cyan-500/20 border border-cyan-500 text-cyan-400 text-sm">
              {success}
            </div>
          )}
          {error && (
            <div className="md:col-span-2 px-4 py-2 rounded-lg bg-red-500/20 border border-red-500 text-red-400 text-sm">
              {error}
            </div>
          )}

          {/* Submit Button */}
          <motion.button
            whileHover={{
              scale: 1.05,
              boxShadow: "0px 0px 25px rgba(34, 211, 238, 0.7)",
            }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            disabled={loading}
            className={`cursor-pointer md:col-span-2 w-full py-3 rounded-xl font-semibold text-lg bg-gradient-to-r from-cyan-400 to-cyan-300 text-black shadow-[0_0_20px_rgba(34,211,238,0.6)] hover:shadow-[0_0_30px_rgba(34,211,238,0.9)] transition-all duration-300 ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Sending..." : "Submit Request"}
          </motion.button>
        </motion.form>
      </motion.div>
    </section>
  );
};

export default ConsultationsPage;
