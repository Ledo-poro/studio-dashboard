"use client";

import DashboardLayout from "@/components/DashboardLayout";
import RecordToolbar from "@/components/records/RecordToolbar";
import RecordsPanel from "@/components/records/RecordsPanel";
import EmptyState from "@/components/records/EmptyState";
import { usePreferences } from "@/components/PreferencesProvider";
import { useRecordFilter } from "@/lib/hooks/useRecordFilter";
import type { Project } from "@/lib/types/records";
import { FolderKanban } from "lucide-react";

export default function ProjectsPage() {
  const { t } = usePreferences();
  const projects: Project[] = [];

  const { query, setQuery, filter, setFilter, filteredData: filteredProjects } = useRecordFilter({
    data: projects,
    searchFields: (project) => `${project.name} ${project.client}`,
    filterField: (project) => project.status,
    filterValue: "All statuses",
  });

  return (
    <DashboardLayout>
      <div className="workspace-page">
        <div className="page-heading">
          <div>
            <p className="page-eyebrow">{t("YOUR PIPELINE")}</p>
            <h1>{t("Projects")}</h1>
            <p>{t("Keep scope, progress, and timing in view.")}</p>
          </div>
        </div>

        <RecordToolbar
          query={query}
          onQueryChange={setQuery}
          filterValue={filter}
          onFilterChange={setFilter}
          filterOptions={[
            { value: "All statuses", label: t("All statuses") },
            { value: "Active", label: t("Active") },
            { value: "Completed", label: t("Completed") },
            { value: "On hold", label: t("On hold") },
          ]}
          recordCount={filteredProjects.length}
          recordType="projects"
          searchPlaceholder={t("Search projects or clients")}
          filterLabel={t("Filter projects by status")}
        />

        <RecordsPanel
          columns={[
            { key: "project", label: t("PROJECT") },
            { key: "status", label: t("STATUS") },
            { key: "progress", label: t("PROGRESS") },
            { key: "due", label: t("DUE DATE") },
            { key: "value", label: t("VALUE") },
          ]}
          columnClassName="project-columns"
          ariaLabel="Project list"
        >
          {filteredProjects.map((project) => (
            <article className="record-row project-row" key={project.name}>
              <div className="record-primary">
                <span className="record-icon"><FolderKanban size={17} /></span>
                <span>
                  <strong>{project.name}</strong>
                  <small>{project.client}</small>
                </span>
              </div>
              <span className={`status-label ${project.status.toLowerCase().replace(" ", "-")}`}>
                {project.status}
              </span>
              <div className="row-progress">
                <span><i style={{ width: `${project.progress}%` }} /></span>
                <small>{project.progress}%</small>
              </div>
              <time className="record-date">{project.due}</time>
              <strong className="record-amount">{project.budget}</strong>
            </article>
          ))}
          {filteredProjects.length === 0 && (
            <EmptyState message={t("No projects yet. Get started by creating your first project.")} />
          )}
        </RecordsPanel>
        <p className="sample-note">{t("Manage your projects and track progress directly from your database.")}</p>
      </div>
    </DashboardLayout>
  );
}
