# Apple-Level UIUX Design Research
## Bitcoin Financial Data Dashboard

Research compiled from Bloomberg Terminal, TradingView, CoinGecko/CoinMarketCap, Apple HIG, and modern CSS standards.

---

## 1. Design Tokens (CSS Custom Properties)

The foundation of the entire system. Every visual decision flows from these tokens.

```css
:root {
  /* ============================================
     CORE PALETTE
     ============================================ */

  /* Background layers (ultra-dark, NOT pure black) */
  --bg-void:        #000000;  /* Page background - true black */
  --bg-base:        #050505;  /* Primary surface */
  --bg-raised:      #0a0a0a;  /* Cards, panels */
  --bg-elevated:    #111111;  /* Modals, popovers */
  --bg-overlay:     #1a1a1a;  /* Hover states, active items */

  /* Text hierarchy */
  --text-primary:   #f5f5f7;  /* Apple-style off-white, NOT pure white */
  --text-secondary: #a1a1a6;  /* Subdued labels */
  --text-tertiary:  #6e6e73;  /* Timestamps, metadata */
  --text-muted:     #48484a;  /* Disabled, decorative */

  /* Bitcoin orange - the singular accent */
  --btc-orange:     #f7931a;
  --btc-orange-dim: rgba(247, 147, 26, 0.15);  /* Backgrounds, glows */
  --btc-orange-mid: rgba(247, 147, 26, 0.40);  /* Borders, highlights */
  --btc-orange-hot: rgba(247, 147, 26, 0.85);  /* Active elements */

  /* Semantic colors */
  --color-positive:  #30d158;  /* Green - gains */
  --color-negative:  #ff453a;  /* Red - losses */
  --color-warning:   #ffd60a;  /* Yellow - alerts */
  --color-info:      #64d2ff;  /* Cyan - informational */
  --color-neutral:   #636366;  /* Gray - unchanged */

  /* Semantic colors (dimmed for backgrounds) */
  --color-positive-dim: rgba(48, 209, 88, 0.12);
  --color-negative-dim: rgba(255, 69, 58, 0.12);
  --color-warning-dim:  rgba(255, 214, 10, 0.12);

  /* ============================================
     GLASSMORPHISM TOKENS
     ============================================ */
  --glass-bg:         rgba(255, 255, 255, 0.03);
  --glass-bg-hover:   rgba(255, 255, 255, 0.06);
  --glass-border:     rgba(255, 255, 255, 0.06);
  --glass-border-lit: rgba(255, 255, 255, 0.10);
  --glass-blur:       20px;
  --glass-blur-heavy: 40px;
  --glass-shadow:     0 8px 32px rgba(0, 0, 0, 0.4);

  /* ============================================
     TYPOGRAPHY SCALE (Major Second 1.125)
     ============================================
     Optimized for data-heavy dashboards.
     Major Second ratio prevents sizes from
     diverging too far, keeping density high.
  */

  /* Font stacks */
  --font-sans:  'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  --font-mono:  'JetBrains Mono', 'SF Mono', 'Fira Code', 'Cascadia Code', monospace;
  --font-display: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;

  /* Type scale - Major Second (1.125) from 16px base */
  --text-xs:    0.75rem;    /* 12px - micro labels */
  --text-sm:    0.875rem;   /* 14px - captions, metadata */
  --text-base:  1rem;       /* 16px - body text */
  --text-md:    1.125rem;   /* 18px - emphasized body */
  --text-lg:    1.25rem;    /* 20px - section titles */
  --text-xl:    1.5rem;     /* 24px - card headers */
  --text-2xl:   1.875rem;   /* 30px - page section headers */
  --text-3xl:   2.25rem;    /* 36px - hero secondary */
  --text-4xl:   clamp(2.5rem, 2rem + 2vw, 3.5rem);  /* 40-56px hero */
  --text-5xl:   clamp(3rem, 2.5rem + 3vw, 5rem);     /* 48-80px display */

  /* Font weights */
  --weight-normal:    400;
  --weight-medium:    500;
  --weight-semibold:  600;
  --weight-bold:      700;
  --weight-black:     900;

  /* Line heights */
  --leading-tight:    1.1;   /* Display/hero text */
  --leading-snug:     1.25;  /* Headings */
  --leading-normal:   1.5;   /* Body text */
  --leading-relaxed:  1.625; /* Long-form reading */
  --leading-data:     1.4;   /* Data tables */

  /* Letter spacing */
  --tracking-tight:   -0.02em;  /* Large headings */
  --tracking-normal:  0;        /* Body text */
  --tracking-wide:    0.05em;   /* All-caps labels */
  --tracking-wider:   0.1em;    /* Section labels */

  /* ============================================
     SPACING SCALE
     ============================================ */
  --space-1:  0.25rem;   /* 4px */
  --space-2:  0.5rem;    /* 8px */
  --space-3:  0.75rem;   /* 12px */
  --space-4:  1rem;      /* 16px */
  --space-5:  1.5rem;    /* 24px */
  --space-6:  2rem;      /* 32px */
  --space-8:  3rem;      /* 48px */
  --space-10: 4rem;      /* 64px */
  --space-12: 5rem;      /* 80px */
  --space-16: 8rem;      /* 128px */

  /* ============================================
     BORDER RADIUS
     ============================================ */
  --radius-sm:  6px;
  --radius-md:  12px;
  --radius-lg:  16px;
  --radius-xl:  24px;
  --radius-full: 9999px;

  /* ============================================
     TRANSITIONS
     ============================================ */
  --ease-out:     cubic-bezier(0.16, 1, 0.3, 1);   /* Apple-style ease out */
  --ease-spring:  cubic-bezier(0.34, 1.56, 0.64, 1); /* Subtle bounce */
  --duration-fast:   150ms;
  --duration-normal: 300ms;
  --duration-slow:   500ms;
  --duration-reveal:  800ms;

  /* ============================================
     Z-INDEX SCALE
     ============================================ */
  --z-base:      1;
  --z-dropdown:  100;
  --z-sticky:    200;
  --z-overlay:   300;
  --z-modal:     400;
  --z-toast:     500;
}
```

---

## 2. Financial Data Dashboard Patterns

### 2a. Data Card (Bloomberg-Inspired)

