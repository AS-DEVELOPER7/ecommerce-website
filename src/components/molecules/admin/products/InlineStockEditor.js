"use client";

import { RiCheckLine, RiCloseLine, RiLoader5Line } from "react-icons/ri";

export default function InlineStockEditor({
  value,
  isEditing,
  isSaving,
  onChange,
  onSave,
  onCancel,
}) {
  return (
    <div className="flex items-center gap-2">
      <input
        type="number"
        min="0"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-16 h-8 rounded-lg border border-neutral-300 text-center font-bold focus:ring-1 focus:ring-primary focus:outline-none"
      />
      {isEditing && (
        <div className="flex items-center gap-1 shrink-0">
          <button
            disabled={isSaving}
            onClick={onSave}
            className="w-8 h-8 rounded-lg bg-primary/10 text-primary border border-primary/20 flex items-center justify-center hover:bg-primary hover:text-white transition duration-300 disabled:opacity-50 cursor-pointer"
          >
            {isSaving ? (
              <RiLoader5Line className="animate-spin text-sm" />
            ) : (
              <RiCheckLine className="text-base" />
            )}
          </button>
          <button
            disabled={isSaving}
            onClick={onCancel}
            className="w-8 h-8 rounded-lg bg-neutral-100 text-neutral-500 border border-neutral-200 flex items-center justify-center hover:bg-neutral-200 hover:text-neutral-700 transition duration-300 disabled:opacity-50 cursor-pointer"
          >
            <RiCloseLine className="text-base" />
          </button>
        </div>
      )}
    </div>
  );
}
