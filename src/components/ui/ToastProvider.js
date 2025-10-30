"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from "react";

const ToastCtx = createContext(null);

export function ToastProvider({
  children,
  defaultDuration = 2500,
  maxToasts = 4,
}) {
  const [toasts, setToasts] = useState([]);
  const idRef = useRef(0);

  const remove = useCallback((id) => {
    setToasts((t) => t.filter((x) => x.id !== id));
  }, []);

  const show = useCallback(
    (opts) => {
      const id = ++idRef.current;
      const toast = {
        id,
        title: opts.title ?? "",
        description: opts.description ?? "",
        type: opts.type ?? "info", // "success" | "error" | "info"
        duration: opts.duration ?? defaultDuration,
      };
      setToasts((t) => {
        const next = [toast, ...t];
        return next.slice(0, maxToasts);
      });

      if (toast.duration > 0) {
        setTimeout(() => remove(id), toast.duration);
      }
      return id;
    },
    [defaultDuration, maxToasts, remove]
  );

  const api = useMemo(() => ({ show, remove }), [show, remove]);

  return (
    <ToastCtx.Provider value={api}>
      {children}
      <div className="fixed z-9999 top-4 left-[30%] flex flex-col gap-2 w-[94vw] max-w-sm">
        {toasts.map((t) => (
          <ToastItem key={t.id} toast={t} onClose={() => remove(t.id)} />
        ))}
      </div>
    </ToastCtx.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastCtx);
  if (!ctx) throw new Error("useToast must be used within <ToastProvider>");
  return ctx;
}

function ToastItem({ toast, onClose }) {
  const color =
    toast.type === "success"
      ? "bg-success-bg"
      : toast.type === "error"
      ? "bg-warning-bg"
      : "bg-info-bg";

  return (
    <div className={`rounded-lg shadow-lg text-base ${color} p-3`}>
      <div className="flex items-start gap-3">
        <div className="pt-0.5">
          {toast.type === "success"
            ? "✅"
            : toast.type === "error"
            ? "⚠️"
            : "ℹ️"}
        </div>
        <div className="flex-1">
          {toast.title && (
            <p className="font-semibold leading-tight">{toast.title}</p>
          )}
          {toast.description && (
            <p className="text-sm opacity-90">{toast.description}</p>
          )}
        </div>
        <button
          className="opacity-80 hover:opacity-100"
          onClick={onClose}
          aria-label="Close"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
