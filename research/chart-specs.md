# Advanced Chart.js Configuration Specs for BTC v2

## Dependencies

```html
<script src="https://cdn.jsdelivr.net/npm/chart.js@4"></script>
<script src="https://cdn.jsdelivr.net/npm/chartjs-plugin-annotation@3"></script>
<script src="https://cdn.jsdelivr.net/npm/chartjs-plugin-datalabels@2"></script>
<script src="https://cdn.jsdelivr.net/npm/chartjs-chart-matrix@2"></script>
```

Register plugins globally:
```javascript
Chart.register(ChartjsPluginAnnotation);
// Only register datalabels on charts that need it (avoid global to prevent labels on every chart)
```

## Shared Utilities

### Color Palette (Dark Theme)

```javascript
const COLORS = {
  bg: '#0a0e17',
  cardBg: '#111827',
  gridLines: 'rgba(255, 255, 255, 0.06)',
  text: '#94a3b8',
  textBright: '#e2e8f0',
  accent: '#f7931a',       // BTC orange
  green: '#10b981',
  red: '#ef4444',
  blue: '#3b82f6',
  purple: '#8b5cf6',
  yellow: '#eab308',
  cyan: '#06b6d4',
  pink: '#ec4899',
  // Cycle colors
  cycle1: '#ef4444',       // 2011
  cycle2: '#f97316',       // 2013-2014
  cycle3: '#3b82f6',       // 2017-2018
  cycle4: '#8b5cf6',       // 2020-2021
  cycle5: '#10b981',       // 2024-2025 (current)
  // Risk gradient (0 = green, 1 = red)
  riskGradient: [
    { stop: 0.0, color: '#10b981' },
    { stop: 0.2, color: '#22c55e' },
    { stop: 0.4, color: '#eab308' },
    { stop: 0.6, color: '#f97316' },
    { stop: 0.8, color: '#ef4444' },
    { stop: 1.0, color: '#dc2626' },
  ],
  // Rainbow bands (for log regression chart)
  rainbow: [
    'rgba(130, 0, 255, 0.25)',    // violet - deep value
    'rgba(0, 100, 255, 0.25)',    // blue
    'rgba(0, 200, 200, 0.25)',    // cyan
    'rgba(0, 200, 0, 0.25)',      // green
    'rgba(200, 200, 0, 0.25)',    // yellow
    'rgba(255, 150, 0, 0.25)',    // orange
    'rgba(255, 50, 0, 0.25)',     // red-orange
    'rgba(255, 0, 0, 0.25)',      // red - bubble territory
  ],
};
```

### Shared Chart Defaults

```javascript
const SHARED_DEFAULTS = {
  responsive: true,
  maintainAspectRatio: false,
  animation: {
    duration: 800,
    easing: 'easeInOutQuart',
  },
  layout: {
    padding: { top: 10, right: 20, bottom: 10, left: 10 },
  },
  plugins: {
    legend: {
      display: true,
      position: 'top',
      labels: {
        color: COLORS.text,
        font: { family: "'Inter', sans-serif", size: 11 },
        padding: 16,
        usePointStyle: true,
        pointStyleWidth: 8,
      },
    },
    tooltip: {
      backgroundColor: 'rgba(15, 23, 42, 0.95)',
      titleColor: COLORS.textBright,
      bodyColor: COLORS.text,
      borderColor: 'rgba(255, 255, 255, 0.1)',
      borderWidth: 1,
      cornerRadius: 8,
      padding: 12,
      titleFont: { family: "'Inter', sans-serif", size: 13, weight: '600' },
      bodyFont: { family: "'JetBrains Mono', monospace", size: 12 },
      displayColors: true,
      boxWidth: 8,
      boxHeight: 8,
      boxPadding: 4,
    },
  },
  scales: {
    x: {
      grid: { color: COLORS.gridLines, drawBorder: false },
      ticks: {
        color: COLORS.text,
        font: { family: "'Inter', sans-serif", size: 10 },
      },
    },
    y: {
      grid: { color: COLORS.gridLines, drawBorder: false },
      ticks: {
        color: COLORS.text,
        font: { family: "'JetBrains Mono', monospace", size: 10 },
      },
    },
  },
};
```

### Helper: Currency Formatter

```javascript
function formatUSD(value) {
  if (value >= 1e6) return '$' + (value / 1e6).toFixed(1) + 'M';
  if (value >= 1e3) return '$' + (value / 1e3).toFixed(1) + 'K';
  return '$' + value.toFixed(0);
}

function formatBTC(value) {
  return '$' + value.toLocaleString('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
}
```

### Helper: Logarithmic Regression

```javascript
/**
 * Calculate logarithmic regression: log10(price) = a * log10(daysSinceGenesis) + b
 * This is a power law fit in log-log space.
 * @param {Array<{x: number, y: number}>} data - x = days since genesis, y = price
 * @returns {{ a: number, b: number, predict: (x: number) => number }}
 */
function logRegression(data) {
  const n = data.length;
  let sumX = 0, sumY = 0, sumXY = 0, sumX2 = 0;

  for (const point of data) {
    if (point.x <= 0 || point.y <= 0) continue;
    const lx = Math.log10(point.x);
    const ly = Math.log10(point.y);
    sumX += lx;
    sumY += ly;
    sumXY += lx * ly;
    sumX2 += lx * lx;
  }

  const a = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
  const b = (sumY - a * sumX) / n;

  return {
    a,
    b,
    predict: (x) => Math.pow(10, a * Math.log10(x) + b),
  };
}

/**
 * Generate rainbow band lines from log regression.
 * Each band is offset by a standard deviation multiple.
 * @param {object} regression - from logRegression()
 * @param {number} stdDev - standard deviation of residuals in log10 space
 * @param {number[]} xValues - days-since-genesis values to plot
 * @returns {Array<Array<{x: number, y: number}>>} - array of band datasets
 */
function generateRainbowBands(regression, stdDev, xValues) {
  const offsets = [-2, -1.5, -1, -0.5, 0, 0.5, 1, 1.5, 2];
  return offsets.map(mult => {
    return xValues.map(x => ({
      x,
      y: Math.pow(10, regression.a * Math.log10(x) + regression.b + mult * stdDev),
    }));
  });
}

/** Days from BTC genesis block (2009-01-03) to a given date */
function daysSinceGenesis(date) {
  const genesis = new Date('2009-01-03');
  return Math.floor((date - genesis) / (1000 * 60 * 60 * 24));
}
```

### Helper: Normalize Cycle Data (for ROI comparison)

