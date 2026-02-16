# Financial Charting Libraries Research: Premium Bitcoin Analysis Website

## Executive Summary & Recommendation

**Primary Recommendation: Apache ECharts** for the overall dashboard (area charts, treemaps, heatmaps, gauges) combined with **TradingView Lightweight Charts** specifically for candlestick/price charts.

**Why this combination wins:**
- ECharts provides the broadest chart type coverage (40+ types including treemap, heatmap, gauge, radar) with a built-in `'dark'` theme and WebGL rendering for large datasets
- Lightweight Charts gives you the most authentic financial chart experience (it literally powers TradingView) at only ~45KB
- Both work via CDN with zero build system
- Both are fully open-source and free for commercial use

If forced to pick **one library only**: **Apache ECharts** -- it handles every chart type you need, has the most sophisticated dark theme system, and its visual quality rivals Bloomberg/Refinitiv terminals.

---

## Detailed Library Comparison

### 1. Apache ECharts

| Attribute | Detail |
|-----------|--------|
| **CDN URL** | `<script src="https://cdn.jsdelivr.net/npm/echarts@5/dist/echarts.min.js"></script>` |
| **Size** | ~1MB (full), ~400KB (min+gzip), or use modular imports |
| **License** | Apache 2.0 (fully free, commercial OK) |
| **Dark Theme** | Built-in `'dark'` theme + custom Theme Builder |
| **Chart Types** | Candlestick, area, line, bar, treemap, heatmap, radar, gauge, sankey, sunburst, parallel coordinates, scatter, boxplot, funnel -- 40+ types |
| **Rendering** | Canvas + SVG + WebGL (handles millions of data points) |
| **Bloomberg Aesthetic** | 9/10 -- closest to professional terminal look |

**Dark Theme Initialization:**
```html
<script src="https://cdn.jsdelivr.net/npm/echarts@5/dist/echarts.min.js"></script>
<script>
  // Built-in dark theme -- just pass 'dark' as second argument
  var chart = echarts.init(document.getElementById('chart'), 'dark');
</script>
```

**Premium Dark Area Chart with Gradient:**
```javascript
var chart = echarts.init(document.getElementById('chart'), 'dark');

chart.setOption({
  backgroundColor: '#0d1117',
  textStyle: {
    color: '#8b949e',
    fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", sans-serif'
  },
  title: {
    text: 'Bitcoin Price (USD)',
    textStyle: {
      color: '#e6edf3',
      fontSize: 16,
      fontWeight: 500
    },
    left: 20,
    top: 16
  },
  tooltip: {
    trigger: 'axis',
    backgroundColor: 'rgba(22, 27, 34, 0.95)',
    borderColor: '#30363d',
    textStyle: { color: '#e6edf3' },
    axisPointer: {
      type: 'cross',
      lineStyle: { color: '#30363d' }
    }
  },
  grid: {
    left: 60,
    right: 20,
    top: 60,
    bottom: 40
  },
  xAxis: {
    type: 'category',
    data: dates,
    axisLine: { lineStyle: { color: '#21262d' } },
    axisLabel: { color: '#8b949e', fontSize: 11 },
    splitLine: { show: false }
  },
  yAxis: {
    type: 'value',
    axisLine: { show: false },
    axisLabel: {
      color: '#8b949e',
      fontSize: 11,
      formatter: '${value}'
    },
    splitLine: {
      lineStyle: { color: '#21262d', type: 'dashed' }
    }
  },
  series: [{
    type: 'line',
    data: prices,
    smooth: true,
    symbol: 'none',
    lineStyle: {
      color: '#58a6ff',
      width: 2
    },
    areaStyle: {
      color: {
        type: 'linear',
        x: 0, y: 0, x2: 0, y2: 1,
        colorStops: [
          { offset: 0, color: 'rgba(88, 166, 255, 0.35)' },
          { offset: 0.5, color: 'rgba(88, 166, 255, 0.12)' },
          { offset: 1, color: 'rgba(88, 166, 255, 0.02)' }
        ]
      }
    }
  }]
});
```

