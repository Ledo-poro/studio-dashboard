import { type LucideIcon, ArrowUpRight } from "lucide-react";

interface MetricCardProps {
  label: string;
  value: string;
  change: string;
  tone: "positive" | "negative" | "neutral";
  icon: LucideIcon;
}

export default function MetricCard({ label, value, change, tone, icon: Icon }: MetricCardProps) {
  return (
    <article className="metric-card">
      <div className="metric-card-top">
        <span>{label}</span>
        <Icon size={17} strokeWidth={1.8} />
      </div>
      <strong>{value}</strong>
      <span className={`metric-change ${tone}`}>
        <ArrowUpRight size={13} /> {change}
      </span>
    </article>
  );
}