```javascript
/**
 * Normalize price data from cycle bottom = 1.
 * @param {Array<{date: Date, price: number}>} data
 * @param {Date} bottomDate
 * @returns {Array<{daysSinceBottom: number, roi: number}>}
 */
function normalizeCycleFromBottom(data, bottomDate) {
  const bottomPrice = data.find(d =>
    d.date.toDateString() === bottomDate.toDateString()
  )?.price || data[0].price;

  return data
    .filter(d => d.date >= bottomDate)
    .map(d => ({
      daysSinceBottom: Math.floor((d.date - bottomDate) / (1000 * 60 * 60 * 24)),
      roi: d.price / bottomPrice,
    }));
}
```

### Helper: Segment Color by Value (for gradient lines)

```javascript
/**
 * Create a segment color function for risk-gradient lines.
 * The line changes color based on the y-value.
 */
function riskSegmentColor(ctx) {
  const value = ctx.p1.parsed.y;
  if (value >= 0.8) return '#dc2626';
  if (value >= 0.6) return '#ef4444';
  if (value >= 0.4) return '#f97316';
  if (value >= 0.2) return '#eab308';
  return '#10b981';
}
```

---

## Chart 1: Bear Market Drawdown Overlay

Multiple bear market cycles overlaid on a single chart, showing percentage drawdown from ATH over time (days from peak).

```javascript
const bearMarketDrawdownConfig = {
  type: 'line',
  data: {
    // X-axis: days since cycle peak (0 = ATH)
    // Each dataset = one bear market cycle
    datasets: [
      {
        label: '2011 Cycle',
        data: [], // [{x: 0, y: 0}, {x: 30, y: -0.45}, ...]  (y = drawdown fraction, e.g. -0.85)
        borderColor: COLORS.cycle1,
        backgroundColor: 'transparent',
        borderWidth: 2,
        pointRadius: 0,
        tension: 0.3,
      },
      {
        label: '2013-2015 Cycle',
        data: [], // same format
        borderColor: COLORS.cycle2,
        backgroundColor: 'transparent',
        borderWidth: 2,
        pointRadius: 0,
        tension: 0.3,
      },
      {
        label: '2017-2018 Cycle',
        data: [],
        borderColor: COLORS.cycle3,
        backgroundColor: 'transparent',
        borderWidth: 2,
        pointRadius: 0,
        tension: 0.3,
      },
      {
        label: '2021-2022 Cycle',
        data: [],
        borderColor: COLORS.cycle4,
        backgroundColor: 'transparent',
        borderWidth: 2,
        pointRadius: 0,
        tension: 0.3,
      },
      {
        label: '2024-2025 (Current)',
        data: [],
        borderColor: COLORS.cycle5,
        backgroundColor: 'transparent',
        borderWidth: 3, // thicker for current
        pointRadius: 0,
        tension: 0.3,
        borderDash: [], // solid for current
      },
    ],
  },
  options: {
    ...SHARED_DEFAULTS,
    plugins: {
      ...SHARED_DEFAULTS.plugins,
      title: {
        display: true,
        text: 'Bear Market Drawdown Comparison',
        color: COLORS.textBright,
        font: { size: 16, weight: '600', family: "'Inter', sans-serif" },
      },
      tooltip: {
        ...SHARED_DEFAULTS.plugins.tooltip,
        callbacks: {
          title: (items) => `Day ${items[0].parsed.x} from Peak`,
          label: (item) => `${item.dataset.label}: ${(item.parsed.y * 100).toFixed(1)}%`,
        },
      },
      annotation: {
        annotations: {
          zeroLine: {
            type: 'line',
            yMin: 0,
            yMax: 0,
            borderColor: 'rgba(255, 255, 255, 0.3)',
            borderWidth: 1,
            borderDash: [4, 4],
          },
          seventyFiveDrawdown: {
            type: 'line',
            yMin: -0.75,
            yMax: -0.75,
            borderColor: 'rgba(239, 68, 68, 0.3)',
            borderWidth: 1,
            borderDash: [6, 4],
            label: {
              display: true,
              content: '-75%',
              position: 'start',
              color: COLORS.red,
              font: { size: 10 },
            },
          },
        },
      },
    },
    scales: {
      x: {
        ...SHARED_DEFAULTS.scales.x,
        type: 'linear',
        title: {
          display: true,
          text: 'Days from All-Time High',
          color: COLORS.text,
        },
        min: 0,
        max: 1200,
      },
      y: {
        ...SHARED_DEFAULTS.scales.y,
        title: {
          display: true,
          text: 'Drawdown from ATH',
          color: COLORS.text,
        },
        min: -1,
        max: 0.1,
        ticks: {
          ...SHARED_DEFAULTS.scales.y.ticks,
          callback: (value) => (value * 100).toFixed(0) + '%',
        },
      },
    },
  },
};
```

**Data shape:** Each dataset point is `{ x: daysSincePeak, y: drawdownFraction }` where drawdown is negative (e.g. -0.84 for -84%).

**Cycle peak dates for reference:**
- 2011: June 8, 2011 ($31.91)
- 2013: Nov 29, 2013 ($1,132)
- 2017: Dec 17, 2017 ($19,783)
- 2021: Nov 10, 2021 ($68,789)

---

## Chart 2: Log Regression Rainbow Chart

The signature Benjamin Cowen chart. BTC price on log scale with colored rainbow bands derived from log regression standard deviations.

