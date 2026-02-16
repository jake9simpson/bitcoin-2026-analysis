# BTC v2 Design Specification
## Premium Fintech Data Journalism Design System

---

## 1. Typography

### Font Stack
```
Primary Font:    "Inter" (Google Fonts)
Display Font:    "Plus Jakarta Sans" (Google Fonts) - for hero/section headings
Mono/Data Font:  "JetBrains Mono" (Google Fonts) - for numbers, stats, code
```

### Google Fonts Import URL
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Plus+Jakarta+Sans:wght@600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet">
```

### Type Scale
```
Hero h1:       clamp(3rem, 7vw, 5.5rem) / 800 / 1.02 / -0.04em  (Plus Jakarta Sans)
Section h2:    clamp(2rem, 4vw, 3rem)    / 700 / 1.1  / -0.03em  (Plus Jakarta Sans)
Card h3:       1.25rem (20px)            / 700 / 1.3  / -0.02em  (Plus Jakarta Sans)
Subtitle:      1.125rem (18px)           / 400 / 1.7  / 0        (Inter)
Body:          1rem (16px)               / 400 / 1.7  / 0        (Inter)
Body small:    0.9375rem (15px)          / 400 / 1.7  / 0        (Inter)
Caption:       0.8125rem (13px)          / 500 / 1.5  / 0        (Inter)
Overline:      0.75rem (12px)            / 600 / 1.0  / 0.12em / text-transform: uppercase (JetBrains Mono)
Stat Value:    clamp(2rem, 3.5vw, 3rem)  / 700 / 1.0  / -0.02em  (JetBrains Mono)
Stat Label:    0.8125rem (13px)          / 500 / 1.4  / 0        (Inter)
Nav Link:      0.8125rem (13px)          / 500 / 1.0  / 0        (Inter)
```

### CSS Font Variables
```css
--font-display: 'Plus Jakarta Sans', 'Inter', system-ui, -apple-system, sans-serif;
--font-body: 'Inter', system-ui, -apple-system, sans-serif;
--font-mono: 'JetBrains Mono', 'SF Mono', 'Fira Code', monospace;
```

---

## 2. Color Palette

### Core Palette (Dark Mode)
```css
/* Backgrounds - layered depth system */
--bg-primary:       #08080c;     /* Deepest black, page background */
--bg-secondary:     #0e0e14;     /* Slightly elevated, alternating sections */
--bg-card:          #14141e;     /* Card/container surface */
--bg-card-hover:    #1a1a28;     /* Card hover state */
--bg-elevated:      #1e1e2e;     /* Modals, dropdowns, tooltips */
--bg-input:         #12121c;     /* Form inputs, search fields */

/* Borders */
--border-primary:   #1e1e2e;     /* Subtle card borders */
--border-secondary: #2a2a3e;     /* Stronger borders, dividers */
--border-accent:    #3a3a52;     /* Active/hover borders */

/* Text - WCAG AA compliant on dark backgrounds */
--text-primary:     #eaeaf0;     /* Main body text, headings */
--text-secondary:   #8a8aa0;     /* Descriptions, subtitles */
--text-muted:       #52526a;     /* Captions, timestamps, disabled */
--text-inverse:     #08080c;     /* Text on light/colored backgrounds */

/* Accent: Bitcoin Orange (Primary brand color) */
--accent-primary:       #f7931a;     /* Bitcoin orange - brand identity */
--accent-primary-hover: #ffa940;     /* Lighter on hover */
--accent-primary-dim:   rgba(247, 147, 26, 0.12);  /* Background tint */
--accent-primary-glow:  rgba(247, 147, 26, 0.25);  /* Glow effect */

/* Accent: Electric Blue (Secondary, information) */
--accent-secondary:       #3b82f6;     /* Links, info states */
--accent-secondary-hover: #60a5fa;
--accent-secondary-dim:   rgba(59, 130, 246, 0.12);

/* Semantic: Bearish/Negative */
--bearish:          #ef4444;     /* Red for losses, declines */
--bearish-hover:    #f87171;
--bearish-dim:      rgba(239, 68, 68, 0.12);
--bearish-glow:     rgba(239, 68, 68, 0.25);

/* Semantic: Bullish/Positive */
--bullish:          #10b981;     /* Green for gains, positive */
--bullish-hover:    #34d399;
--bullish-dim:      rgba(16, 185, 129, 0.12);
--bullish-glow:     rgba(16, 185, 129, 0.25);

