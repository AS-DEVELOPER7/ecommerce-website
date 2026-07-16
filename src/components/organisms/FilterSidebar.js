"use client";

import { RiCloseLine } from "react-icons/ri";
import Button from "../atoms/Button";
import { CURRENCY } from "src/constants";

export default function FilterSidebar({
  openFilters,
  setOpenFilters,
  facets,
  filterCategory,
  setFilterCategory,
  filterMaterials,
  setFilterMaterials,
  filterMaxPrice,
  setFilterMaxPrice,
  applyFilters,
  clearFilters,
}) {
  if (!openFilters) return null;

  const toggleArrayValue = (arr, value, setter) => {
    if (arr.includes(value)) setter(arr.filter((v) => v !== value));
    else setter([...arr, value]);
  };

  return (
    <div className="mb-8 rounded-2xl border border-border bg-surface shadow-soft p-6 animate-in slide-in-from-top-4 fade-in duration-300">
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-border text-base">
        <h3 className="font-serif text-xl font-medium">Filter Products</h3>
        <button
          onClick={() => setOpenFilters(false)}
          className="text-muted hover:text-primary transition-colors p-2"
        >
          <RiCloseLine className="text-2xl" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Category */}
        <div>
          <p className="text-sm font-semibold mb-3 uppercase tracking-wider text-muted">
            Category
          </p>
          <div className="flex flex-wrap gap-2">
            {facets?.categories?.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilterCategory(cat)}
                className={`px-4 py-2 rounded-lg text-sm transition ${
                  filterCategory === cat
                    ? "bg-primary text-white shadow-md shadow-primary/20 font-medium"
                    : "bg-surface-base text-muted hover:bg-surface-base border border-transparent hover:border-primary hover:text-primary"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Materials */}
        <div>
          <p className="text-sm font-semibold mb-3 uppercase tracking-wider text-muted">
            Materials
          </p>
          <div className="flex flex-wrap gap-2">
            {facets?.materials?.map((m) => (
              <button
                key={m}
                onClick={() =>
                  toggleArrayValue(filterMaterials, m, setFilterMaterials)
                }
                className={`px-4 py-2 rounded-lg text-sm transition ${
                  filterMaterials.includes(m)
                    ? "bg-primary text-white shadow-md shadow-primary/20 font-medium"
                    : "bg-surface-base text-muted hover:bg-surface-base border border-transparent hover:border-primary hover:text-primary"
                }`}
              >
                {m}
              </button>
            ))}
          </div>
        </div>

        {/* Max Price */}
        <div>
          <p className="text-sm font-semibold mb-3 uppercase tracking-wider text-muted">
            Max Price
          </p>
          <input
            type="range"
            min={facets?.minPrice || 10}
            max={facets?.maxPrice || 10000}
            step={5}
            value={filterMaxPrice}
            onChange={(e) => setFilterMaxPrice(Number(e.target.value))}
            className="w-full accent-primary"
          />
          <div className="flex justify-between mt-2">
            <span className="text-sm font-medium text-muted">
              {facets?.minPrice || 10} {CURRENCY}
            </span>
            <span className="text-sm font-bold text-primary">
              {filterMaxPrice} {CURRENCY}
            </span>
          </div>
        </div>
      </div>

      <div className="mt-8 pt-6 border-t border-border flex justify-end gap-4">
        <Button
          onClick={clearFilters}
          variant="outline"
          className="px-4 sm:px-6 text-sm sm:text-base rounded-lg"
        >
          Clear All
        </Button>
        <Button
          onClick={applyFilters}
          variant="primary"
          className="px-4 sm:px-8 text-sm sm:text-base rounded-lg shadow-primary/30"
        >
          Apply Filters
        </Button>
      </div>
    </div>
  );
}
