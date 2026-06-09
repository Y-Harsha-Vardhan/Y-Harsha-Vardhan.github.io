# Portfolio — Action Plan

A working document for closing the gap between *polished container* (where the site is now) and *content worth shortlisting* (where it needs to be). Cross items off as you ship them; new gaps surfaced during work go in as new tiers.

**Current state.** 7 cards in the project grid (AI Chess · Quant Backtester · SAT Solvers · Applied Cryptography · Advanced Algorithms · Restaurant E-Commerce · Graph Routing). Visual layer, writeups, résumé download, and copy-link affordances are done. Remaining work is overwhelmingly **content**, not styling — the kind of thing only the user can ship.

Tags: `[CLAUDE]` = I can ship without you · `[USER]` = you have to do the substance · `[USER + CLAUDE]` = give me raw material, I'll integrate.

---

## Tier A — Mechanical

#### A2 · Replace the avatar with a real photo  `[USER + CLAUDE]`
**Why:** The current avatar reads as filtered/AI-generated. Against the rest of the design (sober and grown-up), it lowers the perceived seriousness of the whole hero.
**You provide:** a phone-camera headshot against a plain wall, well-lit. Or decide to remove the avatar entirely.
**I do:** drop into `assets/images/`, retune the avatar frame styling if needed, or remove and recompose the hero as a single text column.
**Effort:** 15 min after the photo exists.
**Impact:** medium-large — lifts the entire hero.

---

## Tier B — Project section

These move the project grid from "coursework with a few standouts" to "curated portfolio."

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
1. Pin the 7 site projects (in the same order shown on the grid).
2. For each pinned repo: a README with project title, hero image/GIF, problem statement, "how to run", and the same metric you put on the card chip.
3. Make sure `main` has a recent commit (stale branches signal abandonment).

**I can help:** writing the READMEs if you give me the content. The repos themselves need you.
**Effort:** 2-3 hours.
**Impact:** medium-large — second-tier impression.

---

## Tier C — The transformative item

#### C1 · Ship one or two original, non-coursework projects  `[USER builds, CLAUDE helps]`
**Why:** 5 of the 7 cards on the site are coursework. A reviewer comparing two IIT Bombay second-years cannot tell you apart from those — they have the exact same `CS213-DSA` labs on their site. Two cards (AI Chess, Quant) carry most of the originality signal; one or two more would tip the read from *"polished student"* to *"engineer worth a 30-min conversation."* The grid slots freed by dropping Cricket and LSTM are reserved for these.

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
**Effort:** 1-2 weekends per project.
**Impact:** **transformative.** Single biggest item on this entire document.

---

## Tier D — Polish that compounds

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

**This week (1 evening + 2 hours):** A2 (photo) + B3 (About rewrite). Quick wins; both unblock once you provide the raw material.

**This weekend:** B4 (curate GitHub) + start C1 (scaffolding for the first original project). The grid has two reserved slots waiting for it.

**This month:** Finish C1 (1-2 projects), then ship D2 (case study) and one of D1 / D3. After that, the gap between visual layer and content layer is closed — the limiting factor becomes things outside the portfolio.

---

## What this document does NOT fix

Out of scope for the portfolio itself, but matter more for hiring outcomes than anything above:

1. **The projects beneath the cards.** No amount of card styling rescues a thin repo. The biggest leverage on hiring outcomes is having two or three projects deep enough to talk about for 30 minutes.
2. **CF rating and competitive programming credentials.** A jump from 1491 Specialist to 1600+ Expert would do more for quant prospects than anything on this list.
3. **Internship history.** A first-summer internship — even unpaid, even small — would be more valuable than every Tier B / C / D item combined for the second-summer recruiting cycle.

Fix those in parallel with what's on this list. The portfolio is necessary but not sufficient.

---

## Notes for working with me on this

- For `[CLAUDE]` items: just ask. They're scoped and deterministic.
- For `[USER + CLAUDE]` items: give me the raw material (photo, sentences, idea) and I'll integrate.
- For `[USER]` items: I can review what you write but the substance has to be yours.