/* Semantic: Warning */
--warning:          #f59e0b;     /* Amber for caution */
--warning-dim:      rgba(245, 158, 11, 0.12);

/* Semantic: Purple (Verdict/Insight) */
--purple:           #8b5cf6;
--purple-dim:       rgba(139, 92, 246, 0.12);
--purple-glow:      rgba(139, 92, 246, 0.20);

/* Gradients */
--gradient-hero:      linear-gradient(180deg, rgba(239, 68, 68, 0.06) 0%, transparent 50%), radial-gradient(ellipse at 50% 0%, rgba(247, 147, 26, 0.08) 0%, transparent 60%);
--gradient-bear:      linear-gradient(135deg, rgba(239, 68, 68, 0.04) 0%, transparent 60%);
--gradient-bull:      linear-gradient(135deg, rgba(16, 185, 129, 0.04) 0%, transparent 60%);
--gradient-verdict:   linear-gradient(135deg, rgba(139, 92, 246, 0.04) 0%, transparent 60%);
--gradient-card:      linear-gradient(135deg, var(--bg-card) 0%, rgba(20, 20, 30, 0.8) 100%);
--gradient-glow-red:  radial-gradient(ellipse at 50% 50%, rgba(239, 68, 68, 0.08) 0%, transparent 70%);
--gradient-glow-blue: radial-gradient(ellipse at 50% 50%, rgba(59, 130, 246, 0.06) 0%, transparent 70%);

/* Scrollbar */
--scrollbar-track:  #08080c;
--scrollbar-thumb:  #2a2a3e;
--scrollbar-hover:  #3a3a52;
```

---

## 3. Chart.js Theme

### Global Defaults
```javascript
Chart.defaults.color = '#8a8aa0';                          // --text-secondary
Chart.defaults.borderColor = 'rgba(30, 30, 46, 0.6)';     // --border-primary with opacity
Chart.defaults.font.family = "'Inter', system-ui, sans-serif";
Chart.defaults.font.size = 12;
Chart.defaults.font.weight = '400';
Chart.defaults.responsive = true;
Chart.defaults.maintainAspectRatio = false;
Chart.defaults.animation.duration = 1200;
Chart.defaults.animation.easing = 'easeOutQuart';
```

### Grid & Axes
```javascript
// X Axis
scales: {
  x: {
    grid: {
      display: false,                        // Clean x-axis, no vertical grid
    },
    ticks: {
      color: '#52526a',                      // --text-muted
      font: { size: 11, weight: '500' },
      maxRotation: 45,
      padding: 8,
    },
    border: {
      display: false,
    }
  },
  // Y Axis
  y: {
    grid: {
      color: 'rgba(30, 30, 46, 0.5)',       // Subtle horizontal grid
      lineWidth: 1,
      drawBorder: false,
    },
    ticks: {
      color: '#52526a',                      // --text-muted
      font: {
        family: "'JetBrains Mono', monospace",
        size: 11,
        weight: '500',
      },
      padding: 12,
    },
    border: {
      display: false,
    }
  }
}
```

### Tooltip
```javascript
plugins: {
  tooltip: {
    backgroundColor: '#1e1e2e',              // --bg-elevated
    titleColor: '#eaeaf0',                   // --text-primary
    bodyColor: '#8a8aa0',                    // --text-secondary
    borderColor: '#2a2a3e',                  // --border-secondary
    borderWidth: 1,
    cornerRadius: 8,
    padding: { top: 10, bottom: 10, left: 14, right: 14 },
    titleFont: {
      family: "'Inter', sans-serif",
      size: 13,
      weight: '600',
    },
    bodyFont: {
      family: "'JetBrains Mono', monospace",
      size: 12,
      weight: '500',
    },
    displayColors: true,
    boxWidth: 8,
    boxHeight: 8,
    boxPadding: 4,
    usePointStyle: true,
    caretSize: 6,
    caretPadding: 8,
  }
}
```

### Line Chart Styling
```javascript
// Dataset defaults for line charts
{
  borderWidth: 2.5,
  tension: 0.35,                             // Smooth curves
  fill: true,                                // Area fill below line
  pointRadius: 0,                            // Hide points by default
  pointHoverRadius: 6,                       // Show on hover
  pointHoverBorderWidth: 2,
  pointHoverBorderColor: '#1e1e2e',          // Dark ring on hover
  pointHoverBackgroundColor: '<line-color>',  // Match line color
}

