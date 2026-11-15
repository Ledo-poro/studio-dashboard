"use client";

import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { ReceiptText, Search } from "lucide-react";

export default function SpendsPage() {
  const [query, setQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All categories");
  const spends = [
    { title: "Cloud infrastructure", category: "Hosting", amount: "$420.00", date: "Nov 12, 2026" },
    { title: "Development tools", category: "Software", amount: "$45.00", date: "Nov 10, 2026" },
    { title: "Deployment plan", category: "Hosting", amount: "$40.00", date: "Nov 01, 2026" },
    { title: "Workspace and domain", category: "Subscriptions", amount: "$24.00", date: "Nov 01, 2026" },
    { title: "AI service credits", category: "Software", amount: "$150.00", date: "Oct 28, 2026" },
  ];
  const filteredSpends = spends.filter((spend) => {
    const matchesQuery = `${spend.title} ${spend.category}`.toLowerCase().includes(query.toLowerCase());
    const matchesCategory = categoryFilter === "All categories" || spend.category === categoryFilter;
    return matchesQuery && matchesCategory;
  });

  return (
    <DashboardLayout>
      <div className="workspace-page">
        <div className="page-heading"><div><p className="page-eyebrow">MONEY OUT</p><h1>Spending</h1><p>See where your operating costs are going.</p></div></div>
        <section className="finance-summary spend-summary" aria-label="Spending summary">
          <div className="finance-summary-main"><span className="page-eyebrow">SPENT THIS MONTH</span><strong>$679</strong><span className="finance-trend spend-trend">Across 4 categories</span></div>
          <div className="finance-summary-stat"><span>Largest category</span><strong>Hosting</strong><small>$460 this month</small></div>
          <div className="finance-summary-stat"><span>Monthly budget</span><strong>$2,500</strong><small>$1,821 remaining</small></div>
        </section>
        <div className="records-toolbar">
          <label className="search-control"><Search size={16} /><input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search expenses" aria-label="Search expenses" /></label>
          <select className="filter-select" value={categoryFilter} onChange={(event) => setCategoryFilter(event.target.value)} aria-label="Filter expenses by category">
            <option>All categories</option><option>Hosting</option><option>Software</option><option>Subscriptions</option>
          </select>
          <span className="record-count">{filteredSpends.length} expenses</span>
        </div>
        <section className="records-panel" aria-label="Expense ledger">
          <div className="records-columns spend-columns"><span>EXPENSE</span><span>CATEGORY</span><span>DATE</span><span>AMOUNT</span></div>
          {filteredSpends.map((spend) => (
            <article className="record-row spend-row" key={spend.title}>
              <span className="finance-row-icon spend-icon"><ReceiptText size={16} /></span>
              <span className="finance-description"><strong>{spend.title}</strong><small>Business expense</small></span>
              <span className="finance-client">{spend.category}</span>
              <time className="record-date">{spend.date}</time>
              <strong className="record-amount outgoing">-{spend.amount}</strong>
            </article>
          ))}
          {filteredSpends.length === 0 && <p className="empty-state">No expenses match those filters.</p>}
        </section>
        <p className="sample-note">Illustrative expense records. Connect your database to track your own spending.</p>
      </div>
    </DashboardLayout>
  );
}
