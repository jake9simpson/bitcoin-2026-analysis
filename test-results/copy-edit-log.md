# Copy Edit Log - BTC v2 Website

**Editor:** copy-editor agent
**Date:** February 16, 2026
**File:** `/Users/jakesimpson/Downloads/team_testing/website/index.html`

## Em-Dash Removal (46 instances total)

Every `&mdash;`, `&ndash;`, and Unicode em-dash/en-dash was removed and replaced with appropriate punctuation.

### Replacement Strategy
- **Comma splice** (most common): when the em-dash set off a quick aside or clarification
- **Period / new sentence**: when the em-dash separated two independent ideas
- **Colon**: when the em-dash introduced an explanation
- **Pipe character**: for the hero badge "Live Analysis | February 16, 2026"
- **Rewritten sentence**: when the em-dash bracketed a parenthetical clause (e.g., "A cascade of macro headwinds -- the Warsh Fed nomination..." became two sentences)

### Lines Changed (by original line number)
1. L292: Hero badge: `&mdash;` to `|`
2. L317: Executive summary desc: `&mdash;` to `,`
3. L322: "What Happened" block: rewrote to eliminate double em-dash parenthetical
4. L342: Section title: `&ndash;` to `to`
5. L356: Flash crash timeline: `&mdash;` to `, an`
6. L357: Whale bounce timeline: `&mdash;` to `, the`
7. L376: Futures OI stat: `&mdash;` to `.`
8. L383: Fear & Greed subtitle: `&mdash;` to `,`
9. L409: Fed hawkish pivot: `&mdash;` to `,`
10. L417: Digital gold collapse: `&mdash;` to `, the`
11. L427: ETF chart subtitle: `&mdash;` to `.`
12. L432: Correlation matrix subtitle: `&mdash;` to `.` (added by concurrent agent)
13. L437: Sharpe ratio subtitle: `&mdash;` to `,` (added by concurrent agent)
14. L443: OI chart subtitle: `&mdash;` to `,`
15. L449: Leverage cascade (two em-dashes): `, with` and `. Options were`
16. L481: Quantum qubits stat: `&mdash;` to `,`
17. L494: Quantum near-term: `&mdash;` to `:`
18. L504: Adam Back quote role: `&mdash;` to `.`
19. L515: Halving section desc: `&mdash;` to `,`
20. L519: Halving chart subtitle: `&mdash;` to `,`
21. L534: Why different block: `&mdash;` to `.`
22. L541: Cycle phase progress: `&mdash;` to `,`
23. L566: Diminishing drawdowns desc: `&mdash;` to `,`
24. L571-575: Five drawdown stat cards: all `&mdash;` to `.`
25. L582: Diminishing chart subtitle: `&mdash;` to `.`
26. L589: Trajectory chart subtitle: `&mdash;` to `.`
27. L596: Log regression subtitle: `&mdash;` to `.`
28. L615: Where we are now: `&mdash;` to `,`
29. L626: Cowen quote role: `&mdash;` to `.`
30. L641: Supply in profit stat: `&mdash;` to `,`
31. L643: Hash ribbons stat: `&mdash;` to `,`
32. L664: Bottoming section desc: `&mdash;` to `.`
33. L667: Fair value chart subtitle: Unicode `—` to `.` (added by concurrent agent)
34. L669: Bottoming stat card: `&mdash;` to `.`
35. L676: Dashboard subtitle: `&mdash;` to `.`
36. L714: Hash ribbons table cell: `&mdash;` to `,`
37. L749: NUPL table cell: `&mdash;` to `.`
38. L765: Bottoming chart subtitle: `&mdash;` to `.`
39. L788: Industry voices desc: `&mdash;` to `.`
40. L879: Price predictions desc: `&mdash;` to `,`
41. L956: Verdict heading: `&mdash;` to `.`

## AI Writing Pattern Fixes

### Phrases Replaced
1. **"comprehensive"** (3 instances): removed from meta description, hero text, and Risk Matrix heading
2. **"A comprehensive, data-driven analysis"** -> "A full, data-driven breakdown"
3. **"Comprehensive Risk Matrix"** -> "Risk Matrix"
4. **"created a perfect storm"** -> "all hit at once"
5. **"Synthesizing the evidence"** -> "Weighing the evidence"
6. **"The weight of evidence tilts toward"** -> "The evidence points to"
7. **"The critical distinction"** -> "The key difference"
8. **"However, the macro headwinds are genuine"** -> "But the macro headwinds are real"
9. **"create a hostile environment"** -> "all work against"
10. **"the clearest evidence"** -> "the clearest sign"
11. **"The key variable is monetary policy"** -> "It comes down to monetary policy"
12. **"constrained supply...provide powerful fuel for recovery"** -> "tight supply plus institutional infrastructure set up a strong recovery"
13. **"This analysis synthesizes data"** -> "This analysis draws from"
14. **"with remarkable precision"** -> "accurately"
15. **"Its absence is the strongest evidence"** -> "Its absence is the strongest sign"
16. **"Historically, the definitive cycle bottom occurs when"** -> "In past cycles, the definitive bottom lined up with"
17. **"would require approximately"** -> "would need roughly"
18. **"yields a projected drawdown of approximately"** -> "projects roughly"
19. **"the severity of bear markets diminishes"** -> "bear markets get shallower"
20. **"lingers over market confidence"** -> "still hangs over the market"
21. **"multi-protocol cascading"** -> "cascading" (removed redundancy)
22. **"this projects a bottom window"** -> "that points to a bottom window"
23. **"as consistent with"** -> "as fitting"
24. **"created persistent buy pressure"** -> "kept steady buy pressure going"
25. **"eclipse halving supply shocks"** -> "dwarf halving supply shocks"

## Continuity & Flow Check
- Section transitions are natural: Hero -> Executive Summary -> Timeline -> Evidence -> Macro -> Market -> Quantum -> Halving -> Drawdowns -> On-Chain -> Bottoming -> Voices -> Risk -> Targets -> Bull Case -> Verdict
- Narrative arc is clear: what happened, why, where we are now, what comes next
- No contradictions found between sections
- Tone is consistent: data-first, direct, confident without hedging
- Voice reads like a senior analyst research brief, not an AI chatbot

## Verification
- Final grep for `&mdash;`, `&ndash;`, Unicode em-dash, and Unicode en-dash: **0 remaining**
- No "comprehensive", "robust", "leverage" (as verb), "significant" in body copy
- No "It's worth noting", "In the context of", "Furthermore", "Moreover", "Additionally"
