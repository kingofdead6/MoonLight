import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaBars, FaTimes } from "react-icons/fa";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [userType, setUserType] = useState(null);
  const navigate = useNavigate();
  const menuRef = useRef(null);

  // Scroll listener
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Outside click handler for mobile menu
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    if (menuOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
      document.addEventListener("touchstart", handleOutsideClick);
    }
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("touchstart", handleOutsideClick);
    };
  }, [menuOpen]);

  // Authentication check
  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("token");
      const role = localStorage.getItem("usertype");
      if (token && role) {
        setUserType(role);
      } else {
        setUserType(null);
      }
    };
    checkAuth();
    const handleAuthChange = () => checkAuth();
    window.addEventListener("authChanged", handleAuthChange);
    return () => {
      window.removeEventListener("authChanged", handleAuthChange);
    };
  }, []);

  // Logout handler
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("usertype");
    setUserType(null);
    window.dispatchEvent(new Event("authChanged"));
    navigate("/login");
    setMenuOpen(false);
  };

  // Navigation items
  const userLinks = [
    { label: "Home", path: "/" },
    { label: "About", path: "/about" },
    { label: "Services", path: "/services" },
  ];

  const adminLinks = [
    { label: "Dashboard", path: "/admin/dashboard" },
    { label: "Services", path: "/admin/services" },
    { label: "Messages", path: "/admin/contact" },
    { label: "Consultations", path: "/admin/consultation" },
    { label: "Newsletter", path: "/admin/newsletter" },
  ];

  const links = userType === "admin" ? adminLinks : userLinks;

  const renderNavItems = (items) =>
    items.map((item, index) => (
      <li key={index}>
        <Link
          to={item.path}
          onClick={() => setMenuOpen(false)}
          className="cursor-pointer hover:text-cyan-400 transition-colors duration-200"
        >
          {item.label}
        </Link>
      </li>
    ));

  return (
    <motion.nav
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 left-0 w-full z-50 transition-colors duration-300 ${
        scrolled ? "bg-black/90 shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto flex justify-between items-center py-4 px-4 sm:px-6">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <h1 className="text-lg sm:text-2xl font-bold text-cyan-400 drop-shadow-cyan-400">
            MoonLight
          </h1>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          <ul className="flex gap-6 text-white font-medium text-lg">
            {renderNavItems(links)}
          </ul>
          {!userType ? (
            <Link
              to="/consultation"
              className="px-5 py-2 rounded-2xl bg-gradient-to-r from-blue-500 to-blue-700 text-white font-medium shadow-md hover:shadow-xl transition-all duration-300"
            >
              Book a Call
            </Link>
          ) : (
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition"
            >
              Logout
            </button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white text-2xl focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center md:hidden"
          >
            <motion.ul
              ref={menuRef}
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="w-full max-w-xs bg-black/95 text-white flex flex-col items-center gap-6 py-8 rounded-lg shadow-lg"
            >
              {renderNavItems(links)}
              {!userType ? (
                <li>
                  <Link
                    to="/consultation"
                    onClick={() => setMenuOpen(false)}
                    className="px-6 py-3 rounded-2xl bg-gradient-to-r from-blue-500 to-blue-700 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    Book a Call
                  </Link>
                </li>
              ) : (
                <li>
                  <button
                    onClick={handleLogout}
                    className="px-6 py-3 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition"
                  >
                    Logout
                  </button>
                </li>
              )}
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