```javascript
const logRegressionRainbowConfig = {
  type: 'line',
  data: {
    // datasets[0] = actual BTC price
    // datasets[1..9] = rainbow band lines (from lowest to highest)
    datasets: [
      {
        label: 'BTC Price',
        data: [], // [{x: daysSinceGenesis, y: price}, ...]
        borderColor: COLORS.accent,
        backgroundColor: 'transparent',
        borderWidth: 2,
        pointRadius: 0,
        tension: 0.1,
        order: 0, // draw on top
      },
      // Rainbow bands - generated programmatically:
      // Band 0 (-2 std dev): deep value / fire sale
      // Band 1 (-1.5 std dev)
      // Band 2 (-1 std dev): accumulation zone
      // Band 3 (-0.5 std dev)
      // Band 4 (0 / fair value)
      // Band 5 (+0.5 std dev)
      // Band 6 (+1 std dev): getting expensive
      // Band 7 (+1.5 std dev)
      // Band 8 (+2 std dev): bubble territory
      ...generateRainbowBandDatasets(),
    ],
  },
  options: {
    ...SHARED_DEFAULTS,
    plugins: {
      ...SHARED_DEFAULTS.plugins,
      title: {
        display: true,
        text: 'Bitcoin Logarithmic Regression Rainbow',
        color: COLORS.textBright,
        font: { size: 16, weight: '600', family: "'Inter', sans-serif" },
      },
      tooltip: {
        ...SHARED_DEFAULTS.plugins.tooltip,
        filter: (item) => item.datasetIndex === 0, // only tooltip on price line
        callbacks: {
          label: (item) => `Price: ${formatBTC(item.parsed.y)}`,
        },
      },
      legend: {
        display: false, // too many bands; use custom legend
      },
    },
    scales: {
      x: {
        ...SHARED_DEFAULTS.scales.x,
        type: 'linear',
        title: { display: true, text: 'Days Since Genesis Block', color: COLORS.text },
        ticks: {
          ...SHARED_DEFAULTS.scales.x.ticks,
          callback: function(value) {
            // Convert days to approximate year
            const year = 2009 + value / 365.25;
            return year.toFixed(0);
          },
        },
      },
      y: {
        ...SHARED_DEFAULTS.scales.y,
        type: 'logarithmic',
        title: { display: true, text: 'Price (USD, Log Scale)', color: COLORS.text },
        min: 0.01,
        ticks: {
          ...SHARED_DEFAULTS.scales.y.ticks,
          callback: (value) => formatUSD(value),
        },
      },
    },
  },
};

/** Generate the 9 rainbow band datasets with fill between adjacent bands */
function generateRainbowBandDatasets() {
  const bandLabels = [
    'Fire Sale (-2\u03c3)', '', 'Accumulation (-1\u03c3)', '',
    'Fair Value', '',
    'Expensive (+1\u03c3)', '', 'Bubble (+2\u03c3)',
  ];
  const bandColors = [
    'rgba(130, 0, 255, 0.6)',   // violet
    'rgba(70, 0, 255, 0.5)',
    'rgba(0, 100, 255, 0.5)',   // blue
    'rgba(0, 180, 200, 0.4)',
    'rgba(0, 200, 0, 0.4)',     // green (fair value)
    'rgba(180, 200, 0, 0.4)',
    'rgba(255, 180, 0, 0.4)',   // orange
    'rgba(255, 100, 0, 0.4)',
    'rgba(255, 0, 0, 0.5)',     // red
  ];

  // NOTE: Fill between bands using Chart.js fill property
  // fill: '+1' fills to the next dataset, fill: '-1' fills to the previous
  return bandColors.map((color, i) => ({
    label: bandLabels[i] || `Band ${i}`,
    data: [], // populated by generateRainbowBands()
    borderColor: color.replace(/[\d.]+\)$/, '0.8)'),
    backgroundColor: color,
    borderWidth: 1,
    pointRadius: 0,
    tension: 0.4,
    fill: i < bandColors.length - 1 ? '+1' : false, // fill to next band
    order: 10 + i, // draw behind price line
  }));
}
```

**How to populate data:**
```javascript
// 1. Fetch historical BTC data as [{date, price}]
// 2. Convert to log regression format
const regressionData = historicalData.map(d => ({
  x: daysSinceGenesis(d.date),
  y: d.price,
}));

// 3. Compute regression
const reg = logRegression(regressionData);

// 4. Compute standard deviation of residuals in log10 space
const residuals = regressionData.map(d =>
  Math.log10(d.y) - (reg.a * Math.log10(d.x) + reg.b)
);
const stdDev = Math.sqrt(
  residuals.reduce((s, r) => s + r * r, 0) / residuals.length
);

// 5. Generate band data
const xValues = Array.from({length: 200}, (_, i) => 100 + i * 30); // sample points
const bands = generateRainbowBands(reg, stdDev, xValues);

// 6. Assign to datasets
bands.forEach((bandData, i) => {
  chart.data.datasets[i + 1].data = bandData;
});
chart.data.datasets[0].data = regressionData;
chart.update();
```

---

## Chart 3: Risk Metric Timeline

A line chart where the line itself changes color based on the risk value (0-1). Uses Chart.js segment styling.

```javascript
const riskMetricConfig = {
  type: 'line',
  data: {
    labels: [], // date strings
    datasets: [
      {
        label: 'Risk Metric',
        data: [], // values 0 to 1
        borderWidth: 3,
        pointRadius: 0,
        tension: 0.3,
        fill: {
          target: 'origin',
          above: 'rgba(239, 68, 68, 0.08)',
        },
        // Segment-level color: each segment gets colored by risk value
        segment: {
          borderColor: (ctx) => riskSegmentColor(ctx),
        },
        borderColor: COLORS.accent, // fallback
      },
    ],
  },
  options: {
    ...SHARED_DEFAULTS,
    plugins: {
      ...SHARED_DEFAULTS.plugins,
      title: {
        display: true,
        text: 'Bitcoin Risk Metric',
        color: COLORS.textBright,
        font: { size: 16, weight: '600', family: "'Inter', sans-serif" },
      },
      tooltip: {
        ...SHARED_DEFAULTS.plugins.tooltip,
        callbacks: {
          label: (item) => {
            const val = item.parsed.y;
            let zone = 'Low Risk';
            if (val >= 0.8) zone = 'Extreme Risk';
            else if (val >= 0.6) zone = 'High Risk';
            else if (val >= 0.4) zone = 'Moderate';
            else if (val >= 0.2) zone = 'Low Risk';
            else zone = 'Accumulate';
            return `Risk: ${val.toFixed(3)} (${zone})`;
          },
        },
      },
      annotation: {
        annotations: {
          dangerZone: {
            type: 'box',
            yMin: 0.8,
            yMax: 1.0,
            backgroundColor: 'rgba(239, 68, 68, 0.08)',
            borderWidth: 0,
            label: {
              display: true,
              content: 'Danger Zone',
              position: { x: 'start', y: 'center' },
              color: 'rgba(239, 68, 68, 0.5)',
              font: { size: 10 },
            },
          },
          accumulationZone: {
            type: 'box',
            yMin: 0,
            yMax: 0.2,
            backgroundColor: 'rgba(16, 185, 129, 0.06)',
            borderWidth: 0,
            label: {
              display: true,
              content: 'Accumulation Zone',
              position: { x: 'start', y: 'center' },
              color: 'rgba(16, 185, 129, 0.5)',
              font: { size: 10 },
            },
          },
        },
      },
    },
    scales: {
      x: {
        ...SHARED_DEFAULTS.scales.x,
        type: 'time',
        time: { unit: 'year' },
      },
      y: {
        ...SHARED_DEFAULTS.scales.y,
        min: 0,
        max: 1,
        ticks: {
          ...SHARED_DEFAULTS.scales.y.ticks,
          stepSize: 0.2,
          callback: (value) => value.toFixed(1),
        },
        title: {
          display: true,
          text: 'Risk Score',
          color: COLORS.text,
        },
      },
    },
  },
};
```

---

## Chart 4: Bottoming Indicators Panel (Small Multiples Grid)

A grid of small indicator charts, each in its own canvas. Use a container div with CSS grid and create one Chart.js instance per indicator.

### Container Layout

