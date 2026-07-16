"use client";
import Image from "next/image";
import {
  RiDeleteBin6Line,
  RiAddLine,
  RiSubtractLine,
} from "react-icons/ri";

import ImageWithFallback from "./ImageWithFallback";
import { CURRENCY } from "src/constants";

export default function CartRow({ item, onInc, onDec, onRemove }) {
  const subTotal = (Number(item.price) * Number(item.qty)).toFixed(2);
  const unitPrice = Number(item.price).toFixed(2);
  const primaryImage =
    (Array.isArray(item.images) && item.images[0]) ||
    item.image;

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-4">
      {/* Image & Details */}
      <div className="flex items-start sm:items-center gap-4 flex-1">
        <div className="relative w-24 h-24 shrink-0 sm:w-28 sm:h-28 rounded-lg overflow-hidden bg-surface sm:self-center">
          <ImageWithFallback
            src={primaryImage}
            alt={item.name}
            fill
            className="object-contain! bg-surface-base"
            sizes="(max-width: 640px) 96px, 112px"
          />
        </div>

        {/* Info */}
        <div className="min-w-0 flex-1">
          <p className="font-semibold text-base md:text-lg truncate">{item.name}</p>
          {(item.color || item.size) && (
            <div className="flex flex-wrap gap-x-3 gap-y-1 my-1">
              {item.color && (
                <p className="text-xs md:text-sm text-muted font-medium">
                  Color:{" "}
                  <span className="text-base-content">
                    {Array.isArray(item.color)
                      ? item.color.join(" / ")
                      : item.color}
                  </span>
                </p>
              )}
              {item.size && (
                <p className="text-xs md:text-sm text-muted font-medium">
                  Size: <span className="text-base-content">{item.size}</span>
                </p>
              )}
            </div>
          )}
          {item.category && (
            <p className="text-muted text-xs md:text-sm">{item.category}</p>
          )}

          <div className="mt-3 flex items-center gap-2 sm:gap-3">
            {/* Qty controls */}
            <div className="inline-flex items-center border border-border rounded-md overflow-hidden bg-surface-base/30">
              <button
                onClick={onDec}
                className="h-8 w-8 sm:h-9 sm:w-9 grid place-items-center hover:bg-surface-base transition-colors"
                aria-label="Decrease"
              >
                <RiSubtractLine className="text-sm sm:text-base" />
              </button>
              <span className="px-2 sm:px-3 text-sm font-semibold select-none">
                {item.qty}
              </span>
              <button
                onClick={onInc}
                className="h-8 w-8 sm:h-9 sm:w-9 grid place-items-center hover:bg-surface-base transition-colors"
                aria-label="Increase"
              >
                <RiAddLine className="text-sm sm:text-base" />
              </button>
            </div>

            <button
              onClick={onRemove}
              className="inline-flex items-center gap-1.5 text-sm text-error/80 hover:text-error hover:bg-error/10 px-2 py-1.5 rounded-lg transition-all"
            >
              <RiDeleteBin6Line className="text-base" />
              <span className="hidden xs:inline sm:hidden md:inline">Remove</span>
            </button>
          </div>
        </div>
      </div>

      {/* Line total */}
      <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between border-t border-border/50 sm:border-0 pt-3 sm:pt-0">
        <div className="text-left sm:text-right">
          <p className="font-bold text-lg text-primary">
            {subTotal} {CURRENCY}
          </p>
          <p className="text-xs text-muted">
            Unit: {unitPrice} {CURRENCY}
          </p>
        </div>
        {item.soldOut && (
          <span className="mt-0 sm:mt-1 inline-block text-[10px] sm:text-xs bg-error text-white font-medium rounded px-2 py-1">
            SOLD OUT
          </span>
        )}
      </div>
    </div>
  );
}
