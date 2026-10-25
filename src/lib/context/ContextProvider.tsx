import { useState, type PropsWithChildren } from "react";
import { getInitialTheme } from "@/lib/helpers";
import type { LightboxImage, Theme } from "@/lib/types";
import { ThemeContext } from "./useContext";

export const ContextProvider = ({ children }: PropsWithChildren) => {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);
  const [lightboxImage, setLightboxImage] = useState<LightboxImage | null>(null);

  return <ThemeContext.Provider value={{ theme, setTheme, lightboxImage, setLightboxImage }}>{children}</ThemeContext.Provider>;
};
