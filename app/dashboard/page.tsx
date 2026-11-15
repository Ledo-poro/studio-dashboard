"use client";

import DashboardLayout from "@/components/DashboardLayout";
import { ArrowDownRight, ArrowUpRight, CircleDollarSign, FolderKanban, UsersRound } from "lucide-react";

const metrics = [
  { label: "Revenue this month", value: "$12,840", change: "+8.2%", tone: "positive", icon: CircleDollarSign },
  { label: "Active projects", value: "08", change: "2 due soon", tone: "neutral", icon: FolderKanban },
  { label: "Active clients", value: "05", change: "Across 8 projects", tone: "neutral", icon: UsersRound },
  { label: "Monthly spend", value: "$2,190", change: "Within budget", tone: "positive", icon: ArrowDownRight },
];

const revenueBars = [36, 44, 39, 61, 52, 69, 60, 77, 65, 88, 73, 100];
const projects = [
  { name: "Northstar rebrand", client: "Northstar Studio", progress: 72, due: "Nov 22", color: "lime" },
  { name: "Fieldnotes web", client: "Fieldnotes Co.", progress: 48, due: "Nov 28", color: "coral" },
  { name: "Forma identity", client: "Forma Works", progress: 26, due: "Dec 04", color: "blue" },
];

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <div className="workspace-page">
        <div className="page-heading">
          <div><p className="page-eyebrow">SUNDAY, NOVEMBER 15</p><h1>Your studio at a glance</h1><p>Keep an eye on the work, the people, and the numbers.</p></div>
        </div>

        <section className="metric-grid" aria-label="Workspace summary">
          {metrics.map(({ label, value, change, tone, icon: Icon }) => (
            <article className="metric-card" key={label}>
              <div className="metric-card-top"><span>{label}</span><Icon size={17} strokeWidth={1.8} /></div>
              <strong>{value}</strong>
              <span className={`metric-change ${tone}`}><ArrowUpRight size={13} /> {change}</span>
            </article>
          ))}
        </section>

        <div className="dashboard-panels">
          <section className="workspace-panel revenue-panel">
            <div className="panel-heading"><div><p className="page-eyebrow">CASH FLOW</p><h2>Revenue over time</h2></div><div className="panel-total"><strong>$12,840</strong><span><ArrowUpRight size={13} /> 8.2%</span></div></div>
            <div className="overview-chart" role="img" aria-label="Illustrative monthly revenue trend from June to November">
              {revenueBars.map((height, index) => <span className={index === revenueBars.length - 1 ? "chart-column current" : "chart-column"} key={index} style={{ height: `${height}%` }} />)}
            </div>
            <div className="overview-chart-labels"><span>JUN</span><span>JUL</span><span>AUG</span><span>SEP</span><span>OCT</span><span>NOV</span></div>
          </section>

          <section className="workspace-panel projects-panel">
            <div className="panel-heading"><div><p className="page-eyebrow">IN PROGRESS</p><h2>Project pulse</h2></div><FolderKanban size={17} /></div>
            <div className="project-pulse-list">
              {projects.map((project) => (
                <div className="project-pulse" key={project.name}>
                  <div className="project-pulse-title"><span className={`project-marker ${project.color}`} /><div><strong>{project.name}</strong><small>{project.client}</small></div><time>{project.due}</time></div>
                  <div className="progress-track"><span style={{ width: `${project.progress}%` }} /></div>
                  <span className="project-progress-label">{project.progress}% complete</span>
                </div>
              ))}
            </div>
          </section>
        </div>
        <p className="sample-note">Illustrative workspace data. Connect your database to show your own records.</p>
      </div>
    </DashboardLayout>
  );
}
