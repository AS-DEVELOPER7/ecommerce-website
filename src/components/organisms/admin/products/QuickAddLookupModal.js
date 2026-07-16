"use client";

import { RiCloseLine, RiLoader5Line } from "react-icons/ri";

export default function QuickAddLookupModal({
  activeModal,
  onSave,
  onClose,
  modalName,
  setModalName,
  modalSlug,
  setModalSlug,
  modalImageUrl,
  setModalImageUrl,
  modalHexCode,
  setModalHexCode,
  modalSaving,
}) {
  if (!activeModal) return null;

  const handleNameChange = (val) => {
    setModalName(val);
    if (activeModal === "category") {
      setModalSlug(
        val
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)+/g, ""),
      );
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-in fade-in duration-300">
      <form
        onSubmit={onSave}
        className="w-full max-w-md bg-white rounded-3xl p-6 shadow-xl border border-neutral-200 space-y-4"
      >
        <div className="flex items-center justify-between border-b border-neutral-100 pb-2">
          <h3 className="font-serif text-lg font-bold text-neutral-800 capitalize">
            Quick Add {activeModal}
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="p-1 text-neutral-400 hover:text-neutral-600 rounded-lg hover:bg-neutral-50 cursor-pointer"
          >
            <RiCloseLine className="text-xl" />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-500 mb-1.5 block">
              Name / Label
            </label>
            <input
              type="text"
              required
              value={modalName}
              onChange={(e) => handleNameChange(e.target.value)}
              placeholder={`e.g. New ${activeModal}`}
              className="w-full rounded-xl h-10 border border-neutral-300 bg-white px-3 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>

          {activeModal === "category" && (
            <>
              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-500 mb-1.5 block">
                  Category Slug
                </label>
                <input
                  type="text"
                  required
                  value={modalSlug}
                  onChange={(e) => setModalSlug(e.target.value)}
                  placeholder="e.g. new-category"
                  className="w-full rounded-xl h-10 border border-neutral-300 bg-white px-3 text-sm focus:outline-none"
                />
              </div>
              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-500 mb-1.5 block">
                  Category Cover Image URL
                </label>
                <input
                  type="url"
                  value={modalImageUrl}
                  onChange={(e) => setModalImageUrl(e.target.value)}
                  placeholder="https://example.com/category-image.jpg"
                  className="w-full rounded-xl h-10 border border-neutral-300 bg-white px-3 text-sm focus:outline-none"
                />
              </div>
            </>
          )}

          {activeModal === "color" && (
            <div>
              <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-500 mb-1.5 block">
                Swatch HEX Color code
              </label>
              <div className="flex gap-3 items-center">
                <input
                  type="color"
                  value={modalHexCode || "#000000"}
                  onChange={(e) => setModalHexCode(e.target.value)}
                  className="w-10 h-10 rounded-xl border border-neutral-300 p-0 cursor-pointer overflow-hidden bg-white shrink-0"
                />
                <input
                  type="text"
                  required
                  pattern="^#[0-9A-Fa-f]{6}$"
                  value={modalHexCode}
                  onChange={(e) => setModalHexCode(e.target.value)}
                  placeholder="e.g. #FF0000"
                  className="w-full rounded-xl h-10 border border-neutral-300 bg-white px-3 text-sm focus:outline-none font-mono"
                />
              </div>
            </div>
          )}
        </div>

        <div className="border-t border-neutral-100 pt-4 flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border border-neutral-300 text-neutral-600 rounded-xl text-xs font-bold hover:bg-neutral-50 transition cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={modalSaving}
            className="px-5 py-2 bg-primary hover:bg-primary-dark text-white rounded-xl text-xs font-bold shadow-md shadow-primary/10 transition flex items-center gap-1.5 disabled:opacity-50 cursor-pointer"
          >
            {modalSaving && <RiLoader5Line className="animate-spin text-sm" />}
            Save lookup
          </button>
        </div>
      </form>
    </div>
  );
}
