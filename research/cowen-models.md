# Benjamin Cowen / Into the Cryptoverse -- Model Replication Guide

> Research compiled for BTC v2 website interactive charts.
> Each section covers: model name, formula, data inputs, current signal, historical context, and implementation spec.

---

## 1. Bitcoin Risk Metric (0--1 Composite Oscillator)

### What It Is
Cowen's flagship metric. A single number from 0.0 (maximum opportunity) to 1.0 (maximum risk) that normalizes Bitcoin's price relative to its long-term logarithmic growth trend. Higher values indicate the price is far above trend (bubble territory); lower values indicate deep undervaluation.

### Mathematical Formula

Based on the open-source replication (BitcoinRaven/Bitcoin-Risk-Metric-V2):

```
Parameters:
  diminishing_factor = 0.395
  moving_average_window = 365 days

Step 1 -- 365-day Moving Average:
  MA_365 = SMA(Price, 365)

Step 2 -- Log-Return with Diminishing Adjustment:
  Preavg = (ln(Price) - ln(MA_365)) * index^0.395

  where index = sequential day number in the dataset

Step 3 -- Min-Max Normalization to [0, 1]:
  Risk = (Preavg - Preavg_min) / (Preavg_max - Preavg_min)
```

The `index^0.395` term is the diminishing factor -- it compresses the oscillator over time, reflecting the thesis that Bitcoin's volatility (and thus risk range) decreases as the asset matures.

### Inverse: Price at a Given Risk Level

```
Price(risk) = exp(
  (risk * (Preavg_max - Preavg_min) + Preavg_min) / index^0.395 + ln(MA_365_final)
)
```

### Data Inputs
- Daily BTC/USD closing prices (from genesis block or earliest exchange data)
- Source: Quandl BCHAIN/MKPRU for historical, Yahoo Finance BTC-USD for recent

### Current Signal (Feb 2026)
- With BTC having peaked in late 2025 per Cowen's cycle thesis, risk likely in the 0.5--0.7 range (declining from cycle highs)
- Historical parallel: similar to early 2018 or mid-2022 (post-peak, pre-bottom)

### Historical Performance
| Risk Level | Market Phase | Action Signal |
|-----------|-------------|---------------|
| 0.0--0.2 | Cycle bottom / capitulation | Strong accumulation zone |
| 0.2--0.4 | Early recovery | Accumulate |
| 0.4--0.6 | Mid-cycle / fair value | Hold / neutral |
| 0.6--0.8 | Late bull / overextension | Begin taking profit |
| 0.8--1.0 | Blow-off top / bubble | Distribution / sell zone |

The metric correctly identified the April 2021 local top but performed less well at the November 2021 cycle top.

