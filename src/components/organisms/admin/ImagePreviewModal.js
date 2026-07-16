"use client";

import { RiCloseLine } from "react-icons/ri";

export default function ImagePreviewModal({ src, onClose }) {
  if (!src) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-md flex items-center justify-center p-4 cursor-zoom-out animate-in fade-in duration-200"
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 bg-white/15 hover:bg-white/30 text-white rounded-full p-2.5 cursor-pointer transition-all duration-300"
      >
        <RiCloseLine className="text-2xl" />
      </button>
      <div className="relative max-w-4xl max-h-[85vh] flex items-center justify-center animate-in zoom-in-95 duration-200">
        <img
          src={src}
          alt="Preview"
          onClick={(e) => e.stopPropagation()}
          className="max-w-full max-h-[85vh] rounded-3xl shadow-2xl border border-white/10 object-contain select-none cursor-default"
        />
      </div>
    </div>
  );
}