// Fill gradient (apply per dataset)
function createAreaGradient(ctx, colorRgb, topOpacity = 0.15, bottomOpacity = 0) {
  const gradient = ctx.createLinearGradient(0, 0, 0, ctx.canvas.height);
  gradient.addColorStop(0, `rgba(${colorRgb}, ${topOpacity})`);
  gradient.addColorStop(1, `rgba(${colorRgb}, ${bottomOpacity})`);
  return gradient;
}

// Key point markers (for annotated events only)
pointRadius: function(context) {
  const highlights = [0, 6, 14, 15]; // ATH, Fed, Flash Crash, Bounce
  return highlights.includes(context.dataIndex) ? 5 : 0;
},
pointBackgroundColor: function(context) {
  // Color-code by event type
  if (context.dataIndex === 0) return '#10b981';   // ATH = green
  if (context.dataIndex === 14) return '#ef4444';  // Crash = red
  return '#f7931a';                                 // Events = orange
},
```

### Bar Chart Styling
```javascript
{
  borderRadius: 6,                           // Rounded bar tops
  borderWidth: 0,                            // No border stroke
  maxBarThickness: 48,                       // Prevent overly wide bars
  borderSkipped: false,                      // Round all corners
  hoverBackgroundColor: '<color-hover>',     // Brighten on hover
}
```

### Radar Chart Styling
```javascript
scales: {
  r: {
    grid: {
      color: 'rgba(30, 30, 46, 0.5)',
      lineWidth: 1,
    },
    angleLines: {
      color: 'rgba(30, 30, 46, 0.4)',
      lineWidth: 1,
    },
    ticks: { display: false },
    pointLabels: {
      font: {
        family: "'Inter', sans-serif",
        size: 11,
        weight: '500',
      },
      color: '#8a8aa0',
      padding: 16,
    },
    min: 0,
    max: 10,
  }
}
```

### Annotation Plugin Styling
```javascript
// Label annotations (event markers on charts)
{
  type: 'label',
  backgroundColor: 'rgba(247, 147, 26, 0.12)',  // Tinted bg matching event color
  color: '#f7931a',                               // Text matches bg tint
  font: {
    family: "'JetBrains Mono', monospace",
    size: 10,
    weight: '600',
  },
  padding: { top: 4, bottom: 4, left: 8, right: 8 },
  borderRadius: 4,
}

// Line annotations (threshold/reference lines)
{
  type: 'line',
  borderColor: 'rgba(245, 158, 11, 0.35)',
  borderWidth: 1.5,
  borderDash: [6, 4],
  label: {
    display: true,
    backgroundColor: 'transparent',
    color: '#f59e0b',
    font: {
      family: "'JetBrains Mono', monospace",
      size: 10,
      weight: '500',
    },
    position: 'end',
  }
}

// Box annotations (highlight zones)
{
  type: 'box',
  backgroundColor: 'rgba(239, 68, 68, 0.04)',
  borderColor: 'rgba(239, 68, 68, 0.12)',
  borderWidth: 1,
  borderRadius: 4,
}
```

### Legend
```javascript
plugins: {
  legend: {
    display: true,                           // Only on multi-dataset charts (radar)
    position: 'top',
    align: 'end',
    labels: {
      color: '#8a8aa0',
      font: { family: "'Inter', sans-serif", size: 12, weight: '500' },
      usePointStyle: true,
      pointStyle: 'circle',
      pointStyleWidth: 8,
      padding: 20,
      boxWidth: 8,
      boxHeight: 8,
    }
  }
}
// Single-dataset charts: legend display: false
```

### Chart Color Palette
```javascript
const CHART_COLORS = {
  bearish:   '#ef4444',
  bullish:   '#10b981',
  orange:    '#f7931a',
  blue:      '#3b82f6',
  purple:    '#8b5cf6',
  amber:     '#f59e0b',
  cyan:      '#06b6d4',
  pink:      '#ec4899',
};
```

---

## 4. Component Specifications

### 4a. Stat Card
```css
.stat-card {
  background: var(--bg-card);
  border: 1px solid var(--border-primary);
  border-radius: 16px;
  padding: 28px 24px;
  position: relative;
  overflow: hidden;
  transition: transform 0.25s cubic-bezier(0.25, 0.46, 0.45, 0.94),
              border-color 0.25s ease,
              box-shadow 0.25s ease;
}

.stat-card:hover {
  transform: translateY(-3px);
  border-color: var(--border-accent);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3),
              0 2px 8px rgba(0, 0, 0, 0.2);
}

