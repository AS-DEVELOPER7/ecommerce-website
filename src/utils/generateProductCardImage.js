import { CURRENCY } from "src/constants";

/**
 * Generates a high-res image (Canvas Blob & File) of the product card
 * with logo, product image, title, category, color, size, price, and soft theme branding.
 */
export async function generateProductCardCanvas({
  product,
  selectedVariant,
  selectedSize,
  price,
}) {
  if (typeof window === "undefined") return null;

  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  // Canvas Width
  const width = 800;

  // Gather product data
  const title = product.title || product.name || "Product";

  const categories = Array.isArray(product.categories)
    ? product.categories.join(", ")
    : product.categories || product.category || null;

  const styleLabel = selectedVariant?.style || null;

  const colorObj = selectedVariant?.selectedColor || selectedVariant;
  const rawColor =
    colorObj?.color || selectedVariant?.color || product.color || null;
  const colorLabel = Array.isArray(rawColor) ? rawColor.join(" / ") : rawColor;

  const sizeLabel =
    typeof selectedSize === "object"
      ? selectedSize?.size
      : selectedSize || null;

  const finalPrice = price ?? selectedSize?.price ?? product.price;

  const hasSpecs = Boolean(styleLabel || colorLabel || sizeLabel);

  // 1. Calculate dynamic height for details container
  const detailsY = 655;
  const detailsX = 75;
  const detailsW = width - 150;

  let testY = detailsY + 38; // Title baseline
  if (categories) testY += 50; // Category chip space
  if (hasSpecs) testY += 66; // Specs divider + specs text line
  else testY += 36;
  if (finalPrice !== undefined && finalPrice !== null) testY += 48; // Price dedicated bottom row
  const computedDetailsH = testY - detailsY + 20;

  // Canvas Total Height with generous bottom padding for footer text
  const height = detailsY + computedDetailsH + 75;

  canvas.width = width;
  canvas.height = height;

  // Background (Soft luxury warm off-white)
  const bgGradient = ctx.createLinearGradient(0, 0, 0, height);
  bgGradient.addColorStop(0, "#FDFBF7");
  bgGradient.addColorStop(1, "#F7F4EE");
  ctx.fillStyle = bgGradient;
  ctx.fillRect(0, 0, width, height);

  // Soft, elegant theme border
  ctx.strokeStyle = "rgba(238, 43, 140, 0.25)";
  ctx.lineWidth = 2;
  ctx.strokeRect(20, 20, width - 40, height - 40);

  ctx.strokeStyle = "#EAE6DF";
  ctx.lineWidth = 1;
  ctx.strokeRect(26, 26, width - 52, height - 52);

  // Load Store Logo (/logo.png)
  try {
    const logoImg = new Image();
    logoImg.crossOrigin = "anonymous";
    await new Promise((resolve) => {
      logoImg.onload = resolve;
      logoImg.onerror = resolve;
      logoImg.src = "/logo.png";
    });

    if (logoImg.complete && logoImg.naturalWidth !== 0) {
      const logoSize = 54;
      ctx.drawImage(
        logoImg,
        width / 2 - logoSize / 2,
        38,
        logoSize,
        logoSize
      );
    }
  } catch (e) {
    console.warn("Could not load logo for canvas:", e);
  }

  // Brand Header Text
  ctx.fillStyle = "#ee2b8c"; // Primary theme pink
  ctx.font = "700 24px 'Playfair Display', Georgia, serif";
  ctx.textAlign = "center";
  ctx.fillText("TARMAL CREATION", width / 2, 118);

  ctx.fillStyle = "#a8005d"; // Secondary theme
  ctx.font = "500 11px sans-serif";
  ctx.fillText("EXCLUSIVE HANDMADE COLLECTION", width / 2, 137);

  // Header Divider Line
  ctx.strokeStyle = "#EAE6DF";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(140, 150);
  ctx.lineTo(width - 140, 150);
  ctx.stroke();

  // Load Product Image
  const imageUrl =
    selectedVariant?.selectedColor?.images?.[0] ||
    selectedVariant?.images?.[0] ||
    product?.images?.[0] ||
    product?.image;

  if (imageUrl) {
    try {
      const img = new Image();
      img.crossOrigin = "anonymous";
      await new Promise((resolve) => {
        img.onload = resolve;
        img.onerror = resolve;
        img.src = imageUrl;
      });

      if (img.complete && img.naturalWidth !== 0) {
        const imgBoxX = 75;
        const imgBoxY = 165;
        const imgBoxW = width - 150;
        const imgBoxH = 470;

        // White card container with subtle shadow
        ctx.fillStyle = "#FFFFFF";
        ctx.shadowColor = "rgba(0, 0, 0, 0.04)";
        ctx.shadowBlur = 12;
        ctx.shadowOffsetY = 4;
        ctx.beginPath();
        if (ctx.roundRect) {
          ctx.roundRect(imgBoxX, imgBoxY, imgBoxW, imgBoxH, 20);
        } else {
          ctx.rect(imgBoxX, imgBoxY, imgBoxW, imgBoxH);
        }
        ctx.fill();
        ctx.shadowColor = "transparent";

        // Border around image card
        ctx.strokeStyle = "#EAE6DF";
        ctx.lineWidth = 1;
        ctx.stroke();

        // Fit image inside container
        const scale = Math.min(
          (imgBoxW - 40) / img.naturalWidth,
          (imgBoxH - 40) / img.naturalHeight
        );
        const drawW = img.naturalWidth * scale;
        const drawH = img.naturalHeight * scale;
        const drawX = imgBoxX + (imgBoxW - drawW) / 2;
        const drawY = imgBoxY + (imgBoxH - drawH) / 2;

        ctx.drawImage(img, drawX, drawY, drawW, drawH);
      }
    } catch (e) {
      console.warn("Could not render product image onto canvas:", e);
    }
  }

  // Render Product Details Container Box
  ctx.fillStyle = "#FFFFFF";
  ctx.shadowColor = "rgba(0, 0, 0, 0.04)";
  ctx.shadowBlur = 12;
  ctx.shadowOffsetY = 4;
  ctx.beginPath();
  if (ctx.roundRect) {
    ctx.roundRect(detailsX, detailsY, detailsW, computedDetailsH, 20);
  } else {
    ctx.rect(detailsX, detailsY, detailsW, computedDetailsH);
  }
  ctx.fill();
  ctx.shadowColor = "transparent";

  // Card Border
  ctx.strokeStyle = "#EAE6DF";
  ctx.lineWidth = 1;
  ctx.stroke();

  // Content rendering inside details card
  let currentY = detailsY + 38;

  // Title
  ctx.fillStyle = "#1A1A1A";
  ctx.font = "700 26px 'Playfair Display', Georgia, serif";
  ctx.textAlign = "left";

  let displayTitle = title;
  if (ctx.measureText(displayTitle).width > detailsW - 50) {
    while (
      displayTitle.length > 0 &&
      ctx.measureText(displayTitle + "...").width > detailsW - 50
    ) {
      displayTitle = displayTitle.slice(0, -1);
    }
    displayTitle += "...";
  }
  ctx.fillText(displayTitle, detailsX + 25, currentY);

  // Category Tag (with comfortable 20px gap below title text)
  if (categories) {
    currentY += 34; // Generous gap below title baseline
    const badgeText = `Category: ${categories}`;
    ctx.font = "600 12px sans-serif";
    const badgeW = ctx.measureText(badgeText).width + 20;
    const badgeH = 25;
    const badgeX = detailsX + 25;
    const badgeY = currentY - 14;

    ctx.fillStyle = "rgba(238, 43, 140, 0.08)";
    ctx.beginPath();
    if (ctx.roundRect) {
      ctx.roundRect(badgeX, badgeY, badgeW, badgeH, 12);
    } else {
      ctx.rect(badgeX, badgeY, badgeW, badgeH);
    }
    ctx.fill();

    ctx.fillStyle = "#a8005d";
    ctx.fillText(badgeText, badgeX + 10, badgeY + 17);
    currentY += 16;
  }

  // Specifications section (Color & Size on SAME line)
  if (hasSpecs) {
    currentY += 20;
    ctx.strokeStyle = "#F2EBE4";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(detailsX + 25, currentY);
    ctx.lineTo(detailsX + detailsW - 25, currentY);
    ctx.stroke();
    currentY += 26;

    let specX = detailsX + 25;

    if (styleLabel) {
      ctx.fillStyle = "#737373";
      ctx.font = "600 15px sans-serif";
      ctx.fillText("Style:", specX, currentY);

      const labelW = ctx.measureText("Style:").width;
      ctx.fillStyle = "#1A1A1A";
      ctx.font = "500 15px sans-serif";
      ctx.fillText(styleLabel, specX + labelW + 6, currentY);

      specX += labelW + ctx.measureText(styleLabel).width + 36;
    }

    if (colorLabel) {
      ctx.fillStyle = "#737373";
      ctx.font = "600 15px sans-serif";
      ctx.fillText("Color:", specX, currentY);

      const labelW = ctx.measureText("Color:").width;
      ctx.fillStyle = "#ee2b8c";
      ctx.font = "600 15px sans-serif";
      ctx.fillText(colorLabel, specX + labelW + 6, currentY);

      specX += labelW + ctx.measureText(colorLabel).width + 36;
    }

    if (sizeLabel) {
      ctx.fillStyle = "#737373";
      ctx.font = "600 15px sans-serif";
      ctx.fillText("Size:", specX, currentY);

      const labelW = ctx.measureText("Size:").width;
      ctx.fillStyle = "#1A1A1A";
      ctx.font = "500 15px sans-serif";
      ctx.fillText(sizeLabel, specX + labelW + 6, currentY);
    }
  } else {
    currentY += 20;
    ctx.strokeStyle = "#F2EBE4";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(detailsX + 25, currentY);
    ctx.lineTo(detailsX + detailsW - 25, currentY);
    ctx.stroke();
  }

  // Dedicated Price Row (Move price to bottom below Color and Size)
  if (finalPrice !== undefined && finalPrice !== null) {
    currentY += 44; // Move to dedicated bottom row
    const priceText = `${
      typeof finalPrice === "number" ? finalPrice.toFixed(2) : finalPrice
    } ${CURRENCY}`;

    ctx.fillStyle = "#ee2b8c";
    ctx.font = "700 34px sans-serif";
    ctx.textAlign = "right";
    ctx.fillText(priceText, detailsX + detailsW - 25, currentY);
  }

  // Footer Branding (with comfortable 35px padding bottom)
  ctx.fillStyle = "#888888";
  ctx.font = "500 13px sans-serif";
  ctx.textAlign = "center";
  ctx.fillText(
    "Direct Shopkeeper Inquiry • Tarmal Creation",
    width / 2,
    height - 35
  );

  return new Promise((resolve) => {
    canvas.toBlob((blob) => {
      if (!blob) return resolve(null);
      const file = new File(
        [blob],
        `${(product.title || "product").replace(/\s+/g, "-")}-card.png`,
        { type: "image/png" }
      );
      const dataUrl = canvas.toDataURL("image/png");
      resolve({ blob, file, dataUrl });
    }, "image/png");
  });
}
