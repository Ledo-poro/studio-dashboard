"use client";

import DashboardLayout from "@/components/DashboardLayout";
import RecordToolbar from "@/components/records/RecordToolbar";
import RecordsPanel from "@/components/records/RecordsPanel";
import EmptyState from "@/components/records/EmptyState";
import { usePreferences } from "@/components/PreferencesProvider";
import { useRecordFilter } from "@/lib/hooks/useRecordFilter";
import type { Revenue } from "@/lib/types/records";
import { ArrowDownToLine, ArrowUpRight } from "lucide-react";

export default function RevenuePage() {
  const { t } = usePreferences();
  const revenues: Revenue[] = [];

  const { query, setQuery, filteredData: filteredRevenues } = useRecordFilter({
    data: revenues,
    searchFields: (item) => `${item.source} ${item.client}`,
  });

  return (
    <DashboardLayout>
      <div className="workspace-page">
        <div className="page-heading"><div><p className="page-eyebrow">{t("MONEY IN")}</p><h1>{t("Revenue")}</h1><p>{t("Understand what has landed and what is still on its way.")}</p></div></div>
        <section className="finance-summary" aria-label={t("Revenue summary")}>
          <div className="finance-summary-main"><span className="page-eyebrow">{t("RECEIVED THIS MONTH")}</span><strong>$0</strong><span className="finance-trend">{t("No revenue recorded")}</span></div>
          <div className="finance-summary-stat"><span>{t("Awaiting payment")}</span><strong>$0</strong><small>{t("0 open invoices")}</small></div>
          <div className="finance-summary-stat"><span>{t("Year to date")}</span><strong>$0</strong><small>{t("0 payments")}</small></div>
        </section>
        <RecordToolbar
          query={query}
          onQueryChange={setQuery}
          recordCount={filteredRevenues.length}
          recordType="payments"
          searchPlaceholder={t("Search payments or clients")}
        />

        <RecordsPanel
          columns={[
            { key: "payment", label: t("PAYMENT") },
            { key: "client", label: t("CLIENT") },
            { key: "date", label: t("DATE") },
            { key: "amount", label: t("AMOUNT") },
          ]}
          columnClassName="revenue-columns"
          ariaLabel="Revenue transactions"
        >
          {filteredRevenues.map((revenue) => (
            <article className="record-row revenue-row" key={revenue.source}>
              <span className="finance-row-icon"><ArrowDownToLine size={16} /></span>
              <span className="finance-description">
                <strong>{revenue.source}</strong>
                <small>{t("Received")}</small>
              </span>
              <span className="finance-client">{revenue.client}</span>
              <time className="record-date">{revenue.date}</time>
              <strong className="record-amount incoming">+{revenue.amount}</strong>
            </article>
          ))}
          {filteredRevenues.length === 0 && (
            <EmptyState message={t("No revenue records yet. Add your first payment.")} />
          )}
        </RecordsPanel>
        <p className="sample-note">{t("Track incoming payments and monitor cash flow.")}</p>
      </div>
    </DashboardLayout>
  );
}
