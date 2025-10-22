A modern HR Management System for Al Nada Int’l Exchange Co., built with Next.js (App Router + Javascript), springboot, and PostgreSQL/SQL Server. It supports Arabic & English, Kuwait (GMT+3) timezone, role-based access, payroll, leave, attendance, and approvals.

✨ Features

Auth & RBAC: Email/Password or SSO (optional), roles: Admin, HR, Manager, Employee.

CORE HR: All Employee Information, contracts, documents, dependents, IDs, bank accounts.

Audit & Logs: every sensitive action tracked.

Localization: ar/en (RTL/LTR), Hijri date display (optional), numeral formatting.

Emails & Notifications: SMTP & in-app toasts, optional WhatsApp/SMS hooks.

🧱 Tech Stack

Frontend/SSR: Next.js (App Router), React 18, Javascript, TailwindCSS

State: React Query (TanStack), Zod (schema validation)

Auth: NextAuth (Credentials / OAuth2 provider optional)

DB: PostgreSQL 17+ (default) or SQL Server 2019+ (set provider in Prisma)

Files: S3-compatible (MinIO/AWS) or local /uploads

Email: SMTP (e.g., Microsoft 365)

Testing: Vitest + Testing Library + Playwright (e2e)

CI/CD: GitHub Actions

Package Manager: pnpm