"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  RiWhatsappLine,
  RiDownloadLine,
  RiCloseLine,
  RiFileCopyLine,
} from "react-icons/ri";
import { generateProductCardCanvas } from "src/utils/generateProductCardImage";
import {
  formatProductWhatsAppMessage,
  shareToWhatsApp,
} from "src/utils/whatsappShare";
import { useToast } from "src/components/ui/ToastProvider";

export default function ProductShareModal({
  isOpen,
  onClose,
  product,
  selectedVariant,
  selectedSize,
  price,
}) {
  const [imageResult, setImageResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const { show } = useToast();

  useEffect(() => {
    if (!isOpen || !product) return;

    setLoading(true);
    generateProductCardCanvas({
      product,
      selectedVariant,
      selectedSize,
      price,
    }).then((res) => {
      setImageResult(res);
      setLoading(false);
    });
  }, [isOpen, product, selectedVariant, selectedSize, price]);

  if (!isOpen || !product) return null;

  const messageText = formatProductWhatsAppMessage({
    product,
    selectedVariant,
    selectedSize,
    price,
  });

  const handleNativeShare = async () => {
    // Attempt native share with image file if supported
    if (
      typeof navigator !== "undefined" &&
      navigator.canShare &&
      imageResult?.file &&
      navigator.canShare({ files: [imageResult.file] })
    ) {
      try {
        await navigator.share({
          title: product.title || product.name,
          text: messageText,
          files: [imageResult.file],
        });
        show({
          type: "success",
          title: "Shared successfully!",
        });
        return;
      } catch (err) {
        if (err.name !== "AbortError") {
          console.warn(
            "Native share error, falling back to direct WhatsApp:",
            err
          );
        } else {
          return;
        }
      }
    }

    // Direct WhatsApp share fallback
    shareToWhatsApp({ product, selectedVariant, selectedSize, price });
  };

  const handleDownloadImage = () => {
    if (!imageResult?.dataUrl) return;
    const a = document.createElement("a");
    a.href = imageResult.dataUrl;
    a.download = `${(product.title || product.name || "product").replace(
      /\s+/g,
      "-"
    )}-card.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    show({
      type: "success",
      title: "Screenshot card downloaded!",
      description: "You can attach this image directly in your chat.",
    });
  };

  const handleCopyText = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(messageText);
      show({
        type: "success",
        title: "Details copied to clipboard!",
      });
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/65 backdrop-blur-sm overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative w-full max-w-md bg-white rounded-3xl border border-neutral-200 shadow-2xl p-6 overflow-hidden max-h-[92vh] flex flex-col"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-neutral-100 pb-4 mb-4">
            <div>
              <h3 className="font-serif text-xl font-medium text-neutral-900">
                Share Product Card
              </h3>
              <p className="text-xs text-neutral-500">
                Share with shopkeeper via WhatsApp or save image
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-neutral-100 text-neutral-500 hover:text-neutral-900 transition-colors cursor-pointer"
            >
              <RiCloseLine className="text-2xl" />
            </button>
          </div>

          {/* Card Preview */}
          <div className="flex-1 overflow-y-auto flex flex-col items-center justify-center my-1 min-h-[300px] bg-neutral-50 rounded-2xl p-4 border border-neutral-200/80">
            {loading ? (
              <div className="flex flex-col items-center space-y-3 py-12">
                <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
                <p className="text-xs text-neutral-500 font-medium">
                  Generating product card image...
                </p>
              </div>
            ) : imageResult?.dataUrl ? (
              <img
                src={imageResult.dataUrl}
                alt={product.title}
                className="max-h-[360px] w-auto object-contain rounded-xl shadow-lg border border-neutral-200"
              />
            ) : (
              <p className="text-sm text-neutral-400">
                Failed to generate image preview
              </p>
            )}
          </div>

          {/* Action Buttons */}
          <div className="mt-4 pt-4 border-t border-neutral-100 flex flex-col gap-3">
            <button
              onClick={handleNativeShare}
              className="w-full py-3.5 px-4 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-semibold text-sm sm:text-base flex items-center justify-center gap-2 shadow-md shadow-emerald-500/20 transition-all cursor-pointer"
            >
              <RiWhatsappLine className="text-xl sm:text-2xl" />
              <span>Share Image & Details to WhatsApp</span>
            </button>

            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={handleDownloadImage}
                disabled={!imageResult?.dataUrl}
                className="py-3 px-3 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-neutral-800 font-medium text-xs sm:text-sm flex items-center justify-center gap-2 border border-neutral-300/60 transition-all cursor-pointer disabled:opacity-50"
              >
                <RiDownloadLine className="text-lg" />
                <span>Save Image</span>
              </button>

              <button
                onClick={handleCopyText}
                className="py-3 px-3 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-neutral-800 font-medium text-xs sm:text-sm flex items-center justify-center gap-2 border border-neutral-300/60 transition-all cursor-pointer"
              >
                <RiFileCopyLine className="text-lg" />
                <span>Copy Details</span>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
