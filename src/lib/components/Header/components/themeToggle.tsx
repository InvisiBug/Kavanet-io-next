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
          <path d="M12 3.75v2.1M12 18.15v2.1M18.25 12h2M3.75 12h2M16.42 7.58l1.5-1.5M6.08 17.92l1.5-1.5M16.42 16.42l1.5 1.5M6.08 6.08l1.5 1.5M12 16.2a4.2 4.2 0 1 0 0-8.4 4.2 4.2 0 0 0 0 8.4Z" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" className="h-4.5 w-4.5 fill-current" aria-hidden="true">
          <path d="M20.4 14.84A8.7 8.7 0 0 1 9.16 3.6a.75.75 0 0 0-.86-1.12A10.2 10.2 0 1 0 21.52 15.7a.75.75 0 0 0-1.12-.86Z" />
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
