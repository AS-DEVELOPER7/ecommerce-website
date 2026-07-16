"use client";

import { Fragment } from "react";
import Link from "next/link";
import {
  RiEditLine,
  RiDeleteBinLine,
  RiArrowDownSLine,
  RiArrowUpSLine,
} from "react-icons/ri";
import { CURRENCY } from "src/constants";
import InlineStockEditor from "src/components/molecules/admin/products/InlineStockEditor";
import { previewImage } from "src/utils/previewImage";

export default function ProductsTable({
  products = [],
  expandedRows = {},
  toggleRow,
  editingStock = {},
  setEditingStock,
  savingStock = {},
  handleInlineStockSave,
  onDeleteClick,
}) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-neutral-200/60 bg-neutral-50/75 text-neutral-500 text-[10px] font-bold uppercase tracking-wider">
            <th className="py-3 px-4 w-14">Image</th>
            <th className="py-3 px-4">Product Details</th>
            <th className="py-3 px-4">Base Price</th>
            <th className="py-3 px-4">Attributes & Status</th>
            <th className="py-3 px-4">Stock Status</th>
            <th className="py-3 px-4 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-neutral-100">
          {products.map((product) => {
            const hasVariants = product.variants && product.variants.length > 0;

            return (
              <Fragment key={product.id}>
                {/* Product Row */}
                <tr className="hover:bg-white/30 transition-colors duration-300">
                  {/* Thumbnail image */}
                  <td className="py-3 px-4">
                    <div
                      onClick={() => product.images?.[0] && previewImage(product.images[0])}
                      className={`w-10 h-12 rounded-lg border border-neutral-200 bg-neutral-100 overflow-hidden shadow-inner flex items-center justify-center shrink-0 ${
                        product.images?.[0] ? "cursor-zoom-in hover:scale-105 transition-all duration-300" : ""
                      }`}
                    >
                      {product.images?.[0] ? (
                        <img
                          src={product.images[0]}
                          alt={product.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="text-[9px] text-neutral-400 font-bold uppercase text-center leading-tight">
                          No Pix
                        </span>
                      )}
                    </div>
                  </td>

                  {/* Title & Description */}
                  <td className="py-3 px-4">
                    <div className="flex flex-col">
                      <span className="font-serif font-bold text-neutral-800 text-sm leading-tight">
                        {product.title}
                      </span>
                      <span className="text-[10px] text-neutral-400 font-semibold tracking-wider mt-1 truncate max-w-xs">
                        {product.slug}
                      </span>
                    </div>
                  </td>

                  {/* Base Price */}
                  <td className="py-3 px-4">
                    <span className="font-semibold text-neutral-700 text-xs">
                      {product.price} {CURRENCY}
                    </span>
                  </td>

                  {/* Badges / Status */}
                  <td className="py-3 px-4">
                    <div className="flex flex-wrap gap-1">
                      {product.is_featured && (
                        <span className="text-[8px] font-bold bg-primary/10 text-primary border border-primary/20 px-1.5 py-0.5 rounded-full uppercase tracking-wider">
                          Featured
                        </span>
                      )}
                      {product.sold_out ? (
                        <span className="text-[8px] font-bold bg-danger/10 text-danger border border-danger/20 px-1.5 py-0.5 rounded-full uppercase tracking-wider">
                          Sold Out
                        </span>
                      ) : (
                        <span className="text-[8px] font-bold bg-success-bg text-success border border-success/20 px-1.5 py-0.5 rounded-full uppercase tracking-wider">
                          In Stock
                        </span>
                      )}
                    </div>
                  </td>

                  {/* Stock Column */}
                  <td className="py-3 px-4">
                    {hasVariants ? (
                      <button
                        onClick={() => toggleRow(product.id)}
                        className="flex items-center gap-1 bg-white border border-neutral-300 shadow-sm hover:border-primary hover:text-primary px-2.5 py-1 rounded-lg text-[10px] font-semibold cursor-pointer transition duration-300"
                      >
                        <span>
                          {product.variants.length} variant
                          {product.variants.length === 1 ? "" : "s"}
                        </span>
                        {expandedRows[product.id] ? (
                          <RiArrowUpSLine className="text-sm" />
                        ) : (
                          <RiArrowDownSLine className="text-sm" />
                        )}
                      </button>
                    ) : (
                      <span className="text-[10px] text-neutral-500 italic">
                        No variants defined
                      </span>
                    )}
                  </td>

                  {/* Actions */}
                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <Link href={`/admin/products/${product.id}/edit`}>
                        <button
                          title="Edit Product"
                          className="p-1.5 rounded-lg border border-neutral-300 bg-white text-neutral-600 hover:text-primary hover:border-primary transition duration-300 cursor-pointer shadow-sm hover:shadow"
                        >
                          <RiEditLine className="text-xs" />
                        </button>
                      </Link>
                      <button
                        onClick={() => onDeleteClick(product.id)}
                        title="Delete Product"
                        className="p-1.5 rounded-lg border border-danger/20 bg-error-bg text-danger hover:bg-danger hover:text-white transition duration-300 cursor-pointer shadow-sm"
                      >
                        <RiDeleteBinLine className="text-xs" />
                      </button>
                    </div>
                  </td>
                </tr>

                {/* Collapsible Variant Sub-table */}
                {hasVariants && expandedRows[product.id] && (
                  <tr className="bg-neutral-50/30">
                    <td
                      colSpan="6"
                      className="py-4 px-8 border-b border-neutral-200/60"
                    >
                      <div className="border border-neutral-200/80 bg-white/60 rounded-2xl p-4 shadow-inner">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-500 mb-3">
                          Variant Inventory & Pricing Overrides
                        </h4>
                        <table className="w-full text-left text-xs border-collapse">
                          <thead>
                            <tr className="border-b border-neutral-200 text-neutral-400 font-bold uppercase pb-2">
                              <th className="py-2">Options Info</th>
                              <th className="py-2">Colors</th>
                              <th className="py-2">Variant Price</th>
                              <th className="py-2 w-36">Stock Quantity</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-neutral-100">
                            {product.variants.map((v) => {
                              const targetKey = v.id;
                              const isEditing = editingStock[targetKey] !== undefined;
                              const editVal = isEditing ? editingStock[targetKey] : v.stock;
                              const isSaving = savingStock[targetKey];

                              return (
                                <tr key={v.id} className="hover:bg-neutral-50/50">
                                  <td className="py-2.5 font-semibold text-neutral-700">
                                    Size: {v.sizes?.name || "Free Size"}
                                  </td>
                                  <td className="py-2.5">
                                    <div className="flex gap-1.5">
                                      {v.colors && v.colors.length > 0 ? (
                                        v.colors.map((c) => (
                                          <span
                                            key={c.id}
                                            className="px-2 py-0.5 rounded-full text-[10px] font-bold border border-neutral-200 bg-neutral-100 text-neutral-600"
                                          >
                                            {c.name}
                                          </span>
                                        ))
                                      ) : (
                                        <span className="text-neutral-400 italic">
                                          No color
                                        </span>
                                      )}
                                    </div>
                                  </td>
                                  <td className="py-2.5 font-bold text-neutral-600">
                                    {v.price !== null
                                      ? `${v.price} ${CURRENCY}`
                                      : "Inherited"}
                                  </td>
                                  {/* Inline stock input */}
                                  <td className="py-2.5">
                                    <InlineStockEditor
                                      value={editVal}
                                      isEditing={isEditing}
                                      isSaving={isSaving}
                                      onChange={(newVal) =>
                                        setEditingStock((prev) => ({
                                          ...prev,
                                          [targetKey]: newVal,
                                        }))
                                      }
                                      onSave={() =>
                                        handleInlineStockSave(product, editVal, v.id)
                                      }
                                      onCancel={() =>
                                        setEditingStock((prev) => {
                                          const next = { ...prev };
                                          delete next[targetKey];
                                          return next;
                                        })
                                      }
                                    />
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    </td>
                  </tr>
                )}
              </Fragment>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
