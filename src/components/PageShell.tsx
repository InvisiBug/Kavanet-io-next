import type { PropsWithChildren } from "react";
import { SiteHeader } from "@/components/SiteHeader";

export function PageShell({ children }: PropsWithChildren) {
  return (
    <div className="page-shell">
      <SiteHeader />
      <main className="page-content">{children}</main>
    </div>
  );
}
