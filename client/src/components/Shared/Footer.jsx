import { useState } from "react";
import axios from "axios";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaEnvelope,
  FaPhone,
  FaTiktok,
  FaWhatsapp,
} from "react-icons/fa";
import { API_BASE_URL } from "../../../api";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [formError, setFormError] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    if (!email) return "Email is required";
    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const error = validateForm();
    setFormError(error);
    setError("");
    setSuccess("");

    if (error) return;

    setLoading(true);
    try {
      await axios.post(`${API_BASE_URL}/newsletters`, { email });
      setEmail("");
      setSuccess("✅ Subscription successful!");
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "⚠️ An error occurred while subscribing"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="bg-gradient-to-b from-black via-blue-950 to-black text-gray-300 pt-16 pb-8 mt-20 relative">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-start">
          {/* Logo + Info */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <h1 className="text-4xl font-bold text-cyan-400 mb-2 ml-6">
              MoonLight
            </h1>
            <p className="text-sm mt-4 ml-6 text-gray-400 max-w-xs">
              AI-powered digital solutions. Based in Brussels, serving clients
              worldwide.
            </p>

            <p className="text-xs mt-3 ml-6 text-gray-500">
              Created by:{" "}
              <a
                href="https://www.softwebelevation.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan-400 hover:underline"
              >
                SoftwebElevation
              </a>
            </p>
          </div>

          {/* Quick Links */}
          <div className="text-center md:text-left">
            <h4 className="text-lg font-semibold text-cyan-400 mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {[
                { label: "Home", href: "/" },
                { label: "About", href: "/about" },
                { label: "Services", href: "/services" },
                { label: "Consultation", href: "/consultation" },
              ].map((link, i) => (
                <li key={i}>
                  <a
                    href={link.href}
                    className="hover:text-cyan-400 transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-lg font-semibold text-cyan-400 mb-4">
              Newsletter
            </h4>
            <p className="text-sm mb-3">
              Get our latest updates and exclusive offers.
            </p>
            <form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-3 mb-6"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email"
                className={`flex-1 px-4 py-2 rounded-lg bg-gray-900 border ${
                  formError ? "border-red-500" : "border-gray-700"
                } focus:outline-none focus:border-cyan-400 text-white text-sm`}
              />
              <button
                type="submit"
                disabled={loading}
                className={`cursor-pointer px-5 py-2 bg-cyan-400 text-black font-bold rounded-lg shadow-md hover:shadow-cyan-500/40 transition ${
                  loading ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {loading ? "Sending..." : "Subscribe"}
              </button>
            </form>
            {formError && <p className="text-red-400 text-sm">{formError}</p>}
            {error && <p className="text-red-400 text-sm">{error}</p>}
            {success && <p className="text-green-400 text-sm">{success}</p>}
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-10 border-t border-gray-700 pt-4 text-center text-xs text-gray-500 hover:text-cyan-300">
          © {new Date().getFullYear()} MoonLight — All rights reserved
        </div>
      </div>
    </footer>
  );
}