```html
<div class="bottoming-grid" style="
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
">
  <div class="indicator-cell">
    <canvas id="indicator-mvrv"></canvas>
  </div>
  <div class="indicator-cell">
    <canvas id="indicator-nupl"></canvas>
  </div>
  <div class="indicator-cell">
    <canvas id="indicator-puell"></canvas>
  </div>
  <div class="indicator-cell">
    <canvas id="indicator-rhodl"></canvas>
  </div>
  <div class="indicator-cell">
    <canvas id="indicator-sopr"></canvas>
  </div>
  <div class="indicator-cell">
    <canvas id="indicator-reserve-risk"></canvas>
  </div>
</div>
```

### Factory Function for Each Small Chart

```javascript
/**
 * Create a small bottoming indicator chart.
 * @param {string} canvasId
 * @param {string} title
 * @param {Array} data - [{x: date, y: value}]
 * @param {{ greenBelow: number, redAbove: number }} thresholds
 * @param {string} color
 */
function createBottomingIndicator(canvasId, title, data, thresholds, color) {
  const ctx = document.getElementById(canvasId).getContext('2d');

  return new Chart(ctx, {
    type: 'line',
    data: {
      datasets: [{
        label: title,
        data: data,
        borderColor: color,
        backgroundColor: 'transparent',
        borderWidth: 1.5,
        pointRadius: 0,
        tension: 0.3,
        segment: {
          borderColor: (ctx) => {
            const val = ctx.p1.parsed.y;
            if (val <= thresholds.greenBelow) return COLORS.green;
            if (val >= thresholds.redAbove) return COLORS.red;
            return color;
          },
        },
      }],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      animation: { duration: 600 },
      plugins: {
        legend: { display: false },
        title: {
          display: true,
          text: title,
          color: COLORS.textBright,
          font: { size: 12, weight: '600', family: "'Inter', sans-serif" },
          padding: { bottom: 8 },
        },
        tooltip: {
          ...SHARED_DEFAULTS.plugins.tooltip,
          callbacks: {
            label: (item) => `${title}: ${item.parsed.y.toFixed(3)}`,
          },
        },
        annotation: {
          annotations: {
            greenZone: {
              type: 'box',
              yMax: thresholds.greenBelow,
              backgroundColor: 'rgba(16, 185, 129, 0.08)',
              borderWidth: 0,
            },
            redZone: {
              type: 'box',
              yMin: thresholds.redAbove,
              backgroundColor: 'rgba(239, 68, 68, 0.08)',
              borderWidth: 0,
            },
            greenLine: {
              type: 'line',
              yMin: thresholds.greenBelow,
              yMax: thresholds.greenBelow,
              borderColor: 'rgba(16, 185, 129, 0.4)',
              borderWidth: 1,
              borderDash: [4, 4],
            },
            redLine: {
              type: 'line',
              yMin: thresholds.redAbove,
              yMax: thresholds.redAbove,
              borderColor: 'rgba(239, 68, 68, 0.4)',
              borderWidth: 1,
              borderDash: [4, 4],
            },
          },
        },
      },
      scales: {
        x: {
          type: 'time',
          time: { unit: 'year' },
          grid: { display: false },
          ticks: { color: COLORS.text, font: { size: 9 }, maxTicksLimit: 5 },
        },
        y: {
          grid: { color: COLORS.gridLines },
          ticks: { color: COLORS.text, font: { size: 9 }, maxTicksLimit: 5 },
        },
      },
    },
  });
}
```

### Usage

```javascript
// Example: create all 6 indicators
const indicators = [
  { id: 'indicator-mvrv', title: 'MVRV Z-Score', thresholds: { greenBelow: 0.1, redAbove: 7 }, color: COLORS.blue },
  { id: 'indicator-nupl', title: 'NUPL', thresholds: { greenBelow: 0, redAbove: 0.75 }, color: COLORS.purple },
  { id: 'indicator-puell', title: 'Puell Multiple', thresholds: { greenBelow: 0.5, redAbove: 4 }, color: COLORS.cyan },
  { id: 'indicator-rhodl', title: 'RHODL Ratio', thresholds: { greenBelow: 350, redAbove: 50000 }, color: COLORS.yellow },
  { id: 'indicator-sopr', title: 'aSOPR', thresholds: { greenBelow: 0.98, redAbove: 1.08 }, color: COLORS.pink },
  { id: 'indicator-reserve-risk', title: 'Reserve Risk', thresholds: { greenBelow: 0.002, redAbove: 0.02 }, color: COLORS.accent },
];

indicators.forEach(ind => {
  createBottomingIndicator(ind.id, ind.title, fetchedData[ind.id], ind.thresholds, ind.color);
});
```

---

## Chart 5: NUPL Zone Chart

Net Unrealized Profit/Loss with background zones colored by sentiment bands.

```javascript
const nuplZoneConfig = {
  type: 'line',
  data: {
    datasets: [{
      label: 'NUPL',
      data: [], // [{x: date, y: nuplValue}]
      borderColor: COLORS.textBright,
      backgroundColor: 'transparent',
      borderWidth: 2,
      pointRadius: 0,
      tension: 0.3,
    }],
  },
  options: {
    ...SHARED_DEFAULTS,
    plugins: {
      ...SHARED_DEFAULTS.plugins,
      title: {
        display: true,
        text: 'Net Unrealized Profit/Loss (NUPL)',
        color: COLORS.textBright,
        font: { size: 16, weight: '600', family: "'Inter', sans-serif" },
      },
      tooltip: {
        ...SHARED_DEFAULTS.plugins.tooltip,
        callbacks: {
          label: (item) => {
            const val = item.parsed.y;
            let zone;
            if (val < 0) zone = 'Capitulation';
            else if (val < 0.25) zone = 'Hope / Fear';
            else if (val < 0.5) zone = 'Optimism / Anxiety';
            else if (val < 0.75) zone = 'Belief / Denial';
            else zone = 'Euphoria / Greed';
            return `NUPL: ${val.toFixed(3)} (${zone})`;
          },
        },
      },
      annotation: {
        annotations: {
          capitulation: {
            type: 'box',
            yMin: -0.5,
            yMax: 0,
            backgroundColor: 'rgba(239, 68, 68, 0.12)',
            borderWidth: 0,
            label: {
              display: true,
              content: 'Capitulation',
              position: { x: 'start', y: 'center' },
              color: 'rgba(239, 68, 68, 0.6)',
              font: { size: 10, weight: '600' },
            },
          },
          hopeFear: {
            type: 'box',
            yMin: 0,
            yMax: 0.25,
            backgroundColor: 'rgba(249, 115, 22, 0.10)',
            borderWidth: 0,
            label: {
              display: true,
              content: 'Hope / Fear',
              position: { x: 'start', y: 'center' },
              color: 'rgba(249, 115, 22, 0.6)',
              font: { size: 10, weight: '600' },
            },
          },
          optimism: {
            type: 'box',
            yMin: 0.25,
            yMax: 0.5,
            backgroundColor: 'rgba(234, 179, 8, 0.08)',
            borderWidth: 0,
            label: {
              display: true,
              content: 'Optimism',
              position: { x: 'start', y: 'center' },
              color: 'rgba(234, 179, 8, 0.6)',
              font: { size: 10, weight: '600' },
            },
          },
          belief: {
            type: 'box',
            yMin: 0.5,
            yMax: 0.75,
            backgroundColor: 'rgba(16, 185, 129, 0.08)',
            borderWidth: 0,
            label: {
              display: true,
              content: 'Belief',
              position: { x: 'start', y: 'center' },
              color: 'rgba(16, 185, 129, 0.6)',
              font: { size: 10, weight: '600' },
            },
          },
          euphoria: {
            type: 'box',
            yMin: 0.75,
            yMax: 1.0,
            backgroundColor: 'rgba(59, 130, 246, 0.08)',
            borderWidth: 0,
            label: {
              display: true,
              content: 'Euphoria / Greed',
              position: { x: 'start', y: 'center' },
              color: 'rgba(59, 130, 246, 0.6)',
              font: { size: 10, weight: '600' },
            },
          },
        },
      },
    },
    scales: {
      x: {
        ...SHARED_DEFAULTS.scales.x,
        type: 'time',
        time: { unit: 'year' },
      },
      y: {
        ...SHARED_DEFAULTS.scales.y,
        min: -0.5,
        max: 1.0,
        ticks: {
          ...SHARED_DEFAULTS.scales.y.ticks,
          stepSize: 0.25,
          callback: (value) => value.toFixed(2),
        },
        title: { display: true, text: 'NUPL', color: COLORS.text },
      },
    },
  },
};
```

