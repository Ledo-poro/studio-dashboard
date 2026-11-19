import type { ReactNode } from "react";

interface MetricGridProps {
  children: ReactNode;
}

export default function MetricGrid({ children }: MetricGridProps) {
  return (
    <section className="metric-grid" aria-label="Workspace summary">
      {children}
    </section>
  );
}
