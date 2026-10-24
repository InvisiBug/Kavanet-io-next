import type { PropsWithChildren } from "react";
import { SiteHeader } from "@/components/SiteHeader";

export function PageShell({ children }: PropsWithChildren) {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_88%_2%,#ffe9c7_0%,transparent_34%),radial-gradient(circle_at_8%_100%,#dff9f6_0%,transparent_30%),var(--bg)]">
      <SiteHeader />
      <main className="mx-auto w-[min(1120px,calc(100%-2rem))] px-0 pt-5 pb-12 max-[680px]:w-[min(1120px,calc(100%-1rem))]">{children}</main>
    </div>
  );
}
