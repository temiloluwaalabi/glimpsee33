# Glimpse33 Feed Explorer

A modern, feature-rich feed exploration application built with Next.js 15, TypeScript, and Tailwind CSS. This application provides a comprehensive platform for users to explore, categorize, and manage content feeds with authentication, real-time updates, and a beautiful user interface.

## ✨ Features

- **🔐 Authentication System**: Complete auth flow with login, registration, email confirmation, and password reset
- **📱 Responsive Design**: Mobile-first approach with beautiful UI components
- **🎨 Dark/Light Mode**: Theme switching with next-themes
- **📊 Feed Management**: Browse, filter, and categorize feeds
- **🔍 Real-time Search**: Advanced filtering and search capabilities
- **⚡ Performance Optimized**: Built with Next.js 15 App Router and React Server Components
- **🧪 Testing Ready**: Jest, Testing Library, and Playwright setup
- **🎯 Type Safety**: Full TypeScript implementation
- **📋 Form Handling**: React Hook Form with Zod validation
- **🌐 API Integration**: Axios-based API client with TanStack Query
- **🎭 Mock Service Worker**: Development and testing with MSW
- **📈 State Management**: Zustand for client-side state

## 🚀 Tech Stack

### Core

- **Next.js 15** - React framework with App Router
- **React 19** - User interface library
- **TypeScript** - Type safety
- **Tailwind CSS 4** - Styling and design system

### UI Components

- **Radix UI** - Accessible component primitives
- **Lucide React** - Beautiful icons
- **Framer Motion** - Smooth animations
- **Sonner** - Toast notifications

### Data & State

- **TanStack Query** - Server state management
- **Zustand** - Client state management
- **Zod** - Schema validation
- **React Hook Form** - Form handling

### Development

- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Husky** - Git hooks
- **Commitlint** - Commit message linting
- **Jest** - Unit testing
- **Playwright** - E2E testing
- **MSW** - API mocking

## 📁 Project Structure

```
├── app/                    # Next.js App Router
│   ├── (auth)/            # Authentication pages
│   ├── (feed)/            # Feed-related pages
│   ├── (others)/          # Additional pages
│   ├── actions/           # Server actions
│   └── api/               # API routes
├── components/            # Reusable UI components
│   ├── cards/            # Card components
│   ├── dialogs/          # Modal dialogs
│   ├── forms/            # Form components
│   ├── layout/           # Layout components
│   ├── pages/            # Page-specific components
│   ├── shared/           # Shared utilities
│   └── ui/               # Base UI components
├── config/               # Configuration files
├── hooks/                # Custom React hooks
├── lib/                  # Utility libraries
│   ├── api/             # API client setup
│   ├── auth/            # Authentication utilities
│   ├── msw/             # Mock Service Worker
│   └── validations/     # Zod schemas
├── providers/            # React context providers
├── store/               # Zustand stores
├── tests/               # Test files
│   ├── integration/
│   ├── unit/
└── types/               # TypeScript type definitions
```

## 🔧 API Architecture

This project uses a hybrid API strategy for seamless development and production experiences:

### Development

- **MSW (Mock Service Worker)** intercepts API requests
- Simulates network latency and realistic responses
- Enables rapid development and reliable testing

### Production

- **Next.js API Routes** serve the same mock data
- Ensures consistent API behavior across environments
- Easily extendable for integration with real/external APIs

### Available Endpoints

| Method | Endpoint           | Description              |
| ------ | ------------------ | ------------------------ |
| GET    | `/api/feed`        | Get paginated feed items |
| GET    | `/api/feed/[id]`   | Get a specific feed item |
| GET    | `/api/categories`  | Get available categories |
| POST   | `/api/auth/login`  | Mock login               |
| POST   | `/api/auth/logout` | Mock logout              |
| GET    | `/api/auth/me`     | Get current user         |

## 🔐 Authentication

The app features a mock authentication system for development and testing:

### Mock Users

```typescript
// Default test users
{
  email: "temiloluwaalabi33@gmail.com",
  password: "Adeleke148@!!"
}
```

### Authentication Features

- Session-based authentication using `iron-session`
- Protected routes and components
- Persistent login state across sessions
- Mock user profiles for testing
- Email/password login and logout flows
- Example endpoints for login, logout, and current user info

## 🛠️ Setup Instructions

### Prerequisites

Before you begin, ensure you have the following installed on your system:

