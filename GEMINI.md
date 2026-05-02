# GrimReaper Project Documentation

Welcome to the GrimReaper project! This document provides a high-level overview of the project's architecture, technologies, and development conventions to help you navigate and contribute effectively.

## Project Overview

GrimReaper is a web-based DKP (Dragon Kill Points) management system designed for a World of Warcraft guild. It allows guild members to track their DKP, view Best-in-Slot (BiS) lists, and see character details.

### Core Features
- **DKP Tracking:** A comprehensive table showing players, their classes, ranks, and current DKP.
- **BiS Lists:** Multilingual (ES/EN) lists of optimal gear for different classes and specializations.
- **User Authentication:** Login and registration system for guild members.
- **Player Details:** Modal views with detailed information about players and their "alters" (alt characters).
- **External Integrations:** Links to Warmane Armory and UltimoWoW for tooltips and character profiles.

## Technologies

- **Frontend:** React 18 with Vite.
- **State Management:** Redux Toolkit with `redux-persist` for session persistence and `redux-thunk` for async actions.
- **Styling:** Tailwind CSS for layout and utilities, Material UI for some components, and Vanilla CSS for specific styles.
- **Routing:** React Router 6.
- **Icons:** `react-icons` (specifically Game Icons for WoW-themed elements).
- **Deployment:** Vercel.

## Directory Structure

```text
grimreaper/
├── public/                 # Static assets (SVGs, icons)
├── src/
│   ├── assets/             # Images and local SVGs
│   ├── components/         # Reusable UI components
│   │   ├── AddDKP/         # Components for adding/editing DKP
│   │   ├── Cards/          # Information cards (Loot Rules, Raid Schedule, etc.)
│   │   ├── Navbar/         # Main navigation bar
│   │   └── ...             # Other UI elements (Login, Register, Footer, Search)
│   ├── helpers/            # Utility functions and API helpers
│   ├── redux/              # Redux setup
│   │   ├── actions/        # Async thunk actions
│   │   ├── slice/          # Redux slices (Login, Players)
│   │   └── store.js        # Store configuration
│   ├── views/              # Main page views (Home, ItemsBis)
│   │   ├── Home/           # Landing page with DKP table
│   │   └── ItemsBis/       # Best-in-Slot gear lists
│   ├── App.jsx             # Main App component and routing
│   └── main.jsx            # Entry point
├── .agent/                 # Agent-specific skills and rules
├── tailwind.config.js      # Tailwind CSS configuration (includes WoW class colors)
└── vite.config.js          # Vite configuration
```

## Building and Running

### Prerequisites
- Node.js (version 18 or higher recommended)
- npm or yarn

### Commands
- **Install Dependencies:** `npm install`
- **Start Development Server:** `npm run dev`
- **Build for Production:** `npm run build`
- **Lint Code:** `npm run lint`
- **Preview Production Build:** `npm run preview`

## Development Conventions

- **Component Structure:** Components are generally organized into folders with their respective `.jsx` and `.css` files.
- **Naming Conventions:**
  - Components: PascalCase (e.g., `HeroSection.jsx`).
  - Slices/Actions: camelCase (e.g., `playerSlice.js`).
  - Directories: Mixed, but generally PascalCase for components and camelCase for logic.
- **Styling:**
  - Prefer Tailwind CSS classes for layout and common styling.
  - Use custom CSS files for complex or component-specific styles.
  - WoW class colors are defined in `tailwind.config.js` for easy access.
- **State Management:**
  - Use Redux Toolkit slices for state.
  - Use async thunks for API calls.
  - Persist critical state (like user login) using `redux-persist`.
- **Formatting:** Prettier is configured (`.prettierrc`) with the following rules:
  - No semicolons (`semi: false`).
  - Single quotes (`singleQuote: true`).
  - JSX single quotes (`jsxSingleQuote: true`).
  - Tab width: 2.
- **Linting:** ESLint is configured to enforce code quality and React best practices.

## Agent Skills

This project includes specialized agent skills located in `.agent/skills` and `.agents/skills`. These provide instructions for:
- **Redux Toolkit:** Best practices for state management.
- **Vercel React Best Practices:** Performance optimization and React patterns.

---

*Note: This file is used as context for Gemini CLI. Do not remove or modify essential sections without understanding their impact on agent performance.*
