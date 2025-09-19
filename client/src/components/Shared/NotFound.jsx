import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function NotFound() {
  return (
    <section className="relative flex items-center justify-center min-h-screen text-white px-6 overflow-hidden">
      {/* Decorative background glow */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-[500px] h-[500px] rounded-full bg-cyan-400/10 blur-[150px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative text-center z-10"
      >
        {/* Big 404 with neon effect */}
        <h1 className="text-9xl md:text-[10rem] font-extrabold text-cyan-400 drop-shadow-[0_0_25px_rgba(34,211,238,0.8)] tracking-wider animate-pulse">
          404
        </h1>

        {/* Subtext */}
        <p className="mt-6 text-2xl md:text-3xl font-semibold text-gray-200">
          Oops! Page not found.
        </p>
        <p className="mt-2 text-gray-400 text-lg">
          The URL you entered doesn’t exist or has been moved.
        </p>

        {/* Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
          <Link
            to="/"
            className="px-6 py-3 rounded-xl bg-cyan-400 text-black font-semibold shadow-[0_0_20px_rgba(34,211,238,0.6)] hover:shadow-[0_0_35px_rgba(34,211,238,0.9)] hover:bg-cyan-300 transition text-lg"
          >
            Back to Home
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