---

## Chart 6: Correlation Heatmap

Uses `chartjs-chart-matrix` plugin for a grid-based correlation matrix.

```javascript
/**
 * Generate heatmap data from a correlation matrix.
 * @param {string[]} labels - metric names
 * @param {number[][]} matrix - NxN correlation values (-1 to 1)
 * @returns {Array<{x: string, y: string, v: number}>}
 */
function correlationToMatrixData(labels, matrix) {
  const data = [];
  for (let i = 0; i < labels.length; i++) {
    for (let j = 0; j < labels.length; j++) {
      data.push({
        x: labels[j],
        y: labels[i],
        v: matrix[i][j],
      });
    }
  }
  return data;
}

/**
 * Map correlation value (-1 to 1) to a color.
 * -1 = deep blue, 0 = neutral gray, +1 = deep red
 */
function correlationColor(value) {
  if (value >= 0) {
    const intensity = Math.min(value, 1);
    const r = Math.round(34 + intensity * (239 - 34));
    const g = Math.round(50 + intensity * (68 - 50));
    const b = Math.round(70 + intensity * (68 - 70));
    return `rgba(${r}, ${g}, ${b}, ${0.3 + intensity * 0.6})`;
  } else {
    const intensity = Math.min(Math.abs(value), 1);
    const r = Math.round(34 + intensity * (59 - 34));
    const g = Math.round(50 + intensity * (130 - 50));
    const b = Math.round(70 + intensity * (246 - 70));
    return `rgba(${r}, ${g}, ${b}, ${0.3 + intensity * 0.6})`;
  }
}

const correlationLabels = [
  'BTC Price', 'S&P 500', 'Gold', 'DXY', 'M2 Supply',
  'Hash Rate', 'Active Addr', 'MVRV', 'NUPL', 'Puell',
];

const correlationHeatmapConfig = {
  type: 'matrix',
  data: {
    datasets: [{
      label: 'Correlation',
      // data populated by correlationToMatrixData()
      data: [],
      backgroundColor: (ctx) => {
        const value = ctx.dataset.data[ctx.dataIndex]?.v ?? 0;
        return correlationColor(value);
      },
      borderColor: COLORS.cardBg,
      borderWidth: 2,
      width: ({ chart }) => (chart.chartArea || {}).width / correlationLabels.length - 2,
      height: ({ chart }) => (chart.chartArea || {}).height / correlationLabels.length - 2,
    }],
  },
  options: {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: { display: false },
      title: {
        display: true,
        text: 'Asset & Metric Correlation Matrix',
        color: COLORS.textBright,
        font: { size: 16, weight: '600', family: "'Inter', sans-serif" },
      },
      tooltip: {
        ...SHARED_DEFAULTS.plugins.tooltip,
        callbacks: {
          title: () => '',
          label: (ctx) => {
            const d = ctx.dataset.data[ctx.dataIndex];
            return `${d.y} vs ${d.x}: ${d.v.toFixed(3)}`;
          },
        },
      },
      datalabels: {
        display: true,
        color: (ctx) => {
          const v = Math.abs(ctx.dataset.data[ctx.dataIndex]?.v ?? 0);
          return v > 0.5 ? '#ffffff' : COLORS.text;
        },
        font: { size: 10, weight: 'bold', family: "'JetBrains Mono', monospace" },
        formatter: (value, ctx) => {
          return ctx.dataset.data[ctx.dataIndex]?.v.toFixed(2);
        },
      },
    },
    scales: {
      x: {
        type: 'category',
        labels: correlationLabels,
        offset: true,
        grid: { display: false },
        ticks: {
          color: COLORS.text,
          font: { size: 9, family: "'Inter', sans-serif" },
          maxRotation: 45,
        },
      },
      y: {
        type: 'category',
        labels: correlationLabels,
        offset: true,
        grid: { display: false },
        ticks: {
          color: COLORS.text,
          font: { size: 9, family: "'Inter', sans-serif" },
        },
      },
    },
  },
  plugins: [ChartDataLabels], // register datalabels only for this chart
};
```

---

## Chart 7: Cycle ROI Comparison

Normalized returns from each cycle's bottom, overlaid on one chart with log Y-axis.

