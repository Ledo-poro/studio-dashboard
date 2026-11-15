# Waleed Studio Dashboard

A modern, fast, and elegant executive workspace built for independent creators, developers, and solo founders. Waleed Studio brings projects, clients, cash flow, revenue, and expenses into a single calmer view so you can focus on the work that matters.

![Waleed Studio Overview](public/next.svg)

---

## ✨ Features

- **🏠 Studio Overview:** A centralized command center providing high-level metrics, active projects snapshot, and cash flow visualization.
- **📁 Project Management:** Track ongoing client and internal projects, milestones, progress bars, and budgets in real-time.
- **👥 Client Relationship Management (CRM):** Keep tabs on your active clients, contact information, project counts, and lifetime value.
- **💰 Revenue Tracking:** Monitor incoming cash flows across various income streams (SaaS, Client Projects, Consulting).
- **💸 Expense & Spend Tracking:** Categorize and review monthly operational costs (Hosting, Tools, Marketing, Salaries).
- **⚙️ Settings & Profile:** Tailor your workspace preferences, personal details, and account security.
- **🔐 Secure Authentication:** Powered by **Better Auth** with robust email & password authentication, active session management, and PostgreSQL database storage.

---

## 🛠️ Tech Stack

- **Framework:** [Next.js 16](https://nextjs.org/) (App Router, Server Actions, Client Components)
- **UI Library:** [React 19](https://react.dev/)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/) & Custom Studio CSS
- **Icons:** [Lucide React](https://lucide.dev/)
- **Authentication:** [Better Auth](https://better-auth.com/) (`better-auth` + Prisma Adapter)
- **Database ORM:** [Prisma v7](https://www.prisma.io/) with `@prisma/adapter-pg`
- **Database:** PostgreSQL

---

## 📁 Project Structure

```tree
waleed-dashboard/
├── app/                  # Next.js App Router pages & API routes
│   ├── api/auth/         # Better Auth catch-all API handler
│   ├── auth/             # Sign-in and Sign-up authentication pages
│   ├── clients/          # Client management interface
│   ├── dashboard/        # Main studio overview & analytics
│   ├── projects/         # Project tracking & status management
│   ├── revenue/          # Revenue analytics & income records
│   ├── settings/         # User profile & studio settings
│   ├── spends/           # Expense tracking & cost categorization
│   ├── layout.tsx        # Root layout with providers & fonts
│   └── page.tsx          # Landing / Welcome page
├── components/           # Reusable UI components & layouts
├── lib/                  # Core utilities and client/server setups
│   ├── auth.ts           # Better Auth server configuration
│   ├── auth-client.ts    # Better Auth React client hooks
│   └── prisma.ts         # Prisma client singleton instance
├── prisma/               # Database schema & migrations
│   └── schema.prisma     # Prisma data models (User, Session, Project, etc.)
└── package.json          # Dependencies and script definitions
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v18+ recommended)
- **PostgreSQL** database instance running locally or hosted (e.g., Supabase, Neon, local Postgres)

### 1. Clone & Install Dependencies

```bash
git clone https://github.com/waleed/waleed-dashboard.git
cd waleed-dashboard
npm install
```

### 2. Configure Environment Variables

Create a `.env` file in the root directory (you can reference `.env.example`):

```env
DATABASE_URL="postgresql://YOUR_USER:YOUR_PASSWORD@localhost:5432/waleeddashboard?schema=public"
BETTER_AUTH_SECRET="your-super-secret-random-key-here"
BETTER_AUTH_URL="http://localhost:3000"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

### 3. Initialize Database Schema

Push your Prisma schema to your PostgreSQL database:

```bash
npx prisma db push
```

### 4. Run the Development Server

Start the local development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view your studio dashboard.

---

## 📜 Available Scripts

| Command | Description |
| :--- | :--- |
| `npm run dev` | Start Next.js development server with hot reloading |
| `npm run build` | Build the application for production |
| `npm run start` | Start the production server |
| `npm run lint` | Run ESLint for code quality checks |
| `npm run db:push` | Push Prisma schema changes directly to the database |
| `npm run db:generate` | Generate Prisma Client code |

---

## 🛡️ License

This project is private and intended for Waleed Studio.

---

*Built with passion and focus for independent work.*
