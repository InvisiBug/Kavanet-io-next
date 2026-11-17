import { useEffect, type FC, type PropsWithChildren } from "react";
import { useContext } from "@/lib/context";
import { persistTheme } from "@/lib/helpers";

const AppConfig: FC<PropsWithChildren> = ({ children }) => {
  const { theme } = useContext();

  useEffect(() => {
    persistTheme(theme);
  }, [theme]);

  return <>{children}</>;
};

export default AppConfig;
