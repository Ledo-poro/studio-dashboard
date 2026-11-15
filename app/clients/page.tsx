"use client";

import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Search, UsersRound } from "lucide-react";

export default function ClientsPage() {
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All clients");
  const clients = [
    { name: "Northstar Studio", email: "hello@northstar.studio", company: "Northstar", value: "$12,500", status: "Active" },
    { name: "Fieldnotes Co.", email: "team@fieldnotes.co", company: "Fieldnotes", value: "$8,900", status: "Active" },
    { name: "Forma Works", email: "studio@formaworks.com", company: "Forma", value: "$15,200", status: "Active" },
    { name: "Aperture Systems", email: "ops@aperture.io", company: "Aperture", value: "$5,400", status: "Inactive" },
  ];
  const filteredClients = clients.filter((client) => {
    const matchesQuery = `${client.name} ${client.email} ${client.company}`.toLowerCase().includes(query.toLowerCase());
    const matchesStatus = statusFilter === "All clients" || client.status === statusFilter;
    return matchesQuery && matchesStatus;
  });

  return (
    <DashboardLayout>
      <div className="workspace-page">
        <div className="page-heading"><div><p className="page-eyebrow">PEOPLE YOU WORK WITH</p><h1>Clients</h1><p>Keep relationships and account details close at hand.</p></div></div>
        <div className="records-toolbar">
          <label className="search-control"><Search size={16} /><input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search clients or email" aria-label="Search clients or email" /></label>
          <select className="filter-select" value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)} aria-label="Filter clients by status">
            <option>All clients</option><option>Active</option><option>Inactive</option>
          </select>
          <span className="record-count">{filteredClients.length} clients</span>
        </div>
        <section className="records-panel" aria-label="Client directory">
          <div className="records-columns client-columns"><span>CLIENT</span><span>COMPANY</span><span>STATUS</span><span>CONTRACT VALUE</span></div>
          {filteredClients.map((client) => (
            <article className="record-row client-row" key={client.email}>
              <div className="record-primary"><span className="record-icon client-icon">{client.name.slice(0, 1)}</span><span><strong>{client.name}</strong><small>{client.email}</small></span></div>
              <span className="record-company">{client.company}</span>
              <span className={`status-label ${client.status.toLowerCase()}`}>{client.status}</span>
              <strong className="record-amount">{client.value}</strong>
            </article>
          ))}
          {filteredClients.length === 0 && <p className="empty-state">No clients match those filters.</p>}
        </section>
        <p className="sample-note">Illustrative client records. Connect your database to manage your own contacts.</p>
      </div>
    </DashboardLayout>
  );
}
