"use client";

import DashboardLayout from "@/components/DashboardLayout";
import RecordToolbar from "@/components/records/RecordToolbar";
import RecordsPanel from "@/components/records/RecordsPanel";
import EmptyState from "@/components/records/EmptyState";
import { usePreferences } from "@/components/PreferencesProvider";
import { useRecordFilter } from "@/lib/hooks/useRecordFilter";
import type { Client } from "@/lib/types/records";
import { UsersRound } from "lucide-react";

export default function ClientsPage() {
  const { t } = usePreferences();
  const clients: Client[] = [];

  const { query, setQuery, filter, setFilter, filteredData: filteredClients } = useRecordFilter({
    data: clients,
    searchFields: (client) => `${client.name} ${client.email} ${client.company}`,
    filterField: (client) => client.status,
    filterValue: "All clients",
  });

  return (
    <DashboardLayout>
      <div className="workspace-page">
        <div className="page-heading">
          <div>
            <p className="page-eyebrow">{t("PEOPLE YOU WORK WITH")}</p>
            <h1>{t("Clients")}</h1>
            <p>{t("Keep relationships and account details close at hand.")}</p>
          </div>
        </div>

        <RecordToolbar
          query={query}
          onQueryChange={setQuery}
          filterValue={filter}
          onFilterChange={setFilter}
          filterOptions={[
            { value: "All clients", label: t("All clients") },
            { value: "Active", label: t("Active") },
            { value: "Inactive", label: t("Inactive") },
          ]}
          recordCount={filteredClients.length}
          recordType="clients"
          searchPlaceholder={t("Search clients or email")}
          filterLabel={t("Filter clients by status")}
        />

        <RecordsPanel
          columns={[
            { key: "client", label: t("CLIENT") },
            { key: "company", label: t("COMPANY") },
            { key: "status", label: t("STATUS") },
            { key: "value", label: t("CONTRACT VALUE") },
          ]}
          columnClassName="client-columns"
          ariaLabel="Client directory"
        >
          {filteredClients.map((client) => (
            <article className="record-row client-row" key={client.email}>
              <div className="record-primary">
                <span className="record-icon client-icon">{client.name.slice(0, 1)}</span>
                <span>
                  <strong>{client.name}</strong>
                  <small>{client.email}</small>
                </span>
              </div>
              <span className="record-company">{client.company}</span>
              <span className={`status-label ${client.status.toLowerCase()}`}>{client.status}</span>
              <strong className="record-amount">{client.value}</strong>
            </article>
          ))}
          {filteredClients.length === 0 && (
            <EmptyState message={t("No clients yet. Add your first client to get started.")} />
          )}
        </RecordsPanel>
        <p className="sample-note">{t("Keep track of your client relationships and account details.")}</p>
      </div>
    </DashboardLayout>
  );
}
