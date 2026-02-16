# Deep Research: Bitcoin Analysis v2

*Compiled: February 16, 2026*
*Current BTC Price: ~$68,605*

---

## 1. Quantum Computing Risk to Bitcoin

### Current Threat Level: LOW (but non-zero on 10-year horizon)

#### What's Vulnerable?

Bitcoin uses two cryptographic primitives:

| Component | Algorithm | Quantum Vulnerability | Attack Vector |
|-----------|-----------|----------------------|---------------|
| Transaction signatures | ECDSA (secp256k1) | **HIGH** (Shor's algorithm) | Derive private key from public key |
| Mining/hashing | SHA-256 | **LOW** (Grover's algorithm) | Only provides quadratic speedup |
| Address derivation | RIPEMD-160 + SHA-256 | **MODERATE** | Pre-image attack on hashed addresses |

ECDSA is the primary concern. Shor's algorithm can solve the Elliptic Curve Discrete Logarithm Problem (ECDLP) exponentially faster than classical computers, reducing the time to derive a private key from a public key to hours or days -- if you have a powerful enough quantum computer.

SHA-256 is far more resilient. Grover's algorithm only provides a quadratic speedup (equivalent to reducing 256-bit security to 128-bit), which is still computationally infeasible.

#### How Many Qubits to Break Bitcoin?

| Estimate Source | Logical Qubits Needed | Physical Qubits (with error correction) |
|----------------|----------------------|----------------------------------------|
| Conservative academic | 2,330 - 2,619 | ~2-3 million |
| Optimistic estimates | 523 - 1,500 | ~500K - 1.5 million |
| Current best hardware (2026) | ~1,500 physical qubits | N/A -- nowhere near sufficient |

Current surface code error correction requires approximately 1,000 physical qubits per logical qubit. The gap between current hardware (~1,500 noisy physical qubits) and what's needed (millions of error-corrected physical qubits) is enormous.

#### Timeline Estimates

| Source | Timeline | Confidence |
|--------|----------|------------|
| Adam Back (Blockstream CEO) | 20-40 years | High -- cited NIST post-quantum standards readiness |
| Chamath Palihapitiya (VC) | 2-5 years | Low -- widely considered alarmist |
| Michele Mosca (Waterloo) | 1-in-7 chance by 2026 | Moderate -- probabilistic assessment |
| IBM Quantum Roadmap | 500-1,000 logical qubits by 2029 | Moderate -- corporate roadmap |
| ECDLP Challenge Research | 2027-2033 first plausible collision | Moderate -- based on hardware trend extrapolation |
| Global Expert Survey | 50%+ chance by 2030-2035 (1/3 of respondents) | Moderate |

#### Industry Responses

- **BIP 360**: Drafted by Jameson Lopp, introduces quantum-resistant ML-DSA signatures (selected by NIST in 2024). Multi-year transition plan to phase out ECDSA.
- **BTQ Technologies**: Announced quantum-safe Bitcoin implementation using NIST-standardized post-quantum cryptography (October 2025).
- **SPHINCS+ (FIPS-205)**: Hash-based signature scheme standardized by NIST, considered most battle-tested PQC approach.
- **CoinShares Report (Feb 2026)**: Argued quantum threat is "smaller than people think," calling it manageable.
- **Benchmark Research**: Called quantum risk "long-dated and manageable," pushing back on market panic.

#### Vulnerable Bitcoin Holdings

Early Pay-to-Public-Key (P2PK) addresses expose public keys directly, making them vulnerable even before spending. Satoshi's coins (~1.1M BTC) are in P2PK format. Reused addresses that have exposed their public keys are also at risk.

**Upgrade Timeline Challenge**: Making protocol changes could take 5-10 years due to Bitcoin's conservative governance model.

#### Verdict: Is This FUD or Legitimate?

**Near-term (2026-2028): Mostly FUD.** No quantum computer exists that can threaten Bitcoin today or in the next 2-3 years. The gap between current capabilities and what's needed is orders of magnitude.

**Medium-term (2028-2035): Legitimate concern requiring preparation.** The Bitcoin community needs to begin the transition to post-quantum signatures now, given the 5-10 year upgrade timeline.

**Market Impact**: Bitcoin's YTD underperformance against gold (-6.5% BTC vs +55% gold in 2026) may partially reflect quantum FUD affecting institutional confidence, though macro factors are the primary driver.

---

## 2. Mining Economics Deep Dive

### The Post-Halving Profitability Crisis

The April 2024 halving cut block rewards from 6.25 BTC to 3.125 BTC. Combined with BTC's price decline from $126K to ~$68K, miners face a severe squeeze.

#### Hash Rate & Capitulation

| Metric | Value | Context |
|--------|-------|---------|
| Peak hash rate (Oct 2025) | ~1.2 ZH/s (1,200 EH/s) | All-time high |
| Current hash rate (Feb 2026) | ~950 EH/s | Down ~20% from peak |
| Capitulation duration | 60+ days | One of longest in recent history |
| Difficulty adjustments | 7 negative in last 8 periods | Unprecedented cluster of downward adjustments |
| Next projected adjustment | -16% to -18% (Feb 8-10) | Would bring difficulty to 116-121T |
| Hash revenue decline | -35% YoY | ROI now exceeds 1,000 days for new rigs |

#### Production Costs by Region

| Region/Setup | Electricity Cost ($/kWh) | All-in Cost per BTC | Profitable at $68K? |
|--------------|-------------------------|---------------------|---------------------|
| Texas (industrial) | $0.04 - $0.06 | ~$45,000 - $55,000 | Yes |
| Kazakhstan | $0.03 - $0.05 | ~$40,000 - $50,000 | Yes (but regulatory pressure) |
| Nordic countries | $0.05 - $0.07 | ~$50,000 - $60,000 | Marginal |
| Industrial hosting (US avg) | $0.07 - $0.08 | ~$55,000 - $65,000 | Marginal |
| Residential mining (US) | $0.12 - $0.15 | ~$80,000 - $100,000 | No |
| High-cost regions | $0.15+ | $100,000+ | No |

**Survival threshold**: Only miners with electricity < $0.06/kWh and hardware efficiency < 20 J/TH are reliably profitable.

#### Daily Economics (Typical S21-class Miner)

| Metric | Value |
|--------|-------|
| Daily operating cost | $6 - $8 |
| Daily BTC revenue | $10 - $12 |
| Daily profit margin | $2 - $6 (thin) |
| Production cost per PH/s/day | ~$44 |
| Revenue per PH/s/day | ~$38 |
| Net | **Operating at a loss** for many miners |

#### Public Miner Performance

| Company | Ticker | 2025 YTD Performance | Strategy Pivot |
|---------|--------|---------------------|----------------|
| IREN | IREN | +357% | AI/HPC diversification |
| TeraWulf | WULF | +154% | Energy infrastructure |
| Hut 8 | HUT | +104% | AI/HPC hosting |
| CleanSpark | CLSK | +53% | Pure-play mining |
| Riot Platforms | RIOT | +48% | Paused Corsicana for AI/HPC |
| Core Scientific | CORZ | +18% | AI/HPC conversion |
| MARA Holdings | MARA | **-28%** | Pure-play mining (struggling) |

**Key trend**: Miners pivoting to AI/HPC are massively outperforming pure-play miners. The market is rewarding diversification away from pure Bitcoin mining.

#### Contrarian Signal: Miner Capitulation as Buying Indicator

VanEck research shows:
- When 90-day hashrate growth is negative, BTC has delivered **positive 180-day forward returns 77% of the time**
- Buying during sustained hashrate corrections improves 180-day forward returns by ~**2,400 basis points** (24%)
- Hash Ribbon capitulation metric currently signals a potential price expansion phase

#### Global Mining Distribution

US, China, and Kazakhstan account for **>75% of global Bitcoin mining electricity consumption**. Kazakhstan alone consumed 18,572 GWh for mining in 2025 (~19% of total national grid output), prompting regulatory crackdowns including higher grid fees and new mining taxes.

---

## 3. Halving Cycle Comparison

### Cycle-by-Cycle Data Table

| Metric | Cycle 1 (2012) | Cycle 2 (2016) | Cycle 3 (2020) | Cycle 4 (2024) |
|--------|---------------|---------------|---------------|---------------|
| **Halving date** | Nov 28, 2012 | Jul 9, 2016 | May 11, 2020 | Apr 20, 2024 |
| **Block reward** | 50 -> 25 BTC | 25 -> 12.5 BTC | 12.5 -> 6.25 BTC | 6.25 -> 3.125 BTC |
| **Price at halving** | ~$12 | ~$650 | ~$8,500 | ~$63,850 |
| **Cycle peak price** | ~$1,150 | ~$19,700 | ~$69,000 | ~$126,200 |
| **Peak date** | Nov 30, 2013 | Dec 17, 2017 | Nov 10, 2021 | Oct 6, 2025 |
| **Days halving to peak** | ~367 days | ~526 days | ~548 days | ~534 days |
| **Peak-to-peak gain** | N/A | +1,613% | +250% | +83% |
| **Halving-to-peak gain** | +9,483% | +2,931% | +712% | +98% |
| **Cycle bottom price** | ~$170 | ~$3,200 | ~$15,476 | ~$60,062 (so far) |
| **Bottom date** | Jan 2015 | Dec 2018 | Nov 2022 | Feb 2026 (so far) |
| **Days peak to bottom** | ~425 days | ~363 days | ~376 days | ~133 days (ongoing) |
| **Peak-to-bottom decline** | -85% | -84% | -78% | -52% (so far) |

### Key Observations

1. **Diminishing returns**: Each cycle produces smaller percentage gains. Cycle 1: +9,483%, Cycle 2: +2,931%, Cycle 3: +712%, Cycle 4: +98%.

2. **Timing consistency**: Peak occurs ~367-548 days after halving (12-18 months). The 2024 cycle peaked at 534 days, consistent with historical patterns.

3. **Drawdown severity decreasing**: -85%, -84%, -78%, -52% (so far). If the pattern holds, this cycle's bottom may be shallower.

4. **The "$60K floor" thesis**: Bitcoin briefly touched $60,062 in early February 2026. If this holds as the cycle bottom, the -52% drawdown would be the shallowest in Bitcoin history.

### Halving-to-Peak Timeline (Chartable Data)

| Days After Halving | Cycle 1 (2012) | Cycle 2 (2016) | Cycle 3 (2020) | Cycle 4 (2024) |
|--------------------|---------------|---------------|---------------|---------------|
| 0 (halving) | $12 | $650 | $8,500 | $63,850 |
| 90 | $30 | $750 | $11,500 | $72,000 |
| 180 | $120 | $900 | $18,000 | $95,000 |
| 270 | $250 | $1,200 | $35,000 | $108,000 |
| 365 | $1,000 | $2,500 | $56,000 | $126,200 (peak) |
| 450 | $700 (post-peak) | $4,200 | $64,000 | $90,000 |
| 540 | $350 | $8,000 | $69,000 (peak) | $68,000 (current) |
| 630 | $250 | $17,000 | $47,000 | TBD |
| 700 | $175 (near bottom) | $19,700 (peak) | $35,000 | TBD |

### This Cycle Is Different Because...

1. **Spot ETFs launched pre-halving** (Jan 2024) -- institutional capital entered earlier than any previous cycle.
2. **Corporate treasury adoption** (MicroStrategy, others) created persistent buy pressure.
3. **The cycle peaked earlier** relative to the halving (534 days vs typical 540-550 for recent cycles).
4. **Price entered halving at all-time high territory**, unlike previous cycles where halvings occurred well below prior ATH.
5. **Diminishing returns are accelerating** -- some analysts argue the 4-year cycle is "breaking" due to institutional participation smoothing volatility.

---

## 4. Derivatives & Options Market

### Current Options Market Structure

| Metric | Current Value | Context |
|--------|--------------|---------|
| Put/Call Ratio | 0.38 | 38 puts per 100 calls -- strongly bullish positioning |
| BITO ETF Put/Call (20-day OI) | 0.546 | Moderately bullish |
| Max Pain (recent expiry) | $96,000 | Significant upside skew |
| Implied Volatility (IV) | 57.08% | Elevated |
| IV Rank | 82.51 | Very high -- in top quintile of historical range |
| Deribit BTC DVOL | ~45-63% range | Pulled back from Nov 2025 highs |
| Implied Move (Feb 20 expiry) | $2,466 (7.9%) | Significant expected volatility |

### Open Interest & Leverage

| Metric | Value | Change |
|--------|-------|--------|
| Peak futures OI (Oct 2025) | ~$94.1 billion | At cycle high |
| Current futures OI (Feb 2026) | ~$54.6 billion | **-42% decline** |
| Funding rates (peak) | +0.51% BTC / +0.56% ETH | Extremely elevated |
| Current funding rates | Normalized | Post-deleveraging |

### How Derivatives Amplify Spot Moves

**Cascade Liquidation Mechanism:**
1. **Upward cascades**: Short positions get liquidated, triggering market buy orders, which push price higher, liquidating more shorts.
2. **Downward cascades**: Long positions get liquidated, triggering market sell orders, pushing price lower, liquidating more longs.
3. **Post-deleveraging (current state)**: With OI down 42%, marginal price-setting power has shifted from leveraged traders back to spot investors and ETF flows. This typically reduces crash risk but increases sensitivity to large one-off reallocations.

### Year-End Options Expiry Context

The December 2025 "Boxing Day" expiry saw $27 billion in BTC and ETH options expire, one of the largest single-day expirations in crypto history. This mass expiry contributed to the Q4 2025 volatility.

---

## 5. On-Chain Metrics Dashboard

### Current Metric Values (February 2026)

| Metric | Current Value | Historical Context | Signal |
|--------|--------------|-------------------|--------|
| **MVRV Z-Score** | 1.32 | Overheated > 7, bottom < 0 | **Fair value / accumulation zone** |
| **MVRV Ratio** | 1.5 | Market price 50% above realized price | **Moderate -- not overheated** |
| **NUPL** | "Anxiety" phase | Peak zone > 0.75, capitulation < 0 | **Bearish sentiment, historically bullish entry** |
| **Supply in Profit** | 11.1M BTC (~55%) | 8.9M BTC in loss | **Approaching convergence levels** |
| **Supply in Loss** | 8.9M BTC (~45%) | | **Elevated -- historically precedes bottoms** |
| **Realized Price** | ~$45,000-$50,000 (est.) | Average cost basis of all BTC | **Market price well above realized** |
| **Hash Ribbons** | Capitulation signal active | | **Historically bullish contrarian signal** |

### MVRV Z-Score Historical Peaks and Bottoms

| Cycle | Peak MVRV Z-Score | Bottom MVRV Z-Score |
|-------|-------------------|---------------------|
| 2013 | ~9.5 | ~-0.4 |
| 2017 | ~9.0 | ~-0.3 |
| 2021 | ~7.5 | ~-0.2 |
| 2025 (this cycle) | ~4.5 (at Oct peak) | 1.32 (current) |

Current MVRV Z-Score of 1.32 suggests significant room before overheated territory (historically >7), but also far from cycle bottom territory (<0).

### Supply in Profit/Loss Convergence

A critical metric: when supply in profit and supply in loss converge (approach 50/50), it has historically coincided with major cycle bottoms. Current readings (55% in profit, 45% in loss) are approaching convergence. Full convergence at current cost basis levels would imply a spot price near $60,000 -- very close to the Feb 5 low of $60,062.

### NUPL Phase Progression

| Phase | NUPL Range | Current Cycle Status |
|-------|-----------|---------------------|
| Capitulation | < 0 | Not reached |
| Hope/Fear | 0 - 0.25 | Not reached |
| **Anxiety** | **0.25 - 0.5** | **Current phase (Q1 2026)** |
| Belief | 0.5 - 0.75 | Fell from here after Oct 2025 sell-off |
| Euphoria/Greed | > 0.75 | Hit in Oct 2025 near peak |

### Macro Context for On-Chain Data

Coinbase and Glassnode noted that crypto markets entered 2026 "in a healthier condition" after excess leverage was flushed out during Q4 2025. The deleveraging process, while painful, removed speculative froth and positioned the market for a more sustainable recovery.

---

## 6. Price Trajectory & Analyst Forecasts

### Current Price Context

| Data Point | Value |
|-----------|-------|
| Current price (Feb 16, 2026) | ~$68,605 |
| All-time high | $126,210 (Oct 6, 2025) |
| Decline from ATH | -46% |
| February 2026 low | $60,062 (Feb 5) |
| February 2026 high | ~$78,400 (Feb 1) |
| Key support levels | $60,000, $55,000, $45,000 (realized price) |
| Key resistance levels | $70,000, $80,000, $96,000 (max pain) |

### Analyst Price Targets for 2026

| Source | Bear Case | Base Case | Bull Case |
|--------|-----------|-----------|-----------|
| Fidelity (Jurrien Timmer) | $60,000-$75,000 support | Consolidation year | -- |
| Grayscale / Bitwise | -- | -- | Institutional demand breaks cycle |
| InvestingHaven | -- | $80,840 - $151,150 | -- |
| 4chan Trader (77.8% accuracy) | -- | -- | $250,000 |
| CoinGecko Analyst Survey | $60,000 | Mid-range | $250,000 |
| Charles Edwards (Capriole) | < $50,000 (if no quantum fix) | -- | -- |

---

## Sources

- [CoinDesk - Bitcoin Quantum Upgrade 5-10 Years](https://www.coindesk.com/tech/2025/12/22/bitcoin-isn-t-under-quantum-threat-yet-but-upgrading-it-could-take-5-10-years)
- [CoinMarketCap - AI Quantum Computing Break Bitcoin 2026](https://coinmarketcap.com/academy/article/ai-quantum-computing-break-bitcoin-encryption-2026)
- [CoinShares - Quantum Vulnerability Manageable Risk](https://coinshares.com/us/insights/research-data/quantum-vulnerability-in-bitcoin-a-manageable-risk/)
- [Chaincode Labs - Bitcoin Post-Quantum PDF](https://chaincode.com/bitcoin-post-quantum.pdf)
- [CoinDesk - BTC Hashrate Drops 15%](https://www.coindesk.com/markets/2026/01/19/btc-hashrate-drops-15-from-october-high-as-miner-capitulation-drags-into-almost-60-days)
- [CCN - Mining ROI 1000 Days](https://www.ccn.com/education/crypto/bitcoin-mining-roi-1000-days-hash-revenue-down-35-survival-explained/)
- [CoinDesk - Hash Ribbon Capitulation](https://www.coindesk.com/markets/2026/01/27/as-bitcoin-miners-cut-unprofitable-production-hash-ribbon-metric-points-to-btc-price-rebound)
- [VanEck - December 2025 Bitcoin ChainCheck](https://www.vaneck.com/us/en/blogs/digital-assets/matthew-sigel-vaneck-mid-december-2025-bitcoin-chaincheck/)
- [Bitcoin CounterFlow - After Halving Chart](https://bitcoincounterflow.com/charts/after-halving-comparison/)
- [Kaiko Research - Bitcoin Halving Anniversary](https://research.kaiko.com/insights/bitcoins-halving-anniversary-this-time-was-different)
- [Cointelegraph - Adam Back Quantum 20-40 Years](https://cointelegraph.com/news/bitcoin-quantum-threat-decades-post-quantum-migration)
- [CoinDesk - Quantum Threat Smaller Than People Think](https://www.coindesk.com/markets/2026/02/09/the-quantum-threat-to-bitcoin-is-smaller-than-people-think-coinshares)
- [CoinGlass - Options Data](https://www.coinglass.com/options)
- [Bitcoin Magazine Pro - MVRV Z-Score](https://www.bitcoinmagazinepro.com/charts/mvrv-zscore/)
- [KuCoin - On-Chain Metrics Market Reset 2026](https://www.kucoin.com/news/flash/on-chain-metrics-suggest-bitcoin-s-market-reset-in-early-2026)
- [CoinDesk - Supply in Profit Bottom Signal](https://www.coindesk.com/markets/2026/02/04/this-onchain-metric-has-identified-the-bitcoin-bottom-every-cycle)
- [CNBC - Bitcoin Drops Below $61,000](https://www.cnbc.com/2026/02/05/bitcoin-price-today-70000-in-focus.html)
- [CNBC - Bitcoin Rebounds Above $70,000](https://www.cnbc.com/2026/02/06/bitcoin-price-today-60000-in-focus.html)
- [CoinGecko - Bitcoin Halving Price History](https://www.coingecko.com/research/publications/bitcoin-halving-price-history)
- [CoinGecko - Bitcoin Price Predictions 2026](https://www.coingecko.com/learn/bitcoin-price-predictions-expert-forecasts)