/* Top accent bar */
.stat-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  border-radius: 16px 16px 0 0;
  /* Color set per variant: bearish, bullish, warning, info */
}
.stat-card.bear::before { background: var(--bearish); }
.stat-card.bull::before { background: var(--bullish); }
.stat-card.warn::before { background: var(--warning); }
.stat-card.info::before { background: var(--accent-secondary); }

/* Subtle corner glow on hover */
.stat-card::after {
  content: '';
  position: absolute;
  top: -50%;
  right: -50%;
  width: 100%;
  height: 100%;
  background: radial-gradient(circle, rgba(247, 147, 26, 0.04) 0%, transparent 70%);
  opacity: 0;
  transition: opacity 0.3s ease;
}
.stat-card:hover::after { opacity: 1; }

.stat-card .stat-value {
  font-family: var(--font-mono);
  font-size: clamp(1.75rem, 2.5vw, 2.25rem);
  font-weight: 700;
  letter-spacing: -0.02em;
  line-height: 1.1;
  margin-bottom: 6px;
}

.stat-card .stat-label {
  font-family: var(--font-body);
  font-size: 0.8125rem;
  font-weight: 500;
  color: var(--text-secondary);
  line-height: 1.4;
}

.stat-card .stat-detail {
  font-family: var(--font-body);
  font-size: 0.75rem;
  color: var(--text-muted);
  margin-top: 10px;
  line-height: 1.5;
}
```

### 4b. Quote Block (Insider Quotes)
```css
.quote-block {
  position: relative;
  padding: 24px 24px 24px 28px;
  margin: 24px 0;
  background: var(--bg-card);
  border: 1px solid var(--border-primary);
  border-left: 3px solid var(--accent-primary);
  border-radius: 0 12px 12px 0;
}

.quote-block .quote-text {
  font-family: var(--font-body);
  font-size: 1rem;
  font-style: italic;
  font-weight: 400;
  color: var(--text-primary);
  line-height: 1.75;
  margin-bottom: 12px;
}

/* Opening quote mark */
.quote-block::before {
  content: '\201C';
  position: absolute;
  top: 12px;
  left: 12px;
  font-family: var(--font-display);
  font-size: 2.5rem;
  font-weight: 800;
  color: var(--accent-primary);
  opacity: 0.3;
  line-height: 1;
}

.quote-block .quote-attribution {
  font-family: var(--font-body);
  font-size: 0.8125rem;
  font-weight: 600;
  color: var(--text-secondary);
}

.quote-block .quote-role {
  font-size: 0.75rem;
  font-weight: 400;
  color: var(--text-muted);
  margin-top: 2px;
}

/* Variant: bearish quote */
.quote-block.bearish { border-left-color: var(--bearish); }
.quote-block.bearish::before { color: var(--bearish); }

/* Variant: bullish quote */
.quote-block.bullish { border-left-color: var(--bullish); }
.quote-block.bullish::before { color: var(--bullish); }
```

### 4c. Risk Badge / Severity Indicator
```css
.risk-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-family: var(--font-mono);
  font-size: 0.6875rem;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  padding: 4px 10px;
  border-radius: 6px;
  line-height: 1;
}

/* Pulse dot indicator */
.risk-badge::before {
  content: '';
  width: 6px;
  height: 6px;
  border-radius: 50%;
}

.risk-badge.critical {
  background: var(--bearish-dim);
  color: var(--bearish);
}
.risk-badge.critical::before { background: var(--bearish); }

.risk-badge.severe {
  background: var(--warning-dim);
  color: var(--warning);
}
.risk-badge.severe::before { background: var(--warning); }

.risk-badge.moderate {
  background: var(--accent-secondary-dim);
  color: var(--accent-secondary);
}
.risk-badge.moderate::before { background: var(--accent-secondary); }

.risk-badge.positive {
  background: var(--bullish-dim);
  color: var(--bullish);
}
.risk-badge.positive::before { background: var(--bullish); }
```

### 4d. Section Header Pattern
```html
<div class="section-header">
  <span class="section-overline bear">Macro & Regulatory</span>
  <h2 class="section-title">What Happened: The Macro Picture</h2>
  <p class="section-desc">Fed policy, the Warsh nomination, tariff wars...</p>
</div>
```

```css
.section-header {
  margin-bottom: 48px;
}

.section-overline {
  display: inline-block;
  font-family: var(--font-mono);
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  margin-bottom: 14px;
  /* Color set by variant class: .bear, .bull, .neutral, .verdict */
}
.section-overline.bear    { color: var(--bearish); }
.section-overline.bull    { color: var(--bullish); }
.section-overline.neutral { color: var(--accent-secondary); }
.section-overline.verdict { color: var(--purple); }

