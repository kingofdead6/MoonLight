import { motion } from "framer-motion";

export default function ServicesHero() {
  return (
    <section
      className="relative min-h-screen flex items-center justify-center bg-fixed bg-center bg-cover"
      style={{
        backgroundImage:
          "url('https://res.cloudinary.com/dtwa3lxdk/image/upload/v1757109819/20250905_2301_Futuristic_AI_Network_simple_compose_01k4dy8jt7fvf9fmzysxycxg06_w1xrra.png')", 
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/70"></div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 max-w-4xl px-6 text-center"
      >
        <h1 className="text-5xl md:text-6xl font-bold text-cyan-400 drop-shadow-lg">
          Our AI Services
        </h1>
        <p className="mt-6 text-lg md:text-2xl text-gray-200 leading-relaxed">
          Intelligent websites, AI agents, and complete solutions to boost your
          business. Choose the package that best fits your goals.
        </p>
      </motion.div>
    </section>
  );
}
