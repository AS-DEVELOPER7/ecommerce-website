"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Button from "src/components/atoms/Button";
import { RiAddLine, RiLoader5Line } from "react-icons/ri";
import {
  useGetAllProductsQuery,
  useGetLookupsQuery,
  useUpdateProductMutation,
  useDeleteProductMutation,
} from "src/services/api/productsApi";

import ProductsFilterPanel from "src/components/organisms/admin/products/ProductsFilterPanel";
import ProductsTable from "src/components/organisms/admin/products/ProductsTable";
import ProductsPagination from "src/components/organisms/admin/products/ProductsPagination";
import ProductDeleteModal from "src/components/organisms/admin/products/ProductDeleteModal";

export default function AdminProductsList() {
  const [searchQuery, setSearchQuery] = useState("");

  // RTK Query endpoints
  const { data: rawProducts, isLoading: loadingProducts } = useGetAllProductsQuery();
  const { data: lookupsData } = useGetLookupsQuery();
  const [updateProduct] = useUpdateProductMutation();
  const [deleteProduct] = useDeleteProductMutation();

  const products = rawProducts || [];
  const categoriesList = lookupsData?.categories || [];
  const materialsList = lookupsData?.materials || [];

  // Filter selected values
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedMaterial, setSelectedMaterial] = useState("");
  const [filterFeatured, setFilterFeatured] = useState("all"); // 'all' | 'featured' | 'standard'
  const [filterStock, setFilterStock] = useState("all"); // 'all' | 'instock' | 'outofstock'

  // UI states
  const [expandedRows, setExpandedRows] = useState({}); // Toggles variant grids
  const [editingStock, setEditingStock] = useState({}); // Tracks { id: val } for inline stock inputs
  const [savingStock, setSavingStock] = useState({}); // Tracks { id: bool } for inline loaders
  const [deleteTarget, setDeleteTarget] = useState(null); // Triggers delete confirmation modal

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Handle client-side search and dropdown filtering declaratively
  const filteredProducts = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();
    let filtered = products;

    if (query) {
      filtered = filtered.filter(
        (p) =>
          p.title.toLowerCase().includes(query) ||
          p.description?.toLowerCase().includes(query),
      );
    }

    if (selectedCategory) {
      filtered = filtered.filter((p) => p.categories?.includes(selectedCategory));
    }

    if (selectedMaterial) {
      filtered = filtered.filter((p) => p.materials?.includes(selectedMaterial));
    }

    if (filterFeatured === "featured") {
      filtered = filtered.filter((p) => p.is_featured);
    } else if (filterFeatured === "standard") {
      filtered = filtered.filter((p) => !p.is_featured);
    }

    if (filterStock === "instock") {
      filtered = filtered.filter((p) => !p.sold_out);
    } else if (filterStock === "outofstock") {
      filtered = filtered.filter((p) => p.sold_out);
    }

    return filtered;
  }, [searchQuery, selectedCategory, selectedMaterial, filterFeatured, filterStock, products]);

  const toggleRow = (id) => {
    setExpandedRows((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleInlineStockSave = async (product, newStockVal, variantId = null) => {
    const targetKey = variantId || product.id;
    setSavingStock((prev) => ({ ...prev, [targetKey]: true }));

    try {
      let body = {
        id: product.id,
        title: product.title,
        slug: product.slug,
        description: product.description,
        price: product.price,
        images: product.images,
        is_featured: product.is_featured,
        sold_out: product.sold_out,
        categoryIds: product.categoryIds || [],
        materialIds: product.materialIds || [],
        sizeIds: product.sizeIds || [],
      };

      if (variantId) {
        body.variants = product.variants.map((v) => ({
          id: v.id,
          size_id: v.size_id,
          stock: v.id === variantId ? Number(newStockVal) : v.stock,
          price: v.price,
          images: v.images,
          colorIds: v.colors?.map((c) => c.id) || [],
        }));
      } else {
        body.variants = [];
      }

      await updateProduct(body).unwrap();

      // Clear edit state
      setEditingStock((prev) => {
        const next = { ...prev };
        delete next[targetKey];
        return next;
      });
    } catch (err) {
      alert(`Stock update failed: ${err.message || "Operation failed"}`);
    } finally {
      setSavingStock((prev) => ({ ...prev, [targetKey]: false }));
    }
  };

  const handleDeleteProduct = async () => {
    if (!deleteTarget) return;

    try {
      await deleteProduct(deleteTarget).unwrap();
      setDeleteTarget(null);
    } catch (err) {
      alert(`Delete failed: ${err.message || "Operation failed"}`);
    }
  };

  // Paginated items
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="space-y-6 relative z-10">
      {/* Header section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl font-bold text-neutral-800">
            Products Catalog
          </h1>
          <p className="text-xs text-neutral-500 mt-1">
            Manage listing details, pricing overrides, and restocking.
          </p>
        </div>
        <Link href="/admin/products/new">
          <Button className="flex items-center gap-2 bg-primary hover:bg-primary-dark text-white rounded-xl py-2 px-4 text-xs font-bold shadow-md shadow-primary/20">
            <RiAddLine className="text-lg" /> ADD PRODUCT
          </Button>
        </Link>
      </div>

      {/* Filters & Search bar */}
      <ProductsFilterPanel
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        selectedMaterial={selectedMaterial}
        setSelectedMaterial={setSelectedMaterial}
        filterFeatured={filterFeatured}
        setFilterFeatured={setFilterFeatured}
        filterStock={filterStock}
        setFilterStock={setFilterStock}
        categoriesList={categoriesList}
        materialsList={materialsList}
      />

      {/* Products Table grid container */}
      <div className="bg-white/80 border border-neutral-200/60 shadow-md rounded-2xl overflow-hidden backdrop-blur-md">
        {loadingProducts ? (
          <div className="py-20 flex flex-col items-center justify-center text-neutral-400">
            <RiLoader5Line className="text-4xl animate-spin mb-3 text-primary" />
            <span className="text-sm font-semibold tracking-widest">
              LOADING CATALOG...
            </span>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="py-20 text-center text-neutral-500">
            <p className="text-lg font-semibold">No products found</p>
            <p className="text-sm text-neutral-400 mt-1">
              Try refining your search query or add a new listing.
            </p>
          </div>
        ) : (
          <>
            <ProductsTable
              products={currentItems}
              expandedRows={expandedRows}
              toggleRow={toggleRow}
              editingStock={editingStock}
              setEditingStock={setEditingStock}
              savingStock={savingStock}
              handleInlineStockSave={handleInlineStockSave}
              onDeleteClick={setDeleteTarget}
            />

            {/* Pagination section controls */}
            <ProductsPagination
              page={currentPage}
              totalPages={totalPages}
              setPage={setCurrentPage}
            />
          </>
        )}
      </div>

      {/* Delete confirmation modal */}
      <ProductDeleteModal
        open={!!deleteTarget}
        onConfirm={handleDeleteProduct}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}