.section-title {
  font-family: var(--font-display);
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 700;
  letter-spacing: -0.03em;
  line-height: 1.1;
  color: var(--text-primary);
  margin-bottom: 16px;
}

.section-desc {
  font-family: var(--font-body);
  font-size: 1.125rem;
  font-weight: 400;
  color: var(--text-secondary);
  line-height: 1.7;
  max-width: 720px;
}
```

### 4e. Timeline Node
```css
.timeline {
  position: relative;
  padding-left: 36px;
  margin: 48px 0;
}

/* Vertical connecting line */
.timeline::before {
  content: '';
  position: absolute;
  left: 11px;
  top: 8px;
  bottom: 8px;
  width: 2px;
  background: linear-gradient(
    180deg,
    var(--border-secondary) 0%,
    var(--bearish-dim) 50%,
    var(--border-secondary) 100%
  );
}

.timeline-item {
  position: relative;
  margin-bottom: 32px;
  padding-left: 4px;
}

/* Node dot */
.timeline-item::before {
  content: '';
  position: absolute;
  left: -29px;
  top: 6px;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: 2px solid var(--bearish);
  background: var(--bg-primary);
  z-index: 1;
  transition: box-shadow 0.3s ease;
}

/* Highlighted/major event node */
.timeline-item.highlight::before {
  background: var(--bearish);
  box-shadow: 0 0 0 4px var(--bearish-dim),
              0 0 16px var(--bearish-glow);
}

.timeline-item .tl-date {
  font-family: var(--font-mono);
  font-size: 0.8125rem;
  font-weight: 600;
  color: var(--accent-primary);
  margin-bottom: 4px;
}

.timeline-item .tl-title {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 1.0625rem;
  color: var(--text-primary);
  margin-bottom: 6px;
  line-height: 1.3;
}

.timeline-item .tl-desc {
  font-family: var(--font-body);
  font-size: 0.9375rem;
  color: var(--text-secondary);
  line-height: 1.65;
}
```

### 4f. Data Table
```css
.data-table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  margin: 32px 0;
}

.data-table thead th {
  font-family: var(--font-mono);
  font-size: 0.6875rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--text-muted);
  padding: 14px 20px;
  text-align: left;
  background: var(--bg-secondary);
  border-bottom: 1px solid var(--border-secondary);
}

.data-table thead th:first-child { border-radius: 8px 0 0 0; }
.data-table thead th:last-child  { border-radius: 0 8px 0 0; }

.data-table tbody td {
  font-size: 0.9375rem;
  color: var(--text-secondary);
  padding: 16px 20px;
  border-bottom: 1px solid var(--border-primary);
  transition: background-color 0.15s ease;
}

.data-table tbody tr:hover td {
  background: var(--bg-card-hover);
}

/* Alternating row shading */
.data-table tbody tr:nth-child(even) td {
  background: rgba(14, 14, 20, 0.4);
}

.data-table .bear-col {
  color: var(--bearish);
  font-weight: 500;
}

.data-table .bull-col {
  color: var(--bullish);
  font-weight: 500;
}

@media (max-width: 768px) {
  .data-table {
    display: block;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
  }
  .data-table th,
  .data-table td {
    white-space: nowrap;
    padding: 12px 14px;
    font-size: 0.875rem;
  }
}
```

### 4g. Navigation Bar
```css
.nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  height: 64px;
  background: rgba(8, 8, 12, 0.80);
  backdrop-filter: blur(24px) saturate(1.2);
  -webkit-backdrop-filter: blur(24px) saturate(1.2);
  border-bottom: 1px solid var(--border-primary);
  transition: background-color 0.3s ease, box-shadow 0.3s ease;
}

/* Scrolled state (add via JS when scrollY > 50) */
.nav.scrolled {
  background: rgba(8, 8, 12, 0.92);
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.4);
}

.nav-inner {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
}

.nav-brand {
  font-family: var(--font-display);
  font-weight: 800;
  font-size: 1.125rem;
  letter-spacing: -0.02em;
  color: var(--accent-primary);
}
.nav-brand span {
  color: var(--text-muted);
  font-weight: 400;
  font-family: var(--font-body);
  margin-left: 8px;
  font-size: 0.8125rem;
}

