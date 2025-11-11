"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";

import {
  setAddress,
  setPayment,
  clearCart,
} from "src/services/reducers/cartReducer";
import { useToast } from "src/components/ui/ToastProvider";
<<<<<<< HEAD
import { CURRENCY } from "src/constants";
import { FALLBACK_IMG } from "src/data";
import { FaLock } from "react-icons/fa";
=======
>>>>>>> b11839557a023584904ffae753ac1e71a1ec3a8c

/* =========================================
   Helpers
========================================= */
<<<<<<< HEAD

function money(n) {
  return `${Number(n).toFixed(2)} ${CURRENCY}`;
=======
const FALLBACK_IMG =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDTWQnjyq8wk7oC7RxhCK0oqtwz40dsH0HPMWoOhEFnKWEj01SDthaaa84DlblFq861CzdE_CWDsbUTPZCbcbpDkl89Wwm7cMv6C-WIjvNW2wKus_-EBZwAtDKYxLReU9a13CunB8hhBGh82GXBmj3yZR-9jj9Lb_dW5TubEB_2CPvXPMVaULAaHm9AikeEDig2BrG-UH7BtutkEDuoX5Nv7TNrQj9T7OsdHrN54jjYbz_5eKvcZTQ2cQ4ydgCUfNFopTENlAY400H9";

function money(n) {
  return `$${Number(n).toFixed(2)}`;
>>>>>>> b11839557a023584904ffae753ac1e71a1ec3a8c
}

/* =========================================
   Tiny Stepper
========================================= */
function Stepper({ step }) {
  const Item = ({ n, label }) => {
    const active = step === n;
    const done = step > n;
    return (
      <div className="flex items-center gap-3">
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
    <div className="flex items-center gap-5 mb-8">
      <Item n={1} label="Shipping" />
      <div className="flex-1 h-px bg-border" />
      <Item n={2} label="Payment" />
      <div className="flex-1 h-px bg-border" />
      <Item n={3} label="Review" />
    </div>
  );
}

/* =========================================
   Order Summary (right column)
========================================= */
<<<<<<< HEAD
function Summary({ items, shippingCharge }) {
=======
function Summary({ items, shippingCents }) {
>>>>>>> b11839557a023584904ffae753ac1e71a1ec3a8c
  const subtotal = useMemo(
    () => items.reduce((s, it) => s + it.price * it.qty, 0),
    [items]
  );
<<<<<<< HEAD
  const shipping = shippingCharge / 100;
=======
  const shipping = shippingCents / 100;
>>>>>>> b11839557a023584904ffae753ac1e71a1ec3a8c
  const total = subtotal + shipping;

  return (
    <aside className="bg-surface rounded-2xl p-5 border border-border h-fit">
      <h3 className="text-lg font-semibold mb-4">Order Summary</h3>

      <div className="space-y-4">
        {items.map((it) => {
          const img = it.image || it.images?.[0] || FALLBACK_IMG;
          return (
            <div key={it.cartId || it.id} className="flex items-center gap-3">
              <div className="relative w-14 h-14 rounded-lg overflow-hidden">
                <Image src={img} alt={it.name} fill className="object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{it.name}</p>
                <p className="text-xs text-muted">Qty: {it.qty}</p>
              </div>
              <p className="text-sm font-semibold">{money(it.price)}</p>
            </div>
          );
        })}
      </div>

      <div className="my-4 border-t border-border" />

      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-muted">Subtotal</span>
          <span className="font-medium">{money(subtotal)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted">Shipping</span>
          <span className="font-medium">
            {shipping ? money(shipping) : "Free"}
          </span>
        </div>
      </div>

      <div className="my-4 border-t border-border" />

      <div className="flex justify-between text-base">
        <span className="font-semibold">Total</span>
        <span className="font-semibold">{money(total)}</span>
      </div>
    </aside>
  );
}

/* =========================================
   Checkout Page (3 steps)
========================================= */
export default function CheckoutPage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { show } = useToast();

  const items = useSelector((s) => s.cart?.items ?? []);
  const savedAddress = useSelector((s) => s.cart?.address ?? {});
  const savedPayment = useSelector((s) => s.cart?.payment ?? {});

  const [step, setStep] = useState(1);
<<<<<<< HEAD
  const [shippingCharge, setShippingCharge] = useState(500); // 5 USD by default
=======
  const [shippingCents, setShippingCents] = useState(500); // 5 USD by default
>>>>>>> b11839557a023584904ffae753ac1e71a1ec3a8c
  const [payMethod, setPayMethod] = useState(savedPayment.method || "whatsapp");

  const [addr, setAddr] = useState({
    name: savedAddress.name || "",
    street: savedAddress.street || "",
    city: savedAddress.city || "",
    state: savedAddress.state || "",
    zip: savedAddress.zip || "",
    email: savedAddress.email || "",
    phone: savedAddress.phone || "",
    country: savedAddress.country || "",
  });
  const [errors, setErrors] = useState({}); // { field: "message" }

  const isCartEmpty = items.length === 0;
  const subtotal = useMemo(
    () => items.reduce((s, it) => s + it.price * it.qty, 0),
    [items]
  );
<<<<<<< HEAD
  const total = (subtotal + shippingCharge / 100).toFixed(2);
=======
  const total = (subtotal + shippingCents / 100).toFixed(2);
>>>>>>> b11839557a023584904ffae753ac1e71a1ec3a8c

  /* ---------- validations ---------- */
  const requiredFields = ["name", "street", "city", "zip", "email"];
  const validateShipping = () => {
    const next = {};
    for (const f of requiredFields) {
      if (!String(addr[f] || "").trim()) next[f] = "Required";
    }
    if (addr.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(addr.email)) {
      next.email = "Invalid email";
    }
    if (
      addr.phone &&
      addr.phone.replace(/\D/g, "").length > 0 &&
      addr.phone.replace(/\D/g, "").length < 7
    ) {
      next.phone = "Phone seems too short";
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const validatePayment = () => {
    if (!["whatsapp", "card", "paypal"].includes(payMethod)) {
      show({ type: "error", title: "Select a payment method" });
      return false;
    }
    return true;
  };

  const invalid = (name) =>
    errors[name]
      ? "border-rose-400 focus:ring-rose-400"
      : "border-border focus:ring-primary";

  /* ---------- step handlers ---------- */
  const goNextFromShipping = () => {
    if (isCartEmpty) {
      show({ type: "error", title: "Your cart is empty" });
      return;
    }
    if (!validateShipping()) {
      show({ type: "error", title: "Please fix the highlighted fields" });
      return;
    }
    dispatch(setAddress(addr));
    setStep(2);
    show({ type: "success", title: "Address saved" });
  };

  const goNextFromPayment = () => {
    if (!validatePayment()) return;
    dispatch(setPayment({ method: payMethod }));
    setStep(3);
  };

  const placeOrder = () => {
    if (isCartEmpty) {
      show({ type: "error", title: "Your cart is empty" });
      return;
    }
    if (!validateShipping()) {
      setStep(1);
      show({ type: "error", title: "Shipping info incomplete" });
      return;
    }
    if (!validatePayment()) {
      setStep(2);
      return;
    }
    // success
    dispatch(clearCart());
    show({
      type: "success",
      title: "Order placed!",
      description: `Total ${money(total)}`,
    });
    setTimeout(() => router.push("/"), 900);
  };

  /* ---------- UI ---------- */
  return (
    <main className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
      <Stepper step={step} />

      <div className="grid grid-cols-1 lg:grid-cols-[1fr,380px] gap-10 lg:gap-14">
        {/* LEFT SIDE */}
        <section className="space-y-8">
<<<<<<< HEAD
          {step === 1 &&
            shippingDetailsForm(
              invalid,
              addr,
              setAddr,
              errors,
              setShippingCharge,
              shippingCharge,
              goNextFromShipping
            )}

          {step === 2 &&
            displayPaymentOptions(
              setPayMethod,
              payMethod,
              setStep,
              goNextFromPayment
            )}

          {step === 3 &&
            reviewOrderDetails(setStep, addr, payMethod, items, placeOrder)}
        </section>

        {/* RIGHT SIDE */}
        <Summary items={items} shippingCharge={shippingCharge} />
=======
          {step === 1 && (
            <>
              <h2 className="text-3xl md:text-4xl font-black">
                Shipping Details
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="text-sm text-muted">Full Name</label>
                  <input
                    className={`w-full rounded-lg px-3 py-2 bg-surface border ${invalid(
                      "name"
                    )}`}
                    value={addr.name}
                    onChange={(e) => setAddr({ ...addr, name: e.target.value })}
                    placeholder="Enter your full name"
                  />
                  {errors.name && (
                    <p className="text-xs text-rose-600 mt-1">{errors.name}</p>
                  )}
                </div>

                <div className="md:col-span-2">
                  <label className="text-sm text-muted">Address</label>
                  <input
                    className={`w-full rounded-lg px-3 py-2 bg-surface border ${invalid(
                      "street"
                    )}`}
                    value={addr.street}
                    onChange={(e) =>
                      setAddr({ ...addr, street: e.target.value })
                    }
                    placeholder="123 Blossom Lane"
                  />
                  {errors.street && (
                    <p className="text-xs text-rose-600 mt-1">
                      {errors.street}
                    </p>
                  )}
                </div>

                <div>
                  <label className="text-sm text-muted">City</label>
                  <input
                    className={`w-full rounded-lg px-3 py-2 bg-surface border ${invalid(
                      "city"
                    )}`}
                    value={addr.city}
                    onChange={(e) => setAddr({ ...addr, city: e.target.value })}
                    placeholder="Petalburg"
                  />
                  {errors.city && (
                    <p className="text-xs text-rose-600 mt-1">{errors.city}</p>
                  )}
                </div>

                <div>
                  <label className="text-sm text-muted">State</label>
                  <input
                    className="w-full rounded-lg px-3 py-2 bg-surface border border-border focus:ring-primary"
                    value={addr.state}
                    onChange={(e) =>
                      setAddr({ ...addr, state: e.target.value })
                    }
                    placeholder="Your state"
                  />
                </div>

                <div>
                  <label className="text-sm text-muted">Zip Code</label>
                  <input
                    className={`w-full rounded-lg px-3 py-2 bg-surface border ${invalid(
                      "zip"
                    )}`}
                    value={addr.zip}
                    onChange={(e) => setAddr({ ...addr, zip: e.target.value })}
                    placeholder="12345"
                  />
                  {errors.zip && (
                    <p className="text-xs text-rose-600 mt-1">{errors.zip}</p>
                  )}
                </div>

                <div>
                  <label className="text-sm text-muted">Contact Number</label>
                  <input
                    className={`w-full rounded-lg px-3 py-2 bg-surface border ${invalid(
                      "phone"
                    )}`}
                    value={addr.phone}
                    onChange={(e) =>
                      setAddr({ ...addr, phone: e.target.value })
                    }
                    placeholder="(123) 456-7890"
                  />
                  {errors.phone && (
                    <p className="text-xs text-rose-600 mt-1">{errors.phone}</p>
                  )}
                </div>

                <div className="md:col-span-2">
                  <label className="text-sm text-muted">Email</label>
                  <input
                    className={`w-full rounded-lg px-3 py-2 bg-surface border ${invalid(
                      "email"
                    )}`}
                    value={addr.email}
                    onChange={(e) =>
                      setAddr({ ...addr, email: e.target.value })
                    }
                    placeholder="you@example.com"
                  />
                  {errors.email && (
                    <p className="text-xs text-rose-600 mt-1">{errors.email}</p>
                  )}
                </div>
              </div>

              {/* Delivery Preferences */}
              <div className="mt-4 space-y-3">
                <p className="font-semibold">Delivery Preferences</p>

                <button
                  onClick={() => setShippingCents(500)}
                  className={[
                    "w-full text-left rounded-xl border p-4 transition",
                    shippingCents === 500
                      ? "border-primary bg-primary/10"
                      : "border-border hover:bg-surface",
                  ].join(" ")}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span
                        className={`w-4 h-4 rounded-full border ${
                          shippingCents === 500
                            ? "bg-primary border-primary"
                            : "border-border"
                        }`}
                      />
                      <span>Standard Shipping</span>
                    </div>
                    <span className="font-semibold">{money(5)}</span>
                  </div>
                </button>

                <button
                  onClick={() => setShippingCents(1500)}
                  className={[
                    "w-full text-left rounded-xl border p-4 transition",
                    shippingCents === 1500
                      ? "border-primary bg-primary/10"
                      : "border-border hover:bg-surface",
                  ].join(" ")}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span
                        className={`w-4 h-4 rounded-full border ${
                          shippingCents === 1500
                            ? "bg-primary border-primary"
                            : "border-border"
                        }`}
                      />
                      <span>Express Shipping</span>
                    </div>
                    <span className="font-semibold">{money(15)}</span>
                  </div>
                </button>
              </div>

              <div className="flex items-center justify-between pt-6 border-t border-border">
                <Link
                  href="/cart"
                  className="text-sm text-muted hover:text-primary inline-flex items-center gap-2"
                >
                  ← Return to cart
                </Link>
                <button
                  onClick={goNextFromShipping}
                  className="h-11 px-6 rounded-xl text-white font-bold bg-primary hover:opacity-90"
                >
                  Continue to Payment
                </button>
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <h2 className="text-3xl md:text-4xl font-black">
                Payment Method
              </h2>

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
                      Send your <span className="font-semibold">Order ID</span>{" "}
                      to our WhatsApp number:
                      <span className="text-primary font-semibold">
                        {" "}
                        +1 (555) 123-4567
                      </span>
                      .
                    </li>
                    <li>
                      We will confirm your order and provide payment
                      instructions.
                    </li>
                    <li>Once confirmed, your order will be processed.</li>
                  </ol>
                </div>
              </button>

              {/* Card (UI only for now) */}
              <button
                onClick={() => setPayMethod("card")}
                className={[
                  "w-full text-left rounded-2xl border p-5 transition",
                  payMethod === "card"
                    ? "border-primary bg-primary/10"
                    : "border-border hover:bg-surface",
                ].join(" ")}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`w-4 h-4 rounded-full border ${
                      payMethod === "card"
                        ? "bg-primary border-primary"
                        : "border-border"
                    }`}
                  />
                  <span className="font-semibold">Credit or Debit Card</span>
                </div>
                <p className="text-sm text-muted mt-2">
                  Demo mode (no live processing)
                </p>
              </button>

              {/* PayPal (UI only) */}
              <button
                onClick={() => setPayMethod("paypal")}
                className={[
                  "w-full text-left rounded-2xl border p-5 transition",
                  payMethod === "paypal"
                    ? "border-primary bg-primary/10"
                    : "border-border hover:bg-surface",
                ].join(" ")}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`w-4 h-4 rounded-full border ${
                      payMethod === "paypal"
                        ? "bg-primary border-primary"
                        : "border-border"
                    }`}
                  />
                  <span className="font-semibold">Pay with PayPal</span>
                </div>
                <p className="text-sm text-muted mt-2">
                  Demo mode (no live processing)
                </p>
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
                  className="h-11 px-6 rounded-xl text-white font-bold bg-primary hover:opacity-90"
                >
                  Continue to Review
                </button>
              </div>
            </>
          )}

          {step === 3 && (
            <>
              <h2 className="text-3xl md:text-4xl font-black">
                Review Your Order
              </h2>

              {/* Address */}
              <div className="rounded-2xl border border-border p-5 bg-surface">
                <div className="flex items-center justify-between">
                  <p className="font-semibold">Shipping Address</p>
                  <button
                    onClick={() => setStep(1)}
                    className="text-primary text-sm"
                  >
                    Edit
                  </button>
                </div>
                <div className="mt-2 text-sm text-muted leading-6">
                  <div className="text-black font-medium">
                    {addr.name || "-"}
                  </div>
                  <div>{addr.street || "-"}</div>
                  <div>
                    {addr.city || "-"}
                    {addr.state ? `, ${addr.state}` : ""}
                    {addr.zip ? `, ${addr.zip}` : ""}
                  </div>
                  <div>{addr.email || "-"}</div>
                  {addr.phone && <div>{addr.phone}</div>}
                </div>
              </div>

              {/* Payment */}
              <div className="rounded-2xl border border-border p-5 bg-surface">
                <div className="flex items-center justify-between">
                  <p className="font-semibold">Payment Method</p>
                  <button
                    onClick={() => setStep(2)}
                    className="text-primary text-sm"
                  >
                    Edit
                  </button>
                </div>
                <div className="mt-2 text-sm text-muted capitalize">
                  {payMethod}
                </div>
              </div>

              {/* Items */}
              <div className="rounded-2xl border border-border p-5 bg-surface">
                <div className="flex items-center justify-between">
                  <p className="font-semibold">Items in Order</p>
                  <Link href="/cart" className="text-primary text-sm">
                    Edit
                  </Link>
                </div>
                <div className="mt-3 space-y-3">
                  {items.map((it) => {
                    const img = it.image || it.images?.[0] || FALLBACK_IMG;
                    return (
                      <div
                        key={it.cartId || it.id}
                        className="flex items-center gap-3"
                      >
                        <div className="relative w-12 h-12 rounded-lg overflow-hidden">
                          <Image
                            src={img}
                            alt={it.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">
                            {it.name}
                          </p>
                          <p className="text-xs text-muted">Qty: {it.qty}</p>
                        </div>
                        <p className="text-sm font-semibold">
                          {money(it.price)}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-border">
                <button
                  onClick={() => setStep(2)}
                  className="inline-flex items-center gap-2 text-sm text-muted hover:text-primary"
                >
                  ← Return to Payment
                </button>
                <button
                  onClick={placeOrder}
                  className="h-11 px-6 rounded-xl text-white font-bold inline-flex items-center gap-2 bg-primary hover:opacity-90"
                >
                  <span>Place Order</span>
                  <span className="material-symbols-outlined text-base">
                    lock
                  </span>
                </button>
              </div>
            </>
          )}
        </section>

        {/* RIGHT SIDE */}
        <Summary items={items} shippingCents={shippingCents} />
>>>>>>> b11839557a023584904ffae753ac1e71a1ec3a8c
      </div>
    </main>
  );
}
<<<<<<< HEAD
function reviewOrderDetails(setStep, addr, payMethod, items, placeOrder) {
  return (
    <>
      <h2 className="text-3xl md:text-4xl font-black">Review Your Order</h2>

      {/* Address */}
      <div className="rounded-2xl border border-border p-5 bg-surface">
        <div className="flex items-center justify-between">
          <p className="font-semibold">Shipping Address</p>
          <button onClick={() => setStep(1)} className="text-primary text-sm">
            Edit
          </button>
        </div>
        <div className="mt-2 text-sm text-muted leading-6">
          <div className="text-black font-medium">{addr.name || "-"}</div>
          <div>{addr.street || "-"}</div>
          <div>
            {addr.city || "-"}
            {addr.state ? `, ${addr.state}` : ""}
            {addr.zip ? `, ${addr.zip}` : ""}
          </div>
          <div>{addr.email || "-"}</div>
          {addr.phone && <div>{addr.phone}</div>}
        </div>
      </div>

      {/* Payment */}
      <div className="rounded-2xl border border-border p-5 bg-surface">
        <div className="flex items-center justify-between">
          <p className="font-semibold">Payment Method</p>
          <button onClick={() => setStep(2)} className="text-primary text-sm">
            Edit
          </button>
        </div>
        <div className="mt-2 text-sm text-muted capitalize">{payMethod}</div>
      </div>

      {/* Items */}
      <div className="rounded-2xl border border-border p-5 bg-surface">
        <div className="flex items-center justify-between">
          <p className="font-semibold">Items in Order</p>
          <Link href="/cart" className="text-primary text-sm">
            Edit
          </Link>
        </div>
        <div className="mt-3 space-y-3">
          {items.map((it) => {
            const img = it.image || it.images?.[0] || FALLBACK_IMG;
            return (
              <div key={it.cartId || it.id} className="flex items-center gap-3">
                <div className="relative w-12 h-12 rounded-lg overflow-hidden">
                  <Image
                    src={img}
                    alt={it.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{it.name}</p>
                  <p className="text-xs text-muted">Qty: {it.qty}</p>
                </div>
                <p className="text-sm font-semibold">{money(it.price)}</p>
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-border">
        <button
          onClick={() => setStep(2)}
          className="inline-flex items-center gap-2 text-sm text-muted hover:text-primary"
        >
          ← Return to Payment
        </button>
        <button
          onClick={placeOrder}
          className="h-11 px-6 rounded-xl text-white font-bold inline-flex items-center gap-2 bg-primary hover:opacity-90"
        >
          <span>Place Order</span>
          <FaLock />
        </button>
      </div>
    </>
  );
}

function displayPaymentOptions(
  setPayMethod,
  payMethod,
  setStep,
  goNextFromPayment
) {
  return (
    <>
      <h2 className="text-3xl md:text-4xl font-black">Payment Method</h2>

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
              Send your <span className="font-semibold">Order ID</span> to our
              WhatsApp number:
              <span className="text-primary font-semibold">
                {" "}
                +1 (555) 123-4567
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

      {/* Card (UI only for now) */}
      <button
        onClick={() => setPayMethod("card")}
        className={[
          "w-full text-left rounded-2xl border p-5 transition",
          payMethod === "card"
            ? "border-primary bg-primary/10"
            : "border-border hover:bg-surface",
        ].join(" ")}
      >
        <div className="flex items-center gap-3">
          <span
            className={`w-4 h-4 rounded-full border ${
              payMethod === "card"
                ? "bg-primary border-primary"
                : "border-border"
            }`}
          />
          <span className="font-semibold">Credit or Debit Card</span>
        </div>
        <p className="text-sm text-muted mt-2">
          Demo mode (no live processing)
        </p>
      </button>

      {/* PayPal (UI only) */}
      <button
        onClick={() => setPayMethod("paypal")}
        className={[
          "w-full text-left rounded-2xl border p-5 transition",
          payMethod === "paypal"
            ? "border-primary bg-primary/10"
            : "border-border hover:bg-surface",
        ].join(" ")}
      >
        <div className="flex items-center gap-3">
          <span
            className={`w-4 h-4 rounded-full border ${
              payMethod === "paypal"
                ? "bg-primary border-primary"
                : "border-border"
            }`}
          />
          <span className="font-semibold">Pay with PayPal</span>
        </div>
        <p className="text-sm text-muted mt-2">
          Demo mode (no live processing)
        </p>
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
          className="h-11 px-6 rounded-xl text-white font-bold bg-primary hover:opacity-90"
        >
          Continue to Review
        </button>
      </div>
    </>
  );
}

function shippingDetailsForm(
  invalid,
  addr,
  setAddr,
  errors,
  setShippingCharge,
  shippingCharge,
  goNextFromShipping
) {
  return (
    <>
      <h2 className="text-3xl md:text-4xl font-black">Shipping Details</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="md:col-span-2">
          <label className="text-sm text-muted">Full Name</label>
          <input
            className={`w-full rounded-lg px-3 py-2 bg-surface border ${invalid(
              "name"
            )}`}
            value={addr.name}
            onChange={(e) => setAddr({ ...addr, name: e.target.value })}
            placeholder="Enter your full name"
          />
          {errors.name && (
            <p className="text-xs text-rose-600 mt-1">{errors.name}</p>
          )}
        </div>

        <div className="md:col-span-2">
          <label className="text-sm text-muted">Address</label>
          <input
            className={`w-full rounded-lg px-3 py-2 bg-surface border ${invalid(
              "street"
            )}`}
            value={addr.street}
            onChange={(e) => setAddr({ ...addr, street: e.target.value })}
            placeholder="123 Blossom Lane"
          />
          {errors.street && (
            <p className="text-xs text-rose-600 mt-1">{errors.street}</p>
          )}
        </div>

        <div>
          <label className="text-sm text-muted">City</label>
          <input
            className={`w-full rounded-lg px-3 py-2 bg-surface border ${invalid(
              "city"
            )}`}
            value={addr.city}
            onChange={(e) => setAddr({ ...addr, city: e.target.value })}
            placeholder="Petalburg"
          />
          {errors.city && (
            <p className="text-xs text-rose-600 mt-1">{errors.city}</p>
          )}
        </div>

        <div>
          <label className="text-sm text-muted">State</label>
          <input
            className="w-full rounded-lg px-3 py-2 bg-surface border border-border focus:ring-primary"
            value={addr.state}
            onChange={(e) => setAddr({ ...addr, state: e.target.value })}
            placeholder="Your state"
          />
        </div>

        <div>
          <label className="text-sm text-muted">Zip Code</label>
          <input
            className={`w-full rounded-lg px-3 py-2 bg-surface border ${invalid(
              "zip"
            )}`}
            value={addr.zip}
            onChange={(e) => setAddr({ ...addr, zip: e.target.value })}
            placeholder="12345"
          />
          {errors.zip && (
            <p className="text-xs text-rose-600 mt-1">{errors.zip}</p>
          )}
        </div>

        <div>
          <label className="text-sm text-muted">Contact Number</label>
          <input
            className={`w-full rounded-lg px-3 py-2 bg-surface border ${invalid(
              "phone"
            )}`}
            value={addr.phone}
            onChange={(e) => setAddr({ ...addr, phone: e.target.value })}
            placeholder="(123) 456-7890"
          />
          {errors.phone && (
            <p className="text-xs text-rose-600 mt-1">{errors.phone}</p>
          )}
        </div>

        <div className="md:col-span-2">
          <label className="text-sm text-muted">Email</label>
          <input
            className={`w-full rounded-lg px-3 py-2 bg-surface border ${invalid(
              "email"
            )}`}
            value={addr.email}
            onChange={(e) => setAddr({ ...addr, email: e.target.value })}
            placeholder="you@example.com"
          />
          {errors.email && (
            <p className="text-xs text-rose-600 mt-1">{errors.email}</p>
          )}
        </div>
      </div>

      {/* Delivery Preferences */}
      <div className="mt-4 space-y-3">
        <p className="font-semibold">Delivery Preferences</p>

        <button
          onClick={() => setShippingCharge(500)}
          className={[
            "w-full text-left rounded-xl border p-4 transition",
            shippingCharge === 500
              ? "border-primary bg-primary/10"
              : "border-border hover:bg-surface",
          ].join(" ")}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span
                className={`w-4 h-4 rounded-full border ${
                  shippingCharge === 500
                    ? "bg-primary border-primary"
                    : "border-border"
                }`}
              />
              <span>Standard Shipping</span>
            </div>
            <span className="font-semibold">{money(5)}</span>
          </div>
        </button>

        <button
          onClick={() => setShippingCharge(1500)}
          className={[
            "w-full text-left rounded-xl border p-4 transition",
            shippingCharge === 1500
              ? "border-primary bg-primary/10"
              : "border-border hover:bg-surface",
          ].join(" ")}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span
                className={`w-4 h-4 rounded-full border ${
                  shippingCharge === 1500
                    ? "bg-primary border-primary"
                    : "border-border"
                }`}
              />
              <span>Express Shipping</span>
            </div>
            <span className="font-semibold">{money(15)}</span>
          </div>
        </button>
      </div>

      <div className="flex items-center justify-between pt-6 border-t border-border">
        <Link
          href="/cart"
          className="text-sm text-muted hover:text-primary inline-flex items-center gap-2"
        >
          ← Return to cart
        </Link>
        <button
          onClick={goNextFromShipping}
          className="h-11 px-6 rounded-xl text-white font-bold bg-primary hover:opacity-90"
        >
          Continue to Payment
        </button>
      </div>
    </>
  );
}
=======
>>>>>>> b11839557a023584904ffae753ac1e71a1ec3a8c
