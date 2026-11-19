"use client";

import { useEffect, type ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { Sparkles } from "lucide-react";
import { useSession } from "@/lib/auth-client";
import { usePreferences } from "./PreferencesProvider";
import Sidebar from "./Sidebar";

function AuthenticatedWorkspace({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const { theme, language, t } = usePreferences();
  const routeTitle = ({ "/dashboard": "Overview", "/projects": "Projects", "/clients": "Clients", "/spends": "Spending", "/revenue": "Revenue", "/settings": "Settings" })[pathname] || "Overview";

  return (
    <div className="app-shell" data-theme={theme} dir={language === "ar" ? "rtl" : "ltr"}>
      <Sidebar />
      <div className="app-main">
        <header className="app-topbar">
          <Link className="app-mobile-brand" href="/dashboard">
            <span className="studio-brand-mark"><Sparkles size={15} /></span> Studio
          </Link>
          <div className="app-breadcrumb">
            <span>{t("WORKSPACE")}</span>
            <b>/</b>
            {t(routeTitle)}
          </div>
        </header>
        <main className="workspace-main">
          <div className="workspace-content">{children}</div>
        </main>
      </div>
    </div>
  );
}

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const { data: session, isPending } = useSession();

  useEffect(() => {
    if (!isPending && !session) router.replace("/auth/signin");
  }, [isPending, router, session]);

  if (isPending || !session) return null;

  return <AuthenticatedWorkspace>{children}</AuthenticatedWorkspace>;
}
