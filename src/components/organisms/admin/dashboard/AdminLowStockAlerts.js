"use client";

import Link from "next/link";
import { RiArrowRightUpLine } from "react-icons/ri";

export default function AdminLowStockAlerts({ lowStockAlerts }) {
  return (
    <div className="bg-white/80 border border-neutral-200/60 shadow-md rounded-2xl p-5 sm:p-6 space-y-4 backdrop-blur-md">
      <div className="flex items-center justify-between border-b border-neutral-200/60 pb-3">
        <h3 className="font-serif text-lg font-bold text-neutral-800">
          Low Stock Alerts
        </h3>
        <span className="text-[9px] font-bold text-danger bg-error-bg border border-danger/25 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
          Stock Limit &lt; 5
        </span>
      </div>

      {lowStockAlerts.length === 0 ? (
        <p className="text-sm text-neutral-400 italic text-center py-6">
          Excellent! All variant inventories are well-stocked.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-neutral-200/60 text-neutral-400 font-bold uppercase tracking-wider pb-2">
                <th className="py-2">Product Title</th>
                <th className="py-2">Size Option</th>
                <th className="py-2">Current Stock</th>
                <th className="py-2 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {lowStockAlerts.map((alertItem) => (
                <tr key={alertItem.id} className="hover:bg-neutral-50/50 transition-colors duration-300">
                  <td className="py-3.5 font-bold text-neutral-700">
                    {alertItem.productTitle}
                  </td>
                  <td className="py-3.5 text-neutral-600 font-medium">
                    {alertItem.sizeName}
                  </td>
                  <td className="py-3.5">
                    <span className={`px-2 py-0.5 rounded-full font-bold text-[10px] uppercase border ${
                      alertItem.stock === 0
                        ? "bg-danger/10 text-danger border-danger/25"
                        : "bg-warning-bg text-warning border-warning/25"
                    }`}>
                      {alertItem.stock === 0 ? "Out of Stock" : `${alertItem.stock} Left`}
                    </span>
                  </td>
                  <td className="py-3.5 text-right">
                    <Link href={`/admin/products/${alertItem.productId}/edit`}>
                      <button className="inline-flex items-center gap-1.5 px-2.5 py-1 border border-primary text-primary hover:bg-primary hover:text-white rounded-lg text-[11px] font-bold cursor-pointer shadow-sm hover:shadow transition duration-300">
                        Restock <RiArrowRightUpLine className="text-xs" />
                      </button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
