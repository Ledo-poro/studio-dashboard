"use client";

import DashboardLayout from "@/components/DashboardLayout";
import RecordToolbar from "@/components/records/RecordToolbar";
import RecordsPanel from "@/components/records/RecordsPanel";
import EmptyState from "@/components/records/EmptyState";
import { usePreferences } from "@/components/PreferencesProvider";
import { useRecordFilter } from "@/lib/hooks/useRecordFilter";
import type { Spend } from "@/lib/types/records";
import { ReceiptText } from "lucide-react";

export default function SpendsPage() {
  const { t } = usePreferences();
  const spends: Spend[] = [];

  const { query, setQuery, filter, setFilter, filteredData: filteredSpends } = useRecordFilter({
    data: spends,
    searchFields: (spend) => `${spend.title} ${spend.category}`,
    filterField: (spend) => spend.category,
    filterValue: "All categories",
  });

  return (
    <DashboardLayout>
      <div className="workspace-page">
        <div className="page-heading">
          <div>
            <p className="page-eyebrow">{t("MONEY OUT")}</p>
            <h1>{t("Spending")}</h1>
            <p>{t("See where your operating costs are going.")}</p>
          </div>
        </div>

        <section className="finance-summary spend-summary" aria-label={t("Spending summary")}>
          <div className="finance-summary-main">
            <span className="page-eyebrow">{t("SPENT THIS MONTH")}</span>
            <strong>$0</strong>
            <span className="finance-trend spend-trend">{t("No expenses recorded")}</span>
          </div>
          <div className="finance-summary-stat">
            <span>{t("Largest category")}</span>
            <strong>{t("None")}</strong>
            <small>{t("$0 this month")}</small>
          </div>
          <div className="finance-summary-stat">
            <span>{t("Monthly budget")}</span>
            <strong>$2,500</strong>
            <small>{t("$2,500 remaining")}</small>
          </div>
        </section>

        <RecordToolbar
          query={query}
          onQueryChange={setQuery}
          filterValue={filter}
          onFilterChange={setFilter}
          filterOptions={[
            { value: "All categories", label: t("All categories") },
            { value: "Hosting", label: t("Hosting") },
            { value: "Software", label: t("Software") },
            { value: "Subscriptions", label: t("Subscriptions") },
          ]}
          recordCount={filteredSpends.length}
          recordType="expenses"
          searchPlaceholder={t("Search expenses")}
          filterLabel={t("Filter expenses by category")}
        />

        <RecordsPanel
          columns={[
            { key: "expense", label: t("EXPENSE") },
            { key: "category", label: t("CATEGORY") },
            { key: "date", label: t("DATE") },
            { key: "amount", label: t("AMOUNT") },
          ]}
          columnClassName="spend-columns"
          ariaLabel="Expense ledger"
        >
          {filteredSpends.map((spend) => (
            <article className="record-row spend-row" key={spend.title}>
              <span className="finance-row-icon spend-icon"><ReceiptText size={16} /></span>
              <span className="finance-description">
                <strong>{spend.title}</strong>
                <small>{t("Business expense")}</small>
              </span>
              <span className="finance-client">{spend.category}</span>
              <time className="record-date">{spend.date}</time>
              <strong className="record-amount outgoing">-{spend.amount}</strong>
            </article>
          ))}
          {filteredSpends.length === 0 && (
            <EmptyState message={t("No expenses yet. Record your first operating cost.")} />
          )}
        </RecordsPanel>
        <p className="sample-note">{t("Monitor operational costs and business expenses.")}</p>
      </div>
    </DashboardLayout>
  );
}
