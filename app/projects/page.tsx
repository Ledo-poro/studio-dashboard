"use client";

import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { FolderKanban, Search } from "lucide-react";

export default function ProjectsPage() {
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All statuses");
  const projects = [
    { name: "Northstar rebrand", client: "Northstar Studio", status: "Active", progress: 72, budget: "$4,500", due: "Nov 22, 2026" },
    { name: "Fieldnotes web", client: "Fieldnotes Co.", status: "Active", progress: 48, budget: "$6,200", due: "Nov 28, 2026" },
    { name: "Forma identity", client: "Forma Works", status: "Completed", progress: 100, budget: "$3,800", due: "Nov 08, 2026" },
    { name: "Cloud monitor", client: "Aperture Systems", status: "On hold", progress: 30, budget: "$5,000", due: "Dec 04, 2026" },
  ];
  const filteredProjects = projects.filter((project) => {
    const matchesQuery = `${project.name} ${project.client}`.toLowerCase().includes(query.toLowerCase());
    const matchesStatus = statusFilter === "All statuses" || project.status === statusFilter;
    return matchesQuery && matchesStatus;
  });

  return (
    <DashboardLayout>
      <div className="workspace-page">
        <div className="page-heading"><div><p className="page-eyebrow">YOUR PIPELINE</p><h1>Projects</h1><p>Keep scope, progress, and timing in view.</p></div></div>
        <div className="records-toolbar">
          <label className="search-control"><Search size={16} /><input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search projects or clients" aria-label="Search projects or clients" /></label>
          <select className="filter-select" value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)} aria-label="Filter projects by status">
            <option>All statuses</option><option>Active</option><option>Completed</option><option>On hold</option>
          </select>
          <span className="record-count">{filteredProjects.length} projects</span>
        </div>
        <section className="records-panel" aria-label="Project list">
          <div className="records-columns project-columns"><span>PROJECT</span><span>STATUS</span><span>PROGRESS</span><span>DUE DATE</span><span>VALUE</span></div>
          {filteredProjects.map((project) => (
            <article className="record-row project-row" key={project.name}>
              <div className="record-primary"><span className="record-icon"><FolderKanban size={17} /></span><span><strong>{project.name}</strong><small>{project.client}</small></span></div>
              <span className={`status-label ${project.status.toLowerCase().replace(" ", "-")}`}>{project.status}</span>
              <div className="row-progress"><span><i style={{ width: `${project.progress}%` }} /></span><small>{project.progress}%</small></div>
              <time className="record-date">{project.due}</time>
              <strong className="record-amount">{project.budget}</strong>
            </article>
          ))}
          {filteredProjects.length === 0 && <p className="empty-state">No projects match those filters.</p>}
        </section>
        <p className="sample-note">Illustrative project records. Connect your database to manage your own projects.</p>
      </div>
    </DashboardLayout>
  );
}
