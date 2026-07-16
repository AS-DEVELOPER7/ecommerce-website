"use client";

import Link from "next/link";
import {
  RiDashboardLine,
  RiShoppingBagLine,
  RiFileListLine,
  RiBillLine,
  RiLogoutBoxRLine,
  RiUserLine,
  RiSettings4Line,
} from "react-icons/ri";

export default function AdminSidebar({ pathname, user, onLogout }) {
  const menuItems = [
    { label: "Dashboard", href: "/admin", icon: RiDashboardLine },
    {
      label: "Products Catalog",
      href: "/admin/products",
      icon: RiShoppingBagLine,
    },
    { label: "Manage Lookups", href: "/admin/lookups", icon: RiSettings4Line },
    {
      label: "Orders (Coming Soon)",
      href: "#",
      icon: RiFileListLine,
      disabled: true,
    },
    {
      label: "Invoices (Coming Soon)",
      href: "#",
      icon: RiBillLine,
      disabled: true,
    },
  ];

  return (
    <aside className="w-60 h-screen sticky top-0 bg-white/60 border-r border-neutral-200/80 shadow-glass backdrop-blur-lg flex flex-col justify-between shrink-0 relative z-20">
      <div className="flex flex-col">
        <div className="p-5 border-b border-neutral-200/60">
          <Link href="/admin" className="flex items-center gap-2.5">
            <span className="w-7 h-7 rounded-full bg-primary flex items-center justify-center text-white font-serif font-bold text-xs shadow-md shadow-primary/25">
              T
            </span>
            <span className="font-serif font-bold text-base text-neutral-800 tracking-tight">
              Tarmal Creator
            </span>
          </Link>
        </div>

        <nav className="p-3.5 space-y-1.5">
          {menuItems.map((item, idx) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            if (item.disabled) {
              return (
                <div
                  key={idx}
                  className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-[10px] font-bold uppercase tracking-wider text-neutral-400 cursor-not-allowed opacity-60"
                >
                  <Icon className="text-base" />
                  <span>{item.label}</span>
                </div>
              );
            }

            return (
              <Link
                key={idx}
                href={item.href}
                className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-[11px] font-bold uppercase tracking-wider transition-all duration-300 border ${
                  isActive
                    ? "bg-white/90 text-neutral-800 shadow-sm border-neutral-200/55"
                    : "text-neutral-500 hover:bg-white/70 hover:text-neutral-800 hover:shadow-sm border-transparent"
                }`}
              >
                <Icon
                  className={`text-base transition-colors duration-300 ${isActive ? "text-primary" : "text-neutral-400"}`}
                />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* User Card & Logout button */}
      <div className="p-3.5 border-t border-neutral-200/60 space-y-3">
        <div className="flex items-center gap-2.5 p-2.5 rounded-xl border border-white/60 bg-white/40 shadow-sm backdrop-blur-md">
          <div className="w-7 h-7 rounded-full bg-neutral-200 border border-white flex items-center justify-center text-neutral-600 shadow-inner shrink-0">
            <RiUserLine />
          </div>
          <div className="flex flex-col overflow-hidden">
            <span className="text-[9px] font-bold text-neutral-400 uppercase tracking-widest leading-none">
              Admin
            </span>
            <span
              className="text-[10px] font-bold text-neutral-700 truncate mt-1"
              title={user?.email}
            >
              {user?.email}
            </span>
          </div>
        </div>

        <button
          onClick={onLogout}
          className="w-full flex items-center justify-center gap-2 py-2 rounded-xl text-xs font-bold text-danger border border-danger/25 bg-error-bg hover:bg-danger hover:text-white hover:border-danger hover:shadow-md cursor-pointer transition-all duration-300"
        >
          <RiLogoutBoxRLine className="text-base" />
          <span>LOGOUT</span>
        </button>
      </div>
    </aside>
  );
}
