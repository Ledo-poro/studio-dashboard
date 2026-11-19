import type { ReactNode } from "react";

interface RecordsPanelProps {
  columns: Array<{ key: string; label: string }>;
  columnClassName: string;
  children: ReactNode;
  ariaLabel: string;
}

export default function RecordsPanel({
  columns,
  columnClassName,
  children,
  ariaLabel,
}: RecordsPanelProps) {
  return (
    <section className="records-panel" aria-label={ariaLabel}>
      <div className={`records-columns ${columnClassName}`}>
        {columns.map((column) => (
          <span key={column.key}>{column.label}</span>
        ))}
      </div>
      {children}
    </section>
  );
}
