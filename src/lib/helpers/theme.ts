import type { Theme } from "@/lib/types";

const THEME_STORAGE_KEY = "kavanet-theme";

export const getToggledTheme = (theme: Theme): Theme => (theme === "light" ? "dark" : "light");

export const getInitialTheme = (): Theme => {
  const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);

  if (savedTheme === "light" || savedTheme === "dark") {
    return savedTheme;
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
};

export const persistTheme = (theme: Theme) => {
  document.documentElement.dataset.theme = theme;
  localStorage.setItem(THEME_STORAGE_KEY, theme);
};
