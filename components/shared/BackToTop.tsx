"use client";
import { motion } from "framer-motion";
import { ArrowUpCircle } from "lucide-react";
import { useState, useEffect } from "react";
export const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6 } },
};
const BackToTop = () => {
  const [showButton, setShowButton] = useState(true);
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const showThreshold = 400;
      setShowButton(scrollY > showThreshold);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <motion.button
      variants={fadeIn}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className={`fixed right-4 bottom-4 z-10 cursor-pointer rounded-full bg-purple-500 p-2 transition-opacity ${
        showButton ? "opacity-100" : "opacity-0"
      }`}
      onClick={scrollToTop}
    >
      <ArrowUpCircle size={24} className="text-white" />
    </motion.button>
  );
};

export default BackToTop;
