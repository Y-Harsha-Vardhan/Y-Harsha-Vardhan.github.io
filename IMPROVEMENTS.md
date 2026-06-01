# Portfolio — Action Plan

A working document for closing the gap between *polished container* (where the site is) and *content worth shortlisting* (where it needs to be).

**Current rating: 8.0 / 10.** Visual layer and writeups are top-decile for a student portfolio. The remaining ceiling is project depth and originality — items that cannot be solved by more polish.

---

## Recap — what's shipped

The site has been through two waves of work:

**Wave 1 — credibility blockers (Tier 1 of the old audit):**
- §1.1 ✅ — 9 dedicated writeup pages under `assets/writeups/`, grounded in actual repo source
- §1.3 ✅ — skill rings → grouped tag cloud + "Currently learning"
- §1.4 ✅ — concrete hero headline + Summer 2027 status pill
- §1.5 ✅ partial — tutorial-flavored projects reframed inside writeups (LSTM acknowledges its limits)
- §1.6 ✅ — live Codeforces badge (rating + rank + official rank colors + 1-hr cache)
- §2.5 ✅ — full footer (brand, social, meta, source link, honest authorship)

**Wave 2 — interaction & content layer:**
- 9 writeup pages built from actual source code (7 read locally, 2 via GitHub README)
- Linear/Raycast-style anchored preview popover replacing direct navigation
- About-section "currently going deeper on …" footnote
- Whole-site palette swap to minimal black + blue
- No-FOUC reveal pattern + 2.5s safety-net
- Accessibility: focus-visible, ARIA labels, prefers-reduced-motion
- Dead-CSS cleanup pass