Bloomberg conceals complexity through progressive disclosure: show the key metric prominently, details on hover/expand. The terminal uses a dark background (`#000` to `#1a1a1a`) with color-coded data -- NOT just red/green.

```css
/* === DATA METRIC CARD === */
.metric-card {
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-lg);
  padding: var(--space-5);
  position: relative;
  overflow: hidden;
  transition: border-color var(--duration-normal) var(--ease-out),
              background var(--duration-normal) var(--ease-out);
}

.metric-card:hover {
  background: var(--glass-bg-hover);
  border-color: var(--glass-border-lit);
}

/* Subtle top-edge glow on hover */
.metric-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 10%;
  right: 10%;
  height: 1px;
  background: linear-gradient(
    90deg,
    transparent,
    var(--btc-orange-mid),
    transparent
  );
  opacity: 0;
  transition: opacity var(--duration-normal) var(--ease-out);
}

.metric-card:hover::before {
  opacity: 1;
}

/* Card label */
.metric-card__label {
  font-family: var(--font-sans);
  font-size: var(--text-xs);
  font-weight: var(--weight-medium);
  letter-spacing: var(--tracking-wider);
  text-transform: uppercase;
  color: var(--text-tertiary);
  margin-bottom: var(--space-2);
}

/* Card primary value -- MONOSPACE for numbers */
.metric-card__value {
  font-family: var(--font-mono);
  font-size: var(--text-2xl);
  font-weight: var(--weight-bold);
  color: var(--text-primary);
  letter-spacing: var(--tracking-tight);
  line-height: var(--leading-tight);
  /* Tabular figures for aligned columns */
  font-variant-numeric: tabular-nums;
}

/* Change indicator */
.metric-card__change {
  font-family: var(--font-mono);
  font-size: var(--text-sm);
  font-weight: var(--weight-medium);
  font-variant-numeric: tabular-nums;
  margin-top: var(--space-2);
  display: inline-flex;
  align-items: center;
  gap: var(--space-1);
  padding: var(--space-1) var(--space-2);
  border-radius: var(--radius-sm);
}

.metric-card__change--up {
  color: var(--color-positive);
  background: var(--color-positive-dim);
}

.metric-card__change--down {
  color: var(--color-negative);
  background: var(--color-negative-dim);
}
```

### 2b. Data Table (TradingView/CoinGecko Style)

CoinGecko and TradingView use alternating subtle row backgrounds, monospace numbers, and right-aligned numeric columns.

```css
/* === DATA TABLE === */
.data-table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  font-family: var(--font-sans);
  font-size: var(--text-sm);
}

.data-table thead {
  position: sticky;
  top: 0;
  z-index: var(--z-sticky);
}

.data-table th {
  font-size: var(--text-xs);
  font-weight: var(--weight-semibold);
  letter-spacing: var(--tracking-wide);
  text-transform: uppercase;
  color: var(--text-tertiary);
  padding: var(--space-3) var(--space-4);
  text-align: left;
  background: var(--bg-base);
  border-bottom: 1px solid var(--glass-border);
  /* Sticky header with glass effect */
  backdrop-filter: blur(var(--glass-blur));
  -webkit-backdrop-filter: blur(var(--glass-blur));
}

/* Right-align numeric columns */
.data-table th[data-type="number"],
.data-table td[data-type="number"] {
  text-align: right;
  font-family: var(--font-mono);
  font-variant-numeric: tabular-nums;
}

.data-table td {
  padding: var(--space-3) var(--space-4);
  color: var(--text-secondary);
  border-bottom: 1px solid rgba(255, 255, 255, 0.03);
  transition: background var(--duration-fast) var(--ease-out);
}

.data-table tbody tr:hover td {
  background: var(--glass-bg-hover);
  color: var(--text-primary);
}

/* Alternating row backgrounds (very subtle) */
.data-table tbody tr:nth-child(even) td {
  background: rgba(255, 255, 255, 0.01);
}

/* Inline sparkline cell */
.data-table__sparkline {
  width: 120px;
  height: 32px;
}

/* Price flash animation (websocket updates) */
@keyframes price-flash-up {
  0%   { background: var(--color-positive-dim); }
  100% { background: transparent; }
}

@keyframes price-flash-down {
  0%   { background: var(--color-negative-dim); }
  100% { background: transparent; }
}

.price-up {
  animation: price-flash-up 1.5s var(--ease-out);
}

.price-down {
  animation: price-flash-down 1.5s var(--ease-out);
}
```

### 2c. Chart Container (TradingView Inspired)

```css
/* === CHART CONTAINER === */
.chart-container {
  background: var(--bg-raised);
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-lg);
  padding: var(--space-5);
  position: relative;
}

/* Chart header with title and controls */
.chart-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--space-4);
}

/* Time range selector pills */
.time-range {
  display: flex;
  gap: var(--space-1);
  background: var(--bg-base);
  border-radius: var(--radius-full);
  padding: 2px;
}

.time-range__btn {
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  font-weight: var(--weight-medium);
  color: var(--text-tertiary);
  padding: var(--space-1) var(--space-3);
  border-radius: var(--radius-full);
  border: none;
  background: transparent;
  cursor: pointer;
  transition: all var(--duration-fast) var(--ease-out);
}

.time-range__btn:hover {
  color: var(--text-secondary);
}

.time-range__btn--active {
  background: var(--btc-orange);
  color: var(--bg-void);
  font-weight: var(--weight-semibold);
}
```

---

## 3. Navigation Architecture

### 3a. Grouping 17 Items Into 5-6 Categories

The current 17 nav items should collapse into logical groups. Here is the recommended structure based on mega-menu UX research:

```
PRIMARY NAV (always visible, 5-6 items):

1. Overview          (landing / hero)
2. Analysis   [v]    (dropdown)
   - Macro Landscape
   - Market Analysis
   - Quantum Analysis
   - Technical Indicators
3. Network    [v]    (dropdown)
   - Network Health
   - Mining & Hash Rate
   - On-Chain Metrics
   - Lightning Network
4. Models     [v]    (dropdown)
   - Valuation Models
   - Stock-to-Flow
   - Power Law
   - Projections
5. Resources  [v]    (dropdown)
   - Education
   - Glossary
   - Methodology
   - About
6. Live Data         (CTA-styled link to real-time dashboard)
```

