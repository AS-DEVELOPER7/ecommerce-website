"use client";

import clsx from "clsx";

export default function Input({
  value,
  onChange,
  placeholder,
  className,
  type = "text",
  icon: Icon,
  ...props
}) {
  return (
    <div className="relative w-full">
      {Icon && (
        <Icon className="absolute left-4 top-1/2 -translate-y-1/2 text-muted text-lg" />
      )}
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={clsx(
          "w-full rounded-xl h-12 border border-input-border bg-input-bg text-base placeholder:text-muted focus:ring-2 focus:ring-primary/50 focus:border-primary focus:outline-none transition",
          Icon ? "pl-12 pr-4" : "px-4",
          className
        )}
        {...props}
      />
    </div>
  );
}
