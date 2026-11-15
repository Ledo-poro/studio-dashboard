"use client";

import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { ArrowDownToLine, ArrowUpRight, Search } from "lucide-react";

export default function RevenuePage() {
  const [query, setQuery] = useState("");
  const revenues = [
    { source: "Brand system · milestone 02", client: "Northstar Studio", amount: "$5,500.00", date: "Nov 14, 2026" },
    { source: "Product site · final payment", client: "Fieldnotes Co.", amount: "$3,800.00", date: "Nov 08, 2026" },
    { source: "Technical advisory", client: "Forma Works", amount: "$3,540.00", date: "Nov 03, 2026" },
  ];
  const filteredRevenues = revenues.filter((item) => `${item.source} ${item.client}`.toLowerCase().includes(query.toLowerCase()));

  return (
    <DashboardLayout>
      <div className="workspace-page">
        <div className="page-heading"><div><p className="page-eyebrow">MONEY IN</p><h1>Revenue</h1><p>Understand what has landed and what is still on its way.</p></div></div>
        <section className="finance-summary" aria-label="Revenue summary">
          <div className="finance-summary-main"><span className="page-eyebrow">RECEIVED THIS MONTH</span><strong>$12,840</strong><span className="finance-trend"><ArrowUpRight size={14} /> 8.2% from last month</span></div>
          <div className="finance-summary-stat"><span>Awaiting payment</span><strong>$4,640</strong><small>2 open invoices</small></div>
          <div className="finance-summary-stat"><span>Year to date</span><strong>$86,240</strong><small>Across 19 payments</small></div>
        </section>
        <div className="records-toolbar">
          <label className="search-control"><Search size={16} /><input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search payments or clients" aria-label="Search payments or clients" /></label>
          <span className="record-count">{filteredRevenues.length} payments</span>
        </div>
        <section className="records-panel" aria-label="Revenue transactions">
          <div className="records-columns revenue-columns"><span>PAYMENT</span><span>CLIENT</span><span>DATE</span><span>AMOUNT</span></div>
          {filteredRevenues.map((revenue) => (
            <article className="record-row revenue-row" key={revenue.source}>
              <span className="finance-row-icon"><ArrowDownToLine size={16} /></span>
              <span className="finance-description"><strong>{revenue.source}</strong><small>Received</small></span>
              <span className="finance-client">{revenue.client}</span>
              <time className="record-date">{revenue.date}</time>
              <strong className="record-amount incoming">+{revenue.amount}</strong>
            </article>
          ))}
          {filteredRevenues.length === 0 && <p className="empty-state">No payments match that search.</p>}
        </section>
        <p className="sample-note">Illustrative revenue records. Connect your database to track your own payments.</p>
      </div>
    </DashboardLayout>
  );
}
