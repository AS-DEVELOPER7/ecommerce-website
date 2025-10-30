"use client";
import { Provider } from "react-redux";
import { store } from "./store";
import { useEffect } from "react";

export default function StoreProvider({ children }) {
  // restore theme on client
  useEffect(() => {
    try {
      const root = document.documentElement;
      const saved = localStorage.getItem("theme-mode") || "light";
      root.setAttribute("data-theme", saved);
    } catch {}
  }, []);
  return <Provider store={store}>{children}</Provider>;
}
