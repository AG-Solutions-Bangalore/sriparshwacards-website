import { useSyncExternalStore } from "react";
import { useTheme } from "../../lib/theme-provider";

const emptySubscribe = () => () => {};

export function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme();
  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );

  const isDark = resolvedTheme === "dark";
  const label = isDark ? "Switch to light mode" : "Switch to dark mode";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="text-on-surface-variant hover:text-primary transition-colors p-2 rounded-sm cursor-pointer"
      aria-label={mounted ? label : "Toggle theme"}
      title={mounted ? label : "Toggle theme"}
    >
      <span className="material-symbols-outlined text-[20px]">
        {mounted ? (isDark ? "light_mode" : "dark_mode") : "dark_mode"}
      </span>
    </button>
  );
}