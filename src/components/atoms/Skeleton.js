"use client";

import clsx from "clsx";

export default function Skeleton({ className }) {
  return (
    <div
      className={clsx(
        "animate-pulse bg-gray-200/60 dark:bg-gray-700/50 rounded-lg",
        className
      )}
    />
  );
}