**Wave 3 — tier-A mechanical polish (just shipped):**
- Phone number removed from public contact panel
- Metric chips on every project card (Top 10 · SoQ '25, Depth 32, 5000-node graphs, etc.)
- Resume goes side-by-side (Education + Experience) at ≥1024px; tabs kept for mobile
- Every off-site `<a>` audited — `target="_blank" rel="noopener noreferrer"` everywhere, including the popover "View full writeup" button
- Cursor-glow opacity dropped from 28% to 12% — ambient, not eager
- Hero layout fix — long sub-tagline no longer pushes CTAs below the fold
- Top-of-page dark shade so the hero opens on a clean black canvas before the aurora emerges
- Résumé PDF wired up — "Download résumé" button in hero CTAs + "Download PDF" pill in the Resume section header (serves `assets/HarshaVardhan-Resume.pdf`)
- "Copy link" affordance on every writeup nav — clipboard write with "Copied" feedback, falls back to `execCommand` for non-secure contexts

**Net effect:** the polished container is essentially done. Further design work yields diminishing returns.

---

## What still hurts the candidate (in priority order)

Ordered by **impact on shortlist decision**, not by effort. Each item is tagged `[CLAUDE]` (I can ship it without you), `[USER]` (you must provide content / take action), or `[USER + CLAUDE]` (collaboration).

### Tier A — Mechanical, ship today

These are small, deterministic, and disproportionately costly to leave broken.

#### A2 · Replace the avatar with a real photo  `[USER + CLAUDE]`
**Why:** The current avatar reads as filtered/AI-generated. Against the rest of the design (sober and grown-up), it lowers the perceived seriousness of the whole hero.
**You provide:** a phone-camera headshot against a plain wall, well-lit. Or decide to remove the avatar entirely.
**I do:** drop into `assets/images/`, retune the avatar frame styling if needed, or remove and recompose the hero as a single text column.
**Effort:** 15 min after the photo exists.
**Impact:** medium-large — lifts the entire hero.

---

### Tier B — Project section, ship this week

These move the project grid from "coursework with a few standouts" to "curated portfolio."

#### B1 · Remove or replace the two weakest cards  `[USER decides]`
**Why:** The Cricket Scoring System is first-year coursework; the Restaurant E-Commerce is a team project under someone else's account with thin documentation. Both *lower* the average perceived quality of the project grid. Six strong projects beat nine mixed-quality ones.

**Decision needed from you (one per card):**

| Card | Options |
|---|---|
| Cricket Scoring | (a) remove entirely · (b) keep but downgrade — smaller card, no popover · (c) keep as-is |
| Restaurant E-Commerce | (a) remove entirely · (b) keep but caption it more clearly as a learning project |

**My recommendation:** remove both. The grid will still hold 7 cards, balanced across systems / ML / web / quant. The remaining cards all pass a "would this hold up in an interview?" test; these two arguably don't.

**Effort (after you decide):** 10 min — remove cards, remove writeup files, update IMPROVEMENTS.md.

#### B2 · Drop the LSTM card OR commit to keeping it  `[USER decides]`
**Why:** Stock-price LSTM is the single most common ML tutorial topic. The current writeup is unusually honest about this — the problem isn't the writeup, it's that the *card title* is the first thing a quant reviewer sees, and they will visibly flinch before clicking through to read the nuance.

**Two paths:**
- **Drop it.** Quant reviewers stop wincing. ML reviewers don't miss it.
- **Keep + reframe the card.** Change the card subtitle from *"Time-series forecasting with a sequence model"* to *"What happens when you naively apply LSTMs to financial time series — and why."* This turns the card from a tutorial-flavored title into an opinion-bearing one.

**Recommendation:** drop, unless you genuinely intend to expand it (e.g. add a persistence-baseline comparison and a "here's what actually works better" appendix).

#### B3 · Rewrite the About section's section-lead paragraph  `[USER + CLAUDE]`
**Why:** Current copy ("strong interest in systems, web development, and problem-solving … building clean, efficient interfaces") could be on any CS undergrad's page. It is true and tells me nothing specific about you.

**You provide (any one of):**
- A problem that obsessed you for weeks.
- A paper, book, or codebase that changed how you think.
- A project that failed and what you learned from it.
- A specific reason for the systems-and-quant combination, in your own voice.

**I do:** turn it into 2-3 sentences that fit the existing tone but say something only you could say.
**Effort:** 30 min of your honest thinking, 10 min of mine.
**Impact:** medium — converts the About from generic to specific.

#### B4 · Curate the GitHub profile to match the site  `[USER]`
**Why:** Half of the clicks from the site land on your GitHub. If pinned repos lack screenshots and READMEs, the visual investment of the portfolio evaporates at the next page.

**Action:**
1. Pin the 6 strongest projects (the ones on the site) in the same order.
2. For each pinned repo: a README with project title, hero image/GIF, problem statement, "how to run", and the same metric you put on the card chip.
3. Make sure `main` has a recent commit (stale branches signal abandonment).

**I can help:** writing the READMEs if you give me the content. The repos themselves need you.
**Effort:** 2-3 hours.
**Impact:** medium-large — second-tier impression.

---

### Tier C — The transformative item

This is the one move that changes the read of the entire portfolio.

#### C1 · Ship one original, non-coursework project  `[USER builds, CLAUDE helps]`
**Why:** Currently 7 of 9 projects are coursework. A reviewer comparing two IIT Bombay second-years cannot tell you apart from these — they have the exact same `CS213-DSA` labs on their site. Two cards (AI Chess, Quant) carry most of the originality signal; one more would tip the read from *"polished student"* to *"engineer worth a 30-min conversation."*

**Criteria for a good portfolio project:**
- Problem you actually had or genuinely cared about.
- Small in scope. A 200-line tool with a great writeup beats a 10k-line clone.
- Live demo, screencast, or `npm install / cargo run`-able.
- Decision log in the README — "I considered X and Y; chose Y because …"

**Ideas calibrated to your stated interests:**

| Domain | Idea | Why it works |
|---|---|---|
| Systems | Codeforces submission watcher CLI with notifications (Rust or Go) | Uses your own pain; ships as a binary; small but real |
| Systems | A `diff` for two academic PDFs that ignores reformatting | Niche enough to be original; ships fast |
| ML | Interactive web visualization of one algorithm (MCTS on tic-tac-toe, attention weights, t-SNE on MNIST) | Earns the design layer; visualizations photograph well |
| Quant | Paper-traded strategy on a free data source with a live dashboard showing rolling Sharpe + drawdown | Directly extends your strongest credential (SoQ Top 10); demonstrates *you didn't stop when the contest ended* |
| Crypto | A small CLI that breaks one specific weak cipher and prints why, with annotated output | Extends your CS409 work into an original tool |

**Strong recommendation:** the **quant paper-trading dashboard**. It compounds with your existing strongest signal (SoQ Top 10) and answers a question reviewers will have ("did you keep going after the contest?"). It also gives you something concrete to mention in interviews.

**I can help:** scaffolding, code review, the writeup, the visual layer.
**You provide:** the idea + the actual engineering work + the decision log.
**Effort:** 1-2 weekends.
**Impact:** **transformative.** Single biggest item on this entire document.

---

### Tier D — Polish that compounds

Smaller items that don't move the needle alone but together close the gap between *good* and *elite*.

#### D1 · One real external endorsement  `[USER]`
A one-line testimonial from a course TA, research mentor, or SoQ organizer. Or a hackathon placing. Or a Codeforces / Kaggle / CTF rank certificate screenshot. Even one credible external voice breaks the "one person making claims" frame. Place in a small "Selected mentions" strip in the Resume or Reports section.
**Effort:** depends on who you ask. Low for you; high impact for the site.

#### D2 · Convert one writeup into a true case study  `[USER + CLAUDE]`
The Graph Routing or Quant writeup is close. Add explicit sections for *Alternatives I considered and rejected* and *What I'd change if I rebuilt this*. Senior reviewers read those sections specifically — they are how you prove you can reason at the design level, not just the implementation level.
**Effort:** 1 evening (yours), 1 hour (mine).

#### D3 · Inline blog post  `[USER + CLAUDE]`
Pick the strongest report (Graph Routing or Quant), convert the PDF into a long-form inline HTML page on the site. This is a writing sample, a technical reasoning sample, and a design-doc sample in one. A single good post outweighs three more project cards.
**Effort:** 1 evening.

#### D5 · `<title>` tag SEO + sitemap.xml + robots.txt  `[CLAUDE]`
Update the title to `Harsha Vardhan — CS @ IIT Bombay · Portfolio`. Add `sitemap.xml` and `robots.txt` if you want this indexed by Google.
**Effort:** 15 min.

---

## Recommended execution order

**This week (1 evening + 2 hours):** A2 (photo), B1+B2 (cull weak cards), B3 (About rewrite). Site to ~8.7.

**This weekend:** B4 (curate GitHub) + start C1 (original project scaffolding). Site to ~8.8 immediately; the impact of C1 itself unlocks ~9.

**This month:** Finish C1, ship D2 (case study) and one of D1/D3. Site to ~9.0-9.3. At that point the gap between visual layer and content layer is closed — the limiting factor becomes things outside the portfolio (résumé PDF quality, leetcode performance, network).

---

## What this audit does NOT fix

Out of scope for the portfolio itself, but matter more for hiring outcomes than anything above:

1. **The projects beneath the cards.** No amount of card styling rescues a thin repo. The biggest leverage on hiring outcomes is having two or three projects deep enough to talk about for 30 minutes.
2. **The résumé PDF.** This document assumes you have a clean one-page résumé that matches the portfolio's tone. If you don't, that's a separate (and higher-priority) artifact.
3. **CF rating and competitive programming credentials.** A jump from 1491 Specialist to 1600+ Expert would do more for quant prospects than anything on this list.
4. **Internship history.** A first-summer internship — even unpaid, even small — would be more valuable than every Tier B/C/D item combined for the second-summer recruiting cycle.

Fix those in parallel with what's on this list. The portfolio is necessary but not sufficient.

---

## Notes for working with me on this

- For `[CLAUDE]` items: just ask. They're scoped and deterministic.
- For `[USER + CLAUDE]` items: give me the raw material (PDF, photo, sentences, idea) and I'll integrate.
- For `[USER]` items: I can review what you write but the substance has to be yours.

This document supersedes all earlier `IMPROVEMENTS.md` content. Cross items off as you ship them; new gaps surfaced during work go in as new tiers.
