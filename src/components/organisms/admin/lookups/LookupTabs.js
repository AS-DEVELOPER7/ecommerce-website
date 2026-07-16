"use client";

export default function LookupTabs({ tabs, activeTab, onTabSelect }) {
  return (
    <div className="flex border-b border-neutral-200/60 gap-4 overflow-x-auto pb-1">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabSelect(tab.id)}
          className={`py-3 px-4 font-semibold text-sm relative transition duration-300 cursor-pointer whitespace-nowrap ${
            activeTab === tab.id
              ? "text-primary border-b-2 border-primary"
              : "text-neutral-500 hover:text-neutral-800"
          }`}
        >
          {tab.label}{" "}
          <span className="ml-1 bg-neutral-100 text-neutral-600 text-xs px-2 py-0.5 rounded-full font-bold">
            {tab.count}
          </span>
        </button>
      ))}
    </div>
  );
}
