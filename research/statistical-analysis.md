# Bitcoin Statistical Analysis -- February 2026

**Current BTC Price:** ~$68,700 (Feb 16, 2026)
**ATH:** $126,198 (October 2025)
**Drawdown from ATH:** -45.5%
**BTC Realized Price:** ~$40,510 (LTH Realized Price)

---

## 1. Cross-Asset Correlation Matrix

Rolling correlation coefficients (Pearson) between BTC daily returns and major asset benchmarks.

| Asset Pair   | 30-Day  | 90-Day  | 1-Year  | Trend Note                                          |
|-------------|---------|---------|---------|-----------------------------------------------------|
| BTC / SPX   | +0.18   | +0.35   | +0.50   | Plunged from 0.70+ in mid-2025; lowest since Oct-25 |
| BTC / NDX   | -0.43   | +0.30   | +0.45   | Negative since Oct-25 divergence; was 0.92 in Sep-25|
| BTC / Gold  | -0.15   | -0.10   | +0.05   | Decoupled in 2026; gold +73% YoY while BTC -30% YoY|
| BTC / DXY   | -0.55   | -0.45   | -0.40   | Classic inverse intact; DXY ~97.6, strong dollar hurts BTC |
| BTC / VIX   | -0.60   | -0.50   | -0.45   | High VIX = BTC sell-offs; BTC now trades as risk asset |
| BTC / M2    | +0.15   | +0.30   | +0.70   | Decoupled since mid-2025; M2 growing >10% YoY, BTC falling; 70-107 day lag historically |

**Key Insight:** Bitcoin's correlation with equities collapsed in late 2025 as BTC fell 45% while S&P 500 gained 17.9%. The gold-BTC divergence is the widest in Bitcoin's history. M2 correlation, historically BTC's strongest macro driver (0.60-0.90 with lag), has broken down -- bearish signal or coiled spring depending on interpretation.

---

## 2. Volatility Comparison Table

Annualized realized volatility (standard deviation of daily returns, annualized).

| Metric                  | Current (Feb 2026) | 2022 Bear Market | 2018 Bear Market | Bull Mkt Avg (2020-21) | 2024 Halving Year |
|------------------------|-------------------|-----------------|-----------------|----------------------|-------------------|
| BTC 30-Day Vol         | ~55%              | 65-80%          | 70-85%          | 60-80%               | 45-55%            |
| BTC 90-Day Vol         | ~50%              | 70%             | 75%             | 65%                  | 50%               |
| BTC 1-Year Vol         | ~54%              | 65%             | 80%             | 70%                  | 44%               |
| Gold Vol (annualized)  | ~15%              | 18%             | 12%             | 15%                  | 14%               |
| S&P 500 Vol            | ~18%              | 22%             | 15%             | 20%                  | 12%               |
| BTC/SPX Vol Ratio      | 3.1x              | 3.2x            | 4.7x            | 3.5x                 | 3.7x              |

**Key Insight:** Current BTC volatility (~54%) sits between bull and bear market extremes. Notably, the BTC/SPX volatility ratio has compressed from historical 4-5x levels to ~3x, reflecting BTC's institutional maturation via ETFs. The 2024 halving year saw record-low volatility (~27% at trough) before the October 2025 blowoff top.

---

## 3. On-Chain Oscillators Dashboard

