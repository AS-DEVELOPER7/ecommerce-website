"use client";

export default function AdminMetricCard({ label, value, icon: Icon, colorClass }) {
  return (
    <div className="group bg-white/80 border border-neutral-200/60 shadow-sm hover:shadow-md hover:-translate-y-0.5 rounded-2xl p-5 flex items-center justify-between backdrop-blur-md transition-all duration-300">
      <div className="space-y-0.5">
        <span className="text-[9px] font-bold uppercase tracking-widest text-neutral-400">
          {label}
        </span>
        <p className="text-2xl font-bold text-neutral-800 tracking-tight">{value}</p>
      </div>
      <div className={`w-10 h-10 rounded-xl border flex items-center justify-center text-xl transition-all duration-300 group-hover:scale-105 ${colorClass}`}>
        <Icon />
      </div>
    </div>
  );
}
