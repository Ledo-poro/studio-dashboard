import { useState, useMemo } from "react";

interface UseRecordFilterOptions<T> {
  data: T[];
  searchFields: (item: T) => string;
  filterField?: (item: T) => string;
  filterValue?: string;
}

export function useRecordFilter<T>({
  data,
  searchFields,
  filterField,
  filterValue,
}: UseRecordFilterOptions<T>) {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState(filterValue || "");

  const filteredData = useMemo(() => {
    return data.filter((item) => {
      const matchesQuery = searchFields(item).toLowerCase().includes(query.toLowerCase());
      const matchesFilter = !filterField || !filter || filter === filterValue || filterField(item) === filter;
      return matchesQuery && matchesFilter;
    });
  }, [data, query, filter, searchFields, filterField, filterValue]);

  return {
    query,
    setQuery,
    filter,
    setFilter,
    filteredData,
  };
}
