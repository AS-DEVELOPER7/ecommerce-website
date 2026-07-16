"use client";

import { RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri";

export default function Pagination({ page, totalPages, setPage }) {
  if (totalPages <= 1) return null;

  return (
    <div className="mt-10 flex items-center justify-center gap-2">
      <button
        onClick={() => setPage(Math.max(1, page - 1))}
        className="px-3 py-2 rounded-md border border-border bg-surface hover:bg-surface-base disabled:opacity-50 transition"
        disabled={page === 1}
      >
        <RiArrowLeftSLine className="text-lg text-primary" />
      </button>

      {Array.from({ length: totalPages }).map((_, i) => {
        const pg = i + 1;
        if (pg === 1 || pg === totalPages || Math.abs(pg - page) <= 1) {
          return (
            <button
              key={pg}
              onClick={() => setPage(pg)}
              className={`px-3 py-2 rounded-md border text-sm transition ${
                pg === page
                  ? "bg-primary text-white border-primary shadow-md"
                  : "border-border bg-surface hover:bg-surface-base text-muted hover:text-primary"
              }`}
            >
              {pg}
            </button>
          );
        }
        if ((pg === page - 2 && pg > 1) || (pg === page + 2 && pg < totalPages)) {
          return (
            <span key={`dots-${pg}`} className="px-2">
              …
            </span>
          );
        }
        return null;
      })}

      <button
        onClick={() => setPage(Math.min(totalPages, page + 1))}
        className="px-3 py-2 rounded-md border border-border bg-surface hover:bg-surface-base disabled:opacity-50 transition"
        disabled={page === totalPages}
      >
        <RiArrowRightSLine className="text-lg text-primary" />
      </button>
    </div>
  );
}
