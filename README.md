# GROVO

This is the main repository for the **GROVO** platform. This project is built using [Next.js](https://nextjs.org) bootstrapped with `create-next-app`.

## 🚀 Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

---

## 🤝 Git Collaboration & Team Workflow

Working efficiently as a team requires a structured Git workflow. Please read and follow these guidelines for all contributions to the GROVO codebase.

### 1. Branching Strategy

We follow a feature-branch workflow. **Never commit directly to the `main` or `develop` branch.**

- **Main Branch (`main`):** Contains production-ready code.
- **Development Branch (`develop`):** The active integration branch. Features merge here first.
- **Feature Branches (`feature/...`):** For new features (e.g., `feature/user-authentication`).
- **Bugfix Branches (`bugfix/...`):** For fixing bugs (e.g., `bugfix/login-crash`).
- **Hotfix Branches (`hotfix/...`):** Urgent production fixes (e.g., `hotfix/payment-gateway-failure`).

### 2. Creating a New Branch

Always ensure your local repository is up to date before starting new work:

```bash
# Switch to develop branch
git checkout develop

# Pull the latest changes
git pull origin develop

# Create your new branch
git checkout -b feature/your-feature-name
```

### 3. Committing Your Changes

We use [Conventional Commits](https://www.conventionalcommits.org/). Your commit messages should be clear and descriptive.

**Format:** `<type>(<scope>): <description>`

- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation only changes
- `style`: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
- `refactor`: A code change that neither fixes a bug nor adds a feature
- `test`: Adding missing tests or correcting existing tests
- `chore`: Changes to the build process or auxiliary tools and libraries such as documentation generation

**Examples:**
```bash
git add .
git commit -m "feat(auth): implement JWT login"
git commit -m "fix(dashboard): resolve layout shift on mobile"
```

### 4. Syncing with the Remote Repository

Before you push your code, always make sure you don't have conflicts with the main integration branch (`develop`).

```bash
# Fetch latest remote changes
git fetch origin

# Rebase your branch on top of develop to keep a clean linear history
git rebase origin/develop

# If you get conflicts, resolve them in your editor, then:
git add .
git rebase --continue
```

### 5. Pushing and Creating a Pull Request (PR)

Once your local branch is updated and tested:

```bash
# Push your branch to the remote repository
git push origin feature/your-feature-name
```

**Pull Request Guidelines:**
1. Go to the GitHub/GitLab repository and open a Pull Request against the `develop` branch.
2. Provide a clear title and description of what the PR accomplishes.
3. Link any relevant Jira/Trello tickets or GitHub issues.
4. Request a review from at least one other team member.
5. **Do not merge your own PR** until it has been approved.

### 6. Resolving Merge Conflicts

If your PR has merge conflicts:
1. Check out your branch locally.
2. Run `git pull origin develop`.
3. Open your code editor and resolve the highlighted conflicts.
4. Run `git add <resolved-files>`.
5. Run `git commit -m "chore: resolve merge conflicts"`.
6. Run `git push origin your-branch-name`.

---

## 📚 Resources & Documentation

- [Frontend API & Data Reference](./FRONTEND_API_REFERENCE.md) - Complete guide to our database schemas and API routes.
- [Frontend README](./FRONTEND_README.md) - Specific guidelines for frontend development.
- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
