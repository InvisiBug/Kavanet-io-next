import { createContext, useContext as useReactContext, type Dispatch, type SetStateAction } from "react";
import type { LightboxImage, Theme } from "@/lib/types";

export const ThemeContext = createContext<ThemeContextValue | null>(null);

export const useContext = () => {
  const contextValue = useReactContext(ThemeContext);

  if (!contextValue) {
    throw new Error("useContext must be used within a ContextProvider");
  }

  return contextValue;
};

interface ThemeContextValue {
  theme: Theme;
  setTheme: Dispatch<SetStateAction<Theme>>;
  lightboxImage: LightboxImage | null;
  setLightboxImage: Dispatch<SetStateAction<LightboxImage | null>>;
}
