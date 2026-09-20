<div align="center">
   <img src="app/assets/gif/logo.gif" alt="Maze CRM logo" width="112" />
   <h1>Maze CRM</h1>
   <p><strong>سامانه یکپارچه مدیریت آموزش، فروش و داوطلبان ماز</strong></p>
   <p>A focused, RTL CRM dashboard for managing sales, subscriptions, candidates, exams, and support workflows.</p>
   <p>
      <img src="https://img.shields.io/badge/Nuxt-4.2.1-00DC82?style=flat-square&logo=nuxt.js&logoColor=white" alt="Nuxt 4.2.1" />
      <img src="https://img.shields.io/badge/Vue-3.5-42B883?style=flat-square&logo=vue.js&logoColor=white" alt="Vue 3.5" />
      <img src="https://img.shields.io/badge/TypeScript-enabled-3178C6?style=flat-square&logo=typescript&logoColor=white" alt="TypeScript" />
      <img src="https://img.shields.io/badge/Direction-RTL-334155?style=flat-square" alt="RTL" />
   </p>
</div>

<br />

## Overview

Maze CRM is a Nuxt 4 dashboard for the operational side of an education business. The interface is designed for Persian-speaking teams and uses a right-to-left layout, Persian typography, sales visualizations, structured data views, and quick access to common CRM workflows.

The application currently ships as a polished front-end experience with simulated login behavior and locally persisted first-login state. It is a strong foundation for connecting real authentication, APIs, and production data services.

## What is included

- **Dashboard:** at-a-glance sales, enrollment, subscription, and performance summaries.
- **Sales workspace:** sales metrics, packages, and individual sales detail views.
- **Tables:** structured CRM records for scanning and follow-up.
- **Search:** a dedicated search workflow for finding records quickly.
- **Leave management:** a calendar-oriented leave and availability view.
- **Faults and support:** a space for tickets, messages, and operational follow-up.
- **Persian-first UI:** RTL document direction with Dana, Kalameh, and Poppins font assets.
- **Charts and date tools:** Chart.js, Vue Chart.js, Day.js, Jalali calendar support, and a Persian date picker.
- **First-login gate:** new visitors start at `/login`; after the first successful login, the browser remembers the state with localStorage.

## Tech stack

| Layer | Technology |
| --- | --- |
| Framework | Nuxt 4, Vue 3, Vue Router |
| Language | TypeScript |
| Styling | Tailwind CSS, SCSS |
| Charts | Chart.js, Vue Chart.js |
| Dates | Day.js, Jalaliday, Vue Persian Date Picker |
| Icons | Ionicons |
| Runtime | Node.js |

## Getting started

### Prerequisites

- Node.js 20 or newer is recommended.
- npm 10 or newer is recommended.

### Install

```bash
npm install
```

### Start the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser. The Nuxt dev server is configured to listen on all interfaces, which also makes it available from another device on the local network.

### Build for production

```bash
npm run build
```

Preview the production build locally with:

```bash
npm run preview
```

For a statically generated build:

```bash
npm run generate
```

## Application routes

| Route | Purpose |
| --- | --- |
| `/login` | Login screen and first-visit entry point |
| `/` | Main CRM dashboard |
| `/sales` | Sales overview |
| `/sales/:id` | Single sale details |
| `/tables` | CRM data tables |
| `/search` | Search workspace |
| `/leave` | Leave management |
| `/faults` | Tickets and support messages |

## Authentication behavior

The current demo login flow is intentionally front-end only:

1. A visitor without the `maze-crm-has-logged-in-before` localStorage key is redirected to `/login`.
2. A successful password or OTP form submission stores that key and navigates to the dashboard.
3. Returning visitors are sent directly to the dashboard and cannot reopen the login page through normal navigation.

This mechanism is useful for the prototype experience, but it is **not a security boundary**. A production integration should replace it with server-backed authentication, secure cookies or tokens, session expiration, and permission-aware route protection.

To reset the demo login state, run this in the browser console:

```js
localStorage.removeItem('maze-crm-has-logged-in-before')
```

## Project structure

```text
app/
├── components/       Reusable dashboard, form, chart, and navigation components
├── layouts/           Shared application layouts
├── middleware/        Global first-login route protection
├── pages/             Nuxt file-based routes
├── plugins/           Client-side integrations and navigation helpers
├── assets/            Fonts, styles, images, and visual assets
└── types/             Nuxt and project type declarations
```

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the development server on port 3000 |
| `npm run build` | Build the Nuxt application for production |
| `npm run preview` | Preview the production build |
| `npm run generate` | Generate a static site |
| `npm run lint` | Run the project lint placeholder |

## Design notes

The interface is intentionally optimized for dashboard use: dense information hierarchy, quick navigation, responsive layouts, and Persian-readable type. The app uses `dir="rtl"` and `lang="fa"` at the document level, while the font assets and Tailwind utilities provide the visual foundation for the CRM screens.

## License

This project is private and does not currently include an open-source license.
