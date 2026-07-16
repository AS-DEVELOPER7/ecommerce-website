"use client";

import { RiEditLine, RiDeleteBinLine } from "react-icons/ri";

export default function LookupItemGrid({
  items = [],
  activeTab,
  onEdit,
  onDelete,
}) {
  if (items.length === 0) {
    return (
      <p className="text-neutral-400 italic py-10 col-span-full text-center">
        No {activeTab}s found. Click "ADD NEW ITEM" to create one.
      </p>
    );
  }

  const isColor = activeTab === "color";

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {items.map((item) => (
        <div
          key={item.id}
          className="bg-white/80 border border-neutral-200/60 rounded-2xl p-4 shadow-sm hover:shadow-md transition-all flex items-center justify-between"
        >
          {isColor ? (
            <div className="flex items-center gap-3 min-w-0">
              <span
                className="w-6 h-6 rounded-full border border-neutral-300/60 shrink-0 shadow-inner"
                style={{ backgroundColor: item.hex_code }}
              />
              <div className="min-w-0">
                <p className="font-bold text-neutral-700 text-sm truncate">
                  {item.name}
                </p>
                <p className="text-[10px] text-neutral-400 font-mono tracking-wider uppercase mt-0.5">
                  {item.hex_code}
                </p>
              </div>
            </div>
          ) : (
            <span className="font-bold text-neutral-700 text-sm truncate">
              {item.name}
            </span>
          )}

          <div className="flex items-center gap-1 shrink-0">
            <button
              onClick={() => onEdit(item)}
              className="p-1.5 text-neutral-400 hover:text-primary hover:bg-primary/5 rounded-lg transition cursor-pointer"
            >
              <RiEditLine className="text-base" />
            </button>
            <button
              onClick={() => onDelete(item.id)}
              className="p-1.5 text-neutral-400 hover:text-danger hover:bg-danger/5 rounded-lg transition cursor-pointer"
            >
              <RiDeleteBinLine className="text-base" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
