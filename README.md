<div align="center">

<img src="./public/icon-512.png" alt="SpendWise Logo" width="120" height="120" />

# SpendWise

**Track. Analyze. Save.**

A modern, privacy-first expense tracker that runs entirely in your browser — or as a native desktop app. No sign-up. No servers. Your data never leaves your device.

[![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Electron](https://img.shields.io/badge/Electron-33-47848F?logo=electron&logoColor=white)](https://www.electronjs.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)

</div>

---

## 📖 Table of Contents

- [Features](#-features)
- [Screenshots](#-screenshots)
- [Tech Stack](#️-tech-stack)
- [Getting Started](#-getting-started)
- [Project Structure](#-project-structure)
- [Available Scripts](#-available-scripts)
- [How It Works](#-how-it-works)
- [Deployment](#-deployment)
- [Roadmap](#️-roadmap)
- [Contributing](#-contributing)
- [Known Issues](#-known-issues)
- [License](#-license)
- [Acknowledgements](#-acknowledgements)
- [Contact](#-contact)

---

## ✨ Features

### 📊 Dashboard & Insights
- **Live summary cards** — Total spent, this month's spend, and transaction count
- **Interactive donut chart** — Visual breakdown of spending by category (powered by Recharts)
- **Category progress bars** — See which categories dominate your budget at a glance

### 💸 Expense Management
- **Add, edit, and delete** expenses with a clean modal interface
- **Rich expense data** — Amount, category, date, and optional description
- **Custom categories** — Add your own with a custom color picker
- **Search & filter** — Find any expense by description, category, or amount

### 🌍 Multi-Currency Support
- **Toggle between USD ($) and PKR (Rs.)** on the fly
- **Locale-aware formatting** — `$1,234.56` for USD, `Rs. 1,235` for PKR
- **Persistent preference** — Your currency choice survives page refreshes

### 💾 Privacy-First Storage
- **All data lives in your browser's localStorage** — no accounts, no servers, no tracking
- **Instant, offline-capable** — works without internet after the first load
- **Export-ready** — data is inspectable and backup-able from DevTools

### 🖥️ Runs Anywhere
- **Web** — Deploy to any static host (Vercel, Netlify, GitHub Pages)
- **Desktop** — Package as a native Windows `.exe` via Electron (installer + portable)

### 🎨 Design
- **Green → teal gradient** brand identity
- **Fully responsive** — pixel-perfect from 320px phones to 4K desktops
- **Accessible** — keyboard navigation, focus rings, ARIA labels, reduced-motion support
- **Subtle animations** — purposeful, not decorative

---

## 📸 Screenshots

> _Add screenshots to `./docs/screenshots/` and update the paths below._

| Dashboard | Add Expense | Mobile |
|---|---|---|
| ![Dashboard](./docs/screenshots/dashboard.png) | ![Add Expense](./docs/screenshots/add-expense.png) | ![Mobile](./docs/screenshots/mobile.png) |

---

## 🛠️ Tech Stack

| Category | Choice | Why |
|---|---|---|
| **Framework** | [React 18](https://react.dev/) + [Vite](https://vitejs.dev/) | Instant HMR, minimal config, tiny bundles |
| **Language** | [TypeScript](https://www.typescriptlang.org/) | Type safety across the entire codebase |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/) | Utility-first, CSS-first config, zero runtime |
| **State** | [Zustand](https://zustand-demo.pmnd.rs/) | 1 KB, no boilerplate, built-in persistence |
| **Charts** | [Recharts](https://recharts.org/) | Composable, accessible, SVG-based |
| **Icons** | [Lucide](https://lucide.dev/) | Beautiful, tree-shakeable icon set |
| **Toasts** | [react-hot-toast](https://react-hot-toast.com/) | Tiny, beautiful notifications |
| **Desktop** | [Electron](https://www.electronjs.org/) + [electron-builder](https://www.electron.build/) | Native Windows/Mac/Linux packaging |

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** ≥ 18 (LTS 20 recommended)
- **npm** ≥ 9

### Installation

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/spendwise.git
cd spendwise

# Install dependencies
npm install
```

### Development

```bash
# Start the Vite dev server (http://localhost:5173)
npm run dev
```

### Production build (web)

```bash
# Type-check + bundle into ./dist
npm run build

# Preview the production build locally
npm run preview
```

### Desktop app (Electron)

```bash
# Run the app in an Electron window with hot reload
npm run electron:dev

# Package as a Windows installer + portable .exe
npm run electron:build

# Build only the portable version (faster)
npm run electron:build:portable
```

Packaged `.exe` files land in `./release/`:

- `SpendWise 1.0.0 x64.exe` — installer (Start Menu + Desktop shortcuts)
- `SpendWise 1.0.0 portable.exe` — single-file, no install needed

---

## 📁 Project Structure

```
spendwise/
├── electron/
│   ├── main.cjs                 # Electron main process
│   ├── preload.cjs              # Secure context bridge
│   └── icon.ico                 # Windows app icon (256×256)
│
├── public/
│   ├── favicon.png              # Browser tab icon
│   ├── icon-192.png             # PWA icon (Android)
│   ├── icon-512.png             # PWA icon (iOS/desktop) + OG image
│   ├── logo.png                 # Horizontal brand lockup
│   └── manifest.webmanifest     # PWA config
│
├── src/
│   ├── components/
│   │   ├── ui/
│   │   │   ├── Button.tsx       # Reusable button (variants + sizes)
│   │   │   ├── Modal.tsx        # Accessible modal with focus trap
│   │   │   └── EmptyState.tsx   # Friendly empty-state placeholder
│   │   ├── CategoryChart.tsx    # Recharts donut + category breakdown
│   │   ├── ExpenseForm.tsx      # Add/edit form (lazy-loaded)
│   │   ├── ExpenseList.tsx      # Searchable, filterable list
│   │   ├── Logo.tsx             # Brand logo + SVG fallback
│   │   ├── Navbar.tsx           # Top bar: logo, currency, add button
│   │   └── SummaryCards.tsx     # Total / monthly / count cards
│   │
│   ├── constants/
│   │   └── categories.ts        # Default expense categories
│   │
│   ├── context/
│   │   └── CurrencyContext.tsx  # Currency provider + useCurrency hook
│   │
│   ├── store/
│   │   └── useExpenseStore.ts   # Zustand store with localStorage persistence
│   │
│   ├── types/
│   │   └── index.ts             # Shared TypeScript interfaces
│   │
│   ├── utils/
│   │   ├── asset.ts             # Vite-base-aware asset resolver
│   │   ├── cn.ts                # Tailwind class merger
│   │   ├── currency.ts          # Currency formatter + metadata
│   │   └── format.ts            # Date + month helpers
│   │
│   ├── App.tsx                  # Root component + layout
│   ├── index.css                # Tailwind theme + global styles
│   ├── main.tsx                 # App entry point
│   └── vite-env.d.ts            # Vite type references
│
├── index.html                   # HTML shell
├── package.json                 # Scripts + dependencies + electron-builder config
├── tsconfig.json                # TypeScript project references
├── tsconfig.app.json            # App code TS config
├── tsconfig.node.json           # Build tooling TS config
├── vite.config.ts               # Vite + Tailwind + chunk splitting
└── README.md
```

---

## 🔧 Available Scripts

| Script | Description |
|---|---|
| `npm run dev` | Start Vite dev server at `http://localhost:5173` |
| `npm run build` | Type-check + build production bundle to `./dist` |
| `npm run preview` | Serve the production build locally |
| `npm run lint` | Run ESLint across the codebase |
| `npm run electron:dev` | Run app in Electron with hot reload |
| `npm run electron:start` | Wait for Vite then launch Electron (used internally) |
| `npm run electron:build` | Package installer + portable Windows `.exe` |
| `npm run electron:build:portable` | Package only the portable `.exe` |

---

## 💡 How It Works

### Data Model

```typescript
interface Expense {
  id: string;              // Unique ID (timestamp + random)
  amount: number;          // Positive decimal
  category: string;        // Category ID (e.g. "food")
  date: string;            // ISO 8601 date string
  description?: string;    // Optional note
  createdAt: string;       // ISO 8601 timestamp
}
```

### State Management

- **Zustand** stores the expenses array and custom categories
- **Persist middleware** auto-syncs to `localStorage` on every change
- **CurrencyContext** manages currency preference separately (also persisted)

### Storage Locations

| Platform | Where data lives |
|---|---|
| **Web** | Browser `localStorage` under key `expense-tracker-storage` |
| **Electron** | `%APPDATA%\SpendWise\Local Storage\leveldb\` (Windows) |

> ⚠️ Uninstalling the Electron app does **not** delete your data folder. To fully reset, delete `%APPDATA%\SpendWise\` manually.

---

## 🌐 Deployment

### Web (Vercel)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

Or connect your GitHub repo in the Vercel dashboard — it auto-detects Vite.

### Web (Netlify)

```bash
npm i -g netlify-cli
npm run build
netlify deploy --prod --dir=dist
```

### Web (GitHub Pages)

Update `vite.config.ts`:

```typescript
base: '/spendwise/',   // your repo name
```

Then build and push `dist/` to a `gh-pages` branch.

### Desktop (Windows)

```bash
npm run electron:build
```

Distribute files from `./release/`. Users will see a Windows SmartScreen warning ("unknown publisher") — this is normal for unsigned apps. They click **More info → Run anyway**.

---

## 🗺️ Roadmap

- [ ] **Recurring expenses** — Weekly/monthly auto-generated entries
- [ ] **Budget goals** — Set monthly limits per category, warn on overage
- [ ] **Multi-month trends** — Line chart comparing 6 months of spending
- [ ] **Data export** — CSV / JSON download of all expenses
- [ ] **Income tracking** — Balance = income − expenses
- [ ] **Cloud sync** — Optional Supabase backend for cross-device sync
- [ ] **Dark mode** — Toggle with persisted preference
- [ ] **Mobile apps** — React Native / Capacitor wrapper

Have an idea? [Open an issue](https://github.com/YOUR_USERNAME/spendwise/issues) — contributions welcome!

---

## 🤝 Contributing

Contributions are what make open source amazing. Any contribution you make is **greatly appreciated**.

1. **Fork** the project
2. **Create** your feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add some amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### Code Style

- TypeScript strict mode is on — no `any` unless unavoidable
- Run `npm run lint` before committing
- Components use arrow functions + named exports
- Tailwind classes are ordered via `prettier-plugin-tailwindcss` (if installed)

---

## 🐛 Known Issues

| Issue | Workaround |
|---|---|
| Electron fails to install on Windows | Delete `node_modules\electron`, run `node node_modules\electron\install.js`. See [#1](https://github.com/YOUR_USERNAME/spendwise/issues/1) |
| Windows SmartScreen warning on `.exe` | Click "More info → Run anyway". Code signing cert needed to remove |
| Logo broken in packaged `.exe` | Ensure `base: './'` in `vite.config.ts` and use `asset()` helper for public paths |

---

## 📄 License

Distributed under the **MIT License**. See [`LICENSE`](./LICENSE) for more information.

```
MIT License

Copyright (c) 2026 Your Name

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

## 🙏 Acknowledgements

- [Lucide Icons](https://lucide.dev/) — for the beautiful icon set
- [Recharts](https://recharts.org/) — for the composable charting primitives
- [Tailwind CSS](https://tailwindcss.com/) — for making styling joyful
- [Vite](https://vitejs.dev/) — for the fastest DX in the ecosystem
- [Zustand](https://zustand-demo.pmnd.rs/) — for proving state management can be simple

---

## 📬 Contact

**Your Name** — [@your_twitter](https://twitter.com/your_twitter)

Project Link: [https://github.com/YOUR_USERNAME/spendwise](https://github.com/YOUR_USERNAME/spendwise)

---

<div align="center">

**If you find SpendWise useful, please consider giving it a ⭐**

Made with 💚 and [React](https://react.dev/)

</div>
