# Portfolio — Issues & Fix Plan

A hiring-perspective audit of the current state of the site and a prioritized, actionable plan to close the gap between "good visual layer" and "must-call candidate."

The site currently scores roughly **7 / 10** overall: the visual layer is doing more work than the content layer. The list below is ordered so that the items at the top buy the largest credibility per minute of effort.

---

## Tier 1 — Ship today (credibility blockers)

These are items a recruiter or engineer notices in the first 30 seconds. They are cheap to fix and disproportionately costly to leave broken.

### 1.1 Dead project links (`href="#"`)

**Where:** `index.html` — three project cards point to `#`:
- "SAT-Based Sokoban Solver"
- "Applied Cryptography & Exploits"
- "Advanced Algorithm Implementations"

**Why it hurts:** A dead link on a portfolio reads as carelessness. It is the single fastest signal of "this person doesn't proofread their own work." Recruiters often click 1–2 project tiles; if they hit a `#`, the impression is set.

**Fix options (pick one per card):**
1. Link to the actual repo if it exists (even private — at least the link is real).
2. Link to a short writeup hosted on the site (a new `assets/writeups/<slug>.html` or anchor to the existing PDF report).
3. Remove the card entirely. A smaller, all-working grid beats a larger grid with holes.

**Effort:** 15 min.

---

### 1.2 No résumé PDF download

**Where:** Nowhere on the site. The "Resume" section is a styled timeline only.

**Why it hurts:** Recruiters open a portfolio looking for the PDF résumé first — it is their working document and what they paste into ATS. Forcing them to screenshot or re-type your timeline cards is friction they will not pay.

**Fix:**
1. Add a one-page PDF to `assets/HarshaVardhan-Resume.pdf`.
2. Add a "Download résumé" button in the hero CTAs (next to "View my work" and "Get in touch").
3. Add a secondary "Download PDF" link inside the Resume section header.

**Effort:** 30 min once the PDF exists.

---

### 1.3 Self-rated skill % bars / rings

**Where:** Resume → Skills (`.ring-grid` with `data-pct="90"`, `85`, etc.).

**Why it hurts:** Self-rated percentages are a well-known junior-portfolio tell. Anyone senior knows you cannot meaningfully say "90% Python." Worse, claiming "90% DSA" at year 1–2 of undergrad invites a tough comparison: an interviewer will mentally hold you to that bar.

**Fix:**
1. Delete the percentages and rings.
2. Replace with a grouped tech tag cloud organized by domain:
   - **Languages:** Python · C / C++ · Bash · JavaScript
   - **Systems:** Linux · gdb · perf · Make / CMake
   - **ML / Data:** PyTorch · NumPy · pandas · scikit-learn
   - **Web:** React · Node.js · HTML / CSS · Git
   - **Math:** Probability · Linear algebra · Time series
3. Optional polish: a "Currently learning" pill (1–2 items) shows momentum without overclaiming.

**Effort:** 1 hr (markup + CSS for the chip groups).

---

### 1.4 Vague headline

**Where:** Hero — *"Building things at the edge of systems & intelligence."*

**Why it hurts:** It is well-written, but it says nothing concrete. A hiring manager cannot tell whether you are a competitive programmer, an ML researcher, a systems engineer, or a generalist. Strong portfolios declare a position; this one declares a mood.

**Fix — pick a sentence that names two of: school, specialization, what you're looking for:**
- *"CS @ IIT Bombay. I build systems-oriented projects and quantitative trading models."*
- *"IIT Bombay CS undergrad. Systems, algorithms, and ML — currently chasing summer 2026 internships."*

Keep the gradient styling; replace only the words. The "Available for internships · Summer 2026" status pill above can stay.

**Effort:** 5 min.

---

### 1.5 Tutorial-flavored projects

**Where:** Projects grid — *"Stock Price Prediction (LSTM)"* and to a lesser extent *"Restaurant E-Commerce Platform."*

**Why it hurts:** LSTM stock prediction is the single most common tutorial project online. Quant recruiters in particular will flinch — it signals "I have not yet learned why this is a bad model for this problem." Restaurant CRUDs read as bootcamp-clone work.

**Fix options (per project):**
1. **Reframe with insight.** Keep the LSTM project only if the description acknowledges what you learned — e.g. *"Implemented an LSTM forecaster, then quantified why the predictions are no better than a persistence baseline. Writeup on overfitting in financial time series."* This converts a weak project into evidence of taste.
2. **Replace.** Build one small original thing. Even a weekend project that solves a problem you actually had (e.g. a CLI that diffs two PDFs, a Codeforces submission watcher, an interactive viz of an algorithm).
3. **Remove.** Six strong projects beat nine mixed-quality ones.

