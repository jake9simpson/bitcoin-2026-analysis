# Bitcoin 2026 Analysis

Analysis of Bitcoin's 52% drawdown from $126,198 to $60,062, with interactive charts, on-chain metrics, and cycle comparisons.

Live at **https://bitcoin-2026-analysis.vercel.app**

## Structure

```
website/index.html   # Self-contained page (inline CSS + JS)
research/            # 13 markdown files covering cycle, macro, and institutional analysis
```

The site is a single HTML file. No build step, no framework, no dependencies to install. Chart.js, ApexCharts, and TradingView Lightweight Charts load from CDNs.

## What's in it

- Interactive price and drawdown charts
- On-chain metrics (MVRV, SOPR, exchange flows)
- Historical cycle comparisons (2018, 2022, current)
- Institutional positioning and insider quotes
- Risk assessment framework

## Deploy

Static deployment on Vercel. `vercel.json` handles the config (serves from `website/`, no build step).

To run locally, open `website/index.html` in a browser or serve it however you like:

```bash
npx serve website
```

## Research

The `research/` directory has the source material: cycle analysis, macro conditions, institutional flows, technical indicators, and more. Thirteen files total, all markdown.

## Design

Dark theme with Bitcoin orange (#F7931A) accents. Responsive layout. Charts are interactive on desktop and degrade gracefully on mobile.
