import { CURRENCY, WHATSAPP_NUMBER } from "src/constants";

/**
 * Formats structured product information into a clean text message for WhatsApp sharing.
 */
export function formatProductWhatsAppMessage({
  product,
  selectedVariant,
  selectedSize,
  price,
}) {
  if (!product) return "";

  const title = product.title || product.name || "Product";

  // Categories
  const categories = Array.isArray(product.categories)
    ? product.categories.join(", ")
    : product.categories || product.category || null;

  // Color label
  const colorObj = selectedVariant?.selectedColor || selectedVariant;
  const rawColor =
    colorObj?.color || selectedVariant?.color || product.color || null;
  const colorLabel = Array.isArray(rawColor) ? rawColor.join(" / ") : rawColor;

  // Style label
  const styleLabel = selectedVariant?.style || null;

  // Size label
  const sizeLabel =
    typeof selectedSize === "object"
      ? selectedSize?.size
      : selectedSize || null;

  // Price
  const finalPrice = price ?? selectedSize?.price ?? product.price;
  const formattedPrice =
    typeof finalPrice === "number"
      ? `${finalPrice.toFixed(2)} ${CURRENCY}`
      : finalPrice
      ? `${finalPrice} ${CURRENCY}`
      : null;

  // Page URL
  const baseUrl = typeof window !== "undefined" ? window.location.origin : "";
  const productUrl = `${baseUrl}/product/${product.id}`;

  let message = `*Product Inquiry*\n\n`;
  message += `• *Product:* ${title}\n`;
  if (categories) message += `• *Category:* ${categories}\n`;
  if (styleLabel) message += `• *Style:* ${styleLabel}\n`;
  if (colorLabel) message += `• *Color:* ${colorLabel}\n`;
  if (sizeLabel) message += `• *Size:* ${sizeLabel}\n`;
  if (formattedPrice) message += `• *Price:* ${formattedPrice}\n`;
  message += `\n• *Product Details & Image:* ${productUrl}`;

  return message;
}

/**
 * Directly opens WhatsApp chat with shopkeeper with pre-filled product details.
 */
export function shareToWhatsApp({
  product,
  selectedVariant,
  selectedSize,
  price,
}) {
  const message = formatProductWhatsAppMessage({
    product,
    selectedVariant,
    selectedSize,
    price,
  });

  if (!message) return;

  const encodedMessage = encodeURIComponent(message);
  const targetNumber = WHATSAPP_NUMBER || "";

  const whatsappUrl = targetNumber
    ? `https://wa.me/${targetNumber}?text=${encodedMessage}`
    : `https://wa.me/?text=${encodedMessage}`;

  window.open(whatsappUrl, "_blank", "noopener,noreferrer");
}
