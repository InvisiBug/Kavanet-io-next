import { useEffect, type PropsWithChildren } from "react";
import { useContext } from "@/lib/context";
import { persistTheme } from "@/lib/helpers";

const AppConfig = ({ children }: PropsWithChildren) => {
  const { theme } = useContext();

  useEffect(() => {
    persistTheme(theme);
  }, [theme]);

  return <>{children}</>;
};

export default AppConfig;
