# 🌌 ADISA Founder Portfolio

> **"Building Businesses. Building Systems. Building The Future."**

A cinematic, production-quality portfolio experience for **Aditya Sawant**, Founder of **ADISA**.

---

## ✨ Live Demo

🔗 **[View Live Site](https://adisa-portfolio.vercel.app)** *(Replace with your actual URL after deployment)*

---

## 🎬 What Is This?

This is not a website. This is an **EXPERIENCE**.

When someone opens it, they should say:

> *"WHAT THE HELL DID I JUST OPEN?"*

Inspired by:
- 🎬 **Interstellar** — Cinematic space visuals
- 🤖 **Iron Man Jarvis** — Futuristic HUD interface
- 🍎 **Apple Keynote** — Premium minimalism
- 🚀 **SpaceX / NASA** — Space exploration aesthetic
- 🎮 **Cyberpunk 2077** — Neon glow & atmosphere

---

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| **Next.js 14** | React framework with App Router |
| **TypeScript** | Type-safe development |
| **Tailwind CSS** | Utility-first styling |
| **Three.js + React Three Fiber** | 3D universe scene |
| **Drei** | Three.js helpers |
| **Framer Motion** | Animations & scroll effects |
| **Lucide React** | Icon library |

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/adisa-portfolio.git

# Navigate to project
cd adisa-portfolio

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
```

---

## 📁 Project Structure

```
adisa-portfolio/
├── app/
│   ├── globals.css          # Space theme, glass cards, animations
│   ├── layout.tsx           # Root layout with SEO metadata
│   ├── page.tsx             # Main page assembling all sections
│   └── not-found.tsx        # "Lost In Space" 404 page
├── components/
│   ├── 3d/
│   │   └── SpaceScene.tsx   # Full 3D universe
│   ├── sections/
│   │   ├── HeroSection.tsx      # Typing animation, parallax
│   │   ├── AboutSection.tsx     # Glass cards, hologram profile
│   │   ├── SkillsSection.tsx    # Interactive 3D planets
│   │   ├── ProjectsSection.tsx  # Glass project cards
│   │   ├── JourneySection.tsx   # Rocket scroll timeline
│   │   ├── StatsSection.tsx     # Animated counters
│   │   └── ContactSection.tsx   # Satellite signal form
│   ├── CustomCursor.tsx     # Spaceship cursor with trail
│   ├── LoadingScreen.tsx      # Black hole loading
│   ├── ScrollProgress.tsx   # Glowing progress bar
│   ├── SpaceNavbar.tsx        # Glassmorphism HUD
│   └── Footer.tsx             # Brand footer
├── hooks/
│   ├── useMousePosition.ts
│   ├── useScrollProgress.ts
│   └── useInView.ts
├── lib/
│   └── utils.ts             # cn() helper
├── package.json
├── tailwind.config.ts       # Custom space theme
├── tsconfig.json
├── next.config.mjs
└── postcss.config.mjs
```

---

## 🎨 Features

### 🌌 3D Space Universe
- **Nebula Shader** — Custom GLSL fragment shader with simplex noise
- **5000+ Stars** — Multi-layered star field with twinkle effect
- **Rotating Planet** — With rings and atmosphere glow
- **Moon** — Orbiting celestial body
- **Satellite** — Animated orbit with solar panels
- **Asteroid Field** — 30 floating asteroids
- **Meteor Shower** — Random shooting stars
- **Space Dust** — Floating particles

### 🖱️ Custom Cursor
- Spaceship shape with blue engine glow
- Magnetic hover effect on interactive elements
- Particle trail following cursor

### 🚀 Loading Screen
- Black hole with accretion disk animation
- ADISA logo emergence
- Progress bar with non-linear loading
- Skip intro button (appears after 2 seconds)

### 🧭 Space HUD Navbar
- Glassmorphism design
- Dissolves into stars on scroll down
- Rebuilds from particles on scroll up
- Rocket indicator travels between active menu items

### 🏠 Hero Section
- Massive title with gradient text
- Typing animation cycling through 5 roles
- Parallax scroll effect
- Magnetic glow buttons

### 👤 About Section
- Hologram profile card with scan line animation
- 4 trait cards (Discipline, Vision, Innovation, Leadership)
- Glassmorphism cards with glow borders

### 🪐 Skills Section
- 10 interactive 3D planets in a galaxy formation
- Each planet = one skill (HTML, CSS, JS, React, etc.)
- Hover to see skill details
- Click to lock selection
- Animated proficiency bars

### 📂 Projects Section
- 6 glass project cards
- Animated shimmer border on hover
- Featured badges
- Tech stack tags
- Live demo & GitHub links

### 🚀 Journey Section
- Vertical timeline with milestones
- Rocket launches upward while scrolling
- Animated nodes with icons
- Scroll-driven animations

### 📊 Stats Section
- 4 animated counters
- Projects, Skills, Hours, Dream
- Spring-based counting animation

### 📡 Contact Section
- Satellite with signal wave animation
- Glass contact form
- Social links with hover effects
- Success state with checkmark

### 📄 404 Page
- "Lost In Space" theme
- Floating stars background
- Return to Earth button

---

## 🎨 Customization

### Change Personal Info
Edit these files:
- `components/sections/HeroSection.tsx` — Name, roles, tagline
- `components/sections/AboutSection.tsx` — Bio, traits
- `components/sections/ContactSection.tsx` — Social links, email
- `components/Footer.tsx` — Brand name

### Change Colors
Edit `tailwind.config.ts`:
```typescript
colors: {
  energy: {
    blue: '#00d4ff',    // Change this
    glow: '#00a8ff',    // And this
  },
}
```

### Add Projects
Edit `components/sections/ProjectsSection.tsx`:
```typescript
const projects: Project[] = [
  {
    title: "Your Project",
    description: "Description here",
    tech: ["React", "Next.js"],
    image: "/images/your-project.jpg",
    liveUrl: "https://your-project.com",
    githubUrl: "https://github.com/you/project",
    featured: true,
  },
  // ...more projects
];
```

### Add Images
Place images in `public/images/` and reference them in components.

---

## 📱 Responsive

| Device | Experience |
|--------|-----------|
| **Desktop** | Ultra beautiful — full 3D, all effects |
| **Laptop** | Beautiful — optimized performance |
| **Tablet** | Great — touch-friendly interactions |
| **Mobile** | Still beautiful — reduced effects for performance |

---

## ⚡ Performance

- **Desktop**: 60 FPS with full effects
- **Mobile**: Auto-reduced particle counts
- **Lazy Loading**: Heavy 3D components loaded dynamically
- **Optimized**: DPR capped at 1.5x

---

## 🚀 Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

1. Push code to GitHub
2. Go to [vercel.com/new](https://vercel.com/new)
3. Import your repository
4. Framework: Next.js (auto-detected)
5. Click **Deploy**

Your site will be live in ~2 minutes at `your-project.vercel.app`.

---

## 📄 License

This project is built for **Aditya Sawant** — Founder of ADISA.

---

<p align="center">
  <strong>ADISA</strong> — Building The Future
</p>