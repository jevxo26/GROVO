# GROVO - Frontend Developer Guide 🚀

Welcome to the frontend documentation for the **GROVO** platform. This guide provides an overview of the project structure, technology stack, data models, and collaboration guidelines to help you get started effectively.

## 🛠 Tech Stack

The GROVO frontend is built with modern web technologies:
- **Framework:** [Next.js (App Router)](https://nextjs.org/) v16.2
- **Library:** [React](https://react.dev/) v19
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) v4
- **UI Components:** [Shadcn UI](https://ui.shadcn.com/), [Radix UI](https://www.radix-ui.com/), [Base UI](https://base-ui.com/)
- **Icons:** [Lucide React](https://lucide.dev/), [Hugeicons](https://hugeicons.com/)
- **Authentication:** [Better Auth](https://better-auth.com/)
- **Database ORM:** [Prisma](https://www.prisma.io/) (PostgreSQL)

## 📁 Project Structure

Here's an overview of the frontend-relevant directories:
```
GROVO/
├── src/                # Main Next.js frontend code (App Router, components, hooks)
├── public/             # Static assets (images, fonts)
├── prisma/schema/      # Database schemas (useful for understanding data shapes)
├── server/             # Custom server / API logic
├── components.json     # Shadcn UI configuration
├── tailwind.config.ts  # Tailwind CSS configuration
└── package.json        # Dependencies and scripts
```

---

## 📊 Core Data Models & API Reference

To effectively build UI components, it's essential to understand the shape of the data and the available API routes. Because GROVO is a large platform with over 60+ database models, we have generated a separate, comprehensive reference document.

**👉 Please refer to the [FRONTEND_API_REFERENCE.md](file:///f:/Intern/jevxo/GROVO/FRONTEND_API_REFERENCE.md) for the complete list of all database models (Prisma Schemas) and available API Routes.**

This separate file contains detailed type information for all modules including:
- **Core Entities:** `User`, `Organization`, `Branch`
- **Operations:** `Volunteer`, `Event`, `Project`, `Campaign`
- **Finances:** `Donation`, `Fund`, `Payment`
- **Beneficiaries & Relief:** `Beneficiary`, `Distribution`, `NeedAssessment`
- **AI Modules:** `AIAssistant`, `AIModel`, `AIInsight`
- **And much more...**

---

## 🚀 Getting Started Locally

1. **Install Dependencies:**
   We recommend using `npm` or `pnpm`.
   ```bash
   npm install
   # or
   pnpm install
   ```

2. **Environment Variables:**
   Create a `.env` file based on `.env.example` (ask the backend team for required keys if missing).

3. **Run the Development Server:**
   ```bash
   npm run dev
   # or
   pnpm dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🤝 Git Collaboration Guide

Working in a team requires a clean and organized Git workflow. Please follow these guidelines:

### 1. Branching Strategy
Always create a new branch from `main` (or `develop` if applicable) for your work.
- **Features:** `feature/your-feature-name` (e.g., `feature/user-dashboard`)
- **Bug Fixes:** `bugfix/issue-description` (e.g., `bugfix/login-button-alignment`)
- **UI/Styling:** `ui/component-name` (e.g., `ui/membership-card`)

```bash
# Ensure you are up to date
git checkout main
git pull origin main

# Create and switch to your new branch
git checkout -b feature/your-feature-name
```

### 2. Committing Changes
Write clear, concise commit messages. We recommend using [Conventional Commits](https://www.conventionalcommits.org/).
- `feat: added new membership card component`
- `fix: resolved hydration error on dashboard`
- `style: updated tailwind colors for dark mode`

```bash
git add .
git commit -m "feat: your descriptive message"
```

### 3. Syncing with Main Branch
Before opening a Pull Request, ensure your branch is up to date with the latest changes from `main` to avoid conflicts.

```bash
# Fetch latest changes
git fetch origin

# Rebase or merge (Rebase is preferred for a cleaner history)
git rebase origin/main

# If conflicts occur, resolve them in your editor, then:
git add .
git rebase --continue
```

### 4. Pushing and Pull Requests
Once your changes are ready and tested:

```bash
git push origin feature/your-feature-name
```
Then, open a Pull Request (PR) on GitHub/GitLab. Request a review from at least one other team member before merging.

---

## 📌 Future Updates
*This documentation is a living document.*
As we build out more features (AI Assistants, Governance, Relief Distribution, etc.), we will update the **Core Data Models** section. Please ensure you keep this file organized and updated when introducing major structural changes to the frontend.