```javascript
const cycleROIConfig = {
  type: 'line',
  data: {
    datasets: [
      {
        label: '2011 Bottom (Nov 2011)',
        data: [], // [{x: daysSinceBottom, y: roi}] where roi = price/bottomPrice
        borderColor: COLORS.cycle1,
        backgroundColor: 'transparent',
        borderWidth: 2,
        pointRadius: 0,
        tension: 0.2,
      },
      {
        label: '2015 Bottom (Jan 2015)',
        data: [],
        borderColor: COLORS.cycle2,
        backgroundColor: 'transparent',
        borderWidth: 2,
        pointRadius: 0,
        tension: 0.2,
      },
      {
        label: '2018 Bottom (Dec 2018)',
        data: [],
        borderColor: COLORS.cycle3,
        backgroundColor: 'transparent',
        borderWidth: 2,
        pointRadius: 0,
        tension: 0.2,
      },
      {
        label: '2022 Bottom (Nov 2022)',
        data: [],
        borderColor: COLORS.cycle4,
        backgroundColor: 'transparent',
        borderWidth: 2,
        pointRadius: 0,
        tension: 0.2,
      },
      {
        label: '2024-Present',
        data: [],
        borderColor: COLORS.cycle5,
        backgroundColor: 'transparent',
        borderWidth: 3,
        pointRadius: 0,
        tension: 0.2,
      },
    ],
  },
  options: {
    ...SHARED_DEFAULTS,
    plugins: {
      ...SHARED_DEFAULTS.plugins,
      title: {
        display: true,
        text: 'Cycle ROI Comparison (Normalized from Bottom)',
        color: COLORS.textBright,
        font: { size: 16, weight: '600', family: "'Inter', sans-serif" },
      },
      tooltip: {
        ...SHARED_DEFAULTS.plugins.tooltip,
        callbacks: {
          title: (items) => `Day ${items[0].parsed.x} from Bottom`,
          label: (item) => `${item.dataset.label}: ${item.parsed.y.toFixed(1)}x`,
        },
      },
      annotation: {
        annotations: {
          breakeven: {
            type: 'line',
            yMin: 1,
            yMax: 1,
            borderColor: 'rgba(255, 255, 255, 0.2)',
            borderWidth: 1,
            borderDash: [4, 4],
            label: {
              display: true,
              content: '1x (Break Even)',
              position: 'start',
              color: COLORS.text,
              font: { size: 9 },
            },
          },
          tenX: {
            type: 'line',
            yMin: 10,
            yMax: 10,
            borderColor: 'rgba(16, 185, 129, 0.2)',
            borderWidth: 1,
            borderDash: [4, 4],
            label: {
              display: true,
              content: '10x',
              position: 'start',
              color: COLORS.green,
              font: { size: 9 },
            },
          },
          hundredX: {
            type: 'line',
            yMin: 100,
            yMax: 100,
            borderColor: 'rgba(234, 179, 8, 0.2)',
            borderWidth: 1,
            borderDash: [4, 4],
            label: {
              display: true,
              content: '100x',
              position: 'start',
              color: COLORS.yellow,
              font: { size: 9 },
            },
          },
        },
      },
    },
    scales: {
      x: {
        ...SHARED_DEFAULTS.scales.x,
        type: 'linear',
        title: { display: true, text: 'Days Since Cycle Bottom', color: COLORS.text },
        min: 0,
        max: 1500,
      },
      y: {
        ...SHARED_DEFAULTS.scales.y,
        type: 'logarithmic',
        title: { display: true, text: 'ROI Multiple (Log Scale)', color: COLORS.text },
        min: 0.5,
        ticks: {
          ...SHARED_DEFAULTS.scales.y.ticks,
          callback: (value) => value + 'x',
        },
      },
    },
  },
};

// Cycle bottom dates for data normalization
const CYCLE_BOTTOMS = [
  { label: '2011', date: new Date('2011-11-18'), price: 2.01 },
  { label: '2015', date: new Date('2015-01-14'), price: 152.40 },
  { label: '2018', date: new Date('2018-12-15'), price: 3122 },
  { label: '2022', date: new Date('2022-11-21'), price: 15460 },
];
```

---

## Chart 8: BTC Dominance Chart

Area chart showing BTC's share of total crypto market cap over time.

```javascript
const btcDominanceConfig = {
  type: 'line',
  data: {
    datasets: [
      {
        label: 'BTC Dominance',
        data: [], // [{x: date, y: dominancePercent}]
        borderColor: COLORS.accent,
        backgroundColor: (ctx) => {
          const chart = ctx.chart;
          const { ctx: canvasCtx, chartArea } = chart;
          if (!chartArea) return 'rgba(247, 147, 26, 0.15)';
          const gradient = canvasCtx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
          gradient.addColorStop(0, 'rgba(247, 147, 26, 0.25)');
          gradient.addColorStop(1, 'rgba(247, 147, 26, 0.02)');
          return gradient;
        },
        borderWidth: 2,
        pointRadius: 0,
        tension: 0.3,
        fill: 'origin',
      },
      {
        label: '200D Moving Average',
        data: [], // [{x: date, y: ma200}]
        borderColor: 'rgba(139, 92, 246, 0.6)',
        backgroundColor: 'transparent',
        borderWidth: 1.5,
        pointRadius: 0,
        tension: 0.3,
        borderDash: [6, 4],
      },
    ],
  },
  options: {
    ...SHARED_DEFAULTS,
    plugins: {
      ...SHARED_DEFAULTS.plugins,
      title: {
        display: true,
        text: 'Bitcoin Dominance',
        color: COLORS.textBright,
        font: { size: 16, weight: '600', family: "'Inter', sans-serif" },
      },
      tooltip: {
        ...SHARED_DEFAULTS.plugins.tooltip,
        callbacks: {
          label: (item) => `${item.dataset.label}: ${item.parsed.y.toFixed(1)}%`,
        },
      },
      annotation: {
        annotations: {
          fiftyPercent: {
            type: 'line',
            yMin: 50,
            yMax: 50,
            borderColor: 'rgba(255, 255, 255, 0.15)',
            borderWidth: 1,
            borderDash: [6, 4],
            label: {
              display: true,
              content: '50%',
              position: 'end',
              color: COLORS.text,
              font: { size: 9 },
            },
          },
          // Halving event markers
          halving2016: {
            type: 'line',
            xMin: new Date('2016-07-09').getTime(),
            xMax: new Date('2016-07-09').getTime(),
            borderColor: 'rgba(247, 147, 26, 0.3)',
            borderWidth: 1,
            borderDash: [4, 4],
            label: {
              display: true,
              content: 'Halving',
              position: 'start',
              rotation: -90,
              color: COLORS.accent,
              font: { size: 8 },
            },
          },
          halving2020: {
            type: 'line',
            xMin: new Date('2020-05-11').getTime(),
            xMax: new Date('2020-05-11').getTime(),
            borderColor: 'rgba(247, 147, 26, 0.3)',
            borderWidth: 1,
            borderDash: [4, 4],
            label: {
              display: true,
              content: 'Halving',
              position: 'start',
              rotation: -90,
              color: COLORS.accent,
              font: { size: 8 },
            },
          },
          halving2024: {
            type: 'line',
            xMin: new Date('2024-04-20').getTime(),
            xMax: new Date('2024-04-20').getTime(),
            borderColor: 'rgba(247, 147, 26, 0.3)',
            borderWidth: 1,
            borderDash: [4, 4],
            label: {
              display: true,
              content: 'Halving',
              position: 'start',
              rotation: -90,
              color: COLORS.accent,
              font: { size: 8 },
            },
          },
        },
      },
    },
    scales: {
      x: {
        ...SHARED_DEFAULTS.scales.x,
        type: 'time',
        time: { unit: 'year' },
      },
      y: {
        ...SHARED_DEFAULTS.scales.y,
        min: 30,
        max: 100,
        ticks: {
          ...SHARED_DEFAULTS.scales.y.ticks,
          callback: (value) => value + '%',
        },
        title: { display: true, text: 'Market Share (%)', color: COLORS.text },
      },
    },
  },
};
```

