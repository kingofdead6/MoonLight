import { motion } from "framer-motion";

export default function AboutUs() {
  return (
    <section className="relative min-h-screen flex items-center justify-center text-white">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-fixed" 
        style={{
          backgroundImage:
            "url('https://res.cloudinary.com/dtwa3lxdk/image/upload/v1757109028/20250905_2247_Futuristic_Digital_Skyline_simple_compose_01k4dxhtc0f3hbr61qmkp5adfh_r9rzzx.png')",
        }}
      >
        <div className="absolute inset-0 bg-black/70"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl px-6 text-center">
        <motion.h1
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-5xl md:text-6xl font-bold text-cyan-400 drop-shadow-lg"
        >
          Who are we?
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-6 text-lg md:text-xl text-gray-200 leading-relaxed"
        >
          At <span className="text-cyan-400 font-semibold">MoonLight</span>, 
          we believe that technology is a bridge between ideas and success. 
          Our mission is to craft modern, elegant, and high-performing digital 
          solutions that empower both businesses and individuals to achieve their goals.
        </motion.p>
      </div>
    </section>
  );
}
