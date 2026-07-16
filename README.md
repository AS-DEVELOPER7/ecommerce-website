# 💎 Tarmal Creation – Handcrafted Jewelry

A **premium, modern e-commerce platform** showcasing exquisite handcrafted jewelry designs. Built with **Next.js 16 (App Router)** and **Tailwind CSS 4**, this store focuses on high-end aesthetics, interactive product displays, and secure backend integration.

---

## ✨ Features

### 💍 Premium Browsing
- **Interactive Product Gallery**: Smooth mouse-tracked 2x magnifying glass zoom for inspecting fine jewelry details.
- **Atomic Design Architecture**: Highly modular and reusable component system (Atoms, Molecules, Organisms).
- **Responsive & Dynamic**: Fully optimized for mobile screens with adaptive aspect ratios and layouts.

### 🔐 Security & Backend
- **Server-Side Supabase Integration**: All database operations are proxied through secure API routes, keeping Supabase keys hidden from the browser.
- **Dynamic Content**: Category and product management powered by a Supabase backend.
- **Secure Environment Variables**: Migrated to server-only keys for production hardening.

### 🛒 Checkout Flow
- **WhatsApp Order Integration**: Direct communication with the shop via detailed WhatsApp order templates.
- **Smart Variations**: Full support for product colors and sizes as unique line items.
- **Robust Image System**: Intelligent `ImageWithFallback` component that gracefully handles missing product photos with a professional brand icon.

---

## 🧱 Tech Stack

| Layer                | Technologies                                      |
| -------------------- | ------------------------------------------------- |
| **Framework**        | Next.js 16 (App Router), React 19                 |
| **Styling**          | Tailwind CSS 4, Framer Motion                     |
| **State & API**      | Redux Toolkit, RTK Query                          |
| **Backend**          | Supabase JS (Server-Side)                         |
| **Localization**     | i18next, React i18next                            |
| **Icons**            | React Icons (Lucide, HeroIcons, Remix)            |
| **Package Manager**  | pnpm                                              |

---

## 🚀 Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/AS-DEVELOPER7/ecommerce-website.git
   cd ecommerce-website
   ```

2. **Environment Setup**
   Create a `.env` file in the root directory:
   ```env
   SUPABASE_URL=your_supabase_url
   SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

3. **Install Dependencies**
   ```bash
   pnpm install
   ```

4. **Run Development Server**
   ```bash
   pnpm dev
   ```

5. **Visit** [http://localhost:3000](http://localhost:3000)

---

## 📂 Project Structure

```
├── app/               # Next.js 16 App Router (Pages & API)
├── public/            # Static assets (icon.svg, images)
├── src/
│   ├── components/    # Atomic Design (Atoms, Molecules, Organisms, Layouts)
│   ├── constants/     # Global constants and configuration
│   ├── services/      # Redux store, slices, and API definitions
│   ├── styles/        # Global CSS and Tailwind directives
│   └── utils/         # Helper functions (currency, formatting)
├── next.config.mjs    # Next.js configuration
└── tailwind.config.js # Tailwind CSS configuration
```

---

## 📄 License

Internal proprietary software — © **Tarmal Creation**  
All rights reserved. Redistribution or commercial use without authorization is prohibited.
