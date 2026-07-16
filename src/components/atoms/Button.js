"use client";

import { motion } from "framer-motion";
import clsx from "clsx";

export default function Button({
  children,
  onClick,
  variant = "primary",
  className,
  type = "button",
  disabled = false,
  ...props
}) {
  const baseStyles =
    "inline-flex items-center justify-center px-6 h-12 rounded-xl font-semibold transition-all duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed";

  const variants = {
    primary: "bg-primary text-white hover:bg-opacity-90 shadow-md hover:shadow-lg",
    secondary: "bg-surface-base text-primary hover:bg-bg-accent",
    outline: "border border-border text-base hover:border-primary hover:text-primary",
    ghost: "text-base hover:bg-surface-base",
  };

  return (
    <motion.button
      type={type}
      whileTap={{ scale: disabled ? 1 : 0.97 }}
      onClick={onClick}
      disabled={disabled}
      className={clsx(baseStyles, variants[variant], className)}
      {...props}
    >
      {children}
    </motion.button>
  );
}
