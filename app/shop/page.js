// app/shop/page.js
"use client";

import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  RiSearchLine,
  RiFilter3Line,
  RiArrowLeftSLine,
  RiArrowRightSLine,
  RiCloseLine,
} from "react-icons/ri";

import { addToCart } from "src/services/reducers/cartReducer";
import { setCategory } from "src/services/reducers/generalReducer";

import ProductCard from "src/components/molecules/ProductCard";
import { products } from "src/data";
import {
  CATEGORY_KEYS,
<<<<<<< HEAD
=======
  CATEGORY_LIST,
>>>>>>> b11839557a023584904ffae753ac1e71a1ec3a8c
  DEFAULT_PAGE_SIZE,
  PAGE_SIZE_OPTIONS,
  MATERIAL_LIST,
  STYLE_LIST,
<<<<<<< HEAD
  MAX_PRICE,
  CURRENCY,
=======
>>>>>>> b11839557a023584904ffae753ac1e71a1ec3a8c
} from "src/constants";

export default function ShopPage() {
  const dispatch = useDispatch();
  const { selectedCategory } = useSelector((s) => s.general) || {};

<<<<<<< HEAD
  const categories = Object.values(CATEGORY_KEYS);
=======
  const categories = [...CATEGORY_LIST];
>>>>>>> b11839557a023584904ffae753ac1e71a1ec3a8c

  // UI state
  const [activeCategory, setActiveCategory] = useState(
    selectedCategory || CATEGORY_KEYS.ALL
  );
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("default");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);

  // Filters (materials & styles)
  const [openFilters, setOpenFilters] = useState(false);
  const [materials, setMaterials] = useState([]); // selected materials
  const [styles, setStyles] = useState([]); // selected styles
<<<<<<< HEAD
  const [maxPrice, setMaxPrice] = useState(MAX_PRICE);
=======
  const [maxPrice, setMaxPrice] = useState(9999);
