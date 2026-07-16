"use client";

import { CONTACT_INFO } from "src/constants";

export default function PaymentOptions({
  setPayMethod,
  payMethod,
  setStep,
  goNextFromPayment,
}) {
  return (
    <>
      <h2 className="text-2xl md:text-3xl font-black">Payment Method</h2>

      {/* WhatsApp */}
      <button
        onClick={() => setPayMethod("whatsapp")}
        className={[
          "w-full text-left rounded-2xl border p-5 transition",
          payMethod === "whatsapp"
            ? "border-primary bg-primary/10"
            : "border-border hover:bg-surface",
        ].join(" ")}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span
              className={`w-4 h-4 rounded-full border ${
                payMethod === "whatsapp"
                  ? "bg-primary border-primary"
                  : "border-border"
              }`}
            />
            <span className="font-semibold">Pay via WhatsApp</span>
          </div>
          <span>🟢</span>
        </div>
        <div className="mt-3 text-sm">
          <p className="font-semibold">Instructions:</p>
          <ol className="list-decimal list-inside space-y-1 text-muted">
            <li>
              Send your <span className="font-semibold">Order</span> to our
              WhatsApp number:
              <span className="text-primary font-semibold">
                {" "}
                {CONTACT_INFO.PHONE}
              </span>
              .
            </li>
            <li>
              We will confirm your order and provide payment instructions.
            </li>
            <li>Once confirmed, your order will be processed.</li>
          </ol>
        </div>
      </button>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-border">
        <button
          onClick={() => setStep(1)}
          className="inline-flex items-center gap-2 text-sm text-muted hover:text-primary"
        >
          ← Return to Shipping
        </button>
        <button
          onClick={goNextFromPayment}
          className="h-11 px-6 rounded-xl text-xs text-white font-bold bg-primary hover:opacity-90"
        >
          Continue to Review
        </button>
      </div>
    </>
  );
}
