"use client";

import { RiCloseLine, RiLoader5Line } from "react-icons/ri";

export default function LookupEditModal({
  open,
  activeTab,
  editItem,
  saving,
  formName,
  formSlug,
  formImageUrl,
  formHexCode,
  setFormSlug,
  setFormImageUrl,
  setFormHexCode,
  onNameChange,
  onSave,
  onClose,
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-900/60 backdrop-blur-sm animate-in fade-in duration-250">
      <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl border border-neutral-200 overflow-hidden flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-250">
        {/* Modal Header */}
        <div className="p-6 border-b border-neutral-100 flex items-center justify-between">
          <h2 className="font-serif text-xl font-bold text-neutral-800 animate-in fade-in duration-150">
            {editItem ? `Edit ${activeTab}` : `Add New ${activeTab}`}
          </h2>
          <button
            onClick={onClose}
            className="text-neutral-400 hover:text-neutral-700 p-1 rounded hover:bg-neutral-50 transition cursor-pointer"
          >
            <RiCloseLine className="text-xl" />
          </button>
        </div>

        {/* Modal Form body */}
        <form onSubmit={onSave} className="p-6 space-y-4 overflow-y-auto">
          <div>
            <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-500 mb-1.5 block">
              Name
            </label>
            <input
              type="text"
              required
              placeholder={`Enter ${activeTab} name...`}
              value={formName}
              onChange={(e) => onNameChange(e.target.value)}
              className="w-full rounded-xl h-10 border border-neutral-300 bg-white px-3 text-xs placeholder:text-muted focus:ring-1 focus:ring-primary focus:outline-none"
            />
          </div>

          {activeTab === "category" && (
            <>
              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-500 mb-1.5 block">
                  Slug
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. handmade-bracelets"
                  value={formSlug}
                  onChange={(e) => setFormSlug(e.target.value)}
                  className="w-full rounded-xl h-10 border border-neutral-300 bg-white px-3 text-xs placeholder:text-muted focus:ring-1 focus:ring-primary focus:outline-none"
                />
              </div>

              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-500 mb-1.5 block">
                  Cover Image URL
                </label>
                <input
                  type="url"
                  placeholder="https://example.com/cover-image.jpg"
                  value={formImageUrl}
                  onChange={(e) => setFormImageUrl(e.target.value)}
                  className="w-full rounded-xl h-10 border border-neutral-300 bg-white px-3 text-xs placeholder:text-muted focus:ring-1 focus:ring-primary focus:outline-none"
                />
              </div>
            </>
          )}

          {activeTab === "color" && (
            <div>
              <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-500 mb-1.5 block">
                HEX Code Swatch
              </label>
              <div className="flex gap-3 items-center">
                <input
                  type="color"
                  value={formHexCode}
                  onChange={(e) => setFormHexCode(e.target.value)}
                  className="w-10 h-10 rounded-xl border border-neutral-300 p-0 cursor-pointer overflow-hidden bg-white shrink-0"
                />
                <input
                  type="text"
                  required
                  pattern="^#[0-9A-Fa-f]{6}$"
                  placeholder="#FF0000"
                  value={formHexCode}
                  onChange={(e) => setFormHexCode(e.target.value)}
                  className="w-full rounded-xl h-10 border border-neutral-300 bg-white px-3 text-xs placeholder:text-muted focus:ring-1 focus:ring-primary focus:outline-none font-mono"
                />
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="border-t border-neutral-100 pt-5 flex justify-end gap-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-neutral-300 text-neutral-600 rounded-xl text-xs font-bold hover:bg-neutral-50 transition cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="px-5 py-2 bg-primary hover:bg-primary-dark text-white rounded-xl text-xs font-bold shadow-md shadow-primary/10 transition flex items-center gap-1.5 disabled:opacity-50 cursor-pointer"
            >
              {saving && <RiLoader5Line className="animate-spin text-sm" />}
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
