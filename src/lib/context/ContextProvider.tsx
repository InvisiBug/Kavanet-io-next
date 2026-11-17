import { useState, type FC, type PropsWithChildren } from "react";
import { getInitialTheme } from "@/lib/helpers";
import type { Theme } from "@/lib/types";
import { ThemeContext } from "./useContext";

export const ContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>;
};