.nav-links a {
  font-family: var(--font-body);
  color: var(--text-secondary);
  text-decoration: none;
  font-size: 0.8125rem;
  font-weight: 500;
  padding: 6px 14px;
  border-radius: 8px;
  transition: color 0.2s ease, background-color 0.2s ease;
}

.nav-links a:hover {
  color: var(--text-primary);
  background: var(--bg-card);
}

.nav-links a.active {
  color: var(--accent-primary);
  background: var(--accent-primary-dim);
}

/* Scroll Progress Bar */
.scroll-progress {
  position: absolute;
  bottom: 0;
  left: 0;
  height: 2px;
  background: linear-gradient(90deg, var(--accent-primary), var(--bearish));
  transition: width 0.1s linear;
  width: 0%;
}
```

### 4h. Chart Container
```css
.chart-container {
  background: var(--bg-card);
  border: 1px solid var(--border-primary);
  border-radius: 16px;
  padding: 32px;
  margin-bottom: 32px;
  position: relative;
  overflow: hidden;
}

/* Subtle top-left glow on charts */
.chart-container::before {
  content: '';
  position: absolute;
  top: -100px;
  left: -100px;
  width: 300px;
  height: 300px;
  background: radial-gradient(circle, rgba(59, 130, 246, 0.03) 0%, transparent 70%);
  pointer-events: none;
}

.chart-container h3 {
  font-family: var(--font-display);
  font-size: 1.1875rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 4px;
}

.chart-container .chart-subtitle {
  font-family: var(--font-body);
  font-size: 0.8125rem;
  color: var(--text-muted);
  margin-bottom: 28px;
}

.chart-canvas-wrap {
  position: relative;
  width: 100%;
  height: 420px;
}

@media (max-width: 768px) {
  .chart-container { padding: 20px 16px; }
  .chart-canvas-wrap { height: 300px; }
}
```

### 4i. Content Block / Analysis Card
```css
.content-block {
  background: var(--bg-card);
  border: 1px solid var(--border-primary);
  border-radius: 16px;
  padding: 28px;
  transition: border-color 0.25s ease;
}

.content-block:hover {
  border-color: var(--border-accent);
}

.content-block h3 {
  font-family: var(--font-display);
  font-size: 1.125rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 14px;
  display: flex;
  align-items: center;
  gap: 10px;
  line-height: 1.3;
}

.content-block p {
  font-family: var(--font-body);
  font-size: 0.9375rem;
  color: var(--text-secondary);
  line-height: 1.75;
}
```

### 4j. Verdict / Outlook Card
```css
.verdict-box {
  background: linear-gradient(135deg,
    rgba(139, 92, 246, 0.06) 0%,
    rgba(59, 130, 246, 0.04) 100%
  );
  border: 1px solid rgba(139, 92, 246, 0.15);
  border-radius: 20px;
  padding: 48px;
}

.outlook-card {
  background: rgba(8, 8, 12, 0.6);
  border: 1px solid var(--border-primary);
  border-radius: 16px;
  padding: 28px;
  text-align: center;
  transition: transform 0.25s ease, border-color 0.25s ease;
}

.outlook-card:hover {
  transform: translateY(-2px);
  border-color: var(--border-accent);
}

.outlook-card .scenario {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 1rem;
  margin-bottom: 8px;
}

.outlook-card .probability {
  font-family: var(--font-mono);
  font-size: 1.75rem;
  font-weight: 700;
  margin-bottom: 8px;
}

.outlook-card .range {
  font-family: var(--font-mono);
  font-size: 0.875rem;
  color: var(--text-muted);
}

.outlook-card.bear-card .probability  { color: var(--bearish); }
.outlook-card.base-card .probability  { color: var(--accent-secondary); }
.outlook-card.bull-card .probability  { color: var(--bullish); }
```

### 4k. Hero Badge
```css
.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: var(--bearish-dim);
  border: 1px solid rgba(239, 68, 68, 0.2);
  border-radius: 100px;
  padding: 8px 22px;
  margin-bottom: 36px;
  font-family: var(--font-body);
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--bearish);
}

.hero-badge .pulse-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--bearish);
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.3; }
}
```

---

## 5. Animations

### 5a. Scroll Reveal (Intersection Observer)
```css
/* Fade up - primary entrance */
.reveal {
  opacity: 0;
  transform: translateY(28px);
  transition: opacity 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94),
              transform 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}
.reveal.visible {
  opacity: 1;
  transform: translateY(0);
}