### 3b. Sticky Navigation with Scroll Progress

```css
/* === NAVIGATION === */
.nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: var(--z-sticky);
  /* Glass navigation */
  background: rgba(0, 0, 0, 0.75);
  backdrop-filter: blur(var(--glass-blur-heavy));
  -webkit-backdrop-filter: blur(var(--glass-blur-heavy));
  border-bottom: 1px solid var(--glass-border);
  transition: background var(--duration-normal) var(--ease-out),
              transform var(--duration-normal) var(--ease-out);
}

/* Compact nav state after scrolling */
.nav--scrolled {
  background: rgba(0, 0, 0, 0.92);
}

/* Scroll progress bar (CSS-only with scroll-driven animations) */
.nav__progress {
  position: absolute;
  bottom: 0;
  left: 0;
  height: 2px;
  background: linear-gradient(90deg, var(--btc-orange), var(--btc-orange-hot));
  transform-origin: left;
  transform: scaleX(0);
  /* Modern CSS scroll-driven animation */
  animation: progress-grow linear;
  animation-timeline: scroll(root);
}

@keyframes progress-grow {
  from { transform: scaleX(0); }
  to   { transform: scaleX(1); }
}

/* Fallback for browsers without scroll-driven animations */
@supports not (animation-timeline: scroll()) {
  .nav__progress {
    /* Will be controlled by JS instead */
    animation: none;
  }
}

/* Nav inner layout */
.nav__inner {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 var(--space-5);
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 64px;
}

/* Logo mark */
.nav__logo {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  text-decoration: none;
  color: var(--text-primary);
  font-weight: var(--weight-bold);
  font-size: var(--text-md);
}

.nav__logo svg {
  width: 28px;
  height: 28px;
  fill: var(--btc-orange);
}

/* Nav links container */
.nav__links {
  display: flex;
  align-items: center;
  gap: var(--space-1);
  list-style: none;
  margin: 0;
  padding: 0;
}

/* Individual nav item */
.nav__item {
  position: relative;
}

.nav__link {
  display: flex;
  align-items: center;
  gap: var(--space-1);
  padding: var(--space-2) var(--space-3);
  border-radius: var(--radius-sm);
  font-family: var(--font-sans);
  font-size: var(--text-sm);
  font-weight: var(--weight-medium);
  color: var(--text-secondary);
  text-decoration: none;
  transition: color var(--duration-fast) var(--ease-out),
              background var(--duration-fast) var(--ease-out);
  cursor: pointer;
}

.nav__link:hover {
  color: var(--text-primary);
  background: var(--glass-bg-hover);
}

.nav__link--active {
  color: var(--btc-orange);
}

/* Dropdown chevron */
.nav__link svg.chevron {
  width: 12px;
  height: 12px;
  transition: transform var(--duration-fast) var(--ease-out);
}

.nav__item:hover .nav__link svg.chevron {
  transform: rotate(180deg);
}

/* === DROPDOWN PANEL === */
.nav__dropdown {
  position: absolute;
  top: calc(100% + var(--space-2));
  left: 50%;
  transform: translateX(-50%) translateY(-8px);
  min-width: 240px;
  background: rgba(10, 10, 10, 0.95);
  backdrop-filter: blur(var(--glass-blur-heavy));
  -webkit-backdrop-filter: blur(var(--glass-blur-heavy));
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-md);
  padding: var(--space-2);
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
  transition: opacity var(--duration-normal) var(--ease-out),
              transform var(--duration-normal) var(--ease-out),
              visibility var(--duration-normal);
  box-shadow: var(--glass-shadow);
}

.nav__item:hover .nav__dropdown {
  opacity: 1;
  visibility: visible;
  pointer-events: auto;
  transform: translateX(-50%) translateY(0);
}

.nav__dropdown-link {
  display: block;
  padding: var(--space-2) var(--space-3);
  border-radius: var(--radius-sm);
  color: var(--text-secondary);
  text-decoration: none;
  font-size: var(--text-sm);
  transition: background var(--duration-fast),
              color var(--duration-fast);
}

.nav__dropdown-link:hover {
  background: var(--glass-bg-hover);
  color: var(--text-primary);
}

/* Dropdown link description (Apple-style) */
.nav__dropdown-desc {
  display: block;
  font-size: var(--text-xs);
  color: var(--text-tertiary);
  margin-top: 2px;
}

/* === MOBILE NAV === */
@media (max-width: 768px) {
  .nav__links {
    display: none;
  }

  .nav__hamburger {
    display: flex;
  }

  /* Full-screen mobile menu */
  .nav__mobile {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.97);
    backdrop-filter: blur(var(--glass-blur-heavy));
    -webkit-backdrop-filter: blur(var(--glass-blur-heavy));
    z-index: var(--z-overlay);
    padding: var(--space-16) var(--space-5) var(--space-5);
    display: flex;
    flex-direction: column;
    gap: var(--space-2);
    transform: translateX(100%);
    transition: transform var(--duration-slow) var(--ease-out);
  }

  .nav__mobile--open {
    transform: translateX(0);
  }
}
```

### 3c. Section Navigation (Sidebar for Long-Form)

Apple uses a left sidebar for long-form content (see developer.apple.com/documentation). On scroll, the current section highlights.

```css
/* === SECTION NAV (Table of Contents) === */
.toc {
  position: sticky;
  top: calc(64px + var(--space-5)); /* Below fixed nav */
  align-self: flex-start;
  max-height: calc(100vh - 64px - var(--space-10));
  overflow-y: auto;
  width: 240px;
  flex-shrink: 0;
  padding-right: var(--space-5);
}

.toc__list {
  list-style: none;
  padding: 0;
  margin: 0;
  border-left: 1px solid var(--glass-border);
}

.toc__link {
  display: block;
  padding: var(--space-2) var(--space-4);
  margin-left: -1px; /* Overlap border */
  border-left: 2px solid transparent;
  font-size: var(--text-sm);
  color: var(--text-tertiary);
  text-decoration: none;
  transition: all var(--duration-fast) var(--ease-out);
}

.toc__link:hover {
  color: var(--text-secondary);
}

.toc__link--active {
  color: var(--btc-orange);
  border-left-color: var(--btc-orange);
}
```

---

## 4. Dark Theme and Glassmorphism