**ECharts Candlestick Chart:**
```javascript
var chart = echarts.init(document.getElementById('candlestick'), 'dark');

chart.setOption({
  backgroundColor: '#0d1117',
  tooltip: {
    trigger: 'axis',
    backgroundColor: 'rgba(22, 27, 34, 0.95)',
    borderColor: '#30363d',
    textStyle: { color: '#e6edf3' }
  },
  grid: [
    { left: 60, right: 20, top: 60, height: '55%' },
    { left: 60, right: 20, top: '72%', height: '16%' }
  ],
  xAxis: [
    {
      type: 'category',
      data: dates,
      axisLine: { lineStyle: { color: '#21262d' } },
      axisLabel: { color: '#8b949e' }
    },
    {
      type: 'category',
      gridIndex: 1,
      data: dates,
      axisLabel: { show: false }
    }
  ],
  yAxis: [
    {
      scale: true,
      splitLine: { lineStyle: { color: '#21262d', type: 'dashed' } },
      axisLabel: { color: '#8b949e' }
    },
    {
      gridIndex: 1,
      splitNumber: 2,
      axisLabel: { show: false },
      splitLine: { show: false }
    }
  ],
  dataZoom: [
    { type: 'inside', xAxisIndex: [0, 1], start: 70, end: 100 },
    { type: 'slider', xAxisIndex: [0, 1], top: '92%', start: 70, end: 100,
      borderColor: '#21262d', backgroundColor: '#161b22',
      fillerColor: 'rgba(88, 166, 255, 0.15)',
      handleStyle: { color: '#58a6ff' }
    }
  ],
  series: [
    {
      type: 'candlestick',
      data: ohlcData, // [[open, close, low, high], ...]
      itemStyle: {
        color: '#3fb950',       // bullish body
        color0: '#f85149',      // bearish body
        borderColor: '#3fb950', // bullish border
        borderColor0: '#f85149' // bearish border
      }
    },
    {
      type: 'bar',
      xAxisIndex: 1,
      yAxisIndex: 1,
      data: volumeData,
      itemStyle: {
        color: function(params) {
          // Green for up, red for down
          return ohlcData[params.dataIndex][1] >= ohlcData[params.dataIndex][0]
            ? 'rgba(63, 185, 80, 0.4)'
            : 'rgba(248, 81, 73, 0.4)';
        }
      }
    }
  ]
});
```

**ECharts Treemap (Market Sector Map):**
```javascript
var chart = echarts.init(document.getElementById('treemap'), 'dark');

chart.setOption({
  backgroundColor: '#0d1117',
  tooltip: {
    backgroundColor: 'rgba(22, 27, 34, 0.95)',
    borderColor: '#30363d',
    textStyle: { color: '#e6edf3' }
  },
  series: [{
    type: 'treemap',
    data: [
      {
        name: 'Bitcoin', value: 850,
        itemStyle: { color: '#3fb950' },
        children: [
          { name: 'BTC/USD', value: 650, itemStyle: { color: '#238636' } },
          { name: 'BTC/EUR', value: 200, itemStyle: { color: '#2ea043' } }
        ]
      },
      {
        name: 'Ethereum', value: 400,
        itemStyle: { color: '#58a6ff' },
        children: [
          { name: 'ETH/USD', value: 300, itemStyle: { color: '#1f6feb' } },
          { name: 'ETH/BTC', value: 100, itemStyle: { color: '#388bfd' } }
        ]
      }
    ],
    label: {
      show: true,
      color: '#e6edf3',
      fontSize: 12,
      fontWeight: 500
    },
    breadcrumb: {
      itemStyle: {
        color: '#161b22',
        borderColor: '#30363d',
        textStyle: { color: '#8b949e' }
      }
    },
    levels: [
      { itemStyle: { borderColor: '#21262d', borderWidth: 2, gapWidth: 2 } },
      { itemStyle: { borderColor: '#30363d', borderWidth: 1, gapWidth: 1 } }
    ]
  }]
});
```

