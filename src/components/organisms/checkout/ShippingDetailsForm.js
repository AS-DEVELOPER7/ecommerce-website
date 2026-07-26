"use client";
import Link from "next/link";
import { money } from "src/utils/money";
import { RiMapPinLine, RiTruckLine, RiArrowLeftLine } from "react-icons/ri";

export default function ShippingDetailsForm({
  invalid,
  addr,
  setAddr,
  errors,
  goNextFromShipping,
  isFreeShipping,
  shippingCost,
}) {
  return (
    <div className="bg-white/90 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-neutral-200/80 shadow-xl space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3 pb-4 border-b border-neutral-200/80">
        <div className="w-10 h-10 rounded-2xl bg-primary/10 text-primary flex items-center justify-center text-xl shrink-0">
          <RiMapPinLine />
        </div>
        <div>
          <h2 className="text-2xl sm:text-3xl font-serif font-semibold text-neutral-900">
            Shipping Details
          </h2>
          <p className="text-xs sm:text-sm text-neutral-500 font-normal">
            Enter your delivery address and contact information.
          </p>
        </div>
      </div>

      {/* Form Fields Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="md:col-span-2">
          <label className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-neutral-700 mb-1.5 block">
            Full Name
          </label>
          <input
            className={`w-full rounded-2xl px-4 py-3 bg-neutral-50/70 border text-neutral-900 text-sm font-medium transition duration-200 outline-none ${invalid(
              "name",
            )}`}
            value={addr.name}
            onChange={(e) => setAddr({ ...addr, name: e.target.value })}
            placeholder="Enter your full name"
          />
          {errors.name && (
            <p className="text-xs text-rose-600 mt-1 font-medium">{errors.name}</p>
          )}
        </div>

        <div className="md:col-span-2">
          <label className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-neutral-700 mb-1.5 block">
            Address
          </label>
          <input
            className={`w-full rounded-2xl px-4 py-3 bg-neutral-50/70 border text-neutral-900 text-sm font-medium transition duration-200 outline-none ${invalid(
              "street",
            )}`}
            value={addr.street}
            onChange={(e) => setAddr({ ...addr, street: e.target.value })}
            placeholder="123 Blossom Lane, Apartment / House No."
          />
          {errors.street && (
            <p className="text-xs text-rose-600 mt-1 font-medium">{errors.street}</p>
          )}
        </div>

        <div>
          <label className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-neutral-700 mb-1.5 block">
            City
          </label>
          <input
            className={`w-full rounded-2xl px-4 py-3 bg-neutral-50/70 border text-neutral-900 text-sm font-medium transition duration-200 outline-none ${invalid(
              "city",
            )}`}
            value={addr.city}
            onChange={(e) => setAddr({ ...addr, city: e.target.value })}
            placeholder="City (e.g. Sagwara)"
          />
          {errors.city && (
            <p className="text-xs text-rose-600 mt-1 font-medium">{errors.city}</p>
          )}
        </div>

        <div>
          <label className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-neutral-700 mb-1.5 block">
            State
          </label>
          <input
            className="w-full rounded-2xl px-4 py-3 bg-neutral-50/70 border border-neutral-200 focus:border-primary focus:ring-2 focus:ring-primary/20 text-neutral-900 text-sm font-medium transition duration-200 outline-none"
            value={addr.state}
            onChange={(e) => setAddr({ ...addr, state: e.target.value })}
            placeholder="State"
          />
        </div>

        <div>
          <label className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-neutral-700 mb-1.5 block">
            Zip Code
          </label>
          <input
            className={`w-full rounded-2xl px-4 py-3 bg-neutral-50/70 border text-neutral-900 text-sm font-medium transition duration-200 outline-none ${invalid(
              "zip",
            )}`}
            value={addr.zip}
            onChange={(e) => setAddr({ ...addr, zip: e.target.value })}
            placeholder="Pincode / Zip Code"
          />
          {errors.zip && (
            <p className="text-xs text-rose-600 mt-1 font-medium">{errors.zip}</p>
          )}
        </div>

        <div>
          <label className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-neutral-700 mb-1.5 block">
            Contact Number
          </label>
          <input
            className={`w-full rounded-2xl px-4 py-3 bg-neutral-50/70 border text-neutral-900 text-sm font-medium transition duration-200 outline-none ${invalid(
              "phone",
            )}`}
            value={addr.phone}
            onChange={(e) => setAddr({ ...addr, phone: e.target.value })}
            placeholder="(123) 456-7890"
          />
          {errors.phone && (
            <p className="text-xs text-rose-600 mt-1 font-medium">{errors.phone}</p>
          )}
        </div>

        <div className="md:col-span-2">
          <label className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-neutral-700 mb-1.5 block">
            Email
          </label>
          <input
            className={`w-full rounded-2xl px-4 py-3 bg-neutral-50/70 border text-neutral-900 text-sm font-medium transition duration-200 outline-none ${invalid(
              "email",
            )}`}
            value={addr.email}
            onChange={(e) => setAddr({ ...addr, email: e.target.value })}
            placeholder="you@example.com"
          />
          {errors.email && (
            <p className="text-xs text-rose-600 mt-1 font-medium">{errors.email}</p>
          )}
        </div>
      </div>

      {/* Delivery Preference */}
      <div className="pt-2">
        <label className="text-xs sm:text-sm font-bold uppercase tracking-widest text-neutral-700 mb-3 block">
          Delivery Preference
        </label>

        <div className="w-full text-left rounded-2xl border border-primary/40 bg-primary/5 p-4 transition-all duration-300 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="w-4 h-4 rounded-full border-2 border-primary bg-primary shrink-0" />
              <span className="font-semibold text-neutral-900 text-sm sm:text-base flex items-center gap-2">
                <RiTruckLine className="text-primary text-lg" /> Standard Shipping
              </span>
            </div>
            <span className="font-bold text-primary text-sm sm:text-base">
              {isFreeShipping ? "Free" : money(shippingCost)}
            </span>
          </div>
          {!isFreeShipping && (
            <p className="mt-2 text-xs text-neutral-500 leading-relaxed italic pl-7">
              * Delivery is free within Sagwara or on orders above {money(5000)}.
            </p>
          )}
        </div>
      </div>

      {/* Action Footer */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-neutral-200">
        <Link
          href="/cart"
          className="text-xs sm:text-sm font-medium text-neutral-600 hover:text-primary inline-flex items-center gap-2 transition-colors cursor-pointer"
        >
          <RiArrowLeftLine /> Return to cart
        </Link>
        <button
          type="button"
          onClick={goNextFromShipping}
          className="w-full sm:w-auto h-12 px-8 rounded-full text-sm text-white font-bold bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20 transition-all duration-300 cursor-pointer"
        >
          Continue to Payment
        </button>
      </div>
    </div>
  );
}