---

## Chart 9: M2 vs BTC Overlay (Dual Y-Axis, Lagged)

Dual Y-axis chart comparing global M2 money supply (lagged by ~10 weeks) against BTC price.

```javascript
/**
 * Shift M2 data forward by lagWeeks to align with BTC price movements.
 * @param {Array<{x: Date, y: number}>} m2Data
 * @param {number} lagWeeks - typically 10-12 weeks
 * @returns {Array<{x: Date, y: number}>}
 */
function lagM2Data(m2Data, lagWeeks = 10) {
  const lagMs = lagWeeks * 7 * 24 * 60 * 60 * 1000;
  return m2Data.map(d => ({
    x: new Date(d.x.getTime() + lagMs),
    y: d.y,
  }));
}

const m2vsBtcConfig = {
  type: 'line',
  data: {
    datasets: [
      {
        label: 'BTC Price',
        data: [], // [{x: date, y: price}]
        borderColor: COLORS.accent,
        backgroundColor: 'transparent',
        borderWidth: 2,
        pointRadius: 0,
        tension: 0.3,
        yAxisID: 'yBTC',
      },
      {
        label: 'Global M2 (10wk lag)',
        data: [], // [{x: laggedDate, y: m2Value}]  (use lagM2Data())
        borderColor: COLORS.blue,
        backgroundColor: (ctx) => {
          const chart = ctx.chart;
          const { ctx: canvasCtx, chartArea } = chart;
          if (!chartArea) return 'rgba(59, 130, 246, 0.1)';
          const gradient = canvasCtx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
          gradient.addColorStop(0, 'rgba(59, 130, 246, 0.15)');
          gradient.addColorStop(1, 'rgba(59, 130, 246, 0.02)');
          return gradient;
        },
        borderWidth: 2,
        pointRadius: 0,
        tension: 0.3,
        fill: 'origin',
        yAxisID: 'yM2',
      },
    ],
  },
  options: {
    ...SHARED_DEFAULTS,
    interaction: {
      mode: 'index',
      intersect: false,
    },
    plugins: {
      ...SHARED_DEFAULTS.plugins,
      title: {
        display: true,
        text: 'BTC Price vs Global M2 Money Supply (10-Week Lag)',
        color: COLORS.textBright,
        font: { size: 16, weight: '600', family: "'Inter', sans-serif" },
      },
      tooltip: {
        ...SHARED_DEFAULTS.plugins.tooltip,
        callbacks: {
          label: (item) => {
            if (item.datasetIndex === 0) {
              return `BTC: ${formatBTC(item.parsed.y)}`;
            }
            return `M2: $${(item.parsed.y / 1e12).toFixed(2)}T`;
          },
        },
      },
    },
    scales: {
      x: {
        ...SHARED_DEFAULTS.scales.x,
        type: 'time',
        time: { unit: 'month', displayFormats: { month: 'MMM yyyy' } },
      },
      yBTC: {
        type: 'logarithmic',
        position: 'left',
        title: { display: true, text: 'BTC Price (USD)', color: COLORS.accent },
        grid: { color: COLORS.gridLines },
        ticks: {
          color: COLORS.accent,
          font: { family: "'JetBrains Mono', monospace", size: 10 },
          callback: (value) => formatUSD(value),
        },
      },
      yM2: {
        type: 'linear',
        position: 'right',
        title: { display: true, text: 'Global M2 ($T)', color: COLORS.blue },
        grid: { drawOnChartArea: false }, // don't overlap grids
        ticks: {
          color: COLORS.blue,
          font: { family: "'JetBrains Mono', monospace", size: 10 },
          callback: (value) => '$' + (value / 1e12).toFixed(1) + 'T',
        },
      },
    },
  },
};
```

---

## Chart 10: Price Target Range Chart

Horizontal range bars showing analyst price predictions with current price marker.

```javascript
const priceTargetRangeConfig = {
  type: 'bar',
  data: {
    labels: [
      'PlanB (S2F)',
      'Standard Chartered',
      'Bernstein',
      'ARK Invest (Bull)',
      'ARK Invest (Base)',
      'VanEck',
      'Log Regression Fair Value',
      'Fibonacci Extension',
      'Michael Saylor',
    ],
    datasets: [
      {
        label: 'Price Range',
        // Each bar is a floating bar: [low, high]
        data: [
          [100000, 250000],
          [150000, 200000],
          [150000, 200000],
          [300000, 710000],
          [120000, 300000],
          [150000, 180000],
          [95000, 160000],
          [130000, 220000],
          [250000, 1000000],
        ],
        backgroundColor: (ctx) => {
          const colors = [
            'rgba(247, 147, 26, 0.6)',
            'rgba(59, 130, 246, 0.6)',
            'rgba(139, 92, 246, 0.6)',
            'rgba(16, 185, 129, 0.6)',
            'rgba(16, 185, 129, 0.4)',
            'rgba(6, 182, 212, 0.6)',
            'rgba(234, 179, 8, 0.6)',
            'rgba(236, 72, 153, 0.6)',
            'rgba(239, 68, 68, 0.6)',
          ];
          return colors[ctx.dataIndex] || 'rgba(255,255,255,0.3)';
        },
        borderColor: 'transparent',
        borderWidth: 0,
        borderRadius: 4,
        barThickness: 24,
      },
    ],
  },
  options: {
    ...SHARED_DEFAULTS,
    indexAxis: 'y', // horizontal bars
    plugins: {
      ...SHARED_DEFAULTS.plugins,
      title: {
        display: true,
        text: '2025-2026 BTC Price Target Ranges',
        color: COLORS.textBright,
        font: { size: 16, weight: '600', family: "'Inter', sans-serif" },
      },
      legend: { display: false },
      tooltip: {
        ...SHARED_DEFAULTS.plugins.tooltip,
        callbacks: {
          label: (item) => {
            const [low, high] = item.raw;
            return `Range: ${formatBTC(low)} - ${formatBTC(high)}`;
          },
        },
      },
      annotation: {
        annotations: {
          currentPrice: {
            type: 'line',
            xMin: 97500, // UPDATE: set to current BTC price
            xMax: 97500,
            borderColor: COLORS.accent,
            borderWidth: 2,
            borderDash: [6, 3],
            label: {
              display: true,
              content: 'Current: $97,500',
              position: 'start',
              color: COLORS.accent,
              font: { size: 11, weight: '600' },
              backgroundColor: 'rgba(247, 147, 26, 0.15)',
              padding: 6,
              borderRadius: 4,
            },
          },
        },
      },
      datalabels: {
        display: true,
        color: COLORS.textBright,
        anchor: 'center',
        align: 'center',
        font: { size: 10, weight: 'bold', family: "'JetBrains Mono', monospace" },
        formatter: (value) => {
          const [low, high] = value;
          return `${formatUSD(low)} - ${formatUSD(high)}`;
        },
      },
    },
    scales: {
      x: {
        ...SHARED_DEFAULTS.scales.x,
        type: 'logarithmic',
        title: { display: true, text: 'Price Target (USD, Log Scale)', color: COLORS.text },
        min: 50000,
        max: 1200000,
        ticks: {
          ...SHARED_DEFAULTS.scales.x.ticks,
          callback: (value) => formatUSD(value),
        },
      },
      y: {
        ...SHARED_DEFAULTS.scales.y,
        grid: { display: false },
        ticks: {
          ...SHARED_DEFAULTS.scales.y.ticks,
          font: { size: 11, family: "'Inter', sans-serif" },
          color: COLORS.textBright,
        },
      },
    },
  },
  plugins: [ChartDataLabels], // register per-chart
};
```

