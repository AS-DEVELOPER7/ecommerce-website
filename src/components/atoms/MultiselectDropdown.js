"use client";

import { useState, useRef, useEffect } from "react";
import { RiCheckLine, RiArrowDownSLine, RiCloseLine, RiSearchLine, RiAddLine } from "react-icons/ri";

export default function MultiselectDropdown({
  label,
  options = [],
  selectedValues = [],
  onChange,
  placeholder = "Select options...",
  onQuickAdd,
  quickAddLabel = "Add New",
  singleSelect = false,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const containerRef = useRef(null);

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleToggleOption = (id) => {
    if (singleSelect) {
      if (selectedValues.includes(id)) {
        onChange([]);
      } else {
        onChange([id]);
      }
      setIsOpen(false);
    } else {
      if (selectedValues.includes(id)) {
        onChange(selectedValues.filter((val) => val !== id));
      } else {
        onChange([...selectedValues, id]);
      }
    }
  };

  const handleRemoveOption = (e, id) => {
    e.stopPropagation();
    onChange(selectedValues.filter((val) => val !== id));
  };

  const filteredOptions = options.filter((opt) =>
    opt.name?.toLowerCase().includes(search.toLowerCase())
  );

  const selectedObjects = options.filter((opt) => selectedValues.includes(opt.id));

  return (
    <div className="space-y-2" ref={containerRef}>
      {label && (
        <label className="text-xs font-bold uppercase tracking-widest text-neutral-500 block">
          {label}
        </label>
      )}

      <div className="relative">
        {/* Toggle Button */}
        <div
          onClick={() => setIsOpen(!isOpen)}
          className="w-full min-h-11 rounded-xl border border-neutral-300 bg-white px-3 py-2 text-sm flex items-center justify-between gap-2 cursor-pointer hover:border-neutral-400 focus-within:ring-2 focus-within:ring-primary/45 focus-within:border-primary transition duration-300"
        >
          {selectedObjects.length === 0 ? (
            <span className="text-neutral-400">{placeholder}</span>
          ) : (
            <div className="flex flex-wrap gap-1.5 max-w-[90%]">
              {selectedObjects.map((opt) => (
                <span
                  key={opt.id}
                  className="inline-flex items-center gap-1 bg-primary/10 text-primary border border-primary/20 px-2 py-0.5 rounded-lg text-xs font-bold"
                >
                  {opt.name}
                  {!singleSelect && (
                    <button
                      type="button"
                      onClick={(e) => handleRemoveOption(e, opt.id)}
                      className="hover:bg-primary/20 rounded p-0.5 text-[10px] cursor-pointer"
                    >
                      <RiCloseLine />
                    </button>
                  )}
                </span>
              ))}
            </div>
          )}
          <RiArrowDownSLine
            className={`text-neutral-500 text-lg transition-transform duration-300 shrink-0 ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </div>

        {/* Dropdown Menu */}
        {isOpen && (
          <div className="absolute left-0 right-0 mt-2 z-50 bg-white border border-neutral-200 shadow-xl rounded-2xl overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
            {/* Search Bar */}
            <div className="p-2.5 border-b border-neutral-100 flex items-center gap-2">
              <RiSearchLine className="text-neutral-400 text-base shrink-0" />
              <input
                type="text"
                placeholder="Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full text-xs border-none bg-transparent focus:ring-0 focus:outline-none placeholder:text-neutral-400"
              />
              {onQuickAdd && (
                <button
                  type="button"
                  onClick={() => {
                    setIsOpen(false);
                    onQuickAdd();
                  }}
                  className="inline-flex items-center gap-1 px-2 py-1 bg-primary/10 hover:bg-primary hover:text-white border border-primary/20 hover:border-primary text-primary rounded-lg text-[10px] font-bold cursor-pointer transition shrink-0"
                >
                  <RiAddLine /> {quickAddLabel}
                </button>
              )}
            </div>

            {/* Options List */}
            <div className="max-h-48 overflow-y-auto divide-y divide-neutral-50 p-1">
              {filteredOptions.length === 0 ? (
                <div className="py-4 text-center text-xs text-neutral-400 italic">
                  No options found
                </div>
              ) : (
                filteredOptions.map((opt) => {
                  const isSelected = selectedValues.includes(opt.id);
                  return (
                    <div
                      key={opt.id}
                      onClick={() => handleToggleOption(opt.id)}
                      className={`flex items-center justify-between px-3 py-2 text-xs font-semibold rounded-xl cursor-pointer hover:bg-neutral-50 transition ${
                        isSelected ? "text-primary bg-primary/5" : "text-neutral-700"
                      }`}
                    >
                      <span>{opt.name}</span>
                      {isSelected && <RiCheckLine className="text-primary text-base" />}
                    </div>
                  );
                })
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
