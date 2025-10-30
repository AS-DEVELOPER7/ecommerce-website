// src/data.js
import {
  CATEGORY_KEYS,
  CATEGORY_LIST,
  IMAGE_POOL,
  MATERIAL_OPTIONS,
  STYLE_OPTIONS,
} from "./constants";
import crypto from "crypto";

// Stable, deterministic ID from product name
const stableId = (name) =>
  crypto.createHash("md5").update(name).digest("hex").slice(0, 12);

const img = (i) => IMAGE_POOL[i % IMAGE_POOL.length];
// deterministic sold-out pattern (every 5th)
const isSoldOut = (i) => i % 5 === 0;

export const categories = CATEGORY_LIST;
export const HOME_IMAGES = {
  hero: "https://lh3.googleusercontent.com/aida-public/AB6AXuAQDg_pm6YuBLw4Nd9MonvG4HFeGNGWHVPs_9xWZrEQNDvLq2usqO2ooNot5vscuyTC_ZC9WDk-PVCJ7xOVomgjP7ErPOtjw9aEGaEfyt_CE-klrxQLfSwaT2NAkeKKIry52xT_Jj1fO6yY1ocjPuqnNNAPNYpamu0iNNuSwomiP2CEUyp_k4FAL76hW-NZ6HAJdRjhtcOjsUxjIAjwaLZ86IBfOPKfo2b8vNvQ5ec7R-0K4f3M3AFFzK3TgvR8k5JkHdVt7zVjjEHU",
  bracelet:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuCaX_tzehw7qMyK5pYKsNWznlpXpMvoe-0us3gB4XqBJaN1UMbWhga1wzXfoKNe2iA7GvSv6ViaPHQub07y3_mu8dnkiwZVtlTR8XHoOoLIvs1b1WqDp03ja0sGo1vg-CP0CAKQqyhJ3zM-EXfQ1l528PIavkKR_Zlw07fYVuyumbwgwObbUagk4RIrffILCpFtsWgImzftzXY9oG4n8bGeOPA1Sj-L2yeS2XnIP2n5dCqLelbOOTeAFL9fFy2MRzZWj6frrykwp2Xm",
  necklace:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuDmM5CXalwPewbmWy0b-5rWOCVGodQ7ale-HO6kezOwUyQ91zt6zA-yBKEsEN-bi5NLXV2oHM3cbsQaGCO12t-nv0YKKiLQDtc1q3aHAA9pMF-F02e5xEi38d3LwnT679sXHKMIPb0h-nn2VK5KHsFLyIL6XK9f0sqinP_Ira5UngpfY4ePz7sa_RA24yzL6BbAP-JJORtxFtZoMq5TR1u-LJVFFxEBrk29d58Y4IFAt4sg8wwkdEuFU76zf4DR04YjOH-qpMKR9jn-",
  pastel:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuDTWQnjyq8wk7oC7RxhCK0oqtwz40dsH0HPMWoOhEFnKWEj01SDthaaa84DlblFq861CzdE_CWDsbUTPZCbcbpDkl89Wwm7cMv6C-WIjvNW2wKus_-EBZwAtDKYxLReU9a13CunB8hhBGh82GXBmj3yZR-9jj9Lb_dW5TubEB_2CPvXPMVaULAaHm9AikeEDig2BrG-UH7BtutkEDuoX5Nv7TNrQj9T7OsdHrN54jjYbz_5eKvcZTQ2cQ4ydgCUfNFopTENlAY400H9",
  ring: "https://lh3.googleusercontent.com/aida-public/AB6AXuDg-rRgslD-eTQytrqDX2ppAprde-n_RA-sahHOk9yy3KeNjGGKFxfj7VXJt12FXDhW7ysisLp840PabEVK-poRRqh13pNI0Z1rBtmTVrDmaMW-sO0UHNHmvIZxcdW703l0c7g5rRx56TX74ZR8Q3bNoAb6Q2UbFj6bZ5Yf9BuXF0x90RXZPZCRR5l58cmLnZku7mpWaEWnknW9nTBY7gjvW2c0POwJETP04qfq-vawPzH4a1237NFqMvIQov8mhXgNpuc2X8QZ0RmJ",
  explore_bracelets:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuAMdu3xBSAq5OF7rBADWiZOZoyzJQA9VFhOX1ECxQALAk_X2b-23JHS5I5ye44eaWthU3xDqzPeu_J_oxysZF0ipcyX9dCPSeEeFwnOF9jUpB5sjIINyJnb4is1frQWMXl4QRGCnry0TQR6HTnn2foONhG4xPNBSBxjdW4vtOYe8QSnsG0-sbqW2nNjjStCQQQaB5wqGRBvqaP-xRi8h8Zto5uL2BPy4ZMc88EcftFwfD5vaPeEs-oIFF9oi6ONxfHCOEKrKpNKG0bi",
  explore_necklaces:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuBZZHP-frVG_Mhdo0wb-X7xGzZFL5DhMVd6h7_ZUuIRBDdTEiuPevMilSEMu-1RS7NEZkUBOBO0ue9pyiE8Xy-WeUhdUsGRsLt8EK46ffNgqRc9VO-Vvcph7y7T0SELVxdXSGk73bHoPAboGxfFtolwk7NDOrXbVkdujQRbLUxR0ODm20QXhavefxv-vNSPc2PRY8UY5PNkoVr1E6Heeq8lD_N3-dXfxlMFLHNnO11PZa4S6mO72JnOCmNS3hdbPA7bPj4V4IFZXHRr",
  explore_rings:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuDOIOmycKdptNNe4PVY6ewBeUsalS8H9H-77OaIAXvy9GWVhsocvDQhZy3p8hVmhYyxGjUBdijwi_d9uxq08dlX8Bc-678hCosHQxGJxoEBIFP5BAV6RsaugCJYuVizpWzTMmBiZKj7H4Nj1qtl1p91K46jPovLDxJKn0yJWiQf97RrkRsH8wb449d6DjdQ5dxxsI5joln-oTtp2EXyJRbAL-lTd5o6hKhOf4srRaKvv6WgsS05Ze4Bqt3jojOJ-8FbAYKS01XfVlxf",
  story:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuBHEeCxZirie2AA_wr5xXLgN0HPAvrf6z6LUaOKZqq3aKs3wlnFTDvhyCBycnZ4etVg4-KlgCIJ26ZwTgi5hQjfns5Z18-LkXqaNC1pLlWz51l73GFJUowUpvGKbt7URzzn2txDYQ0kIj39HIXsfxDVvsO0mI7VVcEnDdLRjXmi_-b3NIkMoJ7ZfoTOKFYSNEXa57yuBH5CGynEQMCC5eouYSbzrDoFIs4h-2B6yOR_viSSztcZ73RhQv29AoXyEYOuRSJgLOG196lJ",
};
export const products = [
  {
    id: stableId("Rose Gold Weave Bracelet"),
    slug: "rose-gold-weave-bracelet",
    name: "Rose Gold Weave Bracelet",
    category: CATEGORY_KEYS.BRACELETS,
    sizes: ["Small", "Medium", "Large"],
    price: 89,

    featured: true,
    soldOut: false,
    // constants only
    materials: [MATERIAL_OPTIONS.GOLD, MATERIAL_OPTIONS.GEMSTONES],
    styles: [STYLE_OPTIONS.WOVEN],
    images: [img(0), img(1), img(2)],
  },
  {
    id: stableId("Pink Quartz Necklace"),
    slug: "pink-quartz-necklace",
    name: "Pink Quartz Necklace",
    category: CATEGORY_KEYS.NECKLACES,
    price: 120,
    sizes: ["Small", "Medium"],

    featured: true,
    soldOut: false,
    materials: [MATERIAL_OPTIONS.GOLD, MATERIAL_OPTIONS.GEMSTONES],
    styles: [STYLE_OPTIONS.PENDANT],
    images: [img(3), img(4), img(5)],
  },
  {
    id: stableId("Pastel Dream Bracelet"),
    slug: "pastel-dream-bracelet",
    name: "Pastel Dream Bracelet",
    category: CATEGORY_KEYS.BRACELETS,
    price: 45,

    featured: true,
    soldOut: false,
    materials: [MATERIAL_OPTIONS.SILVER],
    styles: [STYLE_OPTIONS.CHAIN],
    images: [img(6), img(7), img(8)],
  },
  {
    id: stableId("Pearl Drop Ring"),
    slug: "pearl-drop-ring",
    name: "Pearl Drop Ring",
    category: CATEGORY_KEYS.RINGS,
    price: 75,
    sizes: ["6", "7", "8", "9"],

    featured: true,
    soldOut: true,
    materials: [MATERIAL_OPTIONS.GEMSTONES, MATERIAL_OPTIONS.METAL],
    styles: [STYLE_OPTIONS.DROP],
    images: [img(9), img(10), img(11)],
  },

  // Bracelets (20)
  ...Array.from({ length: 20 }).map((_, i) => ({
    id: stableId(`Elegant Silver Bracelet ${i + 1}`),
    slug: `elegant-silver-bracelet-${i + 1}`,
    name: `Elegant Silver Bracelet ${i + 1}`,
    category: CATEGORY_KEYS.BRACELETS,
    materials: [MATERIAL_OPTIONS.SILVER],
    styles: i % 2 === 0 ? [STYLE_OPTIONS.CHAIN] : [STYLE_OPTIONS.BEADED],
    price: 25 + i * 3,
    soldOut: isSoldOut(i),
    sizes: ["Small", "Medium", "Large"],

    images: [img(12 + i), img(14 + i)],
  })),

  // Necklaces (20)
  ...Array.from({ length: 20 }).map((_, i) => ({
    id: stableId(`Gold Chain Necklace ${i + 1}`),
    slug: `gold-chain-necklace-${i + 1}`,
    name: `Gold Chain Necklace ${i + 1}`,
    category: CATEGORY_KEYS.NECKLACES,
    materials: [MATERIAL_OPTIONS.GOLD],
    styles: i % 2 === 0 ? [STYLE_OPTIONS.CHAIN] : [STYLE_OPTIONS.CHARM],
    price: 60 + i * 5,
    soldOut: isSoldOut(i + 50),
    images: [img(20 + i), img(21 + i)],
  })),

  // Earrings (18)
  ...Array.from({ length: 18 }).map((_, i) => ({
    id: stableId(`Pearl Drop Earrings ${i + 1}`),
    slug: `pearl-drop-earrings-${i + 1}`,
    name: `Pearl Drop Earrings ${i + 1}`,
    category: CATEGORY_KEYS.EARRINGS,
    materials: [MATERIAL_OPTIONS.GEMSTONES, MATERIAL_OPTIONS.SILVER],
    styles: i % 2 === 0 ? [STYLE_OPTIONS.CUFF] : [STYLE_OPTIONS.CHARM],
    price: 35 + i * 2.5,
    soldOut: isSoldOut(i + 100),
    images: [img(30 + i), img(31 + i)],
  })),

  // Rings (18)
  ...Array.from({ length: 18 }).map((_, i) => ({
    id: stableId(`Gemstone Ring ${i + 1}`),
    slug: `gemstone-ring-${i + 1}`,
    name: `Gemstone Ring ${i + 1}`,
    category: CATEGORY_KEYS.RINGS,
    materials: [MATERIAL_OPTIONS.GEMSTONES, MATERIAL_OPTIONS.METAL],
    styles: i % 3 === 0 ? [STYLE_OPTIONS.BEADED] : [STYLE_OPTIONS.CUFF],
    price: 80 + i * 4,
    soldOut: isSoldOut(i + 150),
    images: [img(40 + i), img(41 + i)],
  })),

  // Watches (16)
  ...Array.from({ length: 16 }).map((_, i) => ({
    id: stableId(`Classic Watch ${i + 1}`),
    slug: `classic-watch-${i + 1}`,
    name: `Classic Watch ${i + 1}`,
    category: CATEGORY_KEYS.WATCHES,
    materials: [MATERIAL_OPTIONS.LEATHER, MATERIAL_OPTIONS.METAL],
    styles: i % 2 === 0 ? [STYLE_OPTIONS.CHAIN] : [STYLE_OPTIONS.BEADED],
    price: 120 + i * 10,
    soldOut: isSoldOut(i + 200),
    images: [img(55 + i), img(56 + i)],
  })),
];

export default { products, categories };
