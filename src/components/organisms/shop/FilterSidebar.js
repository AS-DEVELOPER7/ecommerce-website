"use client";

import { RiCloseLine } from "react-icons/ri";
import Button from "../../atoms/Button";
import { CURRENCY } from "src/constants";

export default function FilterSidebar({
  openFilters,
  setOpenFilters,
  facets,
  filterCategory,
  setFilterCategory,
  filterMaterials,
  setFilterMaterials,
  filterSizes,
  setFilterSizes,
  filterColors,
  setFilterColors,
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
    <div className="mb-10 rounded-3xl border border-white/60 bg-glass/45 backdrop-blur-md shadow-glass p-6 sm:p-8 animate-in slide-in-from-top-4 fade-in duration-300">
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/30 text-base">
        <h3 className="font-serif text-xl font-medium text-neutral-800">Filter Products</h3>
        <button
          onClick={() => setOpenFilters(false)}
          className="text-neutral-500 hover:text-primary transition-colors p-2 rounded-xl hover:bg-white/40"
        >
          <RiCloseLine className="text-2xl" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Category */}
        <div>
          <p className="text-xs font-bold mb-3 uppercase tracking-wider text-neutral-500">
            Category
          </p>
          <div className="flex flex-wrap gap-2">
            {facets?.categories?.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilterCategory(cat)}
                className={`px-4 py-2.5 rounded-xl text-sm transition-all duration-200 cursor-pointer ${
                  filterCategory === cat
                    ? "bg-primary text-white border border-primary shadow-md shadow-primary/25 font-semibold"
                    : "bg-white/80 text-neutral-700 border border-neutral-300/70 hover:border-primary hover:text-primary hover:bg-white shadow-sm hover:shadow"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Materials */}
        <div>
          <p className="text-xs font-bold mb-3 uppercase tracking-wider text-neutral-500">
            Materials
          </p>
          <div className="flex flex-wrap gap-2">
            {facets?.materials?.map((m) => (
              <button
                key={m}
                onClick={() =>
                  toggleArrayValue(filterMaterials, m, setFilterMaterials)
                }
                className={`px-4 py-2.5 rounded-xl text-sm transition-all duration-200 cursor-pointer ${
                  filterMaterials.includes(m)
                    ? "bg-primary text-white border border-primary shadow-md shadow-primary/25 font-semibold"
                    : "bg-white/80 text-neutral-700 border border-neutral-300/70 hover:border-primary hover:text-primary hover:bg-white shadow-sm hover:shadow"
                }`}
              >
                {m}
              </button>
            ))}
          </div>
        </div>

        {/* Sizes & Colors Group */}
        <div className="flex flex-col gap-6">
          {/* Sizes */}
          {facets?.sizes?.length > 0 && (
            <div>
              <p className="text-xs font-bold mb-3 uppercase tracking-wider text-neutral-500">
                Sizes
              </p>
              <div className="flex flex-wrap gap-2">
                {facets.sizes.map((sz) => (
                  <button
                    key={sz}
                    onClick={() => toggleArrayValue(filterSizes, sz, setFilterSizes)}
                    className={`px-3.5 py-2 rounded-xl text-sm transition-all duration-200 cursor-pointer ${
                      filterSizes.includes(sz)
                        ? "bg-primary text-white border border-primary shadow-md shadow-primary/25 font-semibold"
                        : "bg-white/80 text-neutral-700 border border-neutral-300/70 hover:border-primary hover:text-primary hover:bg-white shadow-sm hover:shadow"
                    }`}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Colors */}
          {facets?.colors?.length > 0 && (
            <div>
              <p className="text-xs font-bold mb-3 uppercase tracking-wider text-neutral-500">
                Colors
              </p>
              <div className="flex flex-wrap gap-3">
                {facets.colors.map((col) => {
                  const isSelected = filterColors.includes(col.name);
                  const bgStyle = col.hex_code.startsWith("linear-gradient") || col.hex_code.startsWith("conic-gradient")
                    ? { background: col.hex_code }
                    : { backgroundColor: col.hex_code };

                  return (
                    <button
                      key={col.name}
                      title={col.name}
                      onClick={() => toggleArrayValue(filterColors, col.name, setFilterColors)}
                      style={bgStyle}
                      className={`w-8 h-8 rounded-full border transition-all duration-300 relative flex items-center justify-center cursor-pointer ${
                        isSelected 
                          ? "border-primary scale-110 shadow-lg ring-2 ring-primary/45 ring-offset-2" 
                          : "border-neutral-300 shadow-sm hover:scale-110 hover:shadow"
                      }`}
                    >
                      {isSelected && (
                        <span className={`w-2.5 h-2.5 rounded-full ${
                          col.name.toLowerCase() === "white" ? "bg-black" : "bg-white"
                        }`} />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Max Price */}
        <div>
          <p className="text-xs font-bold mb-3 uppercase tracking-wider text-neutral-500">
            Max Price
          </p>
          {(() => {
            const minPrice = facets?.minPrice || 10;
            const maxPrice = facets?.maxPrice || 10000;
            const fillPercentage = maxPrice > minPrice ? ((filterMaxPrice - minPrice) / (maxPrice - minPrice)) * 100 : 0;
            return (
              <input
                type="range"
                min={minPrice}
                max={maxPrice}
                step={5}
                value={filterMaxPrice}
                onChange={(e) => setFilterMaxPrice(Number(e.target.value))}
                className="w-full accent-primary h-2 rounded-lg appearance-none cursor-pointer"
                style={{
                  background: `linear-gradient(to right, #ee2b8c 0%, #ee2b8c ${fillPercentage}%, #e5e7eb ${fillPercentage}%, #e5e7eb 100%)`
                }}
              />
            );
          })()}
          <div className="flex justify-between mt-3">
            <span className="text-xs font-medium text-neutral-500">
              {facets?.minPrice || 10} {CURRENCY}
            </span>
            <span className="text-xs font-bold text-primary">
              {filterMaxPrice} {CURRENCY}
            </span>
          </div>
        </div>
      </div>

      <div className="mt-8 pt-6 border-t border-white/30 flex justify-end gap-4">
        <button
          onClick={clearFilters}
          className="px-5 py-2.5 text-sm font-medium text-neutral-700 rounded-xl bg-glass hover:bg-white/80 border border-white/60 shadow-sm transition duration-300"
        >
          Clear All
        </button>
        <button
          onClick={applyFilters}
          className="px-6 py-2.5 text-sm font-medium text-white rounded-xl bg-primary hover:bg-secondary shadow-md shadow-primary/20 transition duration-300"
        >
          Apply Filters
        </button>
      </div>
    </div>
  );
}