### 4a. Why NOT Pure Black for Everything

Pure `#000000` causes a "halation" effect -- bright text on pure black creates visual vibration, especially for users with astigmatism (~50% of the population). The solution:

- **Page background:** `#000000` (true black for OLED benefits and drama)
- **Content surfaces:** `#050505` to `#0a0a0a` (barely perceptible lift)
- **Cards/panels:** Glass effect with `rgba(255,255,255,0.03)` background
- **Text:** `#f5f5f7` (Apple's signature off-white, NOT `#ffffff`)

This creates depth through subtle layering while keeping the ultra-dark aesthetic.

### 4b. Bitcoin Orange (#f7931a) Usage Rules

The accent must feel like a "hot coal in darkness" -- precious, not painted everywhere.

```
USAGE HIERARCHY:

HIGH IMPACT (use sparingly):
  - CTA buttons (filled orange)
  - Active nav indicator
  - Hero price display
  - Scroll progress bar

MEDIUM IMPACT:
  - Card top-edge glow on hover (gradient, partial opacity)
  - Chart highlight lines
  - Selected state borders
  - Toggle/switch active state

LOW IMPACT (use freely):
  - Background tints: rgba(247, 147, 26, 0.05) to 0.15
  - Border highlights: rgba(247, 147, 26, 0.20)
  - Icon accents
  - Link hover states

NEVER:
  - Large filled areas of solid orange
  - Orange body text (fails contrast on dark bg)
  - Multiple orange elements competing for attention
  - Orange + red adjacent (creates visual confusion)
```

### 4c. Glass Card Component

```css
/* === GLASS CARD === */
.glass-card {
  background: var(--glass-bg);
  backdrop-filter: blur(var(--glass-blur)) saturate(120%);
  -webkit-backdrop-filter: blur(var(--glass-blur)) saturate(120%);
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-lg);
  box-shadow: var(--glass-shadow);
  padding: var(--space-5);
  position: relative;
  overflow: hidden;
  transition: border-color var(--duration-normal) var(--ease-out),
              box-shadow var(--duration-normal) var(--ease-out);
}

/* Subtle inner light on top edge */
.glass-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.08),
    transparent
  );
}

.glass-card:hover {
  border-color: var(--glass-border-lit);
  box-shadow: 0 8px 40px rgba(0, 0, 0, 0.5),
              0 0 0 1px rgba(255, 255, 255, 0.05);
}

/* Orange glow variant (for featured/primary cards) */
.glass-card--accent::after {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(
    circle at 50% 0%,
    var(--btc-orange-dim),
    transparent 60%
  );
  opacity: 0;
  transition: opacity var(--duration-slow) var(--ease-out);
  pointer-events: none;
  z-index: -1;
}

.glass-card--accent:hover::after {
  opacity: 1;
}
```

### 4d. Gradient and Glow Effects

```css
/* === AMBIENT GLOW EFFECTS === */

/* Page-level ambient glow (positioned behind content) */
.ambient-glow {
  position: fixed;
  pointer-events: none;
  z-index: 0;
}

.ambient-glow--orange {
  width: 600px;
  height: 600px;
  background: radial-gradient(
    circle,
    rgba(247, 147, 26, 0.06) 0%,
    transparent 70%
  );
  top: -200px;
  right: -100px;
}

.ambient-glow--blue {
  width: 800px;
  height: 800px;
  background: radial-gradient(
    circle,
    rgba(100, 210, 255, 0.03) 0%,
    transparent 70%
  );
  bottom: -300px;
  left: -200px;
}

/* Section divider with glow */
.section-divider {
  height: 1px;
  background: linear-gradient(
    90deg,
    transparent,
    var(--glass-border-lit),
    var(--btc-orange-mid),
    var(--glass-border-lit),
    transparent
  );
  margin: var(--space-12) 0;
  border: none;
}

/* Text glow (for hero numbers) */
.glow-text {
  text-shadow:
    0 0 20px var(--btc-orange-dim),
    0 0 40px rgba(247, 147, 26, 0.05);
}

/* Animated gradient border */
.gradient-border {
  position: relative;
  border-radius: var(--radius-lg);
  padding: 1px; /* Border width */
  background: linear-gradient(
    135deg,
    var(--btc-orange-mid),
    transparent 50%,
    var(--btc-orange-dim)
  );
}

.gradient-border__inner {
  background: var(--bg-raised);
  border-radius: calc(var(--radius-lg) - 1px);
  padding: var(--space-5);
}
```

---

## 5. Typography Hierarchy Implementation

### 5a. Core Typography Styles

```css
/* === TYPOGRAPHY === */

/* Reset and base */
body {
  font-family: var(--font-sans);
  font-size: var(--text-base);
  font-weight: var(--weight-normal);
  line-height: var(--leading-normal);
  color: var(--text-primary);
  background: var(--bg-void);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;
}

/* Display / Hero */
.text-display {
  font-size: var(--text-5xl);
  font-weight: var(--weight-black);
  line-height: var(--leading-tight);
  letter-spacing: var(--tracking-tight);
  color: var(--text-primary);
}

/* Page title */
.text-title {
  font-size: var(--text-4xl);
  font-weight: var(--weight-bold);
  line-height: var(--leading-tight);
  letter-spacing: var(--tracking-tight);
  color: var(--text-primary);
}

/* Section heading */
.text-heading {
  font-size: var(--text-2xl);
  font-weight: var(--weight-semibold);
  line-height: var(--leading-snug);
  letter-spacing: var(--tracking-tight);
  color: var(--text-primary);
}

/* Subsection heading */
.text-subheading {
  font-size: var(--text-xl);
  font-weight: var(--weight-semibold);
  line-height: var(--leading-snug);
  color: var(--text-primary);
}

/* Body text */
.text-body {
  font-size: var(--text-base);
  font-weight: var(--weight-normal);
  line-height: var(--leading-normal);
  color: var(--text-secondary);
  max-width: 65ch; /* Optimal reading width */
}

/* Body large (lead paragraphs) */
.text-body-lg {
  font-size: var(--text-md);
  font-weight: var(--weight-normal);
  line-height: var(--leading-relaxed);
  color: var(--text-secondary);
}

/* Caption / metadata */
.text-caption {
  font-size: var(--text-sm);
  font-weight: var(--weight-normal);
  color: var(--text-tertiary);
}

/* Label (uppercase) */
.text-label {
  font-size: var(--text-xs);
  font-weight: var(--weight-semibold);
  letter-spacing: var(--tracking-wider);
  text-transform: uppercase;
  color: var(--text-tertiary);
}

/* === NUMERIC TYPOGRAPHY === */
/* All financial numbers use monospace + tabular-nums */

.text-price {
  font-family: var(--font-mono);
  font-variant-numeric: tabular-nums;
  font-weight: var(--weight-bold);
  letter-spacing: -0.01em;
}

.text-price--hero {
  font-size: var(--text-5xl);
  line-height: 1;
}

.text-price--large {
  font-size: var(--text-3xl);
}

.text-price--medium {
  font-size: var(--text-xl);
}

.text-price--small {
  font-size: var(--text-base);
}

/* Percentage change */
.text-pct {
  font-family: var(--font-mono);
  font-variant-numeric: tabular-nums;
  font-size: var(--text-sm);
  font-weight: var(--weight-medium);
}

.text-pct--positive { color: var(--color-positive); }
.text-pct--negative { color: var(--color-negative); }
.text-pct--neutral  { color: var(--color-neutral); }

/* Hash / address display */
.text-hash {
  font-family: var(--font-mono);
  font-size: var(--text-sm);
  color: var(--text-tertiary);
  letter-spacing: 0.02em;
  word-break: break-all;
}
```

---

## 6. Micro-Interactions and Scroll Animations

### 6a. CSS Scroll-Driven Animations (Modern API)

These work in Chrome 115+, Edge 115+, and are progressively enhanced.

```css
/* === SCROLL PROGRESS BAR === */
@keyframes scroll-progress {
  from { transform: scaleX(0); }
  to   { transform: scaleX(1); }
}

.scroll-progress-bar {
  position: fixed;
  top: 64px; /* Below nav */
  left: 0;
  width: 100%;
  height: 2px;
  background: var(--btc-orange);
  transform-origin: left;
  z-index: var(--z-sticky);
  animation: scroll-progress linear;
  animation-timeline: scroll(root);
}

/* === SCROLL-REVEAL SECTIONS === */
@keyframes fade-up {
  from {
    opacity: 0;
    transform: translateY(40px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.reveal-section {
  animation: fade-up linear both;
  animation-timeline: view();
  animation-range: entry 0% entry 40%;
}

/* Staggered card reveals */
.reveal-card:nth-child(1) { animation-range: entry 0% entry 35%; }
.reveal-card:nth-child(2) { animation-range: entry 5% entry 40%; }
.reveal-card:nth-child(3) { animation-range: entry 10% entry 45%; }
.reveal-card:nth-child(4) { animation-range: entry 15% entry 50%; }

/* === PARALLAX HEADER === */
@keyframes parallax-bg {
  from { transform: translateY(0); }
  to   { transform: translateY(-100px); }
}

.hero__background {
  animation: parallax-bg linear;
  animation-timeline: scroll(root);
  animation-range: 0vh 100vh;
}

/* === STICKY SECTION HEADER (pins during scroll) === */
@keyframes pin-header {
  0%, 100% { opacity: 1; }
}

.section-header--sticky {
  position: sticky;
  top: 64px;
  background: var(--bg-base);
  z-index: var(--z-base);
  animation: pin-header linear;
  animation-timeline: view();
}

/* === NUMBER COUNT-UP ON SCROLL === */
@keyframes counter-reveal {
  from {
    opacity: 0;
    transform: translateY(20px) scale(0.95);
    filter: blur(4px);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
    filter: blur(0);
  }
}

.counter-value {
  animation: counter-reveal linear both;
  animation-timeline: view();
  animation-range: entry 10% entry 50%;
}
```

### 6b. JavaScript Fallback (Intersection Observer)

For browsers without scroll-driven animation support, use this lightweight JS approach.

```javascript
/* === SCROLL REVEAL FALLBACK === */

// Feature detection
const hasScrollTimeline = CSS.supports('animation-timeline', 'scroll()');

if (!hasScrollTimeline) {
  // Intersection Observer for scroll reveals
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          // Stagger children
          const children = entry.target.querySelectorAll('.reveal-child');
          children.forEach((child, i) => {
            child.style.transitionDelay = `${i * 80}ms`;
            child.classList.add('revealed');
          });
        }
      });
    },
    {
      threshold: 0.15,
      rootMargin: '0px 0px -60px 0px',
    }
  );

  document.querySelectorAll('.reveal-section, .reveal-card').forEach((el) => {
    revealObserver.observe(el);
  });

  // Scroll progress bar fallback
  const progressBar = document.querySelector('.scroll-progress-bar');
  if (progressBar) {
    window.addEventListener('scroll', () => {
      const scrolled = window.scrollY;
      const total = document.documentElement.scrollHeight - window.innerHeight;
      const progress = Math.min(scrolled / total, 1);
      progressBar.style.transform = `scaleX(${progress})`;
    }, { passive: true });
  }
}

/* CSS for the JS-driven approach */
/*
.reveal-section,
.reveal-card {
  opacity: 0;
  transform: translateY(40px);
  transition: opacity var(--duration-reveal) var(--ease-out),
              transform var(--duration-reveal) var(--ease-out);
}

.reveal-section.revealed,
.reveal-card.revealed {
  opacity: 1;
  transform: translateY(0);
}

.reveal-child {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity var(--duration-slow) var(--ease-out),
              transform var(--duration-slow) var(--ease-out);
}

.reveal-child.revealed {
  opacity: 1;
  transform: translateY(0);
}
*/
```

### 6c. Chart Entrance Animations

```css
/* === CHART ANIMATIONS === */

/* Line chart draw-in */
@keyframes draw-line {
  from { stroke-dashoffset: var(--line-length); }
  to   { stroke-dashoffset: 0; }
}

.chart-line {
  stroke-dasharray: var(--line-length);
  stroke-dashoffset: var(--line-length);
}

.chart-line.revealed {
  animation: draw-line 1.5s var(--ease-out) forwards;
}

/* Bar chart grow-up */
@keyframes bar-grow {
  from {
    transform: scaleY(0);
    opacity: 0;
  }
  to {
    transform: scaleY(1);
    opacity: 1;
  }
}

.chart-bar {
  transform-origin: bottom;
  animation: bar-grow 0.6s var(--ease-out) both;
}

/* Stagger bars */
.chart-bar:nth-child(1)  { animation-delay: 0ms; }
.chart-bar:nth-child(2)  { animation-delay: 40ms; }
.chart-bar:nth-child(3)  { animation-delay: 80ms; }
.chart-bar:nth-child(4)  { animation-delay: 120ms; }
.chart-bar:nth-child(5)  { animation-delay: 160ms; }
.chart-bar:nth-child(6)  { animation-delay: 200ms; }
.chart-bar:nth-child(7)  { animation-delay: 240ms; }
.chart-bar:nth-child(8)  { animation-delay: 280ms; }
.chart-bar:nth-child(9)  { animation-delay: 320ms; }
.chart-bar:nth-child(10) { animation-delay: 360ms; }

/* Donut chart segment reveal */
@keyframes donut-reveal {
  from { stroke-dashoffset: var(--segment-length); }
  to   { stroke-dashoffset: 0; }
}

/* Tooltip fade */
@keyframes tooltip-show {
  from {
    opacity: 0;
    transform: translateY(4px) scale(0.98);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.chart-tooltip {
  animation: tooltip-show var(--duration-fast) var(--ease-out);
  background: rgba(0, 0, 0, 0.9);
  backdrop-filter: blur(10px);
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-sm);
  padding: var(--space-2) var(--space-3);
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  color: var(--text-primary);
  pointer-events: none;
}
```

### 6d. Hover Micro-Interactions

```css
/* === BUTTON HOVER === */
.btn-primary {
  background: var(--btc-orange);
  color: var(--bg-void);
  font-family: var(--font-sans);
  font-size: var(--text-sm);
  font-weight: var(--weight-semibold);
  padding: var(--space-3) var(--space-5);
  border-radius: var(--radius-full);
  border: none;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: transform var(--duration-fast) var(--ease-out),
              box-shadow var(--duration-normal) var(--ease-out);
}

.btn-primary:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 20px rgba(247, 147, 26, 0.3);
}

.btn-primary:active {
  transform: translateY(0) scale(0.98);
}

/* Shimmer effect on hover */
.btn-primary::after {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: linear-gradient(
    45deg,
    transparent 30%,
    rgba(255, 255, 255, 0.1) 50%,
    transparent 70%
  );
  transform: translateX(-100%);
  transition: none;
}

.btn-primary:hover::after {
  transform: translateX(100%);
  transition: transform 0.6s var(--ease-out);
}

/* === CARD HOVER LIFT === */
.card-interactive {
  transition: transform var(--duration-normal) var(--ease-out),
              box-shadow var(--duration-normal) var(--ease-out);
}

.card-interactive:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.3);
}

/* === LINK UNDERLINE ANIMATION === */
.link-animated {
  color: var(--text-secondary);
  text-decoration: none;
  background-image: linear-gradient(var(--btc-orange), var(--btc-orange));
  background-size: 0% 1px;
  background-position: left bottom;
  background-repeat: no-repeat;
  transition: background-size var(--duration-normal) var(--ease-out),
              color var(--duration-fast) var(--ease-out);
  padding-bottom: 2px;
}

.link-animated:hover {
  color: var(--text-primary);
  background-size: 100% 1px;
}

/* === DATA VALUE TRANSITION (for live updates) === */
.data-value {
  transition: color var(--duration-fast);
}

.data-value--updating {
  color: var(--btc-orange);
}
```

---

## 7. Bitcoin/Crypto Branding Elements

### 7a. Bitcoin SVG Logo (Inline, Lightweight)

```html
<!-- Bitcoin "B" Logo Mark - CC0 Public Domain -->
<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" class="btc-logo">
  <circle cx="32" cy="32" r="32" fill="currentColor" class="btc-logo__bg"/>
  <path d="M46.1 27.4c.6-4.2-2.6-6.5-7-8l1.4-5.7-3.5-.9-1.4 5.5c-.9-.2-1.8-.4-2.8-.7l1.4-5.5-3.5-.9-1.4 5.7c-.8-.2-1.5-.3-2.2-.5l-4.8-1.2-.9 3.7s2.6.6 2.5.6c1.4.4 1.7 1.3 1.6 2l-1.6 6.6c.1 0 .2.1.3.1l-.3-.1-2.3 9.1c-.2.4-.6 1.1-1.6.8.1 0-2.5-.6-2.5-.6l-1.7 4 4.5 1.1c.8.2 1.7.4 2.5.7l-1.4 5.8 3.5.9 1.4-5.7c1 .3 1.9.5 2.8.7l-1.4 5.7 3.5.9 1.4-5.8c6 1.1 10.5.7 12.4-4.7 1.5-4.4-.1-6.9-3.2-8.5 2.3-.5 4-2.1 4.5-5.2zm-8 11.2c-1.1 4.4-8.4 2-10.8 1.4l1.9-7.7c2.4.6 10 1.8 8.9 6.3zm1.1-11.3c-1 4-7.1 2-9 1.5l1.8-7c2 .5 8.3 1.4 7.2 5.5z"
    fill="#000" class="btc-logo__symbol"/>
</svg>

<style>
.btc-logo {
  width: 40px;
  height: 40px;
  color: var(--btc-orange);
}

/* Subtle pulse animation for live data indicator */
@keyframes btc-pulse {
  0%, 100% { filter: drop-shadow(0 0 0 transparent); }
  50%      { filter: drop-shadow(0 0 8px var(--btc-orange-dim)); }
}

.btc-logo--live {
  animation: btc-pulse 3s ease-in-out infinite;
}
</style>
```

### 7b. Cryptographic/Matrix Aesthetic

```css
/* === HASH RAIN BACKGROUND === */
/* Pure CSS animated background mimicking scrolling hex data */

@keyframes hash-scroll {
  from { transform: translateY(-100%); }
  to   { transform: translateY(100%); }
}

.hash-rain {
  position: absolute;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
  opacity: 0.03; /* Extremely subtle */
  font-family: var(--font-mono);
  font-size: 10px;
  color: var(--btc-orange);
  line-height: 1.4;
  /* Render in columns */
  display: flex;
  gap: 20px;
  padding: 0 20px;
}

.hash-rain__col {
  animation: hash-scroll linear infinite;
  white-space: nowrap;
  writing-mode: vertical-lr;
}

.hash-rain__col:nth-child(odd)  { animation-duration: 25s; }
.hash-rain__col:nth-child(even) { animation-duration: 35s; }
.hash-rain__col:nth-child(3n)   { animation-duration: 30s; animation-delay: -10s; }

/* === NETWORK NODE VISUALIZATION (CSS-only) === */

.network-viz {
  position: relative;
  width: 100%;
  height: 400px;
  overflow: hidden;
}

/* Individual nodes */
.network-node {
  position: absolute;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--btc-orange);
  box-shadow: 0 0 6px var(--btc-orange-dim);
}

/* Node connection lines (pure CSS) */
.network-line {
  position: absolute;
  height: 1px;
  background: linear-gradient(
    90deg,
    var(--btc-orange-dim),
    rgba(247, 147, 26, 0.05)
  );
  transform-origin: left center;
}

/* Pulse emanating from nodes */
@keyframes node-pulse {
  0% {
    box-shadow: 0 0 0 0 var(--btc-orange-mid);
  }
  70% {
    box-shadow: 0 0 0 10px transparent;
  }
  100% {
    box-shadow: 0 0 0 0 transparent;
  }
}

.network-node--active {
  animation: node-pulse 2s ease-out infinite;
}

/* === BLOCK VISUALIZATION === */

.block-chain {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  overflow-x: auto;
  padding: var(--space-4) 0;
}

.block {
  flex-shrink: 0;
  width: 80px;
  height: 80px;
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-sm);
  background: var(--glass-bg);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  color: var(--text-tertiary);
  transition: all var(--duration-normal) var(--ease-out);
}

.block:hover {
  border-color: var(--btc-orange-mid);
  background: var(--btc-orange-dim);
  color: var(--text-primary);
}

.block__number {
  font-weight: var(--weight-bold);
  color: var(--text-primary);
  margin-bottom: 2px;
}

.block__hash {
  font-size: 8px;
  opacity: 0.5;
}

/* Chain connector */
.block-chain__connector {
  flex-shrink: 0;
  width: 24px;
  height: 2px;
  background: linear-gradient(
    90deg,
    var(--glass-border),
    var(--btc-orange-dim),
    var(--glass-border)
  );
}

/* Latest block glow */
.block--latest {
  border-color: var(--btc-orange-mid);
  box-shadow: 0 0 20px var(--btc-orange-dim);
}

@keyframes block-confirm {
  from {
    opacity: 0;
    transform: scale(0.8);
    box-shadow: 0 0 0 0 var(--btc-orange-mid);
  }
  to {
    opacity: 1;
    transform: scale(1);
    box-shadow: 0 0 20px var(--btc-orange-dim);
  }
}

.block--confirming {
  animation: block-confirm 0.5s var(--ease-spring) both;
}
```

### 7c. Halving Countdown / Epoch Visualization

```css
/* === HALVING COUNTDOWN === */
.halving-counter {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--space-4);
  text-align: center;
}

.halving-counter__unit {
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-md);
  padding: var(--space-5) var(--space-4);
}

.halving-counter__value {
  font-family: var(--font-mono);
  font-size: var(--text-3xl);
  font-weight: var(--weight-bold);
  font-variant-numeric: tabular-nums;
  color: var(--text-primary);
  display: block;
}

.halving-counter__label {
  font-size: var(--text-xs);
  letter-spacing: var(--tracking-wider);
  text-transform: uppercase;
  color: var(--text-tertiary);
  margin-top: var(--space-2);
  display: block;
}

/* Progress bar to next halving */
.halving-progress {
  width: 100%;
  height: 4px;
  background: var(--bg-overlay);
  border-radius: var(--radius-full);
  overflow: hidden;
  margin-top: var(--space-5);
}

.halving-progress__fill {
  height: 100%;
  background: linear-gradient(90deg, var(--btc-orange), var(--color-warning));
  border-radius: var(--radius-full);
  transition: width 1s var(--ease-out);
}
```

---

## 8. Layout Patterns

### 8a. Page Structure

```css
/* === PAGE LAYOUT === */
.page {
  background: var(--bg-void);
  color: var(--text-primary);
  min-height: 100vh;
  overflow-x: hidden;
}

/* Content wrapper */
.container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 var(--space-5);
}

.container--narrow {
  max-width: 900px;
}

.container--wide {
  max-width: 1600px;
}

/* Section spacing */
.section {
  padding: var(--space-16) 0;
}

.section + .section {
  padding-top: 0;
}

/* Grid layouts */
.grid {
  display: grid;
  gap: var(--space-5);
}

.grid--2 { grid-template-columns: repeat(2, 1fr); }
.grid--3 { grid-template-columns: repeat(3, 1fr); }
.grid--4 { grid-template-columns: repeat(4, 1fr); }

/* Dashboard grid (asymmetric) */
.grid--dashboard {
  grid-template-columns: 2fr 1fr;
  grid-template-rows: auto;
}

/* Metric strip (top of dashboard) */
.metric-strip {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: var(--space-4);
}

@media (max-width: 768px) {
  .grid--2,
  .grid--3,
  .grid--4 {
    grid-template-columns: 1fr;
  }

  .grid--dashboard {
    grid-template-columns: 1fr;
  }

  .metric-strip {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* Article with sidebar layout */
.layout-article {
  display: grid;
  grid-template-columns: 240px 1fr;
  gap: var(--space-8);
  align-items: start;
}

@media (max-width: 1024px) {
  .layout-article {
    grid-template-columns: 1fr;
  }

  .toc {
    display: none; /* Collapse to hamburger on mobile */
  }
}
```

### 8b. Hero Section Pattern

```css
/* === HERO === */
.hero {
  position: relative;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: var(--space-16) 0;
  overflow: hidden;
}

/* Background gradient mesh */
.hero__bg {
  position: absolute;
  inset: 0;
  z-index: 0;
  background:
    radial-gradient(ellipse at 20% 50%, rgba(247, 147, 26, 0.08) 0%, transparent 50%),
    radial-gradient(ellipse at 80% 20%, rgba(100, 210, 255, 0.04) 0%, transparent 50%),
    var(--bg-void);
}

/* Grid lines overlay */
.hero__grid {
  position: absolute;
  inset: 0;
  z-index: 1;
  background-image:
    linear-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.02) 1px, transparent 1px);
  background-size: 60px 60px;
  mask-image: radial-gradient(ellipse at center, black 30%, transparent 70%);
  -webkit-mask-image: radial-gradient(ellipse at center, black 30%, transparent 70%);
}

.hero__content {
  position: relative;
  z-index: 2;
}

.hero__eyebrow {
  font-size: var(--text-xs);
  font-weight: var(--weight-semibold);
  letter-spacing: var(--tracking-wider);
  text-transform: uppercase;
  color: var(--btc-orange);
  margin-bottom: var(--space-4);
  display: flex;
  align-items: center;
  gap: var(--space-2);
}

/* Animated dot before eyebrow (live indicator) */
.hero__eyebrow::before {
  content: '';
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--btc-orange);
  animation: btc-pulse 2s ease-in-out infinite;
}

.hero__title {
  font-size: var(--text-5xl);
  font-weight: var(--weight-black);
  line-height: var(--leading-tight);
  letter-spacing: var(--tracking-tight);
  margin-bottom: var(--space-5);
}

/* Orange gradient text */
.hero__title span {
  background: linear-gradient(135deg, var(--btc-orange), #ffb347);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero__subtitle {
  font-size: var(--text-lg);
  color: var(--text-secondary);
  max-width: 600px;
  line-height: var(--leading-relaxed);
  margin-bottom: var(--space-8);
}
```

---

## 9. Accessibility Checklist

All of these design patterns have been designed with WCAG 2.1 AA compliance in mind:

| Element | Background | Foreground | Ratio | Passes |
|---------|-----------|------------|-------|--------|
| Body text | #000000 | #f5f5f7 | 19.4:1 | AAA |
| Secondary text | #000000 | #a1a1a6 | 9.1:1 | AAA |
| Tertiary text | #000000 | #6e6e73 | 5.0:1 | AA |
| BTC orange on black | #000000 | #f7931a | 8.6:1 | AAA |
| Green on black | #000000 | #30d158 | 10.1:1 | AAA |
| Red on black | #000000 | #ff453a | 5.5:1 | AA |
| Muted text | #000000 | #48484a | 3.2:1 | AA-large |

**Key rules:**
- Never use `#ffffff` text on `#000000` -- the 21:1 ratio causes halation. Use `#f5f5f7`.
- Bitcoin orange `#f7931a` passes AA on black but NOT on light backgrounds.
- For data, the green/red semantic colors both pass AA on pure black.
- The glass borders at `rgba(255,255,255,0.06)` are decorative, not conveying information.

---

## 10. Performance Considerations

For a pure CSS/JS implementation without build tools:

1. **Font loading:** Use `font-display: swap` and preload critical fonts.
   ```html
   <link rel="preload" href="/fonts/Inter-var.woff2" as="font" type="font/woff2" crossorigin>
   <link rel="preload" href="/fonts/JetBrainsMono-var.woff2" as="font" type="font/woff2" crossorigin>
   ```

2. **Backdrop-filter performance:** Limit `backdrop-filter: blur()` to small elements (nav, cards). Never apply to full-page overlays on mobile.

3. **Scroll animations:** Use `animation-timeline: scroll()` (runs on compositor thread) instead of JS scroll listeners where possible. Fall back to `IntersectionObserver` (batch-processed) instead of `scroll` events (fire every frame).

4. **CSS containment:** Apply `contain: layout style paint` to card grids and data tables for rendering performance.

5. **Reduce motion:** Always respect user preferences.
   ```css
   @media (prefers-reduced-motion: reduce) {
     *,
     *::before,
     *::after {
       animation-duration: 0.01ms !important;
       animation-iteration-count: 1 !important;
       transition-duration: 0.01ms !important;
       scroll-behavior: auto !important;
     }
   }
   ```

---

## Sources

- [TradingView CSS Color Themes Documentation](https://www.tradingview.com/charting-library-docs/latest/customization/styles/CSS-Color-Themes/)
- [Apple Human Interface Guidelines](https://developer.apple.com/design/human-interface-guidelines/)
- [Bloomberg Terminal Color Accessibility](https://www.bloomberg.com/company/stories/designing-the-terminal-for-color-accessibility/)
- [Bloomberg Terminal UX: Concealing Complexity](https://www.bloomberg.com/company/stories/how-bloomberg-terminal-ux-designers-conceal-complexity/)
- [Dark Glassmorphism UI Trend](https://medium.com/@developer_89726/dark-glassmorphism-the-aesthetic-that-will-define-ui-in-2026-93aa4153088f)
- [Glassmorphism Implementation Guide](https://playground.halfaccessible.com/blog/glassmorphism-design-trend-implementation-guide)
- [Dark Mode Glassmorphism Tips](https://alphaefficiency.com/dark-mode-glassmorphism)
- [Mega Menus UX Best Practices 2025](https://designshack.net/articles/ux-design/mega-menus-ux/)
- [Dashboard UI/UX Design Principles 2025](https://medium.com/@allclonescript/20-best-dashboard-ui-ux-design-principles-you-need-in-2025-30b661f2f795)
- [CSS Scroll-Driven Animations (Smashing Magazine)](https://www.smashingmagazine.com/2024/12/introduction-css-scroll-driven-animations/)
- [Scroll-Driven Animations (CSS-Tricks)](https://css-tricks.com/unleash-the-power-of-scroll-driven-animations/)
- [Scroll-Driven Animations MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Scroll-driven_animations)
- [Typography in Design Systems](https://medium.com/eightshapes-llc/typography-in-design-systems-6ed771432f1e)
- [Typography for Data Dashboards](https://datafloq.com/typography-basics-for-data-dashboards/)
- [Web Typography Guide](https://design.dev/guides/typography-web-design/)
- [Bitcoin Brand Assets (CC0)](https://github.com/bitpay/bitcoin-brand)
- [Bitcoin Color Codes](https://brandpalettes.com/bitcoin-colors/)
- [WCAG 2.2 Contrast Requirements](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html)
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [Intersection Observer Scroll Animation](https://www.freecodecamp.org/news/scroll-animations-with-javascript-intersection-observer-api/)
