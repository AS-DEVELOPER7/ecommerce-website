// src/components/molecules/ProductCard.js
"use client";

import Image from "next/image";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  removeFromCart,
  updateQuantity,
} from "src/services/reducers/cartReducer";
import { HiOutlinePlus, HiOutlineMinus, HiOutlineTrash } from "react-icons/hi2";
import { RiShoppingBagLine } from "react-icons/ri";
import { LuEye } from "react-icons/lu";
import { useToast } from "../ui/ToastProvider";
import { CURRENCY } from "src/constants";

export default function ProductCard({ id, name, image, price, soldOut }) {
  const dispatch = useDispatch();
  const { show } = useToast();

  const cart = useSelector((state) => state.cart.items || []);
  const itemInCart = cart.find((i) => i.id === id);

  const handleAdd = () => {
    dispatch(addToCart({ id, name, image, price, soldOut, qty: 1 }));
    show({ type: "success", title: "Added to cart", description: name });
  };

  const handleRemove = () => {
    if (!itemInCart) return;
    dispatch(removeFromCart(itemInCart.cartId));
  };

  const handleQtyChange = (delta) => {
    if (!itemInCart) return;
    const newQty = itemInCart.qty + delta;
    if (newQty <= 0) handleRemove();
    else dispatch(updateQuantity({ cartId: itemInCart.cartId, qty: newQty }));
  };
  return (
    <div className="bg-bg rounded-lg group overflow-hidden  w-[250px] sm:w-[280px] md:w-[300px] flex flex-col border border-border hover:shadow-md transition">
      {/* Image -> product details */}
      <Link
        href={`/product/${id}`}
        className="relative aspect-square overflow-hidden w-full block"
      >
        <Image
          src={image || "/placeholder.png"}
          alt={name}
          fill
          className={`object-cover group-hover:scale-110  transition-all duration-500 ${
            soldOut ? "opacity-60 grayscale" : ""
          }`}
        />
        {soldOut && (
          <div className="absolute inset-0 bg-overlay flex items-center justify-center text-bg font-semibold">
            Sold Out
          </div>
        )}
      </Link>

      {/* Info */}
      <div className="p-4 flex flex-col grow justify-between">
        <div>
          <Link href={`/product/${id}`}>
            <h3 className="font-semibold text-base mb-1 hover:text-primary transition">
              {name}
            </h3>
          </Link>
          <p className="text-muted text-sm mb-3">
            {price.toFixed(2)} {CURRENCY}
          </p>
        </div>

        {/* Cart actions */}
        {soldOut ? (
          <button
            disabled
            className="w-full py-2 rounded-lg bg-surface text-muted font-semibold cursor-not-allowed"
          >
            Sold Out
          </button>
        ) : itemInCart ? (
          <div className="flex items-center justify-between border border-border rounded-lg overflow-hidden">
            <div className="flex items-center flex-1 justify-center">
              <button
                onClick={() => handleQtyChange(-1)}
                className="flex-1 p-3 flex justify-center text-sm font-bold items-center text-primary hover:bg-primary hover:text-bg transition w-10"
              >
                <HiOutlineMinus />
              </button>
              <span className="flex-1 text-center mx-3 text-sm font-semibold">
                {itemInCart.qty}
              </span>
              <button
                onClick={() => handleQtyChange(1)}
                className="flex-1 p-3 flex justify-center text-sm font-bold items-center text-primary hover:bg-primary hover:text-bg transition w-10"
              >
                <HiOutlinePlus />
              </button>
            </div>
            <button
              onClick={handleRemove}
              className="p-2 text-muted hover:text-primary border-l border-border transition w-10 flex justify-center"
              title="Remove item"
            >
              <HiOutlineTrash />
            </button>
          </div>
        ) : (
          <div className="flex flex-row gap-2">
            <button
              onClick={handleAdd}
              className="flex items-center justify-center w-full py-2 bg-primary text-bg font-semibold rounded-lg hover:opacity-90 transition"
            >
              <RiShoppingBagLine className="mr-2 text-lg" />
              Add to Cart
            </button>
            <Link
              href={`/product/${id}`}
              className="p-3 text-center items-center justify-center text-lg font-medium border border-border rounded-lg text-muted hover:text-primary hover:border-primary transition"
              title="View product"
            >
              <LuEye />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