**Effort:** 1 hr (reframe) or 1 weekend (replace).

---

### 1.6 Codeforces signal is ambiguous

**Where:** About → Highlights bento card — *"150+ CP problems solved."*

**Why it hurts:** Problem count is not a unit recruiters use. CF rating is. "150 solved" reads as either modest or huge depending on context, so it conveys nothing.

**Fix:**
1. If your CF rating is **Specialist (1400+) or better** — show the rating with a badge: `Codeforces · Specialist · 1450`.
2. If it is below Specialist — replace the line with a different concrete signal (a contest placement, a problem you found beautiful, a class rank in DSA).
3. Remove the raw "150+" count either way.

**Effort:** 10 min.

---

## Tier 2 — Ship this week (content-depth gap)

These move you from "competent student" to "credible engineer." They take 2–6 hours each.

### 2.1 Add measurable outcomes to every project

**Why it matters:** "What did it do?" is half a project. "Compared to what, by how much?" is the other half. Numbers are how engineers prove they understand the problem.

**What to add per card (one or two sentences max):**

| Project | Suggested metric to add |
|---|---|
| AI Chess Engine | Search depth, NPS (nodes/sec), Elo vs Stockfish at fixed depth, or self-play winrate |
| Cricket Scoring System | Concurrent users tested, latency at scoring update, test coverage |
| Quantitative Trading Models | Sharpe, max drawdown, dataset size and timeframe, backtest period |
| SAT-Based Sokoban Solver | Solved levels / set, time-to-solve on N×N, constraint count per encoding |
| Applied Cryptography | Concrete attack recovered (e.g. "recovered AES-CTR plaintext under 256 keystream reuses") |
| Stock Price LSTM | Honest baseline comparison + what you concluded |
| Advanced Algorithms | Wall-clock vs textbook on N=10⁶, cache-miss reduction, etc. |
| Restaurant E-Commerce | Skip — replace with something with numbers instead |
| Graph Routing | Graph size handled, query latency, k-shortest computation time |

**Effort:** 3–4 hr total.

---

### 2.2 Write one real blog post

**Why it matters:** Blog posts are the strongest portfolio asset because they are also writing samples, technical reasoning samples, and design-doc samples in one. A single good post outweighs three more project cards.

**Fix:**
1. Pick the strongest report — likely the **Graph Routing** or **Quantitative Trading** one.
2. Convert the PDF content into an inline HTML page on the site (`writings/graph-routing.html`).
3. Include: problem statement, constraints, design decisions you considered and rejected, the one you chose and why, results with a chart, what you would change.
4. Link from the Reports section instead of (or alongside) the PDF.

This is the single highest-leverage thing on this list for senior reviewers.

**Effort:** 1 full evening for one post.

---

### 2.3 Replace the avatar

**Where:** Hero `.avatar-frame`.

**Why it hurts:** The current image reads as filtered/stylized. Recruiters subconsciously discount candidates who hide behind avatars. The premium dark-theme aesthetic of the site rewards a real photo more than the photo undermines the theme.

**Fix:** Use a clean, well-lit headshot (phone camera against a plain wall is fine). Or remove the avatar entirely — the hero composition still works with just the text column. Do not use an AI-generated face.

**Effort:** 15 min once a photo exists.

---

### 2.4 Curate GitHub

**Why it matters:** Half of clicks from your site go to your GitHub profile. If your top-pinned repos do not have READMEs with screenshots, the visual investment of this portfolio is wasted on the next page.

**Fix:**
1. Pin the 6 projects shown on the site, in the same order.
2. For each pinned repo: README with project title, a hero image/GIF, the problem statement, how to run, and the same metrics added in §2.1.
3. Make sure the `main` branch has a recent commit. Stale repos signal abandonment.

**Effort:** 2–3 hr.

---

### 2.5 Footer is empty

**Where:** `.site-footer`.

**Why it matters:** The footer is the last thing a visitor sees. It is also a useful trust signal: "last updated", "source of this site", "currently in [city]" all subtly help.

**Fix — add a row of:**
- "Last updated · [date]" (or read from git).
- Location ("Mumbai, India").
- "Source on GitHub →" link to the portfolio repo (signals "I built this, here it is, judge me").
- Keep the social links.

**Effort:** 20 min.

---

## Tier 3 — Ship this month (move to elite)

These take a weekend each but compound. They are what separates the top decile of student portfolios.

### 3.1 One original, non-coursework project

**Why:** Currently 7 of 9 projects are coursework or stock topics. A hiring manager reading the portfolio cannot tell whether you build things for fun or only when assigned. One self-initiated project changes that read entirely.

