"use client";

import DashboardLayout from "@/components/DashboardLayout";
import MetricCard from "@/components/dashboard/MetricCard";
import MetricGrid from "@/components/dashboard/MetricGrid";
import { usePreferences } from "@/components/PreferencesProvider";
import type { MetricData } from "@/lib/types/ui";
import type { Project } from "@/lib/types/records";
import { ArrowDownRight, ArrowUpRight, CircleDollarSign, FolderKanban, UsersRound } from "lucide-react";

const metrics: MetricData[] = [
  { label: "Revenue this month", value: "$0", change: "0%", tone: "neutral", icon: CircleDollarSign },
  { label: "Active projects", value: "0", change: "None due", tone: "neutral", icon: FolderKanban },
  { label: "Active clients", value: "0", change: "No active clients", tone: "neutral", icon: UsersRound },
  { label: "Monthly spend", value: "$0", change: "No spend recorded", tone: "neutral", icon: ArrowDownRight },
];

const revenueBars = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
const projects: Project[] = [];

export default function DashboardPage() {
  const { t } = usePreferences();
  return (
    <DashboardLayout>
      <div className="workspace-page">
        <div className="page-heading">
          <div>
            <p className="page-eyebrow">{t("SUNDAY, NOVEMBER 15")}</p>
            <h1>{t("Your studio at a glance")}</h1>
            <p>{t("Keep an eye on the work, the people, and the numbers.")}</p>
          </div>
        </div>

        <MetricGrid>
          {metrics.map((metric) => (
            <MetricCard
              key={metric.label}
              label={t(metric.label)}
              value={metric.value}
              change={t(metric.change)}
              tone={metric.tone}
              icon={metric.icon}
            />
          ))}
        </MetricGrid>

        <div className="dashboard-panels">
          <section className="workspace-panel revenue-panel">
            <div className="panel-heading">
              <div>
                <p className="page-eyebrow">{t("CASH FLOW")}</p>
                <h2>{t("Revenue over time")}</h2>
              </div>
              <div className="panel-total">
                <strong>$12,840</strong>
                <span>
                  <ArrowUpRight size={13} /> 8.2%
                </span>
              </div>
            </div>
            <div className="overview-chart" role="img" aria-label="Illustrative monthly revenue trend from June to November">
              {revenueBars.map((height, index) => (
                <span
                  className={index === revenueBars.length - 1 ? "chart-column current" : "chart-column"}
                  key={index}
                  style={{ height: `${height}%` }}
                />
              ))}
            </div>
            <div className="overview-chart-labels">
              <span>JUN</span><span>JUL</span><span>AUG</span><span>SEP</span><span>OCT</span><span>NOV</span>
            </div>
          </section>

          <section className="workspace-panel projects-panel">
            <div className="panel-heading">
              <div>
                <p className="page-eyebrow">{t("IN PROGRESS")}</p>
                <h2>{t("Project pulse")}</h2>
              </div>
              <FolderKanban size={17} />
            </div>
            <div className="project-pulse-list">
              {projects.map((project) => (
                <div className="project-pulse" key={project.name}>
                  <div className="project-pulse-title">
                    <span className={`project-marker ${project.color}`} />
                    <div>
                      <strong>{project.name}</strong>
                      <small>{project.client}</small>
                    </div>
                    <time>{project.due}</time>
                  </div>
                  <div className="progress-track">
                    <span style={{ width: `${project.progress}%` }} />
                  </div>
                  <span className="project-progress-label">{project.progress}% complete</span>
                </div>
              ))}
            </div>
          </section>
        </div>
        <p className="sample-note">{t("Your studio is ready. Add your first project, client, or transaction to populate your dashboard.")}</p>
      </div>
    </DashboardLayout>
  );
}