---

## Custom Plugin: Canvas Background Color

Chart.js does not draw a background by default. Use this plugin on any chart that needs a dark canvas background:

```javascript
const canvasBackgroundPlugin = {
  id: 'canvasBackground',
  beforeDraw: (chart) => {
    const { ctx, chartArea } = chart;
    if (!chartArea) return;
    ctx.save();
    ctx.fillStyle = COLORS.cardBg;
    ctx.fillRect(
      chartArea.left, chartArea.top,
      chartArea.width, chartArea.height
    );
    ctx.restore();
  },
};

// Register globally or per-chart:
// Chart.register(canvasBackgroundPlugin);
// or: { plugins: [canvasBackgroundPlugin] } in chart config
```

---

## Custom Plugin: Crosshair on Hover

A lightweight crosshair that follows the mouse across the chart area:

```javascript
const crosshairPlugin = {
  id: 'crosshair',
  afterDraw: (chart) => {
    if (!chart._active || chart._active.length === 0) return;
    const { ctx, chartArea } = chart;
    const activePoint = chart._active[0];
    const x = activePoint.element.x;
    const y = activePoint.element.y;

    ctx.save();
    ctx.setLineDash([3, 3]);
    ctx.lineWidth = 1;
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';

    // Vertical line
    ctx.beginPath();
    ctx.moveTo(x, chartArea.top);
    ctx.lineTo(x, chartArea.bottom);
    ctx.stroke();

    // Horizontal line
    ctx.beginPath();
    ctx.moveTo(chartArea.left, y);
    ctx.lineTo(chartArea.right, y);
    ctx.stroke();

    ctx.restore();
  },
};
```

---

## Animation Presets

```javascript
const ANIMATION_PRESETS = {
  // Smooth entry for line charts
  lineReveal: {
    x: { duration: 0 },
    y: { duration: 1000, easing: 'easeOutQuart', from: (ctx) => ctx.chart.scales.y.getPixelForValue(0) },
  },
  // Fade in for area fills
  fadeIn: {
    duration: 1200,
    easing: 'easeInOutQuart',
  },
  // Staggered bars
  staggeredBars: {
    delay: (ctx) => ctx.dataIndex * 50,
    duration: 800,
    easing: 'easeOutQuart',
  },
  // No animation (for real-time updates)
  none: { duration: 0 },
};
```

---

## Integration Notes for Site Builder

### NPM Packages Required
```json
{
  "chart.js": "^4.4.0",
  "chartjs-plugin-annotation": "^3.0.0",
  "chartjs-plugin-datalabels": "^2.2.0",
  "chartjs-chart-matrix": "^2.0.0",
  "date-fns": "^3.0.0",
  "chartjs-adapter-date-fns": "^3.0.0"
}
```

### Registration Pattern
```javascript
import {
  Chart, LineController, LineElement, PointElement,
  LinearScale, LogarithmicScale, TimeScale, CategoryScale,
  Filler, Legend, Title, Tooltip, BarController, BarElement,
} from 'chart.js';
import annotationPlugin from 'chartjs-plugin-annotation';
import 'chartjs-adapter-date-fns';

Chart.register(
  LineController, LineElement, PointElement,
  LinearScale, LogarithmicScale, TimeScale, CategoryScale,
  Filler, Legend, Title, Tooltip,
  BarController, BarElement,
  annotationPlugin
);

// Register matrix controller only if using heatmap:
// import { MatrixController, MatrixElement } from 'chartjs-chart-matrix';
// Chart.register(MatrixController, MatrixElement);

// Register datalabels ONLY per-chart, not globally
// (otherwise every chart gets labels on every point)
```

### Time Scale Adapter
For any chart using `type: 'time'` on an axis, you MUST import a date adapter:
```javascript
import 'chartjs-adapter-date-fns';
```

### Responsive Container Pattern
All chart canvases should be wrapped in a container with explicit height:
```html
<div style="position: relative; height: 400px; width: 100%;">
  <canvas id="myChart"></canvas>
</div>
```

### Dark Theme Global Defaults
Apply once at app startup:
```javascript
Chart.defaults.color = COLORS.text;
Chart.defaults.borderColor = COLORS.gridLines;
Chart.defaults.font.family = "'Inter', sans-serif";
Chart.defaults.font.size = 12;
Chart.defaults.plugins.tooltip.backgroundColor = 'rgba(15, 23, 42, 0.95)';
Chart.defaults.plugins.tooltip.borderColor = 'rgba(255, 255, 255, 0.1)';
Chart.defaults.plugins.tooltip.borderWidth = 1;
Chart.defaults.plugins.tooltip.cornerRadius = 8;
```

### Data Fetching Strategy
For BTC price data, use CoinGecko's free API:
```javascript
// Historical data (up to 365 days)
const response = await fetch(
  'https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=max&interval=daily'
);
const { prices } = await response.json();
// prices = [[timestamp, price], [timestamp, price], ...]
const chartData = prices.map(([t, p]) => ({ x: new Date(t), y: p }));
```

For on-chain metrics (NUPL, MVRV, etc.), if not available from a free API, use pre-computed static JSON files bundled with the site.