**Criteria for a good portfolio project:**
- Problem you actually had or genuinely cared about.
- A live demo or screencast — even a static page or a Loom video.
- Decision log in the README — "I considered X and Y; chose Y because…"
- Tiny in scope is fine. A 200-line tool with great writeup beats a 10k-line clone.

**Ideas calibrated to your stated interests:**
- **Systems:** A small CLI tool you actually use (file diff for academic PDFs, a CF submission watcher with notifications, a backup-rotation script with proper tests).
- **ML:** Interactive visualization of an algorithm — e.g. a web demo of MCTS playing tic-tac-toe with knobs you can tune; an interactive explanation of how attention works.
- **Quant:** A live, paper-traded strategy on a free data source, with a dashboard showing rolling Sharpe and drawdown.

**Effort:** 1–2 weekends.

---

### 3.2 A case study, not a card

**Why:** Project cards show *what you built*. A case study page shows *how you think*. The second is what gets hired.

**Fix:** Pick your single strongest project. Create `case-studies/<slug>.html`. Sections:

1. **Problem** — one paragraph.
2. **Constraints** — what made it hard.
3. **Approach** — what you tried, in order, including dead ends.
4. **Result** — measurable.
5. **What I'd change** — proves self-awareness.

Link to it from the project card with "Read the case study →" instead of just opening the repo.

**Effort:** 1 evening.

---

### 3.3 Social proof

**Why:** Currently the site is one person making claims. One external endorsement, even a small one, breaks that.

**Options (pick any one):**
- A one-line testimonial from a course TA or research mentor.
- A "selected mentions" section: workshops attended, a hackathon placing, a meetup talk.
- A GitHub contribution graph embed.
- A Codeforces rating badge.

**Effort:** Varies. Even one of these is enough.

---

### 3.4 Replace the About prose

**Where:** About → section lead paragraph.

**Why it hurts:** The current copy ("strong interest in systems, web development, and problem-solving … building clean, efficient interfaces …") is generic enough that it could be on any CS undergrad's site. It is true but tells me nothing about *you*.

**Fix:** Inject something specific and unfakeable. A few prompts:
- A problem that obsessed you for weeks.
- A paper, book, or codebase that changed how you think.
- A project that failed and what you learned from it.
- Why systems *and* ML *and* quant — what is the thread for you?

Two sentences of specific is worth two paragraphs of generic.

**Effort:** 30 min of honest writing.

---

## Tier 4 — Smaller polish (nice to have)

- **Resume tabs hide content.** Recruiters skim. Consider a single two-column layout (Education left, Experience right) at desktop widths, falling back to tabs only on mobile.
- **Reports inline excerpt.** Show 2–3 lines of the actual report body in each tile, not just the description. Convert at least one PDF to inline HTML (overlaps with §2.2).
- **Phone number is publicly visible.** Most candidates omit; consider whether you want this indexed.
- **Birthday in original markup was wrong** (`datetime="1982-06-23"` with display "Jan 3, 2007"). Already removed in the redesign, but worth flagging that the source data was inconsistent — double-check the résumé PDF doesn't carry the same bug.
- **Open-in-new-tab inconsistency.** Some project links open in new tab, some in same tab. Standardize: external = new tab, internal = same tab.
- **Add scroll-restoration: manual** if you want hash-deep-links to land cleanly. Currently relies on `scroll-margin-top: 90px` which is correct, but worth a quick manual test.
- **`<title>` tag** could include a keyword for SEO: "Harsha Vardhan — CS @ IIT Bombay · Portfolio".
- **Add a sitemap.xml and robots.txt** if you want this indexed by Google.

---

## Suggested order of execution

If you have **one hour**: 1.1, 1.4, 1.6 — kill dead links, sharpen headline, fix CF claim.

If you have **one afternoon**: add §1.1 – §1.6 plus §2.5 (footer). The site goes from 7 to 7.5 with no new content.

If you have **one weekend**: everything in Tier 1 + §2.1 (numbers on projects) + §2.3 (real photo) + §2.5 (footer). The site goes from 7 to 8.

If you have **one month**: everything in Tier 1 and Tier 2 + one item from Tier 3 (either §3.1 *or* §3.2). The site goes from 7 to 8.5+. At that point the gap between your visual layer and your content layer closes, and recruiters reach out before you apply.

---

## What this audit does *not* fix

Two things are out of scope for the portfolio itself but matter for hiring outcomes:

1. **The projects beneath the cards.** No amount of card styling rescues a thin repo. The single biggest leverage on your hiring outcomes is having two or three projects that are deep enough to talk about for 30 minutes in an interview.
2. **The résumé PDF.** This audit assumes you have a clean one-page résumé that matches the portfolio's tone. If you don't, that is a separate (and higher-priority) document to write.

Fix those in parallel with the items above.
