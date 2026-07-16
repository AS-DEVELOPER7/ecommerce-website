"use client";

import { useState } from "react";
import Image from "next/image";
import { HiOutlinePhotograph } from "react-icons/hi";

export default function ImageWithFallback({
  src,
  alt,
  fill,
  width,
  height,
  className = "",
  sizes = "100vw",
  ...props
}) {
  const [error, setError] = useState(!src);
  if (error || !src) {
    return (
      <div
        className={`flex flex-col items-center justify-center bg-surface-base text-muted/30 border border-border/50 ${className}`}
        style={fill ? { width: "100%", height: "100%" } : { width, height }}
      >
        <HiOutlinePhotograph className="text-3xl" />
        <span className="text-[10px] mt-1 font-medium tracking-tighter uppercase opacity-50">
          No Image
        </span>
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill={fill}
      width={width}
      height={height}
      className={`${className} ${!className.includes("object-") ? "object-contain" : ""}`}
      sizes={sizes}
      onError={() => setError(true)}
      {...props}
    />
  );
}
