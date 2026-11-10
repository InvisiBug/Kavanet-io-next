import { LightMode, DarkMode } from "./icons";

const ThemeToggleButton = ({ theme, onToggle }: ThemeToggleButtonProps) => {
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-(--line) bg-(--surface) text-(--text-muted) transition hover:cursor-pointer hover:border-(--accent) hover:text-(--text)"
    >
      {isDark ? (
        <svg viewBox="0 0 24 24" className="h-4.5 w-4.5 fill-none stroke-current stroke-2" aria-hidden="true">
          <DarkMode />
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" className="h-4.5 w-4.5 fill-current" aria-hidden="true">
          <LightMode />
        </svg>
      )}
    </button>
  );
};

export default ThemeToggleButton;

interface ThemeToggleButtonProps {
  theme: "light" | "dark";
  onToggle: () => void;
}
