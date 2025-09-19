import { motion } from "framer-motion";

const cardVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.95 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: i * 0.2,
      duration: 0.6,
      ease: [0.4, 0, 0.2, 1],
    },
  }),
  hover: {
    scale: 1.05,
    transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] },
  },
};

const steps = [
  {
    title: "The Beginning",
    description:
      "Our journey started with a simple idea: turning passion into a project that creates value.",
    icon: "🌱",
  },
  {
    title: "Challenges",
    description:
      "We faced many obstacles, but each step was a lesson that made us stronger.",
    icon: "⚡",
  },
  {
    title: "Achievements",
    description:
      "Through teamwork and persistence, we achieved milestones we’re proud of.",
    icon: "🏆",
  },
  {
    title: "The Future",
    description:
      "This is only the beginning. Our ambitions go beyond the present, and our dreams push past all limits.",
    icon: "🚀",
  },
];

export default function AboutTimeline() {
  return (
    <section className="relative min-h-screen py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-3xl sm:text-5xl font-extrabold text-center text-white mb-16"
        >
          Our <span className="text-cyan-400">Journey</span>
        </motion.h2>

        <div className="relative">
          {/* Vertical line */}
          <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-cyan-400 to-cyan-600 opacity-60"></div>

          {steps.map((step, index) => (
            <motion.div
              key={index}
              custom={index}
              initial="hidden"
              animate="visible"
              variants={cardVariants}
              whileHover="hover"
              className={`relative flex items-center mb-16 process-step ${
                index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
              }`}
            >
              {/* Card */}
              <div
                className={`w-full lg:w-5/12 bg-gray-800/70 backdrop-blur-md p-8 shadow-2xl shadow-cyan-300 rounded-xl border border-cyan-500/30 transition-all duration-500 ${
                  index % 2 === 0 ? "lg:mr-auto" : "lg:ml-auto"
                }`}
              >
                <div className="flex items-center mb-4">
                  <span className="text-4xl ml-3">{step.icon}</span>
                  <h3 className="text-xl sm:text-2xl font-semibold text-white">
                    {step.title}
                  </h3>
                </div>
                <p className="text-gray-300 text-base sm:text-lg">
                  {step.description}
                </p>
              </div>

              {/* Timeline dot */}
              <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 w-5 h-5 bg-cyan-400 shadow-2xl shadow-cyan-600 rounded-full border-2 border-cyan-700"></div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
