"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  updateQuantity,
  removeFromCart,
} from "src/services/reducers/cartReducer";
import { products } from "src/data";
import { CATEGORY_KEYS } from "src/constants";
import { HiOutlineMinus, HiOutlinePlus, HiOutlineTrash } from "react-icons/hi2";
import { RiShoppingBagLine } from "react-icons/ri";
import { useParams } from "next/navigation";

export default function ProductDetails({}) {
  const dispatch = useDispatch();
  const { id } = useParams();
  const product = products?.find((item) => item?.id === id);
  const cart = useSelector((s) => s.cart.items || []);
  const itemInCart = cart.find((i) => i.id === product.id);

  const [activeIdx, setActiveIdx] = useState(0);
  const mainImg = product.images?.[activeIdx] || product.images?.[0];

  const [qty, setQty] = useState(1);

  const related = useMemo(() => {
    return products
      .filter((p) => p.category === product.category && p.id !== product.id)
      .slice(0, 8);
  }, [product.id, product.category]);
  const add = () =>
    dispatch(
      addToCart({
        id: product.id,
        name: product.name,
        image: mainImg,
        price: product.price,
        soldOut: product.soldOut,
        qty,
      })
    );

  const inc = () => setQty((q) => Math.min(99, q + 1));
  const dec = () => setQty((q) => Math.max(1, q - 1));

  const decCart = () => {
    if (!itemInCart) return;
    const newQty = itemInCart.qty - 1;
    if (newQty <= 0) dispatch(removeFromCart(itemInCart.cartId));
    else dispatch(updateQuantity({ cartId: itemInCart.cartId, qty: newQty }));
  };
  const incCart = () => {
    if (!itemInCart) return;
    dispatch(
      updateQuantity({ cartId: itemInCart.cartId, qty: itemInCart.qty + 1 })
    );
  };

  return (
    <main className="bg-background-light dark:bg-background-dark text-gray-800 dark:text-gray-200 min-h-screen">
      {/* Top bar / breadcrumbs */}
      <div className="px-4 sm:px-8 lg:px-16 py-6 border-b border-gray-200/70 dark:border-gray-700/50">
        <div className="max-w-7xl mx-auto flex flex-wrap gap-2 text-sm">
          <Link href="/" className="text-gray-500 hover:text-primary">
            Home
          </Link>
          <span className="text-gray-400">/</span>
          <Link href="/shop" className="text-gray-500 hover:text-primary">
            shop
          </Link>
          <span className="text-gray-400">/</span>
          <span className="text-gray-900 dark:text-white">{product.name}</span>
        </div>
      </div>

      {/* Main content */}
      <div className="px-4 sm:px-8 lg:px-16 py-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          {/* Gallery */}
          <div className="flex flex-col gap-4">
            <div className="relative group overflow-hidden rounded-xl aspect-square bg-white/30 dark:bg-white/5">
              {mainImg && (
                <Image
                  src={mainImg}
                  alt={product.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
              )}
              <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity bg-black/20 rounded-xl" />
            </div>

            {/* Thumbnails */}
            {product.images?.length > 1 && (
              <div className="grid grid-cols-4 gap-3">
                {product.images.map((src, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveIdx(i)}
                    className={`relative aspect-square rounded-lg overflow-hidden border-2 transition ${
                      i === activeIdx
                        ? "border-primary"
                        : "border-transparent hover:border-primary/60"
                    }`}
                    aria-label={`Thumbnail ${i + 1}`}
                  >
                    <Image
                      src={src}
                      alt={`${product.name} ${i + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info / Actions */}
          <div className="flex flex-col pt-2">
            <h1 className="text-3xl sm:text-4xl font-bold">{product.name}</h1>

            <div className="mt-3 flex flex-wrap gap-2">
              {product.materials?.map((m) => (
                <span
                  key={m}
                  className="text-xs px-3 py-1 rounded-full border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300"
                >
                  {m}
                </span>
              ))}
              {product.styles?.map((s) => (
                <span
                  key={s}
                  className="text-xs px-3 py-1 rounded-full border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300"
                >
                  {s}
                </span>
              ))}
              {product.soldOut && (
                <span className="text-xs px-3 py-1 rounded-full bg-gray-200 dark:bg-white/10 text-gray-600">
                  Sold out
                </span>
              )}
            </div>

            <div className="text-3xl font-bold mt-5">
              ${product.price?.toFixed(2)}
            </div>

            {product.description && (
              <p className="mt-4 text-gray-600 dark:text-gray-300 leading-relaxed">
                {product.description}
              </p>
            )}

            <div className="w-full h-px bg-gray-200 dark:bg-gray-700/50 my-8" />

            {/* Size (placeholder) + Quantity */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {product.sizes?.length > 0 && (
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Size
                  </label>
                  <select className="rounded-lg border-gray-300 dark:border-gray-600 bg-white dark:bg-background-dark/50 focus:border-primary focus:ring-primary/50">
                    {product.sizes.map((s) => (
                      <option key={s}>{s}</option>
                    ))}
                  </select>
                </div>
              )}

              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Quantity
                </label>
                <div className="flex items-center border border-border rounded-xl  flex-1 justify-center overflow-hidden">
                  <button
                    onClick={dec}
                    className="flex-1 p-3 flex justify-center text-lg font-bold items-center text-primary hover:bg-primary hover:text-white transition w-10"
                  >
                    <HiOutlineMinus />
                  </button>
                  <span className="flex-1 text-center mx-3 text-lg font-semibold">
                    {qty}
                  </span>
                  <button
                    onClick={inc}
                    className="flex-1 p-3 flex justify-center text-lg font-bold items-center text-primary hover:bg-primary hover:text-white transition w-10"
                  >
                    <HiOutlinePlus />
                  </button>
                </div>
              </div>
            </div>

            {/* Primary actions */}
            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              {!product.soldOut && !itemInCart && (
                <button
                  onClick={add}
                  className="flex w-full sm:w-auto flex-1 max-w-[480px] items-center justify-center rounded-xl h-12 bg-primary text-white gap-2 font-bold px-6 hover:bg-primary/90"
                >
                  <RiShoppingBagLine />
                  Add to Cart
                </button>
              )}

              {!product.soldOut && itemInCart && (
                <button
                  onClick={() => dispatch(removeFromCart(itemInCart.cartId))}
                  className="flex w-full sm:w-auto flex-1 max-w-[480px] items-center justify-center rounded-xl h-12 bg-surface text-primary gap-2 font-bold px-6 "
                >
                  <HiOutlineTrash />
                  Remove
                </button>
              )}

              {product.soldOut && (
                <button
                  disabled
                  className="flex w-full sm:w-auto flex-1 max-w-[480px] items-center justify-center rounded-xl h-12 bg-gray-300 text-gray-600 font-bold cursor-not-allowed"
                >
                  Sold Out
                </button>
              )}

              {/* <button className="flex items-center justify-center rounded-xl h-12 bg-primary/20 text-primary font-bold px-4 w-12 hover:bg-primary/30">
               ♥
              </button> */}
            </div>

            {/* Tabs (static content placeholders) */}
            <div className="mt-10">
              <div className="border-b border-gray-200 dark:border-gray-700/50">
                <nav className="-mb-px flex gap-6">
                  <button className="border-b-2 border-primary pb-3 text-sm font-medium text-primary">
                    Description
                  </button>
                  {/* <button className="border-b-2 border-transparent pb-3 text-sm text-gray-500 hover:text-gray-700">
                    Reviews
                  </button>
                  <button className="border-b-2 border-transparent pb-3 text-sm text-gray-500 hover:text-gray-700">
                    Shipping & Returns
                  </button> */}
                </nav>
              </div>
              <div className="py-6 text-gray-600 dark:text-gray-300 space-y-3">
                <p>
                  Designed for daily elegance, crafted with lasting materials.
                  Pair it with matching pieces in our collection for a refined
                  set.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <section className="max-w-7xl mx-auto mt-16">
            <h3 className="text-2xl font-bold mb-6">You Might Also Like</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {related.map((p) => (
                <Link
                  key={p.id}
                  href={`/product/${p.id}`}
                  className="group block"
                >
                  <div className="relative overflow-hidden rounded-xl aspect-square">
                    <Image
                      src={p.images?.[0] || p.image}
                      alt={p.name}
                      fill
                      className="object-cover transition-transform group-hover:scale-105"
                    />
                  </div>
                  <div className="py-3">
                    <h4 className="font-semibold group-hover:text-primary transition-colors">
                      {p.name}
                    </h4>
                    <p className="text-muted mt-0.5 font-medium">
                      ${p.price.toFixed(2)}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
