import { motion } from "framer-motion";
import { COMPANY_INFO } from "../../../constants";

export function HowItWorksSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" as const },
    },
  };

  return (
    <section className="py-2 bg-surface">
      <div className="max-w-[1280px] mx-auto px-6 md:px-16">
        <div className="flex flex-col items-center mb-16 text-center">
          <span className="font-label text-xs text-secondary dark:text-primary mb-2 uppercase tracking-[0.2em] font-semibold">
            SIMPLE & PERSONAL
          </span>
          <h2 className="font-NeuMachina text-3xl md:text-4xl text-primary font-semibold">
            How It Works
          </h2>
          <div className="flex justify-center items-center space-x-2 mt-4">
            <div className="w-8 h-[1px] bg-outline-variant"></div>
            <div className="w-1.5 h-1.5 rotate-45 bg-secondary"></div>
            <div className="w-8 h-[1px] bg-outline-variant"></div>
          </div>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-12 relative"
        >
          <div className="hidden md:block absolute top-12 left-[15%] right-[15%] h-[1px] bg-outline-variant/30 z-0"></div>
          {COMPANY_INFO.processSteps.map((step) => (
            <motion.div
              key={step.num}
              variants={itemVariants}
              whileHover={{ y: -4 }}
              className="flex flex-col items-center text-center space-y-6 relative z-10"
            >
              <div className="w-24 h-24 rounded-full border border-secondary/20 bg-surface flex items-center justify-center font-NeuMachina text-[32px] text-secondary dark:text-primary shadow-sm font-bold">
                {step.num}
              </div>
              <div>
                <h3 className="font-HelveticaNow text-xl text-primary mb-3 font-medium">
                  {step.title}
                </h3>
                <p className="font-body text-sm text-on-surface-variant leading-relaxed px-4 font-light">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
