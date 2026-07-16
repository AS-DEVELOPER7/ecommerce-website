"use client";

export default function ActiveFilters({ appliedFilters }) {
  if (!appliedFilters || Object.keys(appliedFilters).length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2 mb-8">
      {appliedFilters.category && appliedFilters.category !== "All" && (
        <span className="px-3 py-1 rounded-full bg-surface-base text-sm text-muted border border-border">
          {appliedFilters.category}
        </span>
      )}
      {appliedFilters.materials?.map((m) => (
        <span key={m} className="px-3 py-1 rounded-full bg-surface-base text-sm text-muted border border-border">
          {m}
        </span>
      ))}
    </div>
  );
}