**ECharts Heatmap (Correlation Matrix):**
```javascript
var chart = echarts.init(document.getElementById('heatmap'), 'dark');

chart.setOption({
  backgroundColor: '#0d1117',
  tooltip: {
    backgroundColor: 'rgba(22, 27, 34, 0.95)',
    borderColor: '#30363d'
  },
  grid: { left: 80, right: 40, top: 40, bottom: 80 },
  xAxis: {
    type: 'category',
    data: ['BTC', 'ETH', 'SOL', 'ADA', 'DOGE', 'XRP'],
    axisLabel: { color: '#8b949e' },
    axisLine: { lineStyle: { color: '#21262d' } }
  },
  yAxis: {
    type: 'category',
    data: ['BTC', 'ETH', 'SOL', 'ADA', 'DOGE', 'XRP'],
    axisLabel: { color: '#8b949e' },
    axisLine: { lineStyle: { color: '#21262d' } }
  },
  visualMap: {
    min: -1,
    max: 1,
    calculable: true,
    orient: 'horizontal',
    left: 'center',
    bottom: 0,
    textStyle: { color: '#8b949e' },
    inRange: {
      color: ['#f85149', '#21262d', '#3fb950']
    }
  },
  series: [{
    type: 'heatmap',
    data: correlationData, // [[x, y, value], ...]
    label: {
      show: true,
      color: '#e6edf3',
      fontSize: 11
    },
    itemStyle: {
      borderColor: '#0d1117',
      borderWidth: 2
    }
  }]
});
```

---

### 2. TradingView Lightweight Charts

| Attribute | Detail |
|-----------|--------|
| **CDN URL** | `<script src="https://unpkg.com/lightweight-charts/dist/lightweight-charts.standalone.production.js"></script>` |
| **Size** | ~45KB (minified + gzipped) |
| **License** | Apache 2.0 (fully free, commercial OK) |
| **Dark Theme** | Manual configuration via layout options |
| **Chart Types** | Candlestick, OHLC bar, area, line, baseline, histogram |
| **Rendering** | HTML5 Canvas (extremely performant) |
| **Bloomberg Aesthetic** | 10/10 for price charts specifically -- this IS TradingView |

**Dark Theme Candlestick Chart:**
```html
<!DOCTYPE html>
<html>
<head>
  <style>
    body { margin: 0; background: #0d1117; }
    #chart { width: 100%; height: 500px; }
  </style>
</head>
<body>
  <div id="chart"></div>
  <script src="https://unpkg.com/lightweight-charts/dist/lightweight-charts.standalone.production.js"></script>
  <script>
    const chart = LightweightCharts.createChart(document.getElementById('chart'), {
      layout: {
        background: { type: 'solid', color: '#0d1117' },
        textColor: '#8b949e',
        fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif',
        fontSize: 12
      },
      grid: {
        vertLines: { color: '#21262d' },
        horzLines: { color: '#21262d' }
      },
      crosshair: {
        mode: LightweightCharts.CrosshairMode.Normal,
        vertLine: {
          color: '#58a6ff',
          width: 1,
          style: LightweightCharts.LineStyle.Dashed,
          labelBackgroundColor: '#1f6feb'
        },
        horzLine: {
          color: '#58a6ff',
          width: 1,
          style: LightweightCharts.LineStyle.Dashed,
          labelBackgroundColor: '#1f6feb'
        }
      },
      rightPriceScale: {
        borderColor: '#21262d',
        scaleMargins: { top: 0.1, bottom: 0.1 }
      },
      timeScale: {
        borderColor: '#21262d',
        timeVisible: true,
        secondsVisible: false
      }
    });

    const candleSeries = chart.addCandlestickSeries({
      upColor: '#3fb950',
      downColor: '#f85149',
      borderDownColor: '#f85149',
      borderUpColor: '#3fb950',
      wickDownColor: '#f85149',
      wickUpColor: '#3fb950'
    });

    candleSeries.setData([
      { time: '2024-01-01', open: 42000, high: 43500, low: 41800, close: 43200 },
      { time: '2024-01-02', open: 43200, high: 44100, low: 42900, close: 43800 },
      // ... more data
    ]);

    chart.timeScale().fitContent();
  </script>
</body>
</html>
```

