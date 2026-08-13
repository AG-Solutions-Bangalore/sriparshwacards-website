import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export function NotFoundPage() {
  return (
    <div className="py-20 md:py-32 min-h-[95vh] font-HelveticaNow flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="max-w-xl mx-auto text-center p-8 sm:p-12 space-y-6"
      >
        {/* Large 404 Display */}
        <motion.span
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="font-HelveticaNow text-7xl sm:text-8xl text-secondary dark:text-primary font-bold tracking-tight block"
        >
          404
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-3xl sm:text-4xl text-primary dark:text-on-surface font-semibold"
        >
          Page Not Found
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="font-body text-base text-on-surface-variant font-light leading-relaxed max-w-md mx-auto"
        >
          The invitation suite or page you are looking for might have been moved or does not exist.
        </motion.p>

        {/* 3D Text Flip CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="pt-6"
        >
          <Link
            to="/"
            className="group/btn relative inline-flex justify-center items-center bg-primary text-on-primary dark:bg-primary-container dark:text-on-primary-container font-label text-xs uppercase tracking-widest px-8 py-4 hover:bg-secondary dark:hover:bg-primary transition-all duration-300 rounded-full font-semibold shadow-md cursor-pointer hover:scale-105 active:scale-95"
          >
            <span className="relative inline-block overflow-hidden h-[18px] leading-[18px] whitespace-nowrap">
              <span className="block transition-transform duration-300 ease-out group-hover/btn:-translate-y-full whitespace-nowrap">
                Return to Home
              </span>
              <span className="block absolute top-0 left-0 transition-transform duration-300 ease-out translate-y-full group-hover/btn:translate-y-0 text-on-secondary dark:text-on-primary font-bold whitespace-nowrap">
                Return to Home
              </span>
            </span>
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}
