import type { LucideIcon } from "lucide-react";

export interface MetricData {
  label: string;
  value: string;
  change: string;
  tone: "positive" | "negative" | "neutral";
  icon: LucideIcon;
}

export interface FilterConfig {
  key: string;
  label: string;
  value: string;
}
