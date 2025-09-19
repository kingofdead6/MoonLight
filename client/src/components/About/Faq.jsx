import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "How long does it take to build my AI-powered website?",
    answer:
      "Our starter packs are ready in as little as 72 hours for a single-page site. Full websites and ultimate packs take 1–2 weeks depending on your content.",
  },
  {
    question: "Can I edit the content myself?",
    answer:
      "Absolutely! You’ll get access to a simple editing dashboard. Our team also remains available to support you whenever needed.",
  },
  {
    question: "Does the AI agent work 24/7?",
    answer:
      "Yes. Your AI agent manages leads day and night across your preferred channels (web, WhatsApp, email).",
  },
  {
    question: "What are your payment terms?",
    answer:
      "For one-shot packs, it’s 50% upfront and 50% upon delivery. Monthly subscriptions are billed automatically each month.",
  },
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="text-white px-6">
      <div className="max-w-4xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl sm:text-5xl font-extrabold text-center mb-12"
        >
          Frequently Asked <span className="text-cyan-400">Questions</span>
        </motion.h2>

        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-gray-800/70 backdrop-blur-md rounded-xl shadow-md border border-cyan-500/20 shadow-cyan-300"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="flex justify-between items-center w-full px-6 py-4 text-left text-lg font-medium text-cyan-400 focus:outline-none cursor-pointer"
              >
                {faq.question}
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown className="w-6 h-6 text-cyan-400" />
                </motion.div>
              </button>

              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    key="content"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-4 text-gray-300 text-base sm:text-lg">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