### Implementation Spec
- **Chart type**: Dual-axis. Left Y-axis = BTC price (log scale). Right Y-axis = Risk (0--1, linear).
- **Visualization**: Price line overlaid with color-gradient background (green at 0.0 fading to red at 1.0).
- **X-axis**: Time (daily, from 2010 to present).
- **Interactive**: Hover to show exact risk value and corresponding price. Slider to see "price at risk level X" for current date.
- **Colors**: Green (#00C853) at 0.0 through Yellow (#FFD600) at 0.5 to Red (#FF1744) at 1.0.

---

## 2. Logarithmic Regression Rainbow Chart

### What It Is
A long-term price model that fits a logarithmic regression curve to Bitcoin's entire price history, then creates color-coded deviation bands above and below the trendline. Each band represents a different market sentiment zone.

### Core Regression Formula

The central trendline (fair value):

```
log10(Price) = a * ln(days_since_genesis) - b

Original (Trolololo, 2014):
  a = 2.9065, b = 19.493

Updated (v2.3, 2017):
  a = 2.66167155005961, b = 17.9183761889864

Simplified weekly version:
  log10(Price) = 2.6521 * ln(weeks_since_2009) - 18.163

where:
  days_since_genesis = days since January 9, 2009
  Price = 10^(a * ln(days) - b)
```

Note: These coefficients should be re-fitted periodically as more price data accumulates. Cowen's version uses proprietary fits that are updated.

### Band Structure (9 Bands)

Bands are multiplicative offsets from the central trendline in log space:

| Band # | Color | Label | Multiplier (approx) | Sentiment |
|--------|-------|-------|---------------------|-----------|
| 1 | Deep Blue (#1A237E) | "Fire Sale" | 0.5x | Extreme capitulation |
| 2 | Blue (#1565C0) | "Buy" | 0.75x | Post-crash basing |
| 3 | Light Blue (#0097A7) | "Accumulate" | 1.0x (trendline) | Near fair value |
| 4 | Green (#2E7D32) | "Still a Bargain" | 1.25x | Slightly above trend |
| 5 | Light Green (#689F38) | "HODL" | 1.6x | Acceleration phase |
| 6 | Yellow (#F9A825) | "Throw a Party" | 2.2x | Euphoric extension |
| 7 | Orange (#EF6C00) | "Has It Gone Too Far?" | 3.0x | Bubble warning |
| 8 | Red (#D32F2F) | "Bubble" | 4.5x | Peak insanity |
| 9 | Dark Red (#B71C1C) | "Euphoric Mania" | 5.0x+ | Blow-off top |

### Cowen's Two-Band Model (Simplified)
Cowen specifically uses two logarithmic regression bands:
- **Red band (upper)**: Fitted to only 3 data points -- the absolute peaks of previous cycles (2013, 2017, 2021)
- **Green band (lower)**: Fitted to thousands of "non-bubble" data points (periods of low volatility / sideways action)
- Key insight: Each cycle top has been approximately 2.5 log-regression bands below the previous top

### Data Inputs
- Daily BTC/USD price (full history from 2009/2010)
- Time variable: days (or weeks) since Bitcoin genesis block (Jan 9, 2009)

### Current Signal (Feb 2026)
- With Cowen expecting a bear market forming, price likely in the green-to-light-blue zone
- Fair value trendline circa Feb 2026: approximately $55,000--$70,000 (using the updated regression)
- Note: the trendline rises monotonically, so fair value continues increasing with time

### Implementation Spec
- **Chart type**: Single log-scale Y-axis (price), linear X-axis (time).
- **Visualization**: 9 horizontal colored bands that curve upward over time (logarithmic growth). Price line plotted on top.
- **Interactive**: Hover shows current band name and distance from trendline. Show projected band values for future dates.
- **Data range**: 2010 to present + 2-year forward projection.
- **Key feature**: The bands should be rendered as filled areas between curves, with transparency (~0.3 alpha).

---

## 3. Bitcoin Dominance Cycle Analysis

### What It Is
Tracks Bitcoin's share of total crypto market capitalization as a cyclical indicator. Cowen uses BTC dominance to determine "where we are in the market cycle." Dominance follows a predictable pattern relative to halving events.

### Cyclical Pattern

```
Phase 1 -- Pre-Halving Accumulation:
  BTC dominance rises as capital flows to safety/quality
  Duration: ~12 months before halving

Phase 2 -- Post-Halving Rally (Year 1):
  BTC dominance continues rising as BTC leads the rally
  Duration: ~6-12 months after halving
  Peak dominance typically occurs here

Phase 3 -- Altseason (Year 1.5-2 post-halving):
  ~230 days post-halving, capital rotates into alts
  BTC dominance declines as altcoins outperform
  Duration: 3-6 months

Phase 4 -- Bear Market:
  BTC dominance rises again as altcoins crash harder
  Cycle resets
```

### Cowen's Key Thesis (2025-2026)
- BTC dominance peaked near 66% in late 2024/early 2025
- Expected to decline through 2025 ("dominance usually falls after halving years")
- Late 2025: warned altcoin-to-BTC pairs could fall 30% further
- BTC.D rising = "not in full risk-on mode"

### Data Inputs
- BTC market cap (daily)
- Total crypto market cap (daily)
- Dominance = BTC_market_cap / Total_crypto_market_cap * 100

### Implementation Spec
- **Chart type**: Area chart with BTC dominance (%) on Y-axis, time on X-axis.
- **Overlays**: Vertical lines marking halving dates (Nov 2012, Jul 2016, May 2020, Apr 2024). Shaded regions for each cycle phase.
- **Secondary axis**: BTC price (log scale) overlaid as a line for correlation.
- **Interactive**: Hover shows dominance %, BTC price, and cycle phase label.
- **Annotations**: Mark historical alt-season start/end points.

---

## 4. Total Crypto Market Cap with Logarithmic Regression

### What It Is
Applies the same logarithmic regression framework used for Bitcoin to the total cryptocurrency market cap. Cowen tracks whether total market cap is above or below its "fair value" trendline.

### Formula

```
log10(Total_Market_Cap) = a * ln(days_since_start) - b

where days_since_start = days since earliest total market cap data (~2013)
```

Exact coefficients are proprietary but the approach mirrors the BTC regression. The trendline represents the long-term growth rate of the entire crypto asset class.

### Key Observations from Cowen
- Total crypto market cap pulled away from the lower part of the regression curve in late 2024
- Was attempting to break above the mid-line
- Bullish long-term projection: growth through 2028
- Fair value oscillates around the trendline; extended deviations above/below represent over/undervaluation

### Data Inputs
- Total cryptocurrency market cap (daily, from 2013 or CoinMarketCap inception)
- Source: CoinGecko API or CoinMarketCap API

### Implementation Spec
- **Chart type**: Log-scale Y-axis (market cap in USD), linear X-axis (time).
- **Visualization**: Central regression trendline (bold) with upper/lower deviation bands (similar to rainbow but fewer bands -- typically 3: upper, fair value, lower).
- **Color**: Red for upper band, white/gray for fair value line, green for lower band.
- **Interactive**: Hover shows current market cap, fair value, and % deviation.
- **Projection**: Extend trendline 2 years forward with dashed line.

---

## 5. Bitcoin ROI from Cycle Lows (Diminishing Returns)

### What It Is
Measures the total return (ROI) from each cycle's trough to its peak, overlaid across cycles to visualize diminishing returns. This is one of Cowen's most cited models -- proving that while Bitcoin continues to make new highs, each cycle produces smaller percentage gains.

### Historical Data

| Cycle | Trough Date | Trough Price | Peak Date | Peak Price | Trough-to-Peak ROI | Bear Drawdown |
|-------|-------------|-------------|-----------|------------|-------------------|---------------|
| 1 | ~Nov 2011 | ~$2 | ~Nov 2013 | ~$1,100 | ~55,000% (550x) | -93.5% |
| 2 | ~Jan 2015 | ~$170 | ~Dec 2017 | ~$19,700 | ~11,500% (115x) | -85.1% |
| 3 | ~Dec 2018 | ~$3,200 | ~Nov 2021 | ~$69,000 | ~2,050% (21x) | -76.9% |
| 4 | ~Nov 2022 | ~$15,500 | ~Q4 2025 | ~$110,000* | ~610% (7x)* | TBD |

*Estimated based on Cowen's cycle peak projections

### Diminishing Returns Pattern
- Each cycle's ROI is roughly 0.15x--0.20x of the previous cycle
- Bear market drawdowns are also diminishing: 93.5% -> 85.1% -> 76.9% -> projected ~65-70%
- Each cycle is approximately 1.54x longer than the previous (lengthening cycles theory -- Cowen declared this "dead" in May 2022 but the diminishing returns thesis persists)

### Cowen's Peak-to-Peak ROI
Cowen also measures ROI peak-to-peak:
- 2013 peak ($1,100) to 2017 peak ($19,700) = ~18x
- 2017 peak ($19,700) to 2021 peak ($69,000) = ~3.5x
- 2021 peak ($69,000) to current cycle = ~1.6x (if $110k peak)

### Data Inputs
- BTC/USD daily price
- Manually identified cycle trough dates and peak dates
- ROI calculated as: (Peak_Price / Trough_Price - 1) * 100

### Implementation Spec
- **Chart type**: Overlay of multiple cycle ROI curves, all starting from day 0 (cycle trough).
- **Y-axis**: ROI percentage (log scale recommended due to large range).
- **X-axis**: Days since cycle trough.
- **Color code**: Different color for each cycle. Current cycle highlighted/bolded.
- **Interactive**: Hover shows day number, ROI %, and equivalent price for each cycle.
- **Secondary view**: Table showing peak-to-peak and trough-to-peak metrics.

---

## 6. ETH/BTC Ratio as Cycle Indicator

### What It Is
The ETH/BTC trading pair acts as an oscillator for the broader altcoin market cycle. Cowen considers it the single most important alt-season indicator. When ETH/BTC is rising, altcoins broadly outperform; when falling, Bitcoin dominates.

### Cowen's Cycle Framework

```
Phase 1 -- ETH/BTC Macro Lower High:
  After each cycle, ETH/BTC makes a lower high
  2017 peak: ~0.15 BTC
  2021 peak: ~0.085 BTC
  Structural decline due to growing BTC ETF narrative

Phase 2 -- Bottoming Process:
  ETH/BTC trends toward lower logarithmic regression band
  Forms a macro higher low (or at least tests previous support)
  2025 bottom: ~0.017 BTC (April 2025, per Cowen)

Phase 3 -- Recovery / Alt Season:
  ETH/BTC recovers toward mid-range
  Typically peaks 12-18 months after BTC halving
  Coincides with BTC dominance declining

Phase 4 -- Reversion:
  ETH/BTC weakens again as cycle ends
  Monetary policy (QT) disproportionately hits altcoins
```

### Key Cowen Observations
- ETH/BTC bottomed in April 2025 (this cycle)
- Peaked in mid-August 2025 alongside ETH ATH
- Typically weakens Sept-Oct, bounces Nov, dips early Dec (2017 pattern)
- ETH unlikely to set new ATH in 2026 if BTC is in bear market
- If ETH reclaims ATH, could be a "bull trap" with reversal to $2,000

### Data Inputs
- ETH/BTC pair daily closing price
- BTC dominance (for overlay)
- Halving dates for cycle markers

### Implementation Spec
- **Chart type**: Line chart, linear Y-axis (ETH/BTC ratio), time X-axis.
- **Overlays**: Logarithmic regression bands (upper/lower) for ETH/BTC. Horizontal lines at key levels (0.03, 0.05, 0.08, 0.10, 0.15).
- **Annotations**: Halving dates, BTC cycle peaks, ETH ATH dates.
- **Color zones**: Green when rising (alt-favorable), Red when falling (BTC-favorable).
- **Interactive**: Hover shows ratio, equivalent USD prices for both assets.

---

## 7. M2 Money Supply Correlation (with Lag Period)

### What It Is
Overlays global M2 money supply (shifted forward by a lag period) against Bitcoin price to demonstrate that Bitcoin broadly tracks global liquidity expansion/contraction, but with a delay.

### Methodology

```
Step 1: Obtain Global M2 data
  Sources: Federal Reserve (FRED), ECB, BOJ, PBOC
  Aggregate into single "Global M2" index

Step 2: Apply time shift
  Shift M2 data forward by lag period
  Common lag: 70-90 days (consensus ~84 days / 12 weeks)

Step 3: Normalize both series
  Index both BTC price and shifted M2 to a common starting point (= 100)
  Or use z-score normalization

Step 4: Calculate rolling correlation
  180-day rolling Pearson correlation between BTC and shifted M2
```

### Lag Period Research

| Lag Period | Correlation | Notes |
|-----------|-------------|-------|
| 42 days (6 weeks) | r = 0.16 | Returns-based correlation |
| 56-60 days | Moderate | Some analyst estimates |
| 70 days | Strong | Commonly cited |
| 84 days (12 weeks) | r = 0.78 | Highest documented correlation |
| 90 days (12-13 weeks) | Strong | Most commonly referenced |
| 102 days | Variable | More recent analyses |

### Important Caveats (from Cowen's framework)
- The correlation is NOT rigid -- 180-day rolling Pearson oscillates between +0.95 and -0.90
- Relationship is conditional and time-varying
- Jan 2024 to early 2025: correlation ~0.65 but weakening
- When macro variables conflict, correlation collapses
- "The lag that worked in one season fails in the next"

### Data Inputs
- Global M2 money supply (monthly or weekly from FRED / central banks)
- BTC/USD daily price
- Lag parameter (configurable, default 84 days)

### Implementation Spec
- **Chart type**: Dual-axis line chart. Left Y-axis = BTC price (log scale). Right Y-axis = Global M2 (indexed).
- **Key feature**: Slider to adjust lag period (0--180 days) so users can see how correlation changes.
- **Secondary panel**: Rolling 180-day Pearson correlation coefficient displayed below the main chart.
- **Color**: BTC line in orange/gold, M2 line in blue. Correlation panel green when >0.5, red when <0.
- **Data range**: 2015 to present.

---

## 8. Fair Value Composite

### What It Is
Cowen's proprietary model that combines multiple regression and on-chain metrics into a single "fair value" line for Bitcoin. The fair value represents the price at which Bitcoin is neither over- nor under-valued based on its growth trajectory.

### Components (Based on Public Descriptions)

```
Fair Value = f(
  1. Logarithmic regression trendline (primary weight)
  2. 200-week SMA (long-term trend baseline)
  3. On-chain metrics (NVT, realized price)
  4. Monetary base (M2 growth rate)
)

The fair value line increases monotonically over time.
Price oscillates around fair value during cycles:
  - Below FV = undervalued (accumulate)
  - Above FV = overvalued (distribute)
```

### Cowen's Key Statement
"The fair value of the asset class increases monotonically with time and [the price] oscillates around that fair value."

In October 2022, Cowen stated crypto assets were "50% undervalued" relative to fair value, predicting a rally back to fair value would take time but was inevitable.

### Risk-Confidence Parameter
Cowen pairs the fair value with a "confidence parameter" ranging from 1 to 9:
- 1 = low confidence (early in cycle, limited data)
- 9 = high confidence (late cycle, abundant confirming signals)

### Data Inputs
- BTC/USD daily price (full history)
- 200-week SMA
- On-chain data: NVT ratio, realized price (from Glassnode or similar)
- M2 money supply growth rate

### Implementation Spec
- **Chart type**: Log-scale price chart with fair value as a bold trendline.
- **Visualization**: Fair value line (white or gold), shaded bands above (red gradient) and below (green gradient) showing % deviation from fair value.
- **Percentage deviation indicator**: Side panel showing current deviation as +X% or -X% from fair value.
- **Interactive**: Hover shows price, fair value, deviation %, and confidence score.

---

## 9. Social Risk / Google Trends Indicator

### What It Is
Quantifies retail investor interest and social media engagement as a risk metric. High social risk historically coincides with cycle tops; low social risk aligns with accumulation opportunities.

### Components (5 Factors)

```
Total Social Risk = weighted_average(
  1. YouTube Subscribers Risk -- growth in subscribers to crypto YouTube channels
  2. YouTube Views Risk -- increase in views on crypto YouTube content
  3. X (Twitter) Analysts Risk -- follower growth for crypto analysts on X
  4. X (Twitter) Exchanges Risk -- follower growth for crypto exchanges on X
  5. X (Twitter) Layer 1 Risk -- follower growth for L1 blockchain projects on X
)

Scale: 0.0 (lowest engagement / lowest risk) to 1.0 (highest engagement / highest risk)
```

### Data Sources
- YouTube: Subscriber and view data from "36 main crypto influencers" on YouTube
- X (Twitter): Follower counts for major crypto analysts, exchanges, and L1 projects
- Exact weighting of each component is undisclosed

### Historical Performance
| Period | Social Risk | BTC Price | What Happened |
|--------|------------|-----------|---------------|
| 2017 peak | ~0.9-1.0 | $20,000 | Blow-off top, 85% crash followed |
| 2019 bottom | ~0.1-0.2 | $3,200 | Accumulation opportunity |
| 2021 peak | ~0.9-1.0 | $69,000 | Cycle top confirmed |
| Late 2022 | ~0.1-0.2 | $15,500 | Cycle bottom |
| 2025 ($100k) | ~0.3-0.5 | $100,000 | Moderate -- not euphoric yet |

### Limitations (Per External Analysis)
- Does not capture TikTok and Instagram engagement (growing share of retail)
- YouTube metrics may lag actual sentiment shifts
- Weighting methodology is not transparent

### Implementation Spec
- **Chart type**: Dual-axis. Left Y-axis = BTC price (log). Right Y-axis = Social Risk (0--1).
- **Visualization**: Price as line chart. Social risk as filled area chart underneath (green at low values, red at high).
- **Breakdown panel**: Toggle to see individual components (YouTube subs, YouTube views, X analysts, X exchanges, X L1s).
- **Data**: Would need to build scrapers for YouTube Analytics API and X API, or use proxy data.
- **Simplified alternative**: Use Google Trends data for "Bitcoin" search term as a proxy (publicly available, highly correlated).

---

## 10. Bitcoin vs S&P 500 Risk-Adjusted Comparison

### What It Is
Compares Bitcoin and the S&P 500 on a risk-adjusted basis using Sharpe and Sortino ratios, as well as rolling correlation analysis. Cowen uses Modern Portfolio Theory frameworks to demonstrate Bitcoin's role in diversified portfolios.

### Key Metrics

```
Sharpe Ratio = (R_asset - R_risk_free) / StdDev(R_asset)

  where:
    R_asset = annualized return of the asset
    R_risk_free = risk-free rate (e.g., 3-month T-bill)
    StdDev = annualized standard deviation of returns

Sortino Ratio = (R_asset - R_risk_free) / Downside_Deviation

  (Only penalizes downside volatility, not upside)
```

### Historical Sharpe Ratio Comparison

| Period | BTC Sharpe | S&P 500 Sharpe | Winner |
|--------|-----------|---------------|--------|
| 1-year (2024) | ~0.82 | ~0.95 | S&P 500 |
| 3-year (2022-2024) | Variable (bear) | ~0.60 | Time-dependent |
| 5-year (2020-2024) | ~1.10 | ~0.74 | Bitcoin |
| 10-year | ~1.50+ | ~0.80 | Bitcoin |

### Cowen's Framework
- Short-term: S&P 500 often has better risk-adjusted returns (less volatile)
- Long-term (5+ years): Bitcoin historically superior
- Optimal portfolio allocation: Cowen discusses 1-10% BTC allocation depending on risk tolerance
- BTC-SPX correlation: Increased post-2020 (institutional adoption), rolling 90-day correlation ranges from -0.2 to +0.7

### Data Inputs
- BTC/USD daily returns
- S&P 500 (SPX) daily returns
- Risk-free rate (3-month US T-bill rate)
- Rolling window parameter (typically 90 or 252 days)

### Implementation Spec
- **Chart type**: Dual-panel. Top: Rolling Sharpe ratio comparison (BTC vs SPX). Bottom: Rolling correlation.
- **Y-axis top**: Sharpe ratio (linear, typically -2 to +4).
- **Y-axis bottom**: Correlation coefficient (-1 to +1).
- **X-axis**: Time (2015 to present).
- **Colors**: BTC in orange, SPX in blue. Correlation panel: green when low (<0.3), red when high (>0.7).
- **Interactive**: Toggle between Sharpe and Sortino ratios. Adjust rolling window (30/90/180/365 days).
- **Summary stats table**: Annualized return, volatility, Sharpe, Sortino, max drawdown for both assets.

---

## Implementation Notes for Site Builder

### Data Sources Summary

| Data Point | Source | API | Update Frequency |
|-----------|--------|-----|-----------------|
| BTC/USD Price | CoinGecko / Yahoo Finance | REST API | Real-time / Daily |
| Total Crypto Market Cap | CoinGecko | REST API | Daily |
| BTC Dominance | CoinGecko / CoinMarketCap | REST API | Daily |
| ETH/BTC Ratio | CoinGecko / Binance | REST/WebSocket | Real-time |
| Global M2 Money Supply | FRED (Federal Reserve) | FRED API | Monthly |
| S&P 500 | Yahoo Finance | yfinance | Daily |
| Risk-Free Rate | FRED | FRED API | Daily |
| YouTube Metrics | YouTube Analytics API | REST API | Weekly |
| X (Twitter) Metrics | X API v2 | REST API | Weekly |
| Google Trends | Google Trends API (pytrends) | REST API | Weekly |

### Recommended Chart Libraries
- **Primary**: Chart.js with chartjs-plugin-annotation (lightweight, responsive)
- **Alternative**: Plotly.js (better for log scales, dual axes, and scientific-style charts)
- **For complex overlays**: D3.js (maximum flexibility)
- **Quick option**: Lightweight Charts by TradingView (purpose-built for financial data)

### Logarithmic Regression Re-fitting
The regression coefficients in models 1, 2, 4, and 8 should be re-fitted periodically:
- Fetch full price history
- Apply `numpy.polyfit` on `(ln(days), log10(price))` data
- Store coefficients and update regression lines
- Recommended: Re-fit monthly or when new ATH is set

### Color Palette for Risk Visualization

```
Risk 0.0: #00C853 (Green -- strong buy)
Risk 0.1: #00E676
Risk 0.2: #69F0AE
Risk 0.3: #B2FF59
Risk 0.4: #EEFF41
Risk 0.5: #FFD600 (Yellow -- neutral)
Risk 0.6: #FFAB00
Risk 0.7: #FF6D00
Risk 0.8: #FF3D00
Risk 0.9: #DD2C00
Risk 1.0: #FF1744 (Red -- strong sell)
```

### Priority Order for Implementation
1. **Bitcoin Risk Metric** -- flagship, most referenced
2. **Logarithmic Regression Rainbow** -- visually iconic, high engagement
3. **Bitcoin ROI from Cycle Lows** -- simple to implement, powerful narrative
4. **ETH/BTC Ratio** -- critical for altcoin analysis
5. **Bitcoin Dominance** -- important context chart
6. **Total Crypto Market Cap Regression** -- extension of #2
7. **M2 Money Supply Correlation** -- macro context
8. **Fair Value Composite** -- complex, partially proprietary
9. **Bitcoin vs S&P 500** -- portfolio context
10. **Social Risk** -- data acquisition challenges (API limitations)

---

## Cowen's Current Cycle Thesis (as of late 2025 / early 2026)

- BTC likely peaked in Q4 2025 (following historical pattern of peaks in Q4 post-election year)
- 50% probability the top is already in
- Bear market bottom could form by October 2026
- 50-week SMA (~$100,000) is key support -- below = bearish confirmation
- ETH unlikely to set new ATH in 2026
- No broad altseason expected in early 2026
- Fed monetary policy (QT) constrains speculative assets
- Counter-trend rally possible in early 2026 before further downside
- More accommodative Fed policy post-2026 could support next growth wave

---

## Sources

- [Into the Cryptoverse](https://intothecryptoverse.com/) -- official platform
- [Bitcoin Risk Metric V2 (Python)](https://github.com/BitcoinRaven/Bitcoin-Risk-Metric-V2)
- [Bitcoin Logarithmic Regression (BitcoinTalk)](https://bitcointalk.org/index.php?topic=831547.0)
- [Coin Bureau -- Bitcoin Rainbow Chart](https://coinbureau.com/education/bitcoin-rainbow-chart/)
- [Bitcoin Rainbow Chart -- Blockchaincenter](https://www.blockchaincenter.net/en/bitcoin-rainbow-chart/)
- [M2 Money Supply Correlation -- TradersPost](https://blog.traderspost.io/article/m2-money-supply-bitcoin-correlation-explained)
- [Social Risk Analysis -- Simon Kellner](https://www.simonkellner.me/blog/ben-cowens-bitcoin-social-risk-indicator-strengths-and-weaknesses)
- [Cowen Interview -- BeInCrypto](https://beincrypto.com/cryptoverse-and-beauty-of-mathematics-interview-with-ben-cowen/)
- [Lengthening Cycles -- BeInCrypto](https://beincrypto.com/bitcoin-btc-cycles-are-lengthening-hypothesis-confirmed/)
- [Bankless Podcast -- Where is Crypto Going in 2026](https://www.bankless.com/podcast/where-is-crypto-going-in-2026-ben-cowen)
- [Bitcoin Cycles -- Hyrotrader](https://www.hyrotrader.com/blog/bitcoin-cycles/)
- [TradingView -- Simplified Risk Metric](https://www.tradingview.com/script/H4iCbDci-Benjamin-Cowen-s-Simplified-Risk-Metric/)
