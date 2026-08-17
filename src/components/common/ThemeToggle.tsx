import { useState, useEffect } from "react";
import { useTheme } from "../../lib/theme-provider";

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const options = [
    {
      value: "light",
      label: "Light",
      icon: (
        <span className="material-symbols-outlined text-[14px]">
          light_mode
        </span>
      ),
    },
    {
      value: "dark",
      label: "Dark",
      icon: (
        <span className="material-symbols-outlined text-[14px]">
          dark_mode
        </span>
      ),
    },
  ];

  if (!mounted) {
    return (
      <div className="inline-flex items-center p-1 border border-outline-variant/20 bg-surface-container gap-1 min-h-[32px] min-w-[180px]" />
    );
  }

  return (
    <div
      aria-label="Theme selector"
      className="inline-flex items-center p-0.5 border border-outline-variant/30 bg-surface-container rounded-full gap-0.5"
    >
      {options.map((opt) => {
        const isActive = theme === opt.value;
        return (
          <button
            key={opt.value}
            onClick={() => setTheme(opt.value)}
            className={`flex items-center gap-1 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider transition-all duration-200 cursor-pointer rounded-full ${
              isActive
                ? "bg-primary text-on-primary shadow-sm"
                : "text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high"
            }`}
            title={`Switch to ${opt.label} mode (Active: ${resolvedTheme})`}
          >
            {opt.icon}
            <span className="hidden sm:inline">{opt.label}</span>
          </button>
        );
      })}
    </div>
  );
}