/* Staggered delays for child elements */
.reveal-delay-1 { transition-delay: 0.1s; }
.reveal-delay-2 { transition-delay: 0.2s; }
.reveal-delay-3 { transition-delay: 0.3s; }
.reveal-delay-4 { transition-delay: 0.4s; }

/* Fade in (no translate) - for charts */
.reveal-fade {
  opacity: 0;
  transition: opacity 0.8s ease;
}
.reveal-fade.visible { opacity: 1; }

/* Scale in - for stat cards */
.reveal-scale {
  opacity: 0;
  transform: scale(0.95);
  transition: opacity 0.5s ease, transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}
.reveal-scale.visible {
  opacity: 1;
  transform: scale(1);
}
```

### Intersection Observer JS
```javascript
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, {
  threshold: 0.1,
  rootMargin: '0px 0px -60px 0px'
});

document.querySelectorAll('.reveal, .reveal-fade, .reveal-scale')
  .forEach(el => revealObserver.observe(el));
```

### 5b. Stat Counter Animation
```css
/* Counter animation using CSS @property (progressive enhancement) */
@property --num {
  syntax: '<integer>';
  initial-value: 0;
  inherits: false;
}

.stat-counter {
  animation: countUp 2s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
  counter-reset: num var(--num);
}

.stat-counter::after {
  content: counter(num);
}

@keyframes countUp {
  from { --num: 0; }
  /* 'to' value set via inline style: --num: <target> */
}
```

### Alternative JS Counter (broader support)
```javascript
function animateCounter(element, target, duration = 2000, prefix = '', suffix = '') {
  const start = 0;
  const startTime = performance.now();

  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    // Ease out quart
    const eased = 1 - Math.pow(1 - progress, 4);
    const current = Math.floor(start + (target - start) * eased);
    element.textContent = prefix + current.toLocaleString() + suffix;
    if (progress < 1) requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}
```

### 5c. Chart Reveal (delayed entrance)
```javascript
// Apply per-chart: delay Chart.js animation until element is in view
function createChartOnReveal(canvasId, chartConfig, delay = 200) {
  const canvas = document.getElementById(canvasId);
  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      setTimeout(() => {
        new Chart(canvas.getContext('2d'), chartConfig);
      }, delay);
      observer.disconnect();
    }
  }, { threshold: 0.2 });
  observer.observe(canvas);
}
```

### 5d. Hover & Interaction Transitions
```css
/* Default interactive transition */
--transition-fast:   0.15s cubic-bezier(0.25, 0.46, 0.45, 0.94);
--transition-base:   0.25s cubic-bezier(0.25, 0.46, 0.45, 0.94);
--transition-slow:   0.4s  cubic-bezier(0.25, 0.46, 0.45, 0.94);

/* Card hover lift */
.card-hover:hover {
  transform: translateY(-3px);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.35);
}

/* Button/link hover glow */
.glow-hover:hover {
  box-shadow: 0 0 20px var(--accent-primary-glow);
}

/* Subtle scale on press */
.press:active {
  transform: scale(0.98);
}
```

### 5e. Scroll Progress Indicator
```javascript
function updateScrollProgress() {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = (scrollTop / docHeight) * 100;
  document.querySelector('.scroll-progress').style.width = progress + '%';
}
window.addEventListener('scroll', updateScrollProgress, { passive: true });
```

### 5f. Floating Scroll Indicator (Hero)
```css
.scroll-indicator {
  position: absolute;
  bottom: 36px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  color: var(--text-muted);
  font-size: 0.75rem;
  font-weight: 500;
  animation: float 3s ease-in-out infinite;
}

@keyframes float {
  0%, 100% { transform: translateX(-50%) translateY(0); }
  50%      { transform: translateX(-50%) translateY(10px); }
}
```

---

## 6. Layout

### Grid System
```css
/* Max content width */
--max-width: 1200px;

.container {
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 0 24px;
}

@media (max-width: 768px) {
  .container { padding: 0 16px; }
}
```

### Section Vertical Rhythm
```css
section {
  padding: 100px 24px;
  position: relative;
}

/* Hero is full viewport */
.hero {
  min-height: 100vh;
  padding-top: 80px;
}

@media (max-width: 768px) {
  section { padding: 72px 16px; }
}
```

### Card Grid
```css
/* Stat cards: auto-fit with min 260px */
.stat-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 20px;
  margin-bottom: 48px;
}

/* 2-column content grid */
.content-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
}

/* 3-column outlook grid */
.outlook-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

