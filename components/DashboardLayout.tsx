"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { Sparkles } from "lucide-react";
import Sidebar from "./Sidebar";
import { ReactNode } from "react";
import { useSession } from "@/lib/auth-client";

const routeTitles: Record<string, string> = {
  "/dashboard": "Overview",
  "/projects": "Projects",
  "/clients": "Clients",
  "/spends": "Spending",
  "/revenue": "Revenue",
  "/settings": "Settings",
};

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session, isPending } = useSession();

  useEffect(() => {
    if (!isPending && !session) router.replace("/auth/signin");
  }, [isPending, router, session]);

  if (isPending || !session) return null;

  return (
    <div className="app-shell">
      <Sidebar />
      <div className="app-main">
        <header className="app-topbar">
          <Link className="app-mobile-brand" href="/dashboard"><span className="studio-brand-mark"><Sparkles size={15} /></span> Studio</Link>
          <div className="app-breadcrumb"><span>WORKSPACE</span><b>/</b>{routeTitles[pathname] || "Overview"}</div>
          <span className="sample-badge"><i /> Demo data</span>
        </header>
        <main className="workspace-main"><div className="workspace-content">{children}</div></main>
      </div>
    </div>
  );
}
