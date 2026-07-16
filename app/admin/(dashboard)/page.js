"use client";

import { useState, useEffect } from "react";
import { supabase } from "src/services/reducers/supabaseClient";
import { RiLoader5Line } from "react-icons/ri";
import AdminMetricsGrid from "src/components/organisms/admin/dashboard/AdminMetricsGrid";
import AdminLowStockAlerts from "src/components/organisms/admin/dashboard/AdminLowStockAlerts";

export default function AdminDashboardHome() {
  const [metrics, setMetrics] = useState({
    totalProducts: 0,
    outOfStockCount: 0,
    totalCategories: 0,
  });
  const [lowStockAlerts, setLowStockAlerts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      // 1. Fetch total products count
      const { count: prodCount } = await supabase
        .from("products")
        .select("id", { count: "exact", head: true });

      // 2. Fetch out-of-stock variants count
      const { count: outStockCount } = await supabase
        .from("product_variants")
        .select("id", { count: "exact", head: true })
        .eq("stock", 0);

      // 3. Fetch total categories count
      const { count: catCount } = await supabase
        .from("categories")
        .select("id", { count: "exact", head: true });

      // 4. Fetch variants with low stock (< 5)
      const { data: lowStockData } = await supabase
        .from("product_variants")
        .select(`
          id,
          stock,
          price,
          product_id,
          products (
            id,
            title
          ),
          sizes (
            name
          )
        `)
        .lt("stock", 5)
        .order("stock", { ascending: true })
        .limit(10);

      setMetrics({
        totalProducts: prodCount || 0,
        outOfStockCount: outStockCount || 0,
        totalCategories: catCount || 0,
      });

      // Filter null product records and map nicely
      const formattedAlerts = (lowStockData || [])
        .filter((item) => item.products)
        .map((item) => ({
          id: item.id,
          productId: item.products.id,
          productTitle: item.products.title,
          sizeName: item.sizes?.name || "Free Size",
          stock: item.stock,
        }));

      setLowStockAlerts(formattedAlerts);
    } catch (err) {
      console.error("Error loading dashboard metrics:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="py-20 flex flex-col items-center justify-center text-neutral-400">
        <RiLoader5Line className="text-4xl animate-spin mb-3 text-primary" />
        <span className="text-sm font-semibold tracking-widest">LOADING DASHBOARD METRICS...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6 relative z-10">
      {/* Title Header */}
      <div>
        <h1 className="font-serif text-2xl font-bold text-neutral-800">Admin Dashboard</h1>
        <p className="text-xs text-neutral-500 mt-1">
          Catalog metrics, active alerts, and quick inventory updates.
        </p>
      </div>

      {/* Summary Cards Grid */}
      <AdminMetricsGrid metrics={metrics} />

      {/* Low Stock Alerts */}
      <AdminLowStockAlerts lowStockAlerts={lowStockAlerts} />
    </div>
  );
}
