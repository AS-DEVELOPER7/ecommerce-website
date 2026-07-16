"use client";

export const previewImage = (src) => {
  if (typeof window !== "undefined" && src) {
    window.dispatchEvent(new CustomEvent("image-preview", { detail: { src } }));
  }
};
