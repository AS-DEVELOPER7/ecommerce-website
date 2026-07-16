"use client";

import { useEffect, useState, useMemo, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  RiFilter3Line,
  RiArrowLeftSLine,
  RiArrowRightSLine,
} from "react-icons/ri";

import SearchBar from "src/components/molecules/shop/SearchBar";
import FilterSidebar from "src/components/organisms/shop/FilterSidebar";
import ProductGrid from "src/components/organisms/shop/ProductGrid";
import Pagination from "src/components/molecules/shop/Pagination";
import ActiveFilters from "src/components/molecules/shop/ActiveFilters";
import Button from "src/components/atoms/Button";
import {
  useLazyGetFacetsQuery,
  useLazySearchProductsQuery,
} from "src/services/api/productsApi";

export default function ShopPage() {
  const { selectedCategory } = useSelector((s) => s.general) || {};

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(12);
  const [openFilters, setOpenFilters] = useState(false);
  const [sortOrder, setSortOrder] = useState("default");

  // Local filter state (inside modal)
  const [filterCategory, setFilterCategory] = useState(
    selectedCategory || "All",
  );
  const [filterMaterials, setFilterMaterials] = useState([]);
  const [filterStyles, setFilterStyles] = useState([]);
  const [filterSizes, setFilterSizes] = useState([]);
  const [filterColors, setFilterColors] = useState([]);
  const [filterMaxPrice, setFilterMaxPrice] = useState(10000);

  // Applied filters for API
  const [appliedFilters, setAppliedFilters] = useState({
    category: selectedCategory || "All",
    materials: [],
    styles: [],
    sizes: [],
    colors: [],
    maxPrice: 10000,
  });

  const [getFacets, { data: facets }] = useLazyGetFacetsQuery();

  useEffect(() => {
    getFacets();
  }, [getFacets]);

  useEffect(() => {
    if (facets?.maxPrice && !appliedFilters.maxPrice) {
      setFilterMaxPrice(facets.maxPrice);
    }
  }, [facets, appliedFilters.maxPrice]);

  const queryParams = useMemo(() => {
    const params = { page, limit: pageSize };
    if (appliedFilters.category && appliedFilters.category !== "All")
      params.category = appliedFilters.category;
    if (appliedFilters.materials?.length > 0)
      params.materials = JSON.stringify(appliedFilters.materials);
    if (appliedFilters.styles?.length > 0)
      params.styles = JSON.stringify(appliedFilters.styles);
    if (appliedFilters.sizes?.length > 0)
      params.sizes = JSON.stringify(appliedFilters.sizes);
    if (appliedFilters.colors?.length > 0)
      params.colors = JSON.stringify(appliedFilters.colors);
    if (appliedFilters.maxPrice && appliedFilters.maxPrice < 10000)
      params.maxPrice = appliedFilters.maxPrice;
    if (search.trim()) params.search = search.trim();
    if (sortOrder !== "default") params.sort = sortOrder;
    return params;
  }, [appliedFilters, page, pageSize, search, sortOrder]);

  const [searchProducts, { data, isLoading, isFetching }] =
    useLazySearchProductsQuery();

  useEffect(() => {
    searchProducts(queryParams);
  }, [queryParams, searchProducts]);

  const productsData = data || { data: [], pagination: {} };

  const totalPages = Math.max(
    1,
    Math.ceil((productsData?.pagination?.total || 0) / pageSize),
  );
  const applyFilters = () => {
    setAppliedFilters({
      category: filterCategory,
      materials: filterMaterials,
      styles: filterStyles,
      sizes: filterSizes,
      colors: filterColors,
      maxPrice: filterMaxPrice,
    });
    setPage(1);
    setOpenFilters(false);
  };

  const clearFilters = () => {
    setFilterCategory("All");
    setFilterMaterials([]);
    setFilterStyles([]);
    setFilterSizes([]);
    setFilterColors([]);
    setFilterMaxPrice(facets?.maxPrice || 10000);
    setAppliedFilters({
      category: "All",
      materials: [],
      styles: [],
      sizes: [],
      colors: [],
      maxPrice: facets?.maxPrice || 10000,
    });
    setPage(1);
    setOpenFilters(false);
  };

  const handleSearch = useCallback((val) => {
    setSearch(val);
    setPage(1);
  }, []);

  return (
    <main className="min-h-screen bg-bg text-base px-4 sm:px-8 py-10 sm:py-16">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl sm:text-3xl font-serif font-medium text-center mb-8">
          Shop Collections
        </h1>

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center justify-between mb-8">
          <div className="w-full sm:max-w-md">
            <SearchBar
              initialValue={search}
              onSearch={handleSearch}
              placeholder="Search by name, style, or material..."
            />
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-3 justify-between sm:justify-end w-full sm:w-auto">
            <div className="flex items-center gap-2">
              <label htmlFor="sort" className="text-xs text-neutral-500 font-semibold uppercase tracking-wider">
                Sort:
              </label>
              <select
                id="sort"
                className="rounded-xl border border-neutral-300 w-full sm:w-auto bg-white shadow-sm py-2 px-4 text-sm text-neutral-800 focus:ring-2 focus:ring-primary focus:outline-none hover:border-neutral-400 transition duration-300 cursor-pointer"
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
              >
                <option value="default">Default</option>
                <option value="lowToHigh">Price: Low → High</option>
                <option value="highToLow">Price: High → Low</option>
              </select>
            </div>

            <button
              onClick={() => setOpenFilters((v) => !v)}
              className="flex items-center gap-2 px-5 py-2 text-sm font-semibold text-neutral-800 rounded-xl border border-neutral-300 bg-white hover:border-primary hover:text-primary transition duration-300 relative shadow-sm hover:shadow"
            >
              <RiFilter3Line className="text-xl" /> Filters
              {(appliedFilters.category && appliedFilters.category !== "All") ||
              appliedFilters.materials?.length ||
              appliedFilters.styles?.length ||
              appliedFilters.sizes?.length ||
              appliedFilters.colors?.length ? (
                <span className="w-2.5 h-2.5 rounded-full bg-primary border border-white shadow-sm absolute -top-1 -right-1" />
              ) : null}
            </button>
          </div>
        </div>

        <FilterSidebar
          openFilters={openFilters}
          setOpenFilters={setOpenFilters}
          facets={facets}
          filterCategory={filterCategory}
          setFilterCategory={setFilterCategory}
          filterMaterials={filterMaterials}
          setFilterMaterials={setFilterMaterials}
          filterStyles={filterStyles}
          setFilterStyles={setFilterStyles}
          filterSizes={filterSizes}
          setFilterSizes={setFilterSizes}
          filterColors={filterColors}
          setFilterColors={setFilterColors}
          filterMaxPrice={filterMaxPrice}
          setFilterMaxPrice={setFilterMaxPrice}
          applyFilters={applyFilters}
          clearFilters={clearFilters}
        />

        <ActiveFilters appliedFilters={appliedFilters} />

        <ProductGrid
          isLoading={isLoading || isFetching}
          products={productsData?.data}
        />

        {/* PAGINATION */}
        <Pagination
          page={page}
          totalPages={totalPages}
          setPage={(p) => {
            setPage(p);
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        />
      </div>
    </main>
  );
}
