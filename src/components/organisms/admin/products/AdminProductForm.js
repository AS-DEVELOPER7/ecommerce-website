"use client";

import Link from "next/link";
import { RiArrowLeftLine, RiLoader5Line, RiSaveLine } from "react-icons/ri";
import MultiselectDropdown from "src/components/atoms/MultiselectDropdown";
import ProductGalleryFields from "src/components/molecules/admin/products/ProductGalleryFields";
import ProductVariantsList from "src/components/molecules/admin/products/ProductVariantsList";

export default function AdminProductForm({
  pageTitle = "Product Form",
  submitLabel = "SAVE PRODUCT",
  submittingLabel = "SAVING...",
  title,
  setTitle,
  slug,
  setSlug,
  description,
  setDescription,
  price,
  setPrice,
  images = [""],
  isFeatured = false,
  setIsFeatured,
  soldOut = false,
  setSoldOut,
  categoriesList = [],
  selectedCategories = [],
  setSelectedCategories,
  materialsList = [],
  selectedMaterials = [],
  setSelectedMaterials,
  sizesList = [],
  selectedSizes = [],
  setSelectedSizes,
  colorsList = [],
  selectedColors = [],
  setSelectedColors,
  variants = [],
  setVariants,
  bulkStock,
  setBulkStock,
  bulkPrice,
  setBulkPrice,
  loading = false,
  error = null,
  onSaveProduct,
  onTitleChange,
  onAddProductImage,
  onUpdateProductImage,
  onRemoveProductImage,
  onQuickAddCategory,
  onQuickAddMaterial,
  onQuickAddSize,
  onQuickAddColor,
  onGenerateVariants,
  onAddCustomVariant,
  onRemoveCustomVariant,
  onAddVariantImage,
  onUpdateVariantImage,
  onRemoveVariantImage,
  onBulkApply,
}) {
  return (
    <div className="space-y-8 relative z-10">
      {/* Action Header */}
      <div className="flex items-center justify-between border-b border-neutral-200/60 pb-6 flex-wrap gap-4">
        <div className="flex items-center gap-4">
          <Link
            href="/admin/products"
            className="p-2 rounded-xl border border-neutral-300 bg-white hover:text-primary hover:border-primary transition duration-300 shadow-sm"
          >
            <RiArrowLeftLine className="text-xl" />
          </Link>
          <div>
            <h1 className="font-serif text-3xl font-bold text-neutral-800">
              {pageTitle}
            </h1>
            <p className="text-sm text-neutral-500 mt-1">
              Build your catalog details, lookup attributes, and inventory metrics.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onSaveProduct}
          disabled={loading}
          className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-bold bg-primary hover:bg-primary-dark text-white tracking-wider cursor-pointer shadow-md shadow-primary/20 transition-all duration-300"
        >
          {loading ? (
            <RiLoader5Line className="text-xl animate-spin" />
          ) : (
            <RiSaveLine className="text-xl" />
          )}
          {loading ? submittingLabel : submitLabel}
        </button>
      </div>

      {error && (
        <div className="p-4 bg-error-bg border border-danger/25 text-danger text-sm rounded-2xl">
          {error}
        </div>
      )}

      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSaveProduct();
        }}
        className="space-y-8"
      >
        {/* Part 1: Product Specifications */}
        <div className="bg-white/80 border border-neutral-200/60 shadow-md rounded-3xl p-6 sm:p-8 space-y-6 backdrop-blur-md">
          <h2 className="font-serif text-xl font-bold text-neutral-800 border-b border-neutral-200/60 pb-3">
            Part 1: Product Specifications
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Title */}
            <div>
              <label className="text-xs font-bold uppercase tracking-widest text-neutral-500 mb-2 block">
                Product Title
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => onTitleChange(e.target.value)}
                placeholder="e.g. Flower Ring Pin"
                className="w-full rounded-xl h-11 border border-neutral-300 bg-white px-4 text-sm placeholder:text-neutral-400 focus:ring-2 focus:ring-primary/40 focus:border-primary focus:outline-none hover:border-neutral-400 transition"
              />
            </div>

            {/* Slug */}
            <div>
              <label className="text-xs font-bold uppercase tracking-widest text-neutral-500 mb-2 block">
                Slug / URL Path
              </label>
              <input
                type="text"
                required
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                placeholder="e.g. flower-ring-pin"
                className="w-full rounded-xl h-11 border border-neutral-300 bg-white px-4 text-sm focus:ring-2 focus:ring-primary/40 focus:border-primary focus:outline-none hover:border-neutral-400 transition"
              />
            </div>

            {/* Base Price */}
            <div>
              <label className="text-xs font-bold uppercase tracking-widest text-neutral-500 mb-2 block">
                Base Price (INR)
              </label>
              <input
                type="number"
                min="0"
                step="0.01"
                required
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="0.00"
                className="w-full rounded-xl h-11 border border-neutral-300 bg-white px-4 text-sm focus:ring-2 focus:ring-primary/40 focus:border-primary focus:outline-none hover:border-neutral-400 transition"
              />
            </div>

            {/* Description */}
            <div className="md:col-span-2">
              <label className="text-xs font-bold uppercase tracking-widest text-neutral-500 mb-2 block">
                Product Description
              </label>
              <textarea
                rows="3"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe your handcrafted product details here..."
                className="w-full rounded-xl border border-neutral-300 bg-white p-4 text-sm focus:ring-2 focus:ring-primary/40 focus:border-primary focus:outline-none hover:border-neutral-400 transition"
              />
            </div>

            {/* Categories & Materials Dropdowns */}
            <div>
              <MultiselectDropdown
                label="Categories"
                options={categoriesList}
                selectedValues={selectedCategories}
                onChange={setSelectedCategories}
                placeholder="Select categories..."
                onQuickAdd={onQuickAddCategory}
                quickAddLabel="Add Category"
              />
            </div>

            <div>
              <MultiselectDropdown
                label="Materials"
                options={materialsList}
                selectedValues={selectedMaterials}
                onChange={setSelectedMaterials}
                placeholder="Select materials..."
                onQuickAdd={onQuickAddMaterial}
                quickAddLabel="Add Material"
              />
            </div>

            {/* Product Gallery Images */}
            <ProductGalleryFields
              images={images}
              onAdd={onAddProductImage}
              onUpdate={onUpdateProductImage}
              onRemove={onRemoveProductImage}
            />

            {/* Visibility Settings */}
            <div className="md:col-span-2 flex flex-col md:flex-row gap-6 p-4 bg-neutral-50/50 rounded-2xl border border-neutral-200/40">
              <div className="flex-1 flex items-center justify-between">
                <span className="text-sm font-semibold text-neutral-700">
                  Featured Product
                </span>
                <button
                  type="button"
                  onClick={() => setIsFeatured(!isFeatured)}
                  className={`w-11 h-6 rounded-full transition-colors duration-300 relative cursor-pointer focus:outline-none ${
                    isFeatured
                      ? "bg-primary shadow-inner"
                      : "bg-neutral-200 border border-neutral-300/40"
                  }`}
                >
                  <span
                    className={`w-4.5 h-4.5 bg-white rounded-full absolute top-0.5 transition-all duration-300 shadow ${
                      isFeatured ? "left-5.5" : "left-0.5"
                    }`}
                  />
                </button>
              </div>

              <div className="flex-1 flex items-center justify-between">
                <span className="text-sm font-semibold text-neutral-700">
                  Sold Out Status
                </span>
                <button
                  type="button"
                  onClick={() => setSoldOut(!soldOut)}
                  className={`w-11 h-6 rounded-full transition-colors duration-300 relative cursor-pointer focus:outline-none ${
                    soldOut
                      ? "bg-primary shadow-inner"
                      : "bg-neutral-200 border border-neutral-300/40"
                  }`}
                >
                  <span
                    className={`w-4.5 h-4.5 bg-white rounded-full absolute top-0.5 transition-all duration-300 shadow ${
                      soldOut ? "left-5.5" : "left-0.5"
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Part 2: Sizing, Color Swatches & Variants mapping */}
        <ProductVariantsList
          sizesList={sizesList}
          colorsList={colorsList}
          selectedSizes={selectedSizes}
          setSelectedSizes={setSelectedSizes}
          selectedColors={selectedColors}
          setSelectedColors={setSelectedColors}
          variants={variants}
          setVariants={setVariants}
          bulkStock={bulkStock}
          setBulkStock={setBulkStock}
          bulkPrice={bulkPrice}
          setBulkPrice={setBulkPrice}
          onQuickAddSize={onQuickAddSize}
          onQuickAddColor={onQuickAddColor}
          onGenerateVariants={onGenerateVariants}
          onAddCustomVariant={onAddCustomVariant}
          onRemoveCustomVariant={onRemoveCustomVariant}
          onAddVariantImage={onAddVariantImage}
          onUpdateVariantImage={onUpdateVariantImage}
          onRemoveVariantImage={onRemoveVariantImage}
          onBulkApply={onBulkApply}
        />
      </form>
    </div>
  );
}
