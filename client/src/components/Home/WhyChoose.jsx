import { motion } from "framer-motion";

const WhyChoose = () => {
  const features = [
    {
      title: "Maximum Conversion",
      description:
        "Every element is designed to turn visitors into clients. Our designs and AI inspire action.",
      colorClass: "text-cyan-400",
      shadow: "rgba(34, 211, 238, 0.7)", // cyan glow
    },
    {
      title: "Personalized Artificial Intelligence",
      description:
        "AI agents that manage your leads 24/7, schedule appointments, and boost your sales.",
      colorClass: "text-blue-400",
      shadow: "rgba(96, 165, 250, 0.7)", // blue glow
    },
    {
      title: "Premium Service",
      description:
        "Complete support, exclusive design, and a seamless experience. We accept only a limited number of projects per month.",
      colorClass: "text-purple-400",
      shadow: "rgba(192, 132, 252, 0.7)", // purple glow
    },
    {
      title: "Continuous Innovation",
      description:
        "We constantly innovate to deliver modern, efficient, and tailored solutions for your needs.",
      colorClass: "text-emerald-400",
      shadow: "rgba(52, 211, 153, 0.7)", // green glow
    },
  ];

  return (
    <section className="pt-20 px-6 md:px-16 text-center text-white">
      <motion.h2
        initial={{ opacity: 0, y: -25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="text-4xl md:text-5xl font-bold mb-16"
      >
        Why Choose <span className="text-cyan-400">MoonLight</span>?
      </motion.h2>

      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.45,
              ease: "easeOut",
            }}
            whileHover={{
              scale: 1.08,
              boxShadow: `0px 0px 30px ${feature.shadow}`,
            }}
            className="p-8 rounded-2xl bg-black/40 border border-blue-600/50 backdrop-blur-md cursor-pointer transform transition-transform duration-200 ease-out"
          >
            <h3 className={`text-2xl font-semibold mb-4 ${feature.colorClass}`}>
              {feature.title}
            </h3>
            <p className="text-gray-300">{feature.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default WhyChoose;
