"use client";

import { RiEditLine, RiDeleteBinLine, RiPaletteLine } from "react-icons/ri";
import { previewImage } from "src/utils/previewImage";

export default function CategoryTabGrid({ categories = [], onEdit, onDelete }) {
  if (categories.length === 0) {
    return (
      <p className="text-neutral-400 italic py-10 col-span-full text-center">
        No categories found. Click "ADD NEW ITEM" to create one.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {categories.map((cat) => (
        <div
          key={cat.id}
          className="bg-white/80 border border-neutral-200/60 rounded-3xl p-5 shadow-sm hover:shadow-md hover:scale-[1.01] transition-all flex gap-4"
        >
          <div
            onClick={() => cat.image_url && previewImage(cat.image_url)}
            className={`w-16 h-20 rounded-xl border border-neutral-200 bg-neutral-100 overflow-hidden shrink-0 flex items-center justify-center ${
              cat.image_url ? "cursor-zoom-in hover:scale-105 transition-all duration-300" : ""
            }`}
          >
            {cat.image_url ? (
              <img
                src={cat.image_url}
                alt={cat.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <RiPaletteLine className="text-2xl text-neutral-300" />
            )}
          </div>
          <div className="flex-1 flex flex-col justify-between min-w-0">
            <div>
              <h3 className="font-bold text-neutral-800 text-base truncate">
                {cat.name}
              </h3>
              <p className="text-xs text-neutral-400 font-mono truncate mt-0.5">
                slug: {cat.slug}
              </p>
            </div>
            <div className="flex items-center justify-end gap-2 border-t border-neutral-100 pt-3 mt-2">
              <button
                onClick={() => onEdit(cat)}
                className="p-1.5 text-neutral-400 hover:text-primary hover:bg-primary/5 rounded-lg transition cursor-pointer"
              >
                <RiEditLine className="text-base" />
              </button>
              <button
                onClick={() => onDelete(cat.id)}
                className="p-1.5 text-neutral-400 hover:text-danger hover:bg-danger/5 rounded-lg transition cursor-pointer"
              >
                <RiDeleteBinLine className="text-base" />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