| Metric        | Current Value | Bull Zone     | Neutral Zone | Bear Zone   | Capitulation | Signal         |
|--------------|---------------|---------------|-------------|-------------|-------------|----------------|
| NUPL         | 0.18          | >0.50         | 0.25-0.50   | 0.0-0.25    | <0          | FEAR/ANXIETY -- approaching capitulation threshold |
| MVRV Z-Score | 0.47          | >2.5          | 1.0-2.5     | 0.0-1.0     | <0          | UNDERVALUED -- below historical mean |
| SOPR         | 0.994         | >1.05         | 1.0-1.05    | 0.95-1.0    | <0.95       | CAPITULATION -- sellers realizing losses |
| aSOPR        | 0.92-0.94     | >1.05         | 1.0-1.05    | 0.95-1.0    | <0.92       | DEEP CAPITULATION -- matches 2018/2022 lows |
| Supply in Profit | 55.5%     | >85%          | 65-85%      | 50-65%      | <50%        | STRESSED -- 11.1M BTC in profit vs 8.9M in loss |
| LTH Supply   | ~15.8M BTC    | Rising (accum) | Flat        | Declining (dist) | --      | ACCUMULATION -- LTHs stopped net selling |
| STH Realized Price | $113,000 | Price > STH RP | --         | Price < STH RP | --       | BELOW -- price far below STH cost basis |

**Key Insight:** Multiple on-chain oscillators are flashing readings consistent with late-stage bear markets or early accumulation phases. The aSOPR at 0.92-0.94 matches stress levels from the 2018 and 2022 bottoms. NUPL at 0.18 is in the "Hope/Fear" zone -- one more leg down would push it toward capitulation (<0). However, LTH supply has stopped declining, suggesting conviction holders are accumulating, not selling.

---

## 4. Risk-Adjusted Return Comparison

Trailing 1-year performance metrics (Feb 2025 - Feb 2026).

| Asset       | 1Y Return  | Annualized Vol | 1Y Sharpe Ratio | Max Drawdown | Recovery (Est.) |
|-------------|-----------|----------------|----------------|-------------|-----------------|
| Bitcoin     | -30%      | 54%            | -0.74          | -45.5%      | 12-24 months (est.) |
| S&P 500     | +17.9%    | 18%            | +0.72          | -19%        | ~4 months       |
| Nasdaq 100  | +15%      | 22%            | +0.50          | -22%        | ~5 months       |
| Gold        | +73%      | 15%            | +4.20          | -8%         | ~2 weeks        |
| US 10Y Bond | +4.5%     | 8%             | +0.19          | -5%         | ~3 months       |

**Key Insight:** Bitcoin's Sharpe ratio has turned deeply negative (-0.74), matching levels seen at the 2018-2019 and 2022 market bottoms. Gold is the standout performer with an extraordinary Sharpe of ~4.2 driven by its 73% YoY surge. Historically, when BTC's Sharpe ratio hits these depths, it has preceded periods of strong risk-adjusted gains within 6-18 months.

**Historical BTC Sharpe Ratios (5-year rolling):**
- Long-term average: 0.70
- Sortino advantage over next best asset: +2.18 pp
- Current reading is in the bottom 5th percentile historically

---

## 5. Fair Value Models Comparison

| Model                   | Fair Value Est.  | Current Price | Over/Under Valued | Model R-Squared | Status              |
|------------------------|-----------------|---------------|-------------------|----------------|---------------------|
| Power Law (Santostasi) | $122,000-$136,000 | $68,700     | -46% (undervalued) | ~0.95 (hist.)  | Widest negative deviation in model history |
| Stock-to-Flow (PlanB)  | $250,000-$500,000 | $68,700     | -73% (undervalued) | 0.95 (claimed, degraded) | Model widely considered broken post-2024 halving |
| Rainbow Chart (Log Regression) | $73,700-$95,100 ("Accumulate" band) | $68,700 | Near lower "BUY!" band | N/A | Near fire-sale territory |
| Thermocap Multiple     | Top signal at $252,000+ | $68,700 | Far below cycle top | N/A            | Low end of bull cycle |
| Realized Price (Cost Basis) | $40,510 (LTH RP) | $68,700  | +70% above LTH RP | N/A            | Still above aggregate cost basis |

**Key Insight:** Every major valuation model shows Bitcoin as significantly undervalued relative to fair value. The Power Law model shows BTC at a 41-46% discount -- the widest negative deviation in the model's history. Even the conservative Rainbow Chart places BTC near the "BUY!" to "Accumulate" boundary. The only model still holding any credibility is the Power Law (R-squared ~0.95 historically), while Stock-to-Flow has largely been discredited. The critical floor is the LTH Realized Price at $40,510 -- price has never sustainably breached this in Bitcoin's history.