>>>>>>> b11839557a023584904ffae753ac1e71a1ec3a8c

  // Derived facets (could be from constants, but here we compute what's present)
  const availableMaterials = useMemo(() => {
    const set = new Set();
    products.forEach((p) => p.materials?.forEach((m) => set.add(m)));
    // keep only those that are in our MATERIAL_LIST (safety)
    return MATERIAL_LIST.filter((m) => set.has(m));
  }, []);

  const availableStyles = useMemo(() => {
    const set = new Set();
    products.forEach((p) => p.styles?.forEach((st) => set.add(st)));
    return STYLE_LIST.filter((st) => set.has(st));
  }, []);

  // Filtering & sorting
  const filteredProducts = useMemo(() => {
    let list = [...products];

    // Category
    if (activeCategory && activeCategory !== CATEGORY_KEYS.ALL) {
      list = list.filter((p) => p.category === activeCategory);
    }

    // Search
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter((p) => p.name.toLowerCase().includes(q));
    }

    // Materials
    if (materials.length > 0) {
      list = list.filter((p) =>
        p.materials?.some((m) => materials.includes(m))
      );
    }

    // Styles
    if (styles.length > 0) {
      list = list.filter((p) => p.styles?.some((st) => styles.includes(st)));
    }

    // Price
    list = list.filter((p) => (p.price ?? 0) <= maxPrice);

    // Sorting
    if (sortOrder === "lowToHigh") list.sort((a, b) => a.price - b.price);
    else if (sortOrder === "highToLow") list.sort((a, b) => b.price - a.price);

    return list;
  }, [activeCategory, search, materials, styles, maxPrice, sortOrder]);

  // Reset to page 1 on filter changes
  useEffect(() => {
    setPage(1);
  }, [
    activeCategory,
    search,
    materials,
    styles,
    maxPrice,
    sortOrder,
    pageSize,
  ]);

  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / pageSize));
  const currentPageItems = filteredProducts.slice(
    (page - 1) * pageSize,
    (page - 1) * pageSize + pageSize
  );

  const toggleArrayValue = (arr, value, setter) => {
    if (arr.includes(value)) setter(arr.filter((v) => v !== value));
    else setter([...arr, value]);
  };

  const clearAllFilters = () => {
    setMaterials([]);
    setStyles([]);
<<<<<<< HEAD
    setMaxPrice(MAX_PRICE);
=======
    setMaxPrice(9999);
>>>>>>> b11839557a023584904ffae753ac1e71a1ec3a8c
    setSearch("");
    setSortOrder("default");
    setOpenFilters(false);
    setActiveCategory(CATEGORY_KEYS.ALL);
    dispatch(setCategory(CATEGORY_KEYS.ALL));
  };

  return (
    <main className="min-h-screen bg-bg text-base px-4 sm:px-8 py-12">
      <h1 className="text-4xl font-serif font-bold text-center mb-8">
        Shop All Collections
      </h1>

      {/* SEARCH + SORT + PAGE SIZE + OPEN FILTERS */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-6">
        {/* Search */}
        <div className="relative w-full sm:w-[40%]">
          <RiSearchLine className="absolute left-3 top-3 text-muted text-lg" />
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-border bg-surface text-base focus:ring-2 focus:ring-primary focus:outline-none"
          />
        </div>

<<<<<<< HEAD
        {/* Sort  + Filter Toggle */}
=======
        {/* Sort + Page Size + Filter Toggle */}
>>>>>>> b11839557a023584904ffae753ac1e71a1ec3a8c
        <div className="flex items-center gap-3 justify-between sm:justify-end">
          <div className="flex items-center gap-2">
            <label htmlFor="sort" className="text-sm text-muted">
              Sort:
            </label>
            <select
              id="sort"
              className="rounded-md border border-border bg-surface py-2 px-3 text-sm focus:ring-2 focus:ring-primary"
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
            className="inline-flex items-center gap-2 px-3 py-2 rounded-md border border-border bg-surface hover:bg-surface-base"
          >
            <RiFilter3Line /> Filters
          </button>
        </div>
      </div>

      {/* CATEGORY CHIPS */}
      <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-6">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => {
              setActiveCategory(cat);
              dispatch(setCategory(cat));
            }}
            className={`px-3 sm:px-4 py-2 rounded-full border text-sm font-semibold transition ${
              activeCategory === cat
                ? "bg-primary text-white border-primary"
                : "border-border text-muted hover:border-primary hover:text-primary"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* FILTER DRAWER (simple, responsive) */}
      {openFilters && (
        <div className="mb-8 rounded-xl border border-border shadow-md p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold">Filter Products</h3>
            <button
              onClick={() => setOpenFilters(false)}
              className="text-muted hover:text-primary"
            >
              <RiCloseLine className="text-xl" />
            </button>
          </div>

          <div className="flex flex-col gap-4">
            {/* Materials */}
            <div>
              <p className="text-sm font-semibold mb-2">Materials</p>
              <div className="flex flex-wrap gap-2">
                {availableMaterials.map((m) => (
                  <button
                    key={m}
                    onClick={() => toggleArrayValue(materials, m, setMaterials)}
                    className={`px-3 py-1 rounded-full text-sm border transition ${
                      materials.includes(m)
                        ? "bg-primary text-white border-primary"
                        : "border-border text-muted hover:border-primary hover:text-primary"
                    }`}
                  >
                    {m}
                  </button>
                ))}
              </div>
            </div>

            {/* Styles */}
            <div>
              <p className="text-sm font-semibold mb-2">Styles</p>
              <div className="flex flex-wrap gap-2">
                {availableStyles.map((st) => (
                  <button
                    key={st}
                    onClick={() => toggleArrayValue(styles, st, setStyles)}
                    className={`px-3 py-1 rounded-full text-sm border transition ${
                      styles.includes(st)
                        ? "bg-primary text-white border-primary"
                        : "border-border text-muted hover:border-primary hover:text-primary"
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

            {/* Max Price */}
            <div>
              <p className="text-sm font-semibold mb-2">Max Price</p>
              <div className="flex items-center gap-3">
                <input
                  type="range"
                  min={10}
<<<<<<< HEAD
                  max={MAX_PRICE}
                  step={5}
                  value={Math.min(maxPrice, MAX_PRICE)}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full"
                />
                <span className="text-sm text-muted">
                  {maxPrice} {CURRENCY}
                </span>
=======
                  max={1000}
                  step={5}
                  value={Math.min(maxPrice, 1000)}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full"
                />
                <span className="text-sm text-muted">${maxPrice}</span>
>>>>>>> b11839557a023584904ffae753ac1e71a1ec3a8c
              </div>
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between">
            <button
              onClick={clearAllFilters}
              className="text-sm px-3 py-2 rounded-md border border-border hover:border-primary hover:text-primary"
            >
              Clear all
            </button>
            {/* <button
              onClick={() => setOpenFilters(false)}
              className="px-4 py-2 rounded-md bg-primary text-white font-semibold"
            >
              Apply
            </button> */}
          </div>
        </div>
      )}

      {/* PRODUCT GRID */}
      <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center">
        {currentPageItems.length > 0 ? (
          currentPageItems.map((p) => (
            <ProductCard
              key={p.id}
              id={p.id}
              slug={p.slug}
              name={p.name}
              image={p.images?.[0]} // pick first image
              price={p.price}
              soldOut={p.soldOut}
              onAddToCart={() => dispatch(addToCart(p))}
            />
          ))
        ) : (
          <p className="text-center mt-[10vh] text-muted col-span-full">
            No products found.
          </p>
        )}
      </div>

      {/* PAGINATION */}
      {filteredProducts.length > 0 && (
        <div className="mt-10 flex items-center justify-center gap-2">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            className="px-3 py-2 rounded-md border border-border bg-surface hover:bg-surface-base disabled:opacity-50"
            disabled={page === 1}
          >
            <RiArrowLeftSLine className="text-lg" />
          </button>
          {Array.from({ length: totalPages }).map((_, i) => {
            const pg = i + 1;
            if (pg === 1 || pg === totalPages || Math.abs(pg - page) <= 1) {
              return (
                <button
                  key={pg}
                  onClick={() => setPage(pg)}
                  className={`px-3 py-2 rounded-md border text-sm ${
                    pg === page
                      ? "bg-primary text-white border-primary"
                      : "border-border bg-surface hover:bg-surface-base text-muted"
                  }`}
                >
                  {pg}
                </button>
              );
            }
            if (
              (pg === page - 2 && pg > 1) ||
              (pg === page + 2 && pg < totalPages)
            ) {
              return (
                <span key={`dots-${pg}`} className="px-2">
                  …
                </span>
              );
            }
            return null;
          })}
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            className="px-3 py-2 rounded-md border border-border bg-surface hover:bg-surface-base disabled:opacity-50"
            disabled={page === totalPages}
          >
            <RiArrowRightSLine className="text-lg" />
          </button>{" "}
          <div className="flex items-center gap-2">
            <label htmlFor="pagesize" className="text-sm text-muted">
              Per page:
            </label>
            <select
              id="pagesize"
              className="rounded-md border w-20 border-border bg-surface py-2 px-3 text-sm focus:ring-2 focus:ring-primary"
              value={pageSize}
              onChange={(e) => setPageSize(Number(e.target.value))}
            >
              {PAGE_SIZE_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}
    </main>
  );
}
