import { useEffect, useRef, useState } from "react";
import { useInView, motion } from "framer-motion";
import { COMPANY_INFO } from "../../../constants";

interface AnimatedCounterProps {
  value: string;
}

function AnimatedCounter({ value }: AnimatedCounterProps) {
  const ref = useRef<HTMLHeadingElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-30px" });
  const [displayValue, setDisplayValue] = useState("0");

  useEffect(() => {
    if (!isInView) return;

    // Handle text values like "Global"
    if (value.toLowerCase().includes("global")) {
      setDisplayValue("Global");
      return;
    }

    // Extract numeric string (e.g. "3,000" or "15" or "50")
    const rawMatch = value.match(/[\d,]+/);
    if (!rawMatch) {
      setDisplayValue(value);
      return;
    }

    const cleanNum = parseInt(rawMatch[0].replace(/,/g, ""), 10);
    const suffix = value.replace(rawMatch[0], "");

    const duration = 2000; // 2 seconds
    const startTime = performance.now();

    const animateCount = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const currentVal = Math.floor(easeOut * cleanNum);

      const formatted =
        cleanNum >= 1000 ? currentVal.toLocaleString("en-US") : currentVal.toString();

      setDisplayValue(`${formatted}${suffix}`);

      if (progress < 1) {
        requestAnimationFrame(animateCount);
      } else {
        const finalFormatted =
          cleanNum >= 1000 ? cleanNum.toLocaleString("en-US") : cleanNum.toString();
        setDisplayValue(`${finalFormatted}${suffix}`);
      }
    };

    requestAnimationFrame(animateCount);
  }, [isInView, value]);

  return (
    <h4
      ref={ref}
      className="font-NeuMachina text-2xl md:text-3xl text-primary dark:text-on-surface font-bold tracking-tight"
    >
      {displayValue}
    </h4>
  );
}

export function StatisticsSection() {
  return (
    <section className="py-12 border-b border-outline-variant/10 bg-surface dark:bg-surface-dim">
      <div className="max-w-[1280px] mx-auto px-6 md:px-16 flex flex-col md:flex-row justify-between items-center space-y-8 md:space-y-0 divide-y md:divide-y-0 md:divide-x divide-outline-variant/20">
        {COMPANY_INFO.stats.map((stat, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className="text-center flex-1 py-4 md:py-0 px-4"
          >
            <AnimatedCounter value={stat.value} />
            <p className="font-HelveticaNow text-[10px] text-on-surface-variant mt-2 uppercase tracking-widest font-semibold">
              {stat.label}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
