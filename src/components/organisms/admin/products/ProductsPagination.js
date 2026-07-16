"use client";

export default function ProductsPagination({ page, totalPages, setPage }) {
  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-between border-t border-neutral-100 p-4">
      <span className="text-xs text-neutral-400 font-semibold uppercase tracking-wider">
        Page {page} of {totalPages}
      </span>
      <div className="flex items-center gap-1.5">
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          className="h-8 px-2.5 rounded-lg border border-neutral-300 bg-white text-neutral-500 hover:text-primary hover:border-primary disabled:opacity-50 disabled:hover:text-neutral-500 disabled:hover:border-neutral-300 transition duration-300 font-bold text-[10px] uppercase tracking-wider cursor-pointer"
        >
          Prev
        </button>
        <button
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
          className="h-8 px-2.5 rounded-lg border border-neutral-300 bg-white text-neutral-500 hover:text-primary hover:border-primary disabled:opacity-50 disabled:hover:text-neutral-500 disabled:hover:border-neutral-300 transition duration-300 font-bold text-[10px] uppercase tracking-wider cursor-pointer"
        >
          Next
        </button>
      </div>
    </div>
  );
}