- **Node.js** (v18.17.0 or higher) - [Download here](https://nodejs.org/)
- **npm** (v8.0.0 or higher) - Usually comes with Node.js
- **Git** - [Download here](https://git-scm.com/)

### Step-by-Step Setup

#### 1. Clone the Repository

```bash
git clone <repository-url>
cd glimpse33-feed-explorer
```

#### 2. Install Dependencies

```bash
# Install all project dependencies
npm install

# Verify installation
npm ls --depth=0
```

#### 3. Environment Configuration

Create your environment file:

```bash
# Copy the example environment file
cp .env.local.example .env.local

# Or create manually if example doesn't exist
touch .env.local
```

Configure your `.env.local` file with the following variables:

```env
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:3000/api

# Session Security (Generate a secure 32-character string)
SECRET_KEY=5b72f5eab4fc61066e21e32d2bf51fef1ccaa86820a99db2d8d7735759cd0c32

# Optional: Additional configuration
NODE_ENV=development
```

> **🔒 Security Note**: Never commit your `.env.local` file to version control. The `SECRET_KEY` should be a randomly generated string.

#### 4. Generate Secret Key (If needed)

```bash
# Generate a secure secret key using Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

#### 5. Initialize Git Hooks and Development Tools

```bash
# Set up Husky for git hooks
npm run prepare

# Verify Husky installation
ls -la .husky/

# Initialize git repository (if not already done)
git init
git add .
git commit -m "feat: initial project setup"
```

#### 6. Start Development Server

```bash
# Start the development server
npm run dev

# The app will be available at:
# 🌐 Local:    http://localhost:3000
# 📱 Network:  http://[your-ip]:3000
```

#### 7. Verify Setup

Open your browser and navigate to `http://localhost:3000`. You should see:

- The application home page
- No console errors in browser dev tools
- Proper theme switching functionality

### Development Tools Configuration

#### Linting Setup

The project comes with ESLint and Prettier configured. Here's how to set them up properly:

```bash
# Install ESLint globally (optional but recommended)
npm install -g eslint

# Run linting
npm run lint

# Auto-fix linting issues
npm run lint:fix

# Format code with Prettier
npm run format
```

**ESLint Configuration** (`eslint.config.mjs`):

- Next.js recommended rules
- TypeScript support
- Tailwind CSS class sorting
- Import/export validation
- TanStack Query best practices

**Prettier Configuration** (`.prettierrc.json`):

```json
{
  "semi": false,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5",
  "printWidth": 80,
  "plugins": ["prettier-plugin-tailwindcss"]
}
```

#### Husky Git Hooks Setup

Husky is configured to run quality checks before commits and pushes:

**Pre-commit Hook** (`.husky/pre-commit`):

```bash
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

npx lint-staged
```

**Commit Message Hook** (`.husky/commit-msg`):

```bash
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

npx --no -- commitlint --edit ${1}
```

**Lint-staged Configuration** (`package.json`):

```json
{
  "lint-staged": {
    "*.{js,jsx,ts,tsx}": ["eslint --fix", "prettier --write"],
    "*.{json,md}": ["prettier --write"]
  }
}
```

**Manual Husky Setup** (if automatic setup fails):

```bash
# Install Husky
npx husky install

# Add pre-commit hook
npx husky add .husky/pre-commit "npx lint-staged"

# Add commit-msg hook
npx husky add .husky/commit-msg 'npx --no -- commitlint --edit ${1}'

# Make hooks executable
chmod +x .husky/pre-commit
chmod +x .husky/commit-msg
```

#### Commitlint Configuration

The project uses conventional commits enforced by commitlint:

**Commit Message Format:**

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

**Valid Types:**

- `feat:` - New features
- `fix:` - Bug fixes
- `docs:` - Documentation only changes
- `style:` - Code style changes (formatting, missing semi-colons, etc)
- `refactor:` - Code refactoring
- `perf:` - Performance improvements
- `test:` - Adding or correcting tests
- `chore:` - Changes to build process or auxiliary tools
- `ci:` - Changes to CI configuration files and scripts

**Examples:**

```bash
git commit -m "feat: add user authentication system"
git commit -m "fix: resolve login form validation issue"
git commit -m "docs: update README with setup instructions"
git commit -m "refactor(auth): simplify session management logic"
```

### Development Quality Checklist

Before committing code, ensure:

- [ ] Code passes TypeScript checks (`npm run type-check`)
- [ ] No linting errors (`npm run lint`)
- [ ] Code is properly formatted (`npm run format`)
- [ ] All tests pass (`npm run test`)
- [ ] Commit message follows conventional format
- [ ] No console.log statements in production code
- [ ] Added tests for new features
- [ ] Updated documentation if needed

### Continuous Integration Benefits

The CI/CD setup provides:

- **Automated Testing**: Runs on every PR and push
- **Code Quality Enforcement**: Linting and formatting checks
- **Multi-Node Version Testing**: Ensures compatibility
- **Automated Deployment**: Deploy to staging/production
- **Test Coverage Reporting**: Track code coverage over time
- **Security Scanning**: Dependency vulnerability checks

### Troubleshooting Common Issues

#### Port Already in Use

If port 3000 is already in use:

```bash
# Kill process using port 3000
npx kill-port 3000

# Or start on different port
npm run dev -- -p 3001
```

#### Dependencies Issues

```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

#### TypeScript Errors

```bash
# Check TypeScript configuration
npm run type-check

# Restart TypeScript server in your IDE
# VS Code: Ctrl+Shift+P -> "TypeScript: Restart TS Server"
```

#### Environment Variables Not Loading

```bash
# Verify .env.local exists and is properly formatted
cat .env.local

# Restart development server after changes
npm run dev
```

### Testing Setup

#### Run All Tests

```bash
# Unit tests
npm run test

# E2E tests (requires app to be running)
npm run test:e2e

# Test coverage
npm run test:coverage
```

#### Mock Service Worker Setup

The project uses MSW for API mocking in development:

```bash
# MSW is automatically configured
# Check public/mockServiceWorker.js exists
ls public/mockServiceWorker.js
```

### IDE Setup (Recommended)

#### VS Code Extensions

Install these extensions for the best development experience:

- **ES7+ React/Redux/React-Native snippets**
- **Prettier - Code formatter**
- **ESLint**
- **Tailwind CSS IntelliSense**
- **TypeScript Importer**
- **Auto Rename Tag**

#### VS Code Settings

Add to your `.vscode/settings.json`:

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "typescript.preferences.importModuleSpecifier": "relative"
}
```

### Additional Configuration

#### Tailwind CSS Setup

The project uses Tailwind CSS 4. Configuration is in:

- `tailwind.config.js` - Main configuration
- `app/globals.css` - Global styles and CSS variables

#### API Client Configuration

The API client is configured in `lib/api/`. Update base URL if needed:

```typescript
// lib/api/api-client.ts
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";
```

### Quick Start Commands

```bash
# Complete setup in one go
git clone <repository-url> && cd glimpse33-feed-explorer
npm install
cp .env.local.example .env.local
npm run dev
```

### Next Steps

After successful setup:

1. 📖 Read through the codebase structure
2. 🧪 Run tests to ensure everything works
3. 🎨 Explore the UI components in Storybook (if available)
4. 📋 Check out the API documentation
5. 🚀 Start building your features!

> **💡 Pro Tip**: Use `npm run dev` with the `--turbo` flag for faster development builds if you're using Turbopack.

## 📜 Available Scripts

### Development

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run type-check` - Run TypeScript type checking

### Code Quality

- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint issues
- `npm run format` - Format code with Prettier

### Testing

- `npm run test` - Run Jest tests
- `npm run test:watch` - Run tests in watch mode
- `npm run test:coverage` - Generate test coverage report
- `npm run test:e2e` - Run Playwright E2E tests

## 🔧 Configuration

### Environment Variables

- `NEXT_PUBLIC_API_URL` - API base URL
- `SECRET_KEY` - Session encryption key

### Key Configuration Files

- `next.config.ts` - Next.js configuration
- `tailwind.config.js` - Tailwind CSS configuration
- `eslint.config.mjs` - ESLint configuration
- `tsconfig.json` - TypeScript configuration
- `components.json` - shadcn/ui configuration

## 🎯 Key Features Breakdown

### Authentication Flow

- User registration with email verification
- Secure login/logout functionality
- Password reset capabilities
- Session management with iron-session

### Feed Management

- Browse and explore feeds
- Category-based organization
- Advanced filtering options
- Detailed feed views
- Bookmark functionality

### UI/UX

- Responsive design across all devices
- Dark/light theme support
- Smooth animations and transitions
- Accessible components
- Loading states and error handling

## 🧪 Testing Strategy

- **Unit Tests**: Jest with Testing Library for component testing
- **Integration Tests**: API route testing
- **E2E Tests**: Playwright for full user journey testing
- **Mock Data**: MSW for reliable development and testing

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

### Deploy to Vercel

The project is configured for Vercel deployment with `vercel.json`. Simply connect your repository to Vercel for automatic deployments.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Commit Convention

This project uses conventional commits. Please follow the format:

- `feat:` - New features
- `fix:` - Bug fixes
- `docs:` - Documentation changes
- `style:` - Code style changes
- `refactor:` - Code refactoring
- `test:` - Test changes
- `chore:` - Build process or auxiliary tool changes

## 📄 License

This project is private and proprietary.

## 🆘 Support

If you encounter any issues or have questions, please:

1. Check the existing issues
2. Create a new issue with detailed information
3. Contact the development team

---

**Built with ❤️ using Next.js and TypeScript**
