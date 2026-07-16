"use client";

export default function ProductDeleteModal({ open, onConfirm, onCancel }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-in fade-in duration-300">
      <div className="w-full max-w-md bg-white rounded-3xl p-6 shadow-xl border border-neutral-200">
        <h3 className="font-serif text-xl font-bold text-neutral-800 mb-2">
          Delete this product?
        </h3>
        <p className="text-xs text-neutral-500 mb-6 font-medium leading-relaxed">
          Are you sure you want to delete this product? All corresponding stock variations and overrides will be deleted. This action cannot be undone.
        </p>
        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 border border-neutral-300 bg-white hover:bg-neutral-50 text-neutral-700 rounded-xl text-xs font-semibold cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="px-4 py-2 bg-danger hover:bg-danger-dark text-white rounded-xl text-xs font-bold shadow-md shadow-danger/15 cursor-pointer"
          >
            Delete Product
          </button>
        </div>
      </div>
    </div>
  );
}
