// src/components/AnimatedPage.tsx
import { motion } from "framer-motion";
import React from "react";

export function AnimatedPage({ children, customKey }: { children: React.ReactNode; customKey: string | number; }) {
  return (
    <motion.div
      key={customKey}
      
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      style={{
        width: "100%",
        height: "100%",
        position: "absolute", // IMPORTANT: posiciona sobre o Grid cell
        top: 0,
        left: 0,
      }}
    >
      {children}
    </motion.div>
  );
}
