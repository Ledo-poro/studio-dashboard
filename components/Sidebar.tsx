"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ChartNoAxesCombined, FolderKanban, LayoutDashboard, LogOut, ReceiptText, Settings2, Sparkles, UsersRound } from "lucide-react";
import { signOut, useSession } from "@/lib/auth-client";

const navItems = [
  { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { name: "Projects", href: "/projects", icon: FolderKanban },
  { name: "Clients", href: "/clients", icon: UsersRound },
  { name: "Spending", href: "/spends", icon: ReceiptText },
  { name: "Revenue", href: "/revenue", icon: ChartNoAxesCombined },
  { name: "Settings", href: "/settings", icon: Settings2 },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session } = useSession();
  const [signingOut, setSigningOut] = useState(false);
  const userName = session?.user?.name || "Your workspace";
  const userEmail = session?.user?.email || "Account details unavailable";

  const handleLogout = async () => {
    setSigningOut(true);
    try {
      await signOut();
      router.replace("/auth/signin");
      router.refresh();
    } finally {
      setSigningOut(false);
    }
  };

  return (
    <>
      <aside className="app-sidebar">
        <Link className="app-sidebar-brand" href="/dashboard">
          <span className="studio-brand-mark"><Sparkles size={16} /></span>
          <span>Waleed <small>/ Studio</small></span>
        </Link>
        <p className="app-nav-label">WORKSPACE</p>
        <nav className="app-nav" aria-label="Workspace navigation">
          {navItems.map(({ name, href, icon: Icon }) => {
            const isActive = pathname === href;
            return (
              <Link key={href} href={href} className={`app-nav-link${isActive ? " is-active" : ""}`} aria-current={isActive ? "page" : undefined}>
                <Icon size={17} strokeWidth={1.8} /> <span>{name}</span>
              </Link>
            );
          })}
        </nav>
        <div className="app-sidebar-bottom">
          <div className="app-account">
            <span className="app-account-avatar">{userName.slice(0, 1).toUpperCase()}</span>
            <span className="app-account-copy"><strong>{userName}</strong><small>{userEmail}</small></span>
          </div>
          <button className="app-logout" type="button" onClick={handleLogout} disabled={signingOut}>
            <LogOut size={16} /> {signingOut ? "Signing out..." : "Sign out"}
          </button>
        </div>
      </aside>
      <nav className="mobile-nav" aria-label="Workspace navigation">
        {navItems.map(({ name, href, icon: Icon }) => {
          const isActive = pathname === href;
          return (
            <Link key={href} href={href} className={`mobile-nav-link${isActive ? " is-active" : ""}`} aria-current={isActive ? "page" : undefined}>
              <Icon size={18} strokeWidth={1.8} /> <span>{name === "Spending" ? "Spends" : name}</span>
            </Link>
          );
        })}
      </nav>
    </>
  );
}
