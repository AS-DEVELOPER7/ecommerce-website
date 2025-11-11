"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import {
  removeFromCart, // expects: cartId (string)
  updateQuantity, // expects: { cartId, qty }
  clearCart, // no payload
} from "../../src/services/reducers/cartReducer";

import {
  RiDeleteBin6Line,
  RiAddLine,
  RiSubtractLine,
  RiShoppingBag3Line,
  RiArrowLeftSLine,
} from "react-icons/ri";
<<<<<<< HEAD
import { FALLBACK_IMG } from "src/data";
import { CURRENCY } from "src/constants";

/* Row */
function CartRow({ item, onInc, onDec, onRemove }) {
  const subTotal = (Number(item.price) * Number(item.qty)).toFixed(2);
  const unitPrice = Number(item.price).toFixed(2);
=======

const FALLBACK_IMG =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDTWQnjyq8wk7oC7RxhCK0oqtwz40dsH0HPMWoOhEFnKWEj01SDthaaa84DlblFq861CzdE_CWDsbUTPZCbcbpDkl89Wwm7cMv6C-WIjvNW2wKus_-EBZwAtDKYxLReU9a13CunB8hhBGh82GXBmj3yZR-9jj9Lb_dW5TubEB_2CPvXPMVaULAaHm9AikeEDig2BrG-UH7BtutkEDuoX5Nv7TNrQj9T7OsdHrN54jjYbz_5eKvcZTQ2cQ4ydgCUfNFopTENlAY400H9";

/* Row */
function CartRow({ item, onInc, onDec, onRemove }) {
>>>>>>> b11839557a023584904ffae753ac1e71a1ec3a8c
  const primaryImage =
    (Array.isArray(item.images) && item.images[0]) ||
    item.image ||
    FALLBACK_IMG;

  return (
<<<<<<< HEAD
    <div className="flex items-center justify-between gap-4 sm:gap-6  border-b border-border pb-4">
      {/* Image */}
      <div className="flex items-center gap-5">
        <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-lg overflow-hidden bg-surface">
          <Image
            src={primaryImage}
            alt={item.name}
            fill
            className="object-cover"
          />
        </div>

        {/* Info */}
        <div className="min-w-0">
          <p className="font-medium text-base truncate">{item.name}</p>
          {item.category && (
            <p className="text-muted text-sm">{item.category}</p>
          )}

          <div className="mt-2 flex items-center gap-3">
            {/* Qty controls */}
            <div className="inline-flex items-center border border-border rounded-md overflow-hidden">
              <button
                onClick={onDec}
                className="h-9 w-9 grid place-items-center hover:bg-surface-base"
                aria-label="Decrease"
              >
                <RiSubtractLine />
              </button>
              <span className="px-3 text-sm font-semibold select-none">
                {item.qty}
              </span>
              <button
                onClick={onInc}
                className="h-9 w-9 grid place-items-center hover:bg-surface-base"
                aria-label="Increase"
              >
                <RiAddLine />
              </button>
            </div>

            <button
              onClick={onRemove}
              className="inline-flex items-center gap-2 text-sm text-muted hover:text-primary hover:bg-surface-base p-2 rounded-lg"
            >
              <RiDeleteBin6Line className="text-base" />
              Remove
            </button>
          </div>
        </div>
      </div>
      {/* Line total */}
      <div className="text-right">
        <p className="font-semibold text-base">
          {subTotal} {CURRENCY}
        </p>
        <p className="text-xs text-muted">
          Unit: {unitPrice} {CURRENCY}
        </p>
        {item.soldOut && (
          <span className="mt-1 inline-block text-xs bg-secondary text-white rounded-md p-2">
=======
    <div className="grid grid-cols-[80px_1fr_auto] sm:grid-cols-[96px_1fr_auto] gap-4 sm:gap-6 items-center border-b border-border pb-4">
      {/* Image */}
      <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-lg overflow-hidden bg-surface">
        <Image
          src={primaryImage}
          alt={item.name}
          fill
          className="object-cover"
        />
      </div>

      {/* Info */}
      <div className="min-w-0">
        <p className="font-medium text-black truncate">{item.name}</p>
        {item.category && <p className="text-muted text-sm">{item.category}</p>}

        <div className="mt-2 flex items-center gap-3">
          {/* Qty controls */}
          <div className="inline-flex items-center border border-border rounded-md overflow-hidden">
            <button
              onClick={onDec}
              className="h-9 w-9 grid place-items-center hover:bg-surface-base"
              aria-label="Decrease"
            >
              <RiSubtractLine />
            </button>
            <span className="px-3 text-sm font-semibold select-none">
              {item.qty}
            </span>
            <button
              onClick={onInc}
              className="h-9 w-9 grid place-items-center hover:bg-surface-base"
              aria-label="Increase"
            >
              <RiAddLine />
            </button>
          </div>

          <button
            onClick={onRemove}
            className="inline-flex items-center gap-2 text-sm text-muted hover:text-primary"
          >
            <RiDeleteBin6Line className="text-base" />
            Remove
          </button>
        </div>
      </div>

      {/* Line total */}
      <div className="text-right">
        <p className="font-semibold text-black">
          ${(Number(item.price) * Number(item.qty)).toFixed(2)}
        </p>
        <p className="text-xs text-muted">
          Unit: ${Number(item.price).toFixed(2)}
        </p>
        {item.soldOut && (
          <span className="mt-1 inline-block text-xs bg-gray-900 text-white rounded-md px-2 py-0.5">
>>>>>>> b11839557a023584904ffae753ac1e71a1ec3a8c
            SOLD OUT
          </span>
        )}
      </div>
    </div>
  );
}

export default function CartPage() {
  const dispatch = useDispatch();
  const items = useSelector((s) => s.cart?.items ?? []);
  const [promo, setPromo] = useState("");

  const { subtotal, shipping, discount, total } = useMemo(() => {
    const subtotal = items.reduce(
      (acc, it) => acc + Number(it.price) * Number(it.qty),
      0
    );
    const shipping = subtotal === 0 ? 0 : subtotal >= 200 ? 0 : 10;
    const discount = 0; // hook up promo if needed
    const total = Math.max(0, subtotal + shipping - discount);
    return { subtotal, shipping, discount, total };
  }, [items]);

  /* Correct handlers using cartId */
  const inc = (it) =>
    dispatch(updateQuantity({ cartId: it.cartId, qty: it.qty + 1 }));

  const dec = (it) => {
    const next = it.qty - 1;
    if (next <= 0) {
      dispatch(removeFromCart(it.cartId));
    } else {
      dispatch(updateQuantity({ cartId: it.cartId, qty: next }));
    }
  };

  const remove = (it) => dispatch(removeFromCart(it.cartId));
  const clear = () => dispatch(clearCart());

  return (
    <main className="min-h-screen bg-bg px-4 sm:px-8 py-10">
      {/* Title */}
      <div className="max-w-6xl mx-auto mb-8 flex items-center justify-between">
        <h1 className="text-3xl sm:text-4xl font-serif font-bold">Your Cart</h1>
        <Link
          href="/shop"
          className="inline-flex items-center gap-2 text-sm text-muted hover:text-primary"
        >
          <RiArrowLeftSLine className="text-lg" />
          Continue shopping
        </Link>
      </div>

      {items.length === 0 ? (
        <div className="max-w-3xl mx-auto text-center py-24">
          <RiShoppingBag3Line className="mx-auto text-6xl text-muted mb-4" />
          <p className="text-lg text-muted">Your cart is empty.</p>
          <Link
            href="/shop"
            className="mt-6 inline-flex h-11 px-6 rounded-full bg-primary text-white font-semibold hover:opacity-90"
          >
            Browse products
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8 max-w-6xl mx-auto">
          {/* Left: items */}
          <section className="bg-white rounded-xl p-4 sm:p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm text-muted">
                {items.length} {items.length === 1 ? "item" : "items"} in your
                cart
              </p>
              <button
                onClick={clear}
<<<<<<< HEAD
                className="text-sm text-muted hover:text-primary "
=======
                className="text-sm text-muted hover:text-primary"
>>>>>>> b11839557a023584904ffae753ac1e71a1ec3a8c
              >
                Clear cart
              </button>
            </div>

            <div className="space-y-5">
              {items.map((it) => (
                <CartRow
                  key={it.cartId}
                  item={it}
                  onInc={() => inc(it)}
                  onDec={() => dec(it)}
                  onRemove={() => remove(it)}
                />
              ))}
            </div>
          </section>

          {/* Right: summary */}
          <aside className="bg-white rounded-xl p-4 sm:p-6 h-fit shadow-sm">
            <h2 className="text-lg font-semibold mb-4">Order Summary</h2>

            {/* Promo code (local only) */}
            <div className="mb-4">
              <label htmlFor="promo" className="text-sm text-muted block mb-1">
                Promo code
              </label>
              <div className="flex gap-2">
                <input
                  id="promo"
                  value={promo}
                  onChange={(e) => setPromo(e.target.value)}
                  placeholder="Enter code"
                  className="flex-1 rounded-md border border-border bg-surface px-3 py-2 text-sm focus:ring-2 focus:ring-primary"
                />
                <button
                  className="px-4 rounded-md border border-border text-sm hover:border-primary hover:text-primary"
                  onClick={() => {}}
                  type="button"
                >
                  Apply
                </button>
              </div>
            </div>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted">Subtotal</span>
<<<<<<< HEAD
                <span className="font-medium text-base">
                  {subtotal.toFixed(2)} {CURRENCY}
=======
                <span className="font-medium text-black">
                  ${subtotal.toFixed(2)}
>>>>>>> b11839557a023584904ffae753ac1e71a1ec3a8c
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted">Shipping</span>
<<<<<<< HEAD
                <span className="font-medium text-base">
                  {shipping === 0 ? "Free" : `${shipping.toFixed(2)}`}{" "}
                  {CURRENCY}
=======
                <span className="font-medium text-black">
                  {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
>>>>>>> b11839557a023584904ffae753ac1e71a1ec3a8c
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted">Discount</span>
<<<<<<< HEAD
                <span className="font-medium text-base">
                  {discount > 0 ? `-${discount.toFixed(2)}` : "0.00 "}{" "}
                  {CURRENCY}
=======
                <span className="font-medium text-black">
                  {discount > 0 ? `-$${discount.toFixed(2)}` : "$0.00"}
>>>>>>> b11839557a023584904ffae753ac1e71a1ec3a8c
                </span>
              </div>
              <div className="border-t border-border my-3" />
              <div className="flex justify-between text-base">
                <span className="font-semibold">Total</span>
<<<<<<< HEAD
                <span className="font-semibold">
                  {total.toFixed(2)} {CURRENCY}
                </span>
=======
                <span className="font-semibold">${total.toFixed(2)}</span>
>>>>>>> b11839557a023584904ffae753ac1e71a1ec3a8c
              </div>
            </div>

            <Link
              href="/checkout"
              className={`mt-6 inline-flex w-full h-11 items-center justify-center rounded-full bg-primary text-white font-semibold hover:opacity-90 ${
                items.some((i) => i.soldOut)
                  ? "opacity-60 pointer-events-none"
                  : ""
              }`}
              title={
                items.some((i) => i.soldOut)
                  ? "Remove sold-out items to proceed"
                  : "Proceed to checkout"
              }
            >
              Proceed to Checkout
            </Link>

            <p className="mt-3 text-xs text-muted">
              {subtotal >= 200
                ? "You’ve unlocked free shipping!"
<<<<<<< HEAD
                : `Add more items worth 200.00 ${CURRENCY} total to get free shipping.`}
=======
                : "Add more items worth $200.00 total to get free shipping."}
>>>>>>> b11839557a023584904ffae753ac1e71a1ec3a8c
            </p>
          </aside>
        </div>
      )}
    </main>
  );
}