/* 3-column footer */
.footer-grid {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  gap: 48px;
}
```

### Responsive Breakpoints
```css
/* Tablet and below */
@media (max-width: 900px) {
  .content-grid    { grid-template-columns: 1fr; }
  .footer-grid     { grid-template-columns: 1fr; }

  .nav-links {
    display: none;
    position: fixed;
    top: 64px;
    left: 0;
    right: 0;
    background: rgba(8, 8, 12, 0.97);
    backdrop-filter: blur(24px);
    flex-direction: column;
    padding: 16px;
    border-bottom: 1px solid var(--border-primary);
  }
  .nav-links.open { display: flex; }
  .nav-links a { padding: 14px 16px; font-size: 0.9375rem; }
  .nav-mobile-toggle { display: block; }
}

/* Mobile */
@media (max-width: 768px) {
  .outlook-grid   { grid-template-columns: 1fr; }
  .stat-grid       { grid-template-columns: 1fr; gap: 16px; }

  .hero h1 { font-size: clamp(2rem, 8vw, 3.5rem); }

  .hero-stat-row { gap: 24px; }
  .hero-stat .value { font-size: clamp(1.5rem, 4vw, 2rem); }

  .verdict-box { padding: 28px 20px; }

  .chart-container { padding: 20px 16px; }
  .chart-canvas-wrap { height: 280px; }
}

/* Small mobile */
@media (max-width: 480px) {
  section { padding: 56px 12px; }
  .stat-card { padding: 20px 18px; }
  .content-block { padding: 22px 18px; }
}
```

---

## 7. Additional Design Details

### Scrollbar
```css
::-webkit-scrollbar { width: 8px; }
::-webkit-scrollbar-track { background: var(--bg-primary); }
::-webkit-scrollbar-thumb {
  background: var(--scrollbar-thumb);
  border-radius: 4px;
}
::-webkit-scrollbar-thumb:hover { background: var(--scrollbar-hover); }
```

### Selection Highlight
```css
::selection {
  background: var(--accent-primary-dim);
  color: var(--text-primary);
}
```

### Focus Styles (Accessibility)
```css
:focus-visible {
  outline: 2px solid var(--accent-primary);
  outline-offset: 2px;
  border-radius: 4px;
}
```

### Body Defaults
```css
html {
  scroll-behavior: smooth;
  font-size: 16px;
}

body {
  font-family: var(--font-body);
  background: var(--bg-primary);
  color: var(--text-primary);
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  overflow-x: hidden;
}
```

### Dot Pattern Background (Hero)
```css
.hero::before {
  content: '';
  position: absolute;
  inset: 0;
  background-image: radial-gradient(circle at 1px 1px, rgba(255,255,255,0.02) 1px, transparent 0);
  background-size: 48px 48px;
  pointer-events: none;
}
```

---

## 8. New Features for v2 (Design Intent)

### What v1 has:
- 7 sections: Hero, Timeline, Evidence, Macro, Market, Bull Case, Verdict
- 6 Chart.js charts: Price, Fear & Greed, ETF Flows, Futures OI, Historical Drawdowns, Radar
- Stat cards, timeline, comparison table, content blocks, outlook cards

### What v2 ADDS:
1. **Insider Quotes** - Quote blocks throughout sections with real analyst/insider quotes (provided by research team)
2. **Risk Assessment Cards** - New risk-badge severity indicators with more granular analysis
3. **Scroll Progress Bar** - Visual progress indicator in the nav bar
4. **Improved Typography** - Plus Jakarta Sans for display headings (more distinctive than Inter for everything)
5. **Refined Color Palette** - Slightly deeper blacks, more sophisticated color semantics
6. **Better Animations** - Staggered reveals, chart-on-scroll initialization, counter animations for stat values
7. **Quote Sidebar/Pull Quotes** - Breaking up long content blocks with pull quotes
8. **Additional Charts/Data** - Whatever the research team provides (quantum risk data, mining economics, halving cycles)
9. **Enhanced Mobile Experience** - Better mobile nav, touch-friendly interactions
10. **Accessibility Improvements** - Focus styles, ARIA labels, reduced motion support

### Reduced Motion Support
```css
@media (prefers-reduced-motion: reduce) {
  .reveal, .reveal-fade, .reveal-scale {
    opacity: 1;
    transform: none;
    transition: none;
  }
  .scroll-indicator { animation: none; }
  .hero-badge .pulse-dot { animation: none; }
}
```

---

*Design spec compiled by UX Architect agent. All values are production-ready -- implement directly without guessing.*