**Dark Theme Area Chart with Gradient:**
```javascript
const chart = LightweightCharts.createChart(document.getElementById('chart'), {
  layout: {
    background: { type: 'solid', color: '#0d1117' },
    textColor: '#8b949e',
    fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif'
  },
  grid: {
    vertLines: { color: 'rgba(33, 38, 45, 0.5)' },
    horzLines: { color: 'rgba(33, 38, 45, 0.5)' }
  },
  rightPriceScale: { borderColor: '#21262d' },
  timeScale: { borderColor: '#21262d' }
});

const areaSeries = chart.addAreaSeries({
  lineColor: '#58a6ff',
  topColor: 'rgba(88, 166, 255, 0.4)',
  bottomColor: 'rgba(88, 166, 255, 0.02)',
  lineWidth: 2,
  crosshairMarkerVisible: true,
  crosshairMarkerRadius: 4,
  crosshairMarkerBorderColor: '#58a6ff',
  crosshairMarkerBackgroundColor: '#0d1117'
});

areaSeries.setData([
  { time: '2024-01-01', value: 42000 },
  { time: '2024-01-02', value: 43200 },
  // ... more data
]);

chart.timeScale().fitContent();
```

**Lightweight Charts v5 (latest) Area Series syntax:**
```javascript
// v5 uses addSeries(AreaSeries, options) pattern
const { createChart, AreaSeries, CandlestickSeries } = LightweightCharts;

const chart = createChart(document.getElementById('chart'), {
  layout: {
    background: { type: 'solid', color: '#0d1117' },
    textColor: '#8b949e'
  }
});

const areaSeries = chart.addSeries(AreaSeries, {
  lineColor: '#58a6ff',
  topColor: 'rgba(88, 166, 255, 0.4)',
  bottomColor: 'rgba(88, 166, 255, 0.02)'
});
```

---

### 3. ApexCharts

| Attribute | Detail |
|-----------|--------|
| **CDN URL** | `<script src="https://cdn.jsdelivr.net/npm/apexcharts"></script>` |
| **Size** | ~130KB (min+gzip) |
| **License** | MIT (fully free, commercial OK) |
| **Dark Theme** | Built-in `theme: { mode: 'dark' }` |
| **Chart Types** | Line, area, bar, candlestick, heatmap, treemap, radar, radialBar, rangeArea, scatter, bubble, boxPlot, pie, donut |
| **Rendering** | SVG-based (smooth animations, limited on very large datasets) |
| **Bloomberg Aesthetic** | 7/10 -- attractive but leans more "SaaS dashboard" than "trading terminal" |

**Dark Theme Gradient Area Chart:**
```html
<script src="https://cdn.jsdelivr.net/npm/apexcharts"></script>
<script>
var options = {
  chart: {
    type: 'area',
    height: 400,
    foreColor: '#8b949e',
    fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif',
    background: '#0d1117',
    toolbar: { show: false }
  },
  theme: {
    mode: 'dark'
  },
  colors: ['#58a6ff'],
  series: [{
    name: 'BTC Price',
    data: [42000, 43200, 41800, 44500, 45200, 43800, 46100]
  }],
  stroke: {
    width: 2,
    curve: 'smooth'
  },
  fill: {
    type: 'gradient',
    gradient: {
      shade: 'dark',
      type: 'vertical',
      shadeIntensity: 0.5,
      opacityFrom: 0.4,
      opacityTo: 0.02,
      stops: [0, 90, 100]
    }
  },
  grid: {
    borderColor: '#21262d',
    strokeDashArray: 4,
    xaxis: { lines: { show: false } },
    yaxis: { lines: { show: true } }
  },
  xaxis: {
    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    axisBorder: { color: '#21262d' },
    axisTicks: { color: '#21262d' }
  },
  yaxis: {
    labels: {
      formatter: function(val) { return '$' + val.toLocaleString(); }
    }
  },
  tooltip: {
    theme: 'dark',
    style: { fontSize: '12px' }
  },
  dataLabels: { enabled: false }
};

var chart = new ApexCharts(document.querySelector('#chart'), options);
chart.render();
</script>
```

