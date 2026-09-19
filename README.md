# Sanjeev Kumar — Portfolio

> Full-Stack Developer · Webpack CLI Contributor · B.Tech CSE @ SRM University AP

---

## 🌐 Live Site

**https://kr-sanjeev.netlify.app/**

A personal portfolio showcasing my projects, open-source contribution, and engineering work.

---

## 🛠 Tech Stack

Built with **React 18**, **Vite**, and **Tailwind CSS**. Animated with **Framer Motion**. 3D elements via **React Three Fiber** and **Drei**.

| Layer | Technology |
|-------|-----------|
| Framework | React 18 + Vite |
| Styling | Tailwind CSS 3 + custom CSS variables |
| Animation | Framer Motion |
| 3D | React Three Fiber + Drei |
| Deployment | Netlify |

---

## 📁 Project Structure

```
├── public/
│   ├── assets/             # Project images, logos, resume
│   ├── models/             # 3D assets
│   └── vite.svg            # Favicon
├── src/
│   ├── components/         # Reusable UI components
│   ├── sections/           # Page sections (Hero, About, Projects, etc.)
│   ├── data/
│   │   └── profile.js      # All portfolio content (projects, socials, timeline)
│   ├── App.jsx             # Root component, section orchestration
│   ├── main.jsx            # React entry point
│   └── index.css           # Tailwind directives + custom properties + utilities
├── index.html
├── package.json
├── tailwind.config.js
├── vite.config.js
└── README.md
```

---

## ✨ Features

- **Hero** — 3D astronaut (React Three Fiber) with mouse-tracking camera, floating particles, and parallax mountain background
- **Terminal Console** — Animated terminal-style introduction with typewriter effect
- **About** — Timeline-based engineering journey (schooling → SRM → projects → DevOps → open source)
- **Skills** — Categorized skill matrix (Backend, Frontend, Database, DevOps & Cloud, Tools) with level indicators
- **Projects** — Expandable project cards with architecture descriptions, tech tags, and links to code
- **Open Source** — Webpack CLI PR #20356 showcase with contribution impact details
- **Testimonials** — Peer review marquee (Endorsements section)
- **Contact** — Contact form with alert feedback
- **Quick View Modal** — Recruiter summary modal (profile snapshot, skills, resume download)
- **Theme Toggle** — Dark/light mode persisted to localStorage

---

## 🚀 Getting Started

```bash
# Clone this repository
git clone https://github.com/knockknock10/Portfolio.git
cd Portfolio

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at **http://localhost:5173**.

---

## 🎨 Design

Dark-first UI with a muted gold accent (`#d9a74a`). Light mode is supported via a `data-theme` attribute on `<html>`, toggled from the navbar. Custom scrollbar, selection color, and focus-visible outlines are included. The design prioritizes readable typography (Inter + JetBrains Mono) and restrained motion.

---

## 📬 Contact

- **Email:** sanjeevkumars.s@srmap.edu.in
- **GitHub:** https://github.com/knockknock10
- **LinkedIn:** https://www.linkedin.com/in/-sanjeev-kr/
- **LeetCode:** https://leetcode.com/u/CYeY2FRKVf/

---

## 📄 Resume

A resume PDF is served at `public/Kr_Sanjeev_Resume.pdf` and linked from the Recruiter Summary modal.

---

## 🔗 External Links

- **Webpack CLI PR #20356 (merged):** https://github.com/webpack/webpack-cli/pull/20356
- **LeetCode profile:** https://leetcode.com/u/CYeY2FRKVf/

---

## 📝 Notes

This portfolio is a personal project. All project descriptions, skills, and timeline entries reflect my actual work and learning. The Webpack contribution (PR #20356) is a real merged pull request to the webpack-cli repository.

---

Built with React, Vite, and Tailwind CSS.
