import {
  RiFacebookBoxLine,
  RiFacebookLine,
  RiInstagramLine,
  RiPinterestLine,
  RiWhatsappLine,
} from "react-icons/ri";

// src/constants/index.js
export const CURRENCY = "INR";
export const MAX_PRICE = 5000;
export const SHIPPING_THRESHOLD = 5000;
export const SHIPPING_COST = 80;
export const FREE_SHIPPING_CITY = "Sagwara";
// Category keys (UI-facing names preserved)
export const CATEGORY_KEYS = {
  ALL: "All",
  BRACELETS: "Bracelets",
  KEYCHAIN: "Keychain",
  NECKLACE: "Necklace",
  TASBEEH: "Tasbeeh",
  TACHNI: "Tachni",
  CHARM: "Charm",
  RINGS: "Rings",
  BAGS: "Bags",
  EARRINGS: "Earrings",
  COMBO: "Combo",
  BALM: "Balm",
};

export const SOCIAL_LINKS = [
  {
    Icon: RiInstagramLine,
    href: "https://www.instagram.com/tarmal_creation",
  },
  {
    Icon: RiFacebookLine,
    href: "https://www.facebook.com/tarmalcreation",
  },
  {
    Icon: RiWhatsappLine,
    href: "https://wa.me/917849868670",
  },
];
export const CONTACT_INFO = {
  EMAIL: "tarmalcreation@gmail.com",
  PHONE: "+91 7849868670",
  ADDRESS: "Near saifi masjid BOHRAWADI SAGWARA, Rajasthan, India",
};
export const WHATSAPP_NUMBER = "917849868670";
const variantExample = [
  {
    style: "Gold Plated",
    images: ["/images/gold-default.jpg"],
    colors: [
      {
        color: "Ruby Red",
        images: ["/images/gold-red-1.jpg", "/images/gold-red-2.jpg"],
      },
      {
        color: "Emerald Green",
        images: ["/images/gold-green-1.jpg"],
      },
    ],
  },
  {
    style: "Sterling Silver",
    colors: [
      {
        color: "Classic Silver",
        images: ["/images/silver-1.jpg"],
      },
    ],
  },
  {
    style: "Rose Gold",
    images: ["/images/rose-gold-only.jpg"],
    /* No colors array here - will only show Style option */
  },
  {
    color: "Midnight Blue",
    images: ["/images/blue-direct.jpg"],
    /* No style key here - will show Color option directly */
  },
];
const sizeVariant = [
  {
    size: "Small",
    price: 100,
  },
  {
    size: "Medium",
    price: 200,
  },
  {
    size: "Large",
    price: 300,
  },
];
