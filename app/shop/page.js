"use client";

import { useEffect, useState, useMemo, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  RiFilter3Line,
  RiArrowLeftSLine,
  RiArrowRightSLine,
} from "react-icons/ri";

import SearchBar from "src/components/molecules/SearchBar";
import FilterSidebar from "src/components/organisms/FilterSidebar";
import ProductGrid from "src/components/organisms/ProductGrid";
import Pagination from "src/components/molecules/Pagination";
import ActiveFilters from "src/components/molecules/ActiveFilters";
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
  const [filterMaxPrice, setFilterMaxPrice] = useState(10000);

  // Applied filters for API
  const [appliedFilters, setAppliedFilters] = useState({
    category: selectedCategory || "All",
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
      maxPrice: filterMaxPrice,
    });
    setPage(1);
    setOpenFilters(false);
  };

  const clearFilters = () => {
    setFilterCategory("All");
    setFilterMaterials([]);
    setFilterStyles([]);
    setFilterMaxPrice(facets?.maxPrice || 10000);
    setAppliedFilters({ category: "All" });
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
            <div className="flex items-center gap-2 ">
              <label htmlFor="sort" className="text-sm text-muted">
                Sort:
              </label>
              <select
                id="sort"
                className="rounded-md border border-border w-full sm:w-auto bg-surface py-2 px-3 text-sm focus:ring-2 focus:ring-primary"
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
              >
                <option value="default">Default</option>
                <option value="lowToHigh">Price: Low → High</option>
                <option value="highToLow">Price: High → Low</option>
              </select>
            </div>

            <Button
              onClick={() => setOpenFilters((v) => !v)}
              variant="outline"
              className="gap-2"
            >
              <RiFilter3Line className="text-xl " /> Filters
              {(appliedFilters.category && appliedFilters.category !== "All") ||
              appliedFilters.materials?.length ||
              appliedFilters.styles?.length ? (
                <span className="w-2 h-2 rounded-full bg-primary absolute top-2 right-2 sm:relative sm:top-0 sm:right-0" />
              ) : null}
            </Button>
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