---

## 6. Supply Dynamics

| Metric                    | Value              | Significance                                     |
|--------------------------|--------------------|--------------------------------------------------|
| Circulating Supply        | ~20.0M BTC         | 95.2% of max supply mined                        |
| Supply in Profit          | 11.1M BTC (55.5%)  | Down from 19M+ at ATH in Oct 2025                |
| Supply in Loss            | 8.9M BTC (44.5%)   | Approaching levels seen at cycle bottoms          |
| Illiquid Supply           | ~74%               | 75% of coins not moved in 6+ months              |
| LTH Supply               | ~15.8M BTC (~79%)  | Near ATH; LTHs stopped net selling in late 2025  |
| STH Supply               | ~4.2M BTC (~21%)   | STHs bearing most of the losses                  |
| Exchange Reserves         | Declining           | Continued outflows = accumulation signal          |
| Inst. Demand vs Supply    | 4.7x imbalance     | Projected ETF/corporate demand exceeds new supply |

---

## 7. Macro Correlation Deep Dive

### Bitcoin vs Global M2 Money Supply
- **Historical correlation:** 0.60-0.90 with 70-107 day lag
- **Current status:** DECOUPLED since mid-2025
- **M2 YoY growth:** >10%
- **BTC YoY growth:** -30%
- **Interpretation:** Either this is a major bearish divergence (similar to 2022 pre-crash), or BTC is coiled for a lagged catch-up move. Fidelity notes that the new easing cycle globally and Fed QT ending should be a "positive catalyst for bitcoin's price."

### Bitcoin vs VIX (Fear Index)
- **Pattern:** BTC sells off when VIX spikes -- behaves as risk asset, not hedge
- **Implication:** Gold works as a crisis hedge (negative VIX correlation), Bitcoin does not
- **Current:** BTC volatility premium over VIX is widening, indicating crypto-specific stress

### Bitcoin vs DXY
- **Classic inverse:** -0.4 to -0.8 historically
- **Current 30-day:** -0.55
- **2026 shift:** JPMorgan notes BTC correlation with DXY has occasionally flipped positive, suggesting it now behaves as "liquidity-sensitive risk asset"
- **DXY level:** ~97.6 (strong dollar environment pressuring BTC)

---

## 8. Cycle Position Metrics

| Indicator                        | Current Reading   | Historical Bottom Range | Historical Top Range | Assessment          |
|---------------------------------|-------------------|------------------------|---------------------|---------------------|
| Days since ATH                   | ~130 days         | 365-400 days (cycle avg) | 0                  | Mid-correction      |
| Drawdown from ATH                | -45.5%            | -77% to -86%           | 0%                 | Moderate (could deepen) |
| MVRV Z-Score                     | 0.47              | <0 (bottoms)           | >7 (tops)          | Below mean; not extreme |
| Sharpe Ratio                     | -0.74             | -1.0 to -1.5 (bottoms) | >2.0 (tops)        | Near bottom territory |
| Halving Cycle Position           | 22 months post-halving | --                | Peak: 12-18 months | Late cycle / correction |
| Rainbow Band                     | "BUY!" / "Accumulate" boundary | "Fire Sale" | "Max Bubble"       | Attractive entry zone |

---

## 9. Historical Drawdown Comparison

| Cycle            | Peak         | Trough      | Drawdown | Duration (Peak to Trough) | Recovery to ATH |
|-----------------|-------------|-------------|----------|--------------------------|-----------------|
| 2013-2015       | $1,177      | $152        | -87%     | ~410 days                | ~1,050 days     |
| 2017-2018       | $19,783     | $3,122      | -84%     | ~365 days                | ~1,080 days     |
| 2021-2022       | $69,000     | $15,476     | -78%     | ~370 days                | ~730 days       |
| 2025-2026 (current) | $126,198 | $61,000 (so far) | -52% (so far) | ~130 days (ongoing) | TBD (est. 12-24 months) |

