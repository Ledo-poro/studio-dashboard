import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowUpRight, Sparkles } from "lucide-react";

export default function AuthShell({
  title,
  description,
  footer,
  children,
}: {
  title: string;
  description: string;
  footer: ReactNode;
  children: ReactNode;
}) {
  return (
    <main className="auth-page">
      <header className="auth-topbar">
        <Link className="studio-brand" href="/" aria-label="Waleed Studio home">
          <span className="studio-brand-mark"><Sparkles size={17} strokeWidth={2.2} /></span>
          <span>Waleed <span className="studio-brand-muted">/ Studio</span></span>
        </Link>
        <Link className="auth-home-link" href="/">Back to home <ArrowUpRight size={14} /></Link>
      </header>

      <div className="auth-layout">
        <section className="auth-story" aria-label="Studio workspace preview">
          <p className="studio-eyebrow"><span /> INDEPENDENT WORK, IN FOCUS</p>
          <h1>Make room for <em>the work.</em></h1>
          <p className="auth-story-copy">A clear view of your projects, people, and numbers, ready whenever you are.</p>

          <div className="auth-insight">
            <div className="auth-insight-top"><span>STUDIO SNAPSHOT</span><span className="auth-live-dot" /> SAMPLE VIEW</div>
            <div className="auth-insight-chart" aria-hidden="true">
              {[30, 43, 36, 57, 48, 69, 61, 83, 72, 94].map((height, index) => (
                <span key={index} style={{ height: `${height}%` }} />
              ))}
            </div>
            <div className="auth-insight-bottom"><span>Revenue trend</span><strong>$12,840 <small>+8.2%</small></strong></div>
          </div>
          <div className="auth-story-caption"><span>01</span> One workspace. A little more headspace.</div>
        </section>

        <section className="auth-form-panel" aria-labelledby="auth-title">
          <p className="auth-form-kicker">YOUR STUDIO WORKSPACE</p>
          <h2 id="auth-title">{title}</h2>
          <p className="auth-form-description">{description}</p>
          {children}
          <div className="auth-form-footer">{footer}</div>
        </section>
      </div>

      <footer className="auth-page-footer"><span>Waleed / Studio</span><span>Private by design</span></footer>
    </main>
  );
}