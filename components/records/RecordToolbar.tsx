import { Search } from "lucide-react";

interface RecordToolbarProps {
  query: string;
  onQueryChange: (query: string) => void;
  filterValue?: string;
  onFilterChange?: (filter: string) => void;
  filterOptions?: Array<{ value: string; label: string }>;
  recordCount: number;
  recordType: string;
  searchPlaceholder: string;
  filterLabel?: string;
}

export default function RecordToolbar({
  query,
  onQueryChange,
  filterValue,
  onFilterChange,
  filterOptions,
  recordCount,
  recordType,
  searchPlaceholder,
  filterLabel,
}: RecordToolbarProps) {
  return (
    <div className="records-toolbar">
      <label className="search-control">
        <Search size={16} />
        <input
          type="search"
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          placeholder={searchPlaceholder}
          aria-label={searchPlaceholder}
        />
      </label>
      {filterOptions && onFilterChange && (
        <select
          className="filter-select"
          value={filterValue}
          onChange={(e) => onFilterChange(e.target.value)}
          aria-label={filterLabel}
        >
          {filterOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      )}
      <span className="record-count">
        {recordCount} {recordType}
      </span>
    </div>
  );
}
