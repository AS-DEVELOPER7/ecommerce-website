"use client";

export default function Stepper({ step }) {
  const Item = ({ n, label }) => {
    const active = step === n;
    const done = step > n;
    return (
      <div className="flex flex-col md:flex-row text-xs sm:text-base items-center gap-3">
        <span
          className={[
            "w-7 h-7 rounded-full grid place-items-center text-xs font-bold",
            done
              ? "bg-primary text-white"
              : active
                ? "border-2 border-primary text-primary"
                : "border border-border text-muted",
          ].join(" ")}
        >
          {n}
        </span>
        <span
          className={active || done ? "text-black font-semibold" : "text-muted"}
        >
          {label}
        </span>
      </div>
    );
  };

  return (
    <div className="flex items-start md:items-center gap-2 mb-8">
      <Item n={1} label="Shipping" />
      <div className="flex-1 h-px bg-border mt-4 md:mt-0" />
      <Item n={2} label="Payment" />
      <div className="flex-1 h-px bg-border mt-4 md:mt-0" />
      <Item n={3} label="Review" />
    </div>
  );
}
