"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import {
  removeFromCart,
  updateQuantity,
  clearCart,
} from "../../src/services/reducers/cartReducer";
import { SHIPPING_THRESHOLD, SHIPPING_COST } from "src/constants";

import { RiArrowLeftSLine } from "react-icons/ri";

import CartRow from "src/components/molecules/CartRow";
import EmptyCart from "src/components/molecules/EmptyCart";
import CartSummary from "src/components/organisms/CartSummary";

export default function CartPage() {
  const dispatch = useDispatch();
  const items = useSelector((s) => s.cart?.items ?? []);
  const [promo, setPromo] = useState("");

  const { subtotal, shipping, discount, total } = useMemo(() => {
    const subtotal = items.reduce(
      (acc, it) => acc + Number(it.price) * Number(it.qty),
      0
    );
    const shipping = subtotal === 0 ? 0 : subtotal >= SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
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
        <EmptyCart />
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
                className="text-sm text-muted hover:text-primary "
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
          <CartSummary
            items={items}
            subtotal={subtotal}
            shipping={shipping}
            discount={discount}
            total={total}
            promo={promo}
            setPromo={setPromo}
          />
        </div>
      )}
    </main>
  );
}
