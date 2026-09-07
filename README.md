# ilham-carrier

Personal portfolio website for Ilham Supriadi — a single-page responsive app built with React, Vite, and Tailwind CSS v4. Features a neon-style dark theme, scroll-driven animations, and an interactive project showcase.

## Live Site

<https://ilham-carrier.edgeone.dev/>

## Tech Stack

- **React 19** — UI framework
- **Vite 8** — build tool & dev server
- **Tailwind CSS v4** — styling (`@tailwindcss/vite` plugin, no config file needed)
- **Framer Motion** — scroll / hover / entrance animations
- **TypeScript 5.7** — static typing

## Project Structure

```
src/
├── main.tsx                 # React entry point
├── App.tsx                  # Root layout & section order
├── index.css                # Global CSS + Tailwind v4 import + fonts
├── assets/                  # Images used across the site
└── components/
    ├── Navbar.tsx           # Sticky nav with mobile menu
    ├── Hero.tsx             # Animated hero (particles, parallax orb)
    ├── About.tsx            # Bio + photo
    ├── Certificates.tsx     # Certification cards
    ├── Projects.tsx         # Project grid + image lightbox
    ├── Skills.tsx           # Grouped skill cards with progress bars
    ├── Experience.tsx       # Work timeline + education
    ├── Contact.tsx          # Contact form + direct channels
    ├── Footer.tsx           # Social links
    ├── CustomCursor.tsx     # Custom cursor accent
    └── ScrollProgress.tsx   # Top scroll progress bar
```

## Getting Started

### Prerequisites

- Node.js 20+ (toolchain pinned in `.mise.toml`)
- npm or pnpm

### Install

```bash
npm install
```

### Run the development server

```bash
npm run dev
```

Opens on <http://localhost:8443/> (override with the `PORT` env var).

### Build for production

```bash
npm run build
```

Output is written to `dist/`.

### Preview the production build

```bash
npm run preview
```

### Format code

```bash
npm run format
```

## Path Alias

`@` maps to `src/` (configured in `vite.config.ts`), e.g. `import photo from "@/assets/ilham.jpg"`.

## Adding a Project

1. Add an image to `src/assets/`.
2. In `src/components/Projects.tsx`, import it and add an entry to the `projects` array.
3. Set `lightbox: true` to open the image in a modal on click, or set a `url` to link outward.

## License

No license specified.