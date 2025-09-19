import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";

export default function Hero() {
  const headingRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      headingRef.current,
      { opacity: 0, y: 60 },
      { opacity: 1, y: 0, duration: 1.2, ease: "power3.out" }
    );
  }, []);

  return (
    <section
      className="relative h-screen flex items-center justify-center text-center text-white"
      style={{
        backgroundImage:
          "url('https://res.cloudinary.com/dtwa3lxdk/image/upload/v1757085475/20250905_1616_Futuristic_Digital_Cityscape_simple_compose_01k4d72qj8f0krsh7zkke5qwxb_of0iha.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl px-6">
        <motion.h1
          ref={headingRef}
          className="text-5xl md:text-6xl font-extrabold leading-tight text-cyan-400"
        >
          Premium Web & AI Integration Agency
        </motion.h1>

        <motion.p
          className="mt-6 text-lg md:text-xl text-gray-200"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          We transform your online presence with high-end websites and AI agents
          that convert.
        </motion.p>

        <motion.div
          className="mt-10 flex flex-col md:flex-row items-center justify-center gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
        >
          {/* To Consultation Page */}
          <a
            href="/consultation"
            className="px-6 py-3 bg-cyan-400 text-[#0a0f1f] hover:bg-cyan-300 rounded-2xl font-semibold shadow-[0_0_20px_#00FFFF] transition"
          >
            Free Consultation
          </a>

          {/* To Services Page */}
          <a
            href="/services"
            className="px-6 py-3 bg-[#0a0f1f] border border-cyan-400 text-cyan-400 hover:bg-cyan-500 hover:text-[#0a0f1f] rounded-2xl font-semibold shadow-[0_0_20px_#1e3a8a] transition"
          >
            Our Services
          </a>
        </motion.div>
      </div>
    </section>
  );
}
