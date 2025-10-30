// src/constants/index.js
export const CURRENCY = "INR";
// Category keys (UI-facing names preserved)
export const CATEGORY_KEYS = {
  ALL: "All",
  BRACELETS: "Bracelets",
  NECKLACES: "Necklaces",
  EARRINGS: "Earrings",
  RINGS: "Rings",
  WATCHES: "Watches",
};

// Category list used in UIs (order matters)
export const CATEGORY_LIST = Object.values(CATEGORY_KEYS);

// ---- Materials (single source of truth) ----
export const MATERIAL_OPTIONS = {
  GOLD: "gold",
  SILVER: "silver",
  GEMSTONES: "gemstones",
  LEATHER: "leather",
  METAL: "metal",
};
export const MATERIAL_LIST = Object.values(MATERIAL_OPTIONS);

// ---- Styles (extended to cover your seed data) ----
export const STYLE_OPTIONS = {
  CHAIN: "chain",
  BEADED: "beaded",
  CUFF: "cuff",
  CHARM: "charm",
  WOVEN: "woven",
  PENDANT: "pendant",
  DROP: "drop",
};
export const STYLE_LIST = Object.values(STYLE_OPTIONS);

// Pagination
export const DEFAULT_PAGE_SIZE = 15;
export const PAGE_SIZE_OPTIONS = [15, 30, 45, 50];

// Valid external image pool (extend freely)
export const IMAGE_POOL = [
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCaX_tzehw7qMyK5pYKsNWznlpXpMvoe-0us3gB4XqBJaN1UMbWhga1wzXfoKNe2iA7GvSv6ViaPHQub07y3_mu8dnkiwZVtlTR8XHoOoLIvs1b1WqDp03ja0sGo1vg-CP0CAKQqyhJ3zM-EXfQ1l528PIavkKR_Zlw07fYVuyumbwgwObbUagk4RIrffILCpFtsWgImzftzXY9oG4n8bGeOPA1Sj-L2yeS2XnIP2n5dCqLelbOOTeAFL9fFy2MRzZWj6frrykwp2Xm",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDmM5CXalwPewbmWy0b-5rWOCVGodQ7ale-HO6kezOwUyQ91zt6zA-yBKEsEN-bi5NLXV2oHM3cbsQaGCO12t-nv0YKKiLQDtc1q3aHAA9pMF-F02e5xEi38d3LwnT679sXHKMIPb0h-nn2VK5KHsFLyIL6XK9f0sqinP_Ira5UngpfY4ePz7sa_RA24yzL6BbAP-JJORtxFtZoMq5TR1u-LJVFFxEBrk29d58Y4IFAt4sg8wwkdEuFU76zf4DR04YjOH-qpMKR9jn-",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDTWQnjyq8wk7oC7RxhCK0oqtwz40dsH0HPMWoOhEFnKWEj01SDthaaa84DlblFq861CzdE_CWDsbUTPZCbcbpDkl89Wwm7cMv6C-WIjvNW2wKus_-EBZwAtDKYxLReU9a13CunB8hhBGh82GXBmj3yZR-9jj9Lb_dW5TubEB_2CPvXPMVaULAaHm9AikeEDig2BrG-UH7BtutkEDuoX5Nv7TNrQj9T7OsdHrN54jjYbz_5eKvcZTQ2cQ4ydgCUfNFopTENlAY400H9",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDg-rRgslD-eTQytrqDX2ppAprde-n_RA-sahHOk9yy3KeNjGGKFxfj7VXJt12FXDhW7ysisLp840PabEVK-poRRqh13pNI0Z1rBtmTVrDmaMW-sO0UHNHmvIZxcdW703l0c7g5rRx56TX74ZR8Q3bNoAb6Q2UbFj6bZ5Yf9BuXF0x90RXZPZCRR5l58cmLnZku7mpWaEWnknW9nTBY7gjvW2c0POwJETP04qfq-vawPzH4a1237NFqMvIQov8mhXgNpuc2X8QZ0RmJ",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuAMdu3xBSAq5OF7rBADWiZOZoyzJQA9VFhOX1ECxQALAk_X2b-23JHS5I5ye44eaWthU3xDqzPeu_J_oxysZF0ipcyX9dCPSeEeFwnOF9jUpB5sjIINyJnb4is1frQWMXl4QRGCnry0TQR6HTnn2foONhG4xPNBSBxjdW4vtOYe8QSnsG0-sbqW2nNjjStCQQQaB5wqGRBvqaP-xRi8h8Zto5uL2BPy4ZMc88EcftFwfD5vaPeEs-oIFF9oi6ONxfHCOEKrKpNKG0bi",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBZZHP-frVG_Mhdo0wb-X7xGzZFL5DhMVd6h7_ZUuIRBDdTEiuPevMilSEMu-1RS7NEZkUBOBO0ue9pyiE8Xy-WeUhdUsGRsLt8EK46ffNgqRc9VO-Vvcph7y7T0SELVxdXSGk73bHoPAboGxfFtolwk7NDOrXbVkdujQRbLUxR0ODm20QXhavefxv-vNSPc2PRY8UY5PNkoVr1E6Heeq8lD_N3-dXfxlMFLHNnO11PZa4S6mO72JnOCmNS3hdbPA7bPj4V4IFZXHRr",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDOIOmycKdptNNe4PVY6ewBeUsalS8H9H-77OaIAXvy9GWVhsocvDQhZy3p8hVmhYyxGjUBdijwi_d9uxq08dlX8Bc-678hCosHQxGJxoEBIFP5BAV6RsaugCJYuVizpWzTMmBiZKj7H4Nj1qtl1p91K46jPovLDxJKn0yJWiQf97RrkRsH8wb449d6DjdQ5dxxsI5joln-oTtp2EXyJRbAL-lTd5o6hKhOf4srRaKvv6WgsS05Ze4Bqt3jojOJ-8FbAYKS01XfVlxf",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBHEeCxZirie2AA_wr5xXLgN0HPAvrf6z6LUaOKZqq3aKs3wlnFTDvhyCBycnZ4etVg4-KlgCIJ26ZwTgi5hQjfns5Z18-LkXqaNC1pLlWz51l73GFJUowUpvGKbt7URzzn2txDYQ0kIj39HIXsfxDVvsO0mI7VVcEnDdLRjXmi_-b3NIkMoJ7ZfoTOKFYSNEXa57yuBH5CGynEQMCC5eouYSbzrDoFIs4h-2B6yOR_viSSztcZ73RhQv29AoXyEYOuRSJgLOG196lJ",
];