**ApexCharts Candlestick:**
```javascript
var options = {
  chart: {
    type: 'candlestick',
    height: 400,
    foreColor: '#8b949e',
    background: '#0d1117',
    toolbar: { show: true, tools: { download: false } }
  },
  theme: { mode: 'dark' },
  series: [{
    data: [
      { x: new Date('2024-01-01'), y: [42000, 43500, 41800, 43200] },
      { x: new Date('2024-01-02'), y: [43200, 44100, 42900, 43800] },
      // [open, high, low, close]
    ]
  }],
  plotOptions: {
    candlestick: {
      colors: {
        upward: '#3fb950',
        downward: '#f85149'
      },
      wick: { useFillColor: true }
    }
  },
  grid: { borderColor: '#21262d', strokeDashArray: 4 },
  xaxis: {
    type: 'datetime',
    axisBorder: { color: '#21262d' },
    axisTicks: { color: '#21262d' }
  },
  tooltip: { theme: 'dark' }
};

var chart = new ApexCharts(document.querySelector('#chart'), options);
chart.render();
```

---

### 4. Highcharts (Stock)

| Attribute | Detail |
|-----------|--------|
| **CDN URL** | `<script src="https://code.highcharts.com/stock/highstock.js"></script>` + `<script src="https://code.highcharts.com/themes/dark-unica.js"></script>` |
| **Size** | ~300KB (Highstock) |
| **License** | Commercial ($416.50+ per developer). Free only for non-commercial/educational use |
| **Dark Theme** | Built-in themes: dark-unica, brand-dark, adaptive (auto dark/light) |
| **Chart Types** | All standard types + stock-specific (OHLC, candlestick, flags, range selectors) |
| **Rendering** | SVG with boost module for large datasets |
| **Bloomberg Aesthetic** | 8/10 -- very polished, but the commercial license is a significant consideration |

**Dark Theme Stock Chart:**
```html
<script src="https://code.highcharts.com/stock/highstock.js"></script>
<script src="https://code.highcharts.com/themes/dark-unica.js"></script>
<script>
Highcharts.stockChart('chart', {
  chart: {
    backgroundColor: '#0d1117'
  },
  rangeSelector: {
    selected: 1,
    buttonTheme: {
      fill: '#161b22',
      stroke: '#30363d',
      style: { color: '#8b949e' },
      states: {
        hover: { fill: '#1f6feb', style: { color: '#fff' } },
        select: { fill: '#1f6feb', style: { color: '#fff' } }
      }
    },
    inputStyle: { color: '#e6edf3', backgroundColor: '#161b22' }
  },
  navigator: {
    series: { color: '#58a6ff' },
    maskFill: 'rgba(88, 166, 255, 0.1)',
    outlineColor: '#21262d'
  },
  series: [{
    type: 'candlestick',
    name: 'BTC/USD',
    data: ohlcData,
    color: '#f85149',     // bearish
    upColor: '#3fb950',   // bullish
    lineColor: '#f85149',
    upLineColor: '#3fb950'
  }],
  yAxis: {
    gridLineColor: '#21262d',
    labels: { style: { color: '#8b949e' } }
  },
  xAxis: {
    gridLineColor: '#21262d',
    labels: { style: { color: '#8b949e' } }
  }
});
</script>
```

---

### 5. D3.js

| Attribute | Detail |
|-----------|--------|
| **CDN URL** | `<script src="https://cdn.jsdelivr.net/npm/d3@7"></script>` (+ d3fc for financial: `<script src="https://unpkg.com/d3fc"></script>`) |
| **Size** | ~90KB (D3 core) |
| **License** | ISC (fully free, commercial OK) |
| **Dark Theme** | Manual -- you control every pixel |
| **Chart Types** | Anything you can imagine (but you build it from scratch) |
| **Rendering** | SVG + Canvas |
| **Bloomberg Aesthetic** | 10/10 potential, but 1/10 productivity -- everything is manual |