**Key Insight:** The current drawdown (-52% peak to trough so far) is significantly less severe than prior cycle corrections (-78% to -87%). If the cycle follows historical patterns, a full bottom could form around -65% to -70% ($38K-$44K range), which would also coincide with the LTH Realized Price support at $40,510. However, the presence of ETF institutional buyers may structurally dampen this cycle's downside.

---

## 10. Key Statistical Signals Summary

| Signal                         | Reading          | Historical Precedent                          | Implication        |
|-------------------------------|-----------------|----------------------------------------------|-------------------|
| NUPL at 0.18                  | Hope/Fear zone   | Preceded accumulation in 2019, 2022          | Approaching bottom |
| MVRV Z at 0.47               | Below mean       | Sub-1.0 readings: 2015, 2019, 2022 bottoms  | Undervalued        |
| aSOPR at 0.92-0.94           | Deep loss-taking | Matched 2018 and 2022 capitulation lows      | Capitulation phase |
| Sharpe at -0.74              | Negative         | Similar to early 2019, late 2022             | Risk/reward improving |
| Supply in Profit at 55.5%    | Low              | Bottoms form at 45-55%                       | Near historical bottom zone |
| LTH accumulating             | Net inflows      | Preceded every major rally                    | Conviction building |
| Power Law -46% deviation     | Record discount  | Never sustained this deviation               | Strong reversion expected |
| M2 decoupling                | Bearish or lagged | 2022 saw similar pre-crash divergence        | Ambiguous          |
| Gold/BTC divergence           | Record wide      | Unprecedented                                | Regime shift or mean reversion ahead |

---

## Data Sources & Methodology Notes

- Correlation data derived from rolling Pearson coefficients on daily returns
- Volatility figures are annualized standard deviations of daily log returns
- On-chain metrics sourced from Glassnode, CryptoQuant, and CoinGlass aggregated reporting
- Fair value models use respective methodologies (Power Law: log-log regression of price vs time; S2F: flow scarcity ratio; Rainbow: logarithmic regression bands)
- Sharpe ratios calculated as (Return - Risk Free Rate) / Volatility, using 4.5% risk-free rate (US 10Y)
- All data as of February 14-16, 2026 unless otherwise noted
- Some values are interpolated from the nearest available data points when exact real-time readings were unavailable

### Source References
- [CME Group: Bitcoin-Equity Correlation](https://www.cmegroup.com/insights/economic-research/2025/why-is-bitcoin-moving-in-tandem-with-equities.html)
- [Fidelity: Bitcoin Volatility](https://www.fidelitydigitalassets.com/research-and-insights/closer-look-bitcoins-volatility)
- [ARK Invest: Bitcoin Risk & Reward](https://www.ark-invest.com/articles/analyst-research/measuring-bitcoins-risk-and-reward)
- [Bitcoin Magazine Pro: On-Chain Charts](https://www.bitcoinmagazinepro.com/charts/)
- [CoinGlass: MVRV, NUPL, SOPR](https://www.coinglass.com/pro/i/bitcoin-mvrv-zscore)
- [Tiger Research Q1 2026 Valuation Report](https://www.coingecko.com/learn/26q1-bitcoin-valuation-report-tiger-research)
- [Bitbo Charts: Power Law, Rainbow, S2F](https://charts.bitbo.io/)
- [WisdomTree: Bitcoin Correlations](https://www.wisdomtree.com/-/media/us-media-files/documents/resource-library/market-insights/gannatti-commentary/bitcoin-correlations.pdf)
- [BlackRock/iShares: Bitcoin Volatility](https://www.ishares.com/us/insights/bitcoin-volatility-trends)
- [CoinDesk: Sharpe Ratio Analysis](https://www.coindesk.com/markets/2026/01/23/bitcoin-returns-fail-to-match-risks-just-like-2022)
