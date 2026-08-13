import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface RevealSectionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export function RevealSection({ children, className = "", delay = 0 }: RevealSectionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.65, delay, ease: [0.25, 0.1, 0.25, 1.0] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
