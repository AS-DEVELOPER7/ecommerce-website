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
Internal proprietary software — © **Al Nada Int’l Exchange Co.**  
All rights reserved. Redistribution or commercial use without authorization is prohibited.

---

## 📬 Contact
For technical support or deployment assistance, contact:  
**it@alnadaex.com**