**D3 is not recommended as a primary library** for this use case. It is a low-level visualization grammar, not a charting library. Building a candlestick chart in D3 requires hundreds of lines of code for what Lightweight Charts does in 20 lines. However, D3 is excellent for:
- Custom one-off visualizations (e.g., a unique Bitcoin network graph)
- Bespoke animations or transitions
- Situations where no library provides the exact visualization you need

Use D3FC (built on D3) if you need D3-quality custom financial charts: https://d3fc.io/

---

## Head-to-Head Comparison Matrix

| Feature | ECharts | Lightweight Charts | ApexCharts | Highcharts | D3.js |
|---------|---------|-------------------|------------|------------|-------|
| **Price** | Free | Free | Free | $416+ | Free |
| **Bundle Size** | ~400KB | ~45KB | ~130KB | ~300KB | ~90KB |
| **Dark Theme** | Built-in | Manual config | Built-in | Built-in themes | Manual |
| **Candlestick** | Yes | Yes (best) | Yes | Yes | Manual |
| **Area + Gradient** | Yes (best) | Basic (top/bottom) | Yes (good) | Yes | Manual |
| **Treemap** | Yes | No | Yes (basic) | Yes | Manual |
| **Heatmap** | Yes (best) | No | Yes | Yes | Manual |
| **Gauge** | Yes | No | Yes (radial) | Yes | Manual |
| **Real-time Updates** | Yes | Yes (best) | Yes | Yes | Manual |
| **Animations** | Yes | Minimal | Yes (best) | Yes | Manual |
| **Large Datasets** | WebGL mode | Canvas (great) | SVG (poor) | Boost module | Depends |
| **No Build System** | CDN ready | CDN ready | CDN ready | CDN ready | CDN ready |
| **Terminal Aesthetic** | 9/10 | 10/10 (for price) | 7/10 | 8/10 | 10/10 (manual) |

---

## Recommended Architecture for Your Bitcoin Analysis Site

```
PRIMARY:   Apache ECharts (via CDN)
           -- Dashboard charts, area charts, treemaps, heatmaps, gauges,
              correlation matrices, distribution charts

SECONDARY: TradingView Lightweight Charts (via CDN)
           -- Price candlestick charts, interactive price area charts,
              any chart where the user expects TradingView-quality interaction

OPTIONAL:  D3.js (via CDN)
           -- Custom one-off visualizations, network graphs, unique animations
```

### CDN Include Block:
```html
<!-- Apache ECharts - main dashboard library -->
<script src="https://cdn.jsdelivr.net/npm/echarts@5/dist/echarts.min.js"></script>

<!-- TradingView Lightweight Charts - price/candlestick charts -->
<script src="https://unpkg.com/lightweight-charts/dist/lightweight-charts.standalone.production.js"></script>

<!-- Optional: D3 for custom visualizations -->
<script src="https://cdn.jsdelivr.net/npm/d3@7"></script>
```

---

## Dark Theme Design System (Color Tokens)

Use a consistent color system across all chart libraries:

```javascript
const THEME = {
  // Backgrounds
  bg: '#0d1117',          // Main background (GitHub dark)
  bgCard: '#161b22',      // Card/panel background
  bgElevated: '#1c2128',  // Elevated surfaces

  // Borders
  border: '#21262d',      // Default borders
  borderMuted: '#30363d', // Muted borders

  // Text
  textPrimary: '#e6edf3',   // Primary text
  textSecondary: '#8b949e', // Secondary/muted text
  textMuted: '#484f58',     // Very muted text

  // Data colors -- inspired by GitHub/Apple
  blue: '#58a6ff',       // Primary data color
  green: '#3fb950',      // Bullish / positive
  red: '#f85149',        // Bearish / negative
  purple: '#bc8cff',     // Accent
  orange: '#d29922',     // Warning / neutral
  cyan: '#39d2c0',       // Secondary data
  pink: '#f778ba',       // Tertiary data

  // Gradients (for area fills)
  blueGradientTop: 'rgba(88, 166, 255, 0.4)',
  blueGradientBottom: 'rgba(88, 166, 255, 0.02)',
  greenGradientTop: 'rgba(63, 185, 80, 0.4)',
  greenGradientBottom: 'rgba(63, 185, 80, 0.02)',

  // Typography
  fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", Roboto, sans-serif',
  fontMono: '"SF Mono", "Fira Code", "Cascadia Code", monospace'
};
```

