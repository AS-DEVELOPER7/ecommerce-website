"use client";

import { motion } from "framer-motion";
import { HiOutlineMinus, HiOutlinePlus } from "react-icons/hi2";

export default function QuantitySelector({ quantity, onIncrement, onDecrement, className }) {
  return (
    <div className={`flex items-center border border-border rounded-xl overflow-hidden bg-surface ${className || ""}`}>
      <motion.button
        whileTap={{ scale: 0.8 }}
        onClick={onDecrement}
        className="flex-1 p-3 flex justify-center text-lg font-bold items-center text-primary/80 hover:bg-primary/10 hover:text-primary transition w-10 disabled:opacity-50"
        disabled={quantity <= 1}
      >
        <HiOutlineMinus />
      </motion.button>
      <span className="flex-1 text-center mx-2 text-base font-semibold min-w-[2rem]">
        {quantity}
      </span>
      <motion.button
        whileTap={{ scale: 0.8 }}
        onClick={onIncrement}
        className="flex-1 p-3 flex justify-center text-lg font-bold items-center text-primary/80 hover:bg-primary/10 hover:text-primary transition w-10"
      >
        <HiOutlinePlus />
      </motion.button>
    </div>
  );
}
