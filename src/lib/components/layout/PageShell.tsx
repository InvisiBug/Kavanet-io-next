import type { PropsWithChildren } from "react";
import { useLocation } from "react-router-dom";
import { SiteHeader } from "@/lib/components/Header/SiteHeader";

const PageShell = ({ children }: PropsWithChildren) => {
  const location = useLocation();
  const isLightboxEnabledRoute = location.pathname !== "/";

  return (
    <div className={["min-h-screen bg-(image:--page-bg)", isLightboxEnabledRoute ? "lightbox-enabled" : ""].join(" ")}>
      <SiteHeader />
      <main className="mx-auto w-[min(1120px,calc(100%-2rem))] px-0 pt-5 pb-12 max-[680px]:w-[min(1120px,calc(100%-1rem))]">{children}</main>
    </div>
  );
};

export default PageShell;