---

## Best Practices for Premium Financial Data Visualization

### 1. Color Psychology
- Green for bullish/up, red for bearish/down (universal financial convention)
- Blue as a neutral primary data color (conveys trust, stability)
- Avoid saturated colors on dark backgrounds -- use slightly muted tones
- Never use pure white (#fff) text on dark backgrounds -- use off-white (#e6edf3)

### 2. Typography
- Use system fonts (-apple-system stack) for native platform feel
- Monospace for numerical data (prices, percentages)
- 11-12px for axis labels, 14-16px for titles
- Font weight 400-500 (avoid bold -- it feels heavy on dark backgrounds)

### 3. Grid & Axes
- Dashed or very subtle solid grid lines (opacity 0.1-0.2)
- Remove unnecessary axis lines -- let the data breathe
- Right-aligned Y axis for financial charts (convention)
- Remove chart borders entirely

### 4. Gradients
- Gradient area fills should fade to near-zero opacity at the bottom
- Use 3-stop gradients: [0% = 35-40% opacity, 50% = 10-12% opacity, 100% = 2% opacity]
- The gradient creates depth without obscuring the baseline

### 5. Interactions
- Crosshair cursor with value labels on both axes
- Smooth tooltip transitions (not jarring snap-to-point)
- Zoom and pan for time-series data
- Range selector buttons (1D, 1W, 1M, 3M, 1Y, ALL)

### 6. Layout
- Generous padding (20-40px) around charts
- Card-based layout with subtle borders, not shadows
- 8-12px border-radius on card containers
- Consistent spacing between chart sections

### 7. Performance
- Use Canvas rendering for real-time data (Lightweight Charts, ECharts Canvas mode)
- Limit visible data points to what is meaningful (downsample if needed)
- Lazy-load charts below the fold
- Use requestAnimationFrame for live updates

---

## Complete Starter Template

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Bitcoin Analysis Dashboard</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }

    body {
      background: #0d1117;
      color: #e6edf3;
      font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", Roboto, sans-serif;
      line-height: 1.5;
    }

    .dashboard {
      max-width: 1400px;
      margin: 0 auto;
      padding: 24px;
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 16px;
    }

    .card {
      background: #161b22;
      border: 1px solid #21262d;
      border-radius: 12px;
      padding: 20px;
      overflow: hidden;
    }

    .card--full { grid-column: 1 / -1; }

    .card__title {
      font-size: 14px;
      font-weight: 500;
      color: #8b949e;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin-bottom: 16px;
    }

    .chart-container { width: 100%; height: 400px; }
    .chart-container--tall { height: 500px; }
    .chart-container--short { height: 300px; }
  </style>
</head>
<body>
  <div class="dashboard">
    <!-- Price Chart (Lightweight Charts) -->
    <div class="card card--full">
      <div class="card__title">BTC/USD Price</div>
      <div id="price-chart" class="chart-container--tall"></div>
    </div>

    <!-- Area Chart (ECharts) -->
    <div class="card">
      <div class="card__title">Market Cap Trend</div>
      <div id="area-chart" class="chart-container"></div>
    </div>

    <!-- Heatmap (ECharts) -->
    <div class="card">
      <div class="card__title">Correlation Matrix</div>
      <div id="heatmap-chart" class="chart-container"></div>
    </div>

    <!-- Treemap (ECharts) -->
    <div class="card card--full">
      <div class="card__title">Market Overview</div>
      <div id="treemap-chart" class="chart-container--short"></div>
    </div>
  </div>

  <!-- Libraries -->
  <script src="https://cdn.jsdelivr.net/npm/echarts@5/dist/echarts.min.js"></script>
  <script src="https://unpkg.com/lightweight-charts/dist/lightweight-charts.standalone.production.js"></script>

  <script>
    // Initialize all charts here using the configurations above
  </script>
</body>
</html>
```
