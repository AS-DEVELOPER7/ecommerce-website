"use client";

import { RiSearchLine } from "react-icons/ri";
import MultiselectDropdown from "src/components/atoms/MultiselectDropdown";

export default function ProductsFilterPanel({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  selectedMaterial,
  setSelectedMaterial,
  filterFeatured,
  setFilterFeatured,
  filterStock,
  setFilterStock,
  categoriesList = [],
  materialsList = [],
}) {
  const hasFilters =
    searchQuery ||
    selectedCategory ||
    selectedMaterial ||
    filterFeatured !== "all" ||
    filterStock !== "all";

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("");
    setSelectedMaterial("");
    setFilterFeatured("all");
    setFilterStock("all");
  };

  // Map values for Category & Material
  const activeCategoryOption = categoriesList.find((c) => c.name === selectedCategory);
  const selectedCategoryIds = activeCategoryOption ? [activeCategoryOption.id] : [];

  const activeMaterialOption = materialsList.find((m) => m.name === selectedMaterial);
  const selectedMaterialIds = activeMaterialOption ? [activeMaterialOption.id] : [];

  const featuredOptions = [
    { id: "all", name: "Featured: All" },
    { id: "featured", name: "Only Featured" },
    { id: "standard", name: "Standard Only" },
  ];

  const stockOptions = [
    { id: "all", name: "Stock: All" },
    { id: "instock", name: "In Stock" },
    { id: "outofstock", name: "Out of Stock" },
  ];

  return (
    <div className="flex flex-col gap-3 bg-white/80 border border-neutral-200/60 p-3.5 rounded-xl shadow-sm backdrop-blur-md relative z-20">
      <div className="flex flex-col lg:flex-row gap-3">
        {/* Search bar */}
        <div className="relative flex-1 self-center w-full">
          <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-neutral-400">
            <RiSearchLine className="text-base" />
          </span>
          <input
            type="text"
            placeholder="Search products by title or description..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-xl h-11 border border-neutral-300 bg-white pl-9 pr-3 text-xs placeholder:text-muted focus:ring-1 focus:ring-primary focus:outline-none hover:border-neutral-400 transition"
          />
        </div>

        {/* Filters grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 flex-1 lg:flex-[2]">
          {/* Category Select Filter */}
          <div>
            <MultiselectDropdown
              options={categoriesList}
              selectedValues={selectedCategoryIds}
              onChange={(val) => {
                const opt = categoriesList.find((c) => c.id === val[0]);
                setSelectedCategory(opt ? opt.name : "");
              }}
              placeholder="All Categories"
              singleSelect={true}
            />
          </div>

          {/* Material Select Filter */}
          <div>
            <MultiselectDropdown
              options={materialsList}
              selectedValues={selectedMaterialIds}
              onChange={(val) => {
                const opt = materialsList.find((m) => m.id === val[0]);
                setSelectedMaterial(opt ? opt.name : "");
              }}
              placeholder="All Materials"
              singleSelect={true}
            />
          </div>

          {/* Featured Filter */}
          <div>
            <MultiselectDropdown
              options={featuredOptions}
              selectedValues={[filterFeatured]}
              onChange={(val) => setFilterFeatured(val[0] || "all")}
              placeholder="Featured: All"
              singleSelect={true}
            />
          </div>

          {/* Stock Filter */}
          <div>
            <MultiselectDropdown
              options={stockOptions}
              selectedValues={[filterStock]}
              onChange={(val) => setFilterStock(val[0] || "all")}
              placeholder="Stock: All"
              singleSelect={true}
            />
          </div>
        </div>
      </div>

      {/* Clear Filters Button */}
      {hasFilters && (
        <div className="flex justify-end border-t border-neutral-100 pt-3">
          <button
            type="button"
            onClick={clearFilters}
            className="text-xs font-bold text-primary hover:text-primary-dark transition cursor-pointer"
          >
            Clear All Filters
          </button>
        </div>
      )}
    </div>
  );
}
