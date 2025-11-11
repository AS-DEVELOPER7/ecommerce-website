<<<<<<< HEAD
# 🏢 Al Nada HR Management System (HRMS)

A **modern Human Resource Management System** for **Al Nada Int’l Exchange Co.**, built with **Next.js (App Router + JavaScript)** in frontend.  
It supports **Arabic & English**, **Kuwait (GMT + 3)** timezone, and provides **role-based access**, **payroll**, **leave**, **attendance**, and **approval workflows**.

---

## ✨ Features

### 🔐 Auth & RBAC
- Email / Password authentication or optional SSO.  
- Roles: **Admin**, **HR**, **Manager**, **Employee**.  
- Role-based access control across all modules.

### 👥 Core HR
- Complete employee information management.  
- Employee contracts, documents, dependents, IDs, and bank accounts.

### 🧾 Audit & Logs
- Every sensitive action tracked with detailed logs.

### 🌍 Localization
- Full **Arabic / English** support (**RTL / LTR**).  
- Optional Hijri date display and Kuwait numeral formatting.

### ✉️ Emails & Notifications
- SMTP-based email alerts (Microsoft 365 supported).  
- In-app toasts and optional WhatsApp / SMS integrations.

---

## 🧱 Tech Stack

| Layer                         | Technologies                                                  |
|-------------------------------|---------------------------------------------------------------|
| **Frontend / SSR**            | Next.js (App Router), React 18, JavaScript, Tailwind CSS      |
| **State Management**          | Redux                                                         |
| **Authentication**            | NextAuth (Credentials or OAuth2 provider optional)            |
| **Backend**                   | Spring Boot (Java 17 +) REST API                              |
| **Database**                  | PostgreSQL 17 + (default) or SQL Server 2019                  |
| **File Storage**              | S3-compatible (MinIO / AWS) or local `/uploads` folder        |
| **Email**                     | SMTP (e.g., Microsoft 365 / Exchange Online)                  |
| **Testing**                   | Vitest + Testing Library + Playwright (e2e)                   |
| **CI / CD**                   | GitHub Actions pipelines                                      |
| **Package Manager**           | pnpm (latest LTS)                                             |

---

## 🕒 Timezone & Locale
All timestamps normalized to **Asia/Kuwait (GMT + 3)**.  
Localized UI follows user language and RTL/LTR direction automatically.

---

## 📄 License
Internal proprietary software — © **Al Nada Exchange**  
All rights reserved. Redistribution or commercial use without authorization is prohibited.

---

## 📬 Contact
For technical support or deployment assistance, contact:  
**TechnicalSupport@alnadaex.com**
=======
# Ecommerce Website

A modern ecommerce website built using **Next.js** and **Tailwind CSS**.

## Features

- ⚡ **Fast and Responsive**: Built with Next.js for performance and scalability.
- 🎨 **Styled with Tailwind CSS**: Rapidly build and customize your UI.
- 🛒 **Ecommerce Functionality**: Product listings, cart, and checkout flow.
- 🚀 **SEO Friendly**: Optimized for search engines with Next.js.
- 📱 **Mobile Ready**: Responsive design for all devices.

## Tech Stack

- **Next.js** (React-based Framework)
- **Tailwind CSS** (Utility-first CSS framework)
- **JavaScript** (Main programming language)
- **CSS** (For additional styling needs)

## Getting Started

1. **Clone the repository**

   ```bash
   git clone https://github.com/AS-DEVELOPER7/ecommerce-website.git
   cd ecommerce-website
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Run the development server**

   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**

   Visit [http://localhost:3000](http://localhost:3000) to view the app.

## Project Structure

```
├── components     # Reusable UI components
├── pages          # Next.js pages
├── public         # Static assets
├── styles         # Tailwind and custom CSS
├── utils          # Utility functions (if any)
├── package.json
└── README.md
```

## Customization

- Update `tailwind.config.js` to customize Tailwind settings.
- Add or modify components and pages to fit your ecommerce needs.

## Contributing

Contributions are welcome! Please open issues or submit pull requests for improvements or bug fixes.

## License

This project is licensed under the [MIT License](LICENSE).

---

> **ecommerce website using next.js and tailwindcss**
>>>>>>> b11839557a023584904ffae753ac1e71a1ec3a8c
