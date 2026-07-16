import { RiPlayListAddLine, RiAddLine, RiCloseLine } from "react-icons/ri";
import MultiselectDropdown from "src/components/atoms/MultiselectDropdown";
import { previewImage } from "src/utils/previewImage";

export default function ProductVariantsList({
  sizesList = [],
  colorsList = [],
  selectedSizes = [],
  setSelectedSizes,
  selectedColors = [],
  setSelectedColors,
  variants = [],
  setVariants,
  bulkStock,
  setBulkStock,
  bulkPrice,
  setBulkPrice,
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
    <div className="bg-white/80 border border-neutral-200/60 shadow-md rounded-3xl p-6 sm:p-8 space-y-6 backdrop-blur-md">
      <h2 className="font-serif text-xl font-bold text-neutral-800 border-b border-neutral-200/60 pb-3">
        Part 2: Sizes, Colors & Variants Setup
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <MultiselectDropdown
            label="Product Sizes Options"
            options={sizesList}
            selectedValues={selectedSizes}
            onChange={setSelectedSizes}
            placeholder="Choose sizes available for this product..."
            onQuickAdd={onQuickAddSize}
            quickAddLabel="Add Size"
          />
        </div>

        <div>
          <MultiselectDropdown
            label="Product Colors Options"
            options={colorsList}
            selectedValues={selectedColors}
            onChange={setSelectedColors}
            placeholder="Choose colors available for this product..."
            onQuickAdd={onQuickAddColor}
            quickAddLabel="Add Color"
          />
        </div>
      </div>

      {/* Matrix Generator controls */}
      <div className="border border-neutral-200/80 bg-white/60 p-5 rounded-2xl shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h4 className="text-sm font-bold text-neutral-800">
            Variants Matrix Generator
          </h4>
          <p className="text-xs text-neutral-500 mt-0.5">
            Automatically generate all combinations of the selected sizes
            and colors options.
          </p>
        </div>
        <button
          type="button"
          onClick={onGenerateVariants}
          className="flex items-center gap-1.5 px-4 py-2 bg-primary text-white rounded-xl text-xs font-bold hover:bg-primary-dark cursor-pointer transition duration-300 shadow-md shadow-primary/20 shrink-0"
        >
          <RiPlayListAddLine /> Generate Combinations Matrix
        </button>
      </div>

      {/* Bulk Setter and Add Custom Variant */}
      <div className="space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <h3 className="text-base font-bold text-neutral-800">
            Active Product Variants
          </h3>
          <button
            type="button"
            onClick={onAddCustomVariant}
            className="flex items-center gap-1.5 px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-xl text-xs font-bold shadow-md shadow-primary/20 transition cursor-pointer"
          >
            <RiAddLine className="text-base text-white" /> Add Custom Variant
          </button>
        </div>

        {/* Bulk Apply Control Board */}
        {variants.length > 0 && (
          <div className="p-4 bg-primary/5 border border-primary/20 rounded-2xl flex flex-wrap items-end gap-4 animate-in fade-in">
            <div className="flex-1 min-w-[120px]">
              <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-500 mb-1 block">
                Bulk Variant Stock
              </label>
              <input
                type="number"
                min="0"
                placeholder="e.g. 15"
                value={bulkStock}
                onChange={(e) => setBulkStock(e.target.value)}
                className="w-full h-9 rounded-lg border border-neutral-300 bg-white text-center text-xs font-bold focus:ring-1 focus:ring-primary focus:outline-none"
              />
            </div>
            <div className="flex-1 min-w-[120px]">
              <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-500 mb-1 block">
                Bulk Variant Price
              </label>
              <input
                type="number"
                min="0"
                placeholder="Same as base"
                value={bulkPrice}
                onChange={(e) => setBulkPrice(e.target.value)}
                className="w-full h-9 rounded-lg border border-neutral-300 bg-white text-center text-xs font-bold focus:ring-1 focus:ring-primary focus:outline-none"
              />
            </div>
            <button
              type="button"
              onClick={onBulkApply}
              className="px-4 py-2 bg-primary text-white rounded-xl text-xs font-bold hover:bg-primary-dark transition cursor-pointer shadow-md shadow-primary/20 shrink-0"
            >
              Apply to All
            </button>
          </div>
        )}

        {/* Variants Grid / Expandable Cards */}
        {variants.length === 0 ? (
          <p className="text-sm text-neutral-400 italic text-center py-6 bg-neutral-50/50 rounded-2xl border border-neutral-200/40">
            No variants defined. Click "Generate Matrix" above or add custom variants manually.
          </p>
        ) : (
          <div className="space-y-4">
            {variants.map((v, vIdx) => {
              // Determine name labels for options
              const sizeLabels = (v.sizeIds || [])
                .map((sid) => sizesList.find((s) => s.id === sid)?.name)
                .filter(Boolean);
              const sizeSummary =
                sizeLabels.length > 0 ? sizeLabels.join(", ") : "Free Size";
              const colorName =
                colorsList.find((c) => c.id === v.colorIds?.[0])?.name || "";
              const colorSummary = colorName ? ` (${colorName})` : "";

              return (
                <div
                  key={vIdx}
                  className="border border-neutral-200 bg-white rounded-2xl p-4 shadow-sm space-y-4 animate-in fade-in"
                >
                  {/* Card Header summary */}
                  <div className="flex items-center justify-between border-b border-neutral-100 pb-2 flex-wrap gap-2">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-primary" />
                      <span className="font-bold text-neutral-700 text-sm">
                        Variant #{vIdx + 1}: {sizeSummary}
                        {colorSummary}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => onRemoveCustomVariant(vIdx)}
                      className="text-neutral-400 hover:text-danger p-1 rounded hover:bg-danger/5 transition cursor-pointer"
                    >
                      <RiCloseLine className="text-lg" />
                    </button>
                  </div>

                  {/* Card Fields Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {/* Size Dropdown Select */}
                    <div className="lg:col-span-2">
                      <MultiselectDropdown
                        label="Variant Sizes"
                        options={sizesList}
                        selectedValues={v.sizeIds || []}
                        onChange={(newSizeIds) => {
                          setVariants((prev) =>
                            prev.map((item, i) =>
                              i === vIdx ? { ...item, sizeIds: newSizeIds } : item
                            )
                          );
                        }}
                        placeholder="Select sizes..."
                        onQuickAdd={onQuickAddSize}
                        quickAddLabel="Add Size"
                      />
                    </div>

                    {/* Colors Dropdown inside variant row */}
                    <div className="lg:col-span-2">
                      <MultiselectDropdown
                        label="Variant Color"
                        options={colorsList}
                        selectedValues={v.colorIds || []}
                        onChange={(newCids) => {
                          setVariants((prev) =>
                            prev.map((item, i) =>
                              i === vIdx ? { ...item, colorIds: newCids } : item
                            )
                          );
                        }}
                        placeholder="Select color..."
                        singleSelect={true}
                        onQuickAdd={onQuickAddColor}
                        quickAddLabel="Add Color"
                      />
                    </div>

                    {/* Stock Input */}
                    <div>
                      <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-500 mb-1.5 block">
                        Stock Quantity
                      </label>
                      <input
                        type="number"
                        min="0"
                        required
                        value={v.stock}
                        onChange={(e) => {
                          const stkVal = Number(e.target.value);
                          setVariants((prev) =>
                            prev.map((item, i) =>
                              i === vIdx ? { ...item, stock: stkVal } : item
                            )
                          );
                        }}
                        className="w-full h-10 text-xs text-center font-bold rounded-xl border border-neutral-300 bg-white px-3 focus:ring-1 focus:ring-primary focus:outline-none"
                      />
                    </div>

                    {/* Price Override Input */}
                    <div>
                      <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-500 mb-1.5 block">
                        Price Override (INR)
                      </label>
                      <input
                        type="number"
                        min="0"
                        placeholder="Inherited"
                        value={v.price === null ? "" : v.price}
                        onChange={(e) => {
                          const prVal = e.target.value !== "" ? Number(e.target.value) : null;
                          setVariants((prev) =>
                            prev.map((item, i) =>
                              i === vIdx ? { ...item, price: prVal } : item
                            )
                          );
                        }}
                        className="w-full h-10 text-xs text-center rounded-xl border border-neutral-300 bg-white px-3 focus:ring-1 focus:ring-primary focus:outline-none"
                      />
                    </div>

                    {/* Variant Gallery Image URLs list */}
                    <div className="md:col-span-2 lg:col-span-4 space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-500 block">
                        Variant Gallery Images
                      </label>
                      <div className="space-y-2.5">
                        {v.images?.map((url, imgIdx) => (
                          <div key={imgIdx} className="flex gap-2 items-center">
                            <div
                              onClick={() => url && previewImage(url)}
                              className={`w-10 h-10 rounded-lg border border-neutral-200 bg-neutral-100 overflow-hidden shadow-inner flex items-center justify-center shrink-0 ${
                                url ? "cursor-zoom-in hover:scale-105 transition-all duration-300" : ""
                              }`}
                            >
                              {url ? (
                                <img
                                  src={url}
                                  alt={`Preview ${imgIdx + 1}`}
                                  className="w-full h-full object-cover"
                                  onError={(e) => {
                                    e.target.style.display = "none";
                                  }}
                                />
                              ) : (
                                <span className="text-[9px] text-neutral-400 font-bold">
                                  No Pic
                                </span>
                              )}
                            </div>
                            <input
                              type="text"
                              value={url}
                              onChange={(e) =>
                                onUpdateVariantImage(vIdx, imgIdx, e.target.value)
                              }
                              placeholder="Paste Variant Image URL here..."
                              className="flex-1 rounded-xl h-9 border border-neutral-300 bg-white px-3 text-xs focus:ring-2 focus:ring-primary/45 focus:border-primary focus:outline-none"
                            />
                            <button
                              type="button"
                              onClick={() => onRemoveVariantImage(vIdx, imgIdx)}
                              className="p-2 rounded-xl border border-danger/25 bg-error-bg text-danger hover:bg-danger hover:text-white transition duration-300 cursor-pointer shadow-sm shrink-0"
                            >
                              <RiCloseLine className="text-sm" />
                            </button>
                          </div>
                        ))}
                        <button
                          type="button"
                          onClick={() => onAddVariantImage(vIdx)}
                          className="inline-flex items-center gap-1.5 bg-primary hover:bg-primary-dark text-white rounded-xl py-1.5 px-3.5 text-[10px] font-bold shadow-md shadow-primary/20 transition cursor-pointer"
                        >
                          <RiAddLine className="text-xs" /> Add Variant Image URL
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
