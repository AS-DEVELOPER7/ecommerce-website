"use client";

import {
  RiShoppingBagLine,
  RiAlarmWarningLine,
  RiFileList3Line,
} from "react-icons/ri";
import AdminMetricCard from "src/components/molecules/admin/dashboard/AdminMetricCard";

export default function AdminMetricsGrid({ metrics }) {
  const metricCards = [
    {
      label: "Total Products Listings",
      value: metrics.totalProducts,
      icon: RiShoppingBagLine,
      colorClass: "text-primary bg-primary/10 border-primary/20",
    },
    {
      label: "Out of Stock Items",
      value: metrics.outOfStockCount,
      icon: RiAlarmWarningLine,
      colorClass: "text-danger bg-error-bg border-danger/20",
    },
    {
      label: "Product Categories",
      value: metrics.totalCategories,
      icon: RiFileList3Line,
      colorClass: "text-neutral-700 bg-neutral-100 border-neutral-300/35",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {metricCards.map((card, idx) => (
        <AdminMetricCard
          key={idx}
          label={card.label}
          value={card.value}
          icon={card.icon}
          colorClass={card.colorClass}
        />
      ))}
    </div>
  );
}
