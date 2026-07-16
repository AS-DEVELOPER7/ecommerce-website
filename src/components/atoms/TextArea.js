"use client";

import clsx from "clsx";

export default function TextArea({
  value,
  onChange,
  placeholder,
  className,
  rows = 4,
  ...props
}) {
  return (
    <div className="relative w-full">
      <textarea
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={rows}
        className={clsx(
          "w-full rounded-xl border border-input-border bg-input-bg px-4 py-3 text-base placeholder:text-muted focus:ring-2 focus:ring-primary/50 focus:border-primary focus:outline-none transition resize-none",
          className
        )}
        {...props}
      />
    </div>
  );
}
