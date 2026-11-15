"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "@/lib/auth-client";
import { ArrowDownRight, ArrowRight, ArrowUpRight, CircleDollarSign, FolderKanban, Sparkles } from "lucide-react";
import Link from "next/link";

const chartHeights = [34, 48, 41, 58, 52, 69, 61, 76, 67, 88, 73, 100];

export default function Home() {
  const router = useRouter();
  const { data: session, isPending } = useSession();

  useEffect(() => {
    if (!isPending) {
      if (session) {
        router.push("/dashboard");
      }
    }
  }, [session, isPending, router]);

  return (
    <main className="studio-home">
      <header className="studio-header">
        <Link className="studio-brand" href="/" aria-label="Waleed Studio home">
          <span className="studio-brand-mark"><Sparkles size={17} strokeWidth={2.2} /></span>
          <span>Waleed <span className="studio-brand-muted">/ Studio</span></span>
        </Link>
        <nav className="studio-nav" aria-label="Main navigation">
          <a href="#workspace">Workspace</a>
          <a href="#workflow">Workflow</a>
        </nav>
        <div className="studio-header-actions">
          <Link className="studio-signin" href="/auth/signin">Sign in</Link>
          <Link className="studio-header-cta" href="/auth/signup">
            Get started <ArrowUpRight size={15} />
          </Link>
        </div>
      </header>

      <section className="studio-hero" id="workspace">
        <div className="studio-copy">
          <p className="studio-eyebrow"><span /> A calmer way to run your studio</p>
          <h1>Your independent work, <span>in focus.</span></h1>
          <p className="studio-intro">
            One considered workspace for projects, clients, and cash flow. See what needs attention and keep the good work moving.
          </p>
          <div className="studio-hero-actions">
            <Link className="studio-primary-cta" href="/auth/signup">
              Create your workspace <ArrowRight size={17} />
            </Link>
            <Link className="studio-text-link" href="/auth/signin">I already have an account</Link>
          </div>
          <div className="studio-proofline">
            <span className="proof-mark"><FolderKanban size={15} /></span>
            <span>Projects, clients, revenue, and spend. Together at last.</span>
          </div>
        </div>

        <div className="workspace-preview" aria-label="Preview of the studio dashboard">
          <div className="preview-topbar">
            <div className="preview-brand"><span className="preview-brand-dot" /> studio<span className="preview-brand-light">/overview</span><span className="preview-badge">PREVIEW</span></div>
            <div className="preview-avatar">W</div>
          </div>
          <div className="preview-content">
            <div className="preview-heading-row">
              <div>
                <p className="preview-kicker">SUNDAY, NOVEMBER 15</p>
                <h2>Good morning, Waleed</h2>
              </div>
              <span className="preview-period">This month <ArrowDownRight size={13} /></span>
            </div>

            <div className="preview-metrics">
              <div className="preview-metric">
                <span className="metric-label">Revenue</span>
                <span className="metric-value">$12,840</span>
                <span className="metric-change"><ArrowUpRight size={13} /> 8.2%</span>
              </div>
              <div className="preview-metric">
                <span className="metric-label">Active projects</span>
                <span className="metric-value">08</span>
                <span className="metric-note">Across 5 clients</span>
              </div>
              <div className="preview-metric">
                <span className="metric-label">Monthly spend</span>
                <span className="metric-value">$2,190</span>
                <span className="metric-note">Within your budget</span>
              </div>
            </div>

            <div className="preview-lower">
              <div className="preview-chart">
                <div className="preview-section-heading">
                  <div><span className="preview-kicker">CASH FLOW</span><strong>Revenue overview</strong></div>
                  <span className="chart-total">$12.8k <span>+8.2%</span></span>
                </div>
                <div className="chart-grid" aria-hidden="true">
                  {chartHeights.map((height, index) => (
                    <span className="chart-bar" key={index} style={{ height: `${height}%` }} />
                  ))}
                </div>
                <div className="chart-months"><span>JUN</span><span>JUL</span><span>AUG</span><span>SEP</span><span>OCT</span><span>NOV</span></div>
              </div>
              <div className="preview-projects">
                <div className="preview-section-heading"><div><span className="preview-kicker">IN PROGRESS</span><strong>Recent projects</strong></div><FolderKanban size={15} /></div>
                <div className="project-line"><span className="project-dot project-dot-lime" /><span>Northstar rebrand</span><small>72%</small></div>
                <div className="project-line"><span className="project-dot project-dot-coral" /><span>Fieldnotes web</span><small>48%</small></div>
                <div className="project-line"><span className="project-dot project-dot-blue" /><span>Forma identity</span><small>26%</small></div>
              </div>
            </div>
            <div className="preview-footnote"><CircleDollarSign size={14} /> Snapshot of your studio, all in one place</div>
          </div>
        </div>
      </section>

      <section className="studio-workflow" id="workflow" aria-label="Studio workflow">
        <div className="workflow-heading">
          <span className="studio-eyebrow">LESS ADMIN, MORE MOMENTUM</span>
          <p>Every moving part has its place.</p>
        </div>
        <div className="workflow-item"><span className="workflow-number">01</span><strong>Know your work</strong><span>Projects and clients, without the digging.</span></div>
        <div className="workflow-item"><span className="workflow-number">02</span><strong>Know your numbers</strong><span>Revenue and spending at a glance.</span></div>
        <div className="workflow-item"><span className="workflow-number">03</span><strong>Stay in rhythm</strong><span>A clear view of what comes next.</span></div>
      </section>

      <footer className="studio-footer"><span>Waleed / Studio</span><span>Made for independent work.</span></footer>
    </main>
  );
}
