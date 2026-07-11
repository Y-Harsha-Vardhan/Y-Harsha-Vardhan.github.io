# Portfolio — Action Plan

A working document for closing the gap between *polished container* (where the site is now) and *content worth shortlisting* (where a recruiter would advance you). Cross items off as you ship them; new gaps surfaced during work go in as new tiers.

**Current state (Jul 11, 2026).** 8 cards in the project grid, live Freight CRM engagement with a recommendation letter, third-year at IIT Bombay Honours-in-CS track, Codeforces `limitless__`, JEE Advanced AIR 170. The visual layer, writeups, résumé download, and now a GitHub profile README that mirrors the site — done. The last portfolio pass added hard-number chips to Chess (`Beat 1500 Lichess · 63/63 puzzles`) and SoQ (`Top 10 SoQ '25 · Sharpe 3.60`), added Freight CRM as an Experience card with an Honours-in-CS badge on Education, and expanded the Skills groups to match what the master DB and the Freight CRM stack actually confirm. Remaining work is overwhelmingly **content**, not styling.

**Recruiter lens.** Recruiters spend 20–40s per portfolio. The scan pattern: hero → status pill → project cards (metric chips first) → résumé PDF → LinkedIn. What they're looking for in that pass: (1) can I place them in a bucket (SWE / Quant / Research), (2) is there a hard number I can quote to a hiring manager, (3) is there anyone else vouching for them. Items below are ordered by how directly they answer those three questions.

**Open follow-ups on the Freight CRM card:** confirm with the team lead whether the live URL can be linked publicly (currently kept off-link with "available on request"); revisit the chip and add an operational-metrics paragraph to the writeup if numbers (DAU, # enquiries, AI scorer precision) become available; the recommendation letter (`Resume Projects/Freelancing/Letter.pdf`) exists but isn't surfaced anywhere on the site.

Tags: `[CLAUDE]` = I can ship without you · `[USER]` = you have to do the substance · `[USER + CLAUDE]` = give me raw material, I'll integrate.

---

## Recently shipped

- ✅ GitHub profile README (B4 top half) — mirrors the 8-card grid, matched Codeforces handle, portfolio URL swapped to `y-harsha-vardhan.github.io`.
- ✅ Hero updated to "Third-year undergrad."
- ✅ About tech marquee expanded (TensorFlow, Vite, SQLite, GCP) and "Currently" focus → `Systems · ML · Crypto`.
- ✅ Chess + SoQ project cards now carry hard-number metric chips.
- ✅ Resume Experience: Freight CRM added as top card with live-deployment note.
- ✅ Resume Education: "Honours in CS" badge on the IIT Bombay card.
- ✅ Skills groups expanded (Verilog / Assembly / LaTeX, Docker / GCP / Nginx / PM2, TensorFlow, Express / Vite / SQLite, Stochastic processes).
- ✅ Reports: CP problem count 150+ → 300+.
- ✅ A4 — dual résumé downloads: Hero and Resume section both offer SWE + Quant PDFs (`assets/resumes/SOFTWARE.pdf`, `assets/resumes/QUANT.pdf`); old `HarshaVardhan-Resume.pdf` deleted.
- ✅ A5 — Hero status pill sharpened to `SWE / Quant / Research internships · Summer 2027`.

---

## Tier A — Recruiter-priority mechanical

Items that shift what a recruiter sees in the first 30 seconds. All small.

#### A2 · Replace the avatar with a real photo  `[USER + CLAUDE]`
**Why:** The current avatar reads as filtered/AI-generated. Against the rest of the design (sober and grown-up), it lowers the perceived seriousness of the whole hero. Recruiters do register the face.
**You provide:** a phone-camera headshot against a plain wall, well-lit. Or decide to remove the avatar entirely.
**I do:** drop into `assets/images/`, retune the avatar frame styling if needed, or remove and recompose the hero as a single text column.
**Effort:** 15 min after the photo exists.
**Impact:** medium-large — lifts the entire hero.

---

## Tier B — Project section

These move the project grid from "coursework with a few standouts" to "curated portfolio."

#### B1 · Add hard-number chips to the remaining 6 project cards  `[USER + CLAUDE]`
**Why:** Chess and SoQ now carry recruiter-scannable numbers (`Beat 1500 Lichess`, `Sharpe 3.60`). The other six read as `Systems · 10 labs · C++17`, `Sudoku + Sokoban`, `React 18 · Vite` — factual but forgettable. A hiring manager repeating a card to a screener needs the *one thing* about the project. Cards without numbers get skimmed past.
**Candidates:**
- **Freight CRM** — already has `Live · 31 tables · 124 endpoints`. Good.
- **SAT** — solver runtime on a hard instance; # of encodings compared.
- **Applied Cryptography** — # of labs completed / grade / hardest attack recovered.
- **Advanced Algorithms** — grade, or benchmark speedup vs stdlib on one representative structure.
- **Restaurant E-Commerce** — probably not upgradeable; consider dropping to the archive or replacing (Tier C).
- **Graph Routing** — largest graph solved; query latency at that size.
**You provide:** the numbers.
**I do:** update the chips + `data-summary` if the number needs a one-line justification.
**Effort:** you 30 min digging through repos + reports; me 15 min.
**Impact:** medium-large — six chips × every recruiter × every scan.

#### B6 · Ship the Advanced Deep Learning card  `[USER + CLAUDE]`
**Why:** CS-AI/ML (Prof. Sunita Sarawagi) covered Encoder–Decoder RNNs, Block-Recurrent Transformers, attention variants, MoE with NCE soft-routing, SMO-SVM with learnable RBF kernels — strong ML breadth signal. Currently absent from the grid.
**Blocker:** no workspace evidence. Writeup would be coursework-summary style only — needs the user to surface lab notebooks / dataset benchmarks before it can be more than a thin card.
**You provide:** repo or notebooks per lab + at least one dataset-level number (MoE PPL, SVM accuracy, etc.).
**Effort:** 1 evening once material exists.
**Impact:** medium — fills the 8th grid slot with an ML-flavoured original.

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

#### B4 · Curate the pinned repos and their READMEs  `[USER + CLAUDE]`
**Why:** The profile README is done — but half of the recruiter clicks from it land on the actual pinned repos. If those repos lack hero images, decision logs, or "how to run" sections, the visual investment of the portfolio and the polish of the README evaporate one click deeper.

**Action:**
1. Pin the 7 site projects on the profile (in the same order as the grid). `Sem-3` monorepo counts once.
2. For each pinned repo: a README with project title, hero image/GIF, problem statement, "how to run", and the same metric you put on the card chip.
3. Make sure `main` has a recent commit (stale branches signal abandonment).

**I can help:** writing the READMEs if you give me the raw material. Chess and SoQ already have README rewrites (git log shows recent doc commits); the coursework repos (SAT, Crypto, DSA, CS293) are the ones that need work.
**Effort:** 2-3 hours.
**Impact:** medium-large — second-tier impression, and a recruiter absolutely does open at least one pinned repo.

---

## Tier C — The transformative item

#### C1 · Ship one or two original, non-coursework projects  `[USER builds, CLAUDE helps]`
**Why:** 5 of the 8 cards on the site are coursework. A reviewer comparing two IIT Bombay third-years cannot tell you apart from them on the coursework — they have the exact same `CS213-DSA` labs on their site. Three cards (AI Chess, Quant, Freight CRM) carry most of the originality signal; one or two more would tip the read from *"polished student"* to *"engineer worth a 30-min conversation."* One grid slot is still open (formerly earmarked for Advanced DL, blocked on material).

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

**Strong recommendation:** the **quant paper-trading dashboard**. It compounds with your existing strongest signal (SoQ Top 10, Sharpe 3.60 on the card) and answers the exact question a quant recruiter has ("did you keep going after the contest?"). It also gives you something concrete to mention in interviews. `new-project-ideas.txt` in Resume Projects lists a lot of "build your own" ideas — those are learning projects; portfolio needs the *one* thing that maps to a role you want.

**I can help:** scaffolding, code review, the writeup, the visual layer.
**You provide:** the idea + the actual engineering work + the decision log.
**Effort:** 1-2 weekends per project.
**Impact:** **transformative.** Single biggest item on this entire document.

---

## Tier D — Polish that compounds

Smaller items that don't move the needle alone but together close the gap between *good* and *elite*.

#### D1 · Surface the Freight CRM recommendation letter  `[USER + CLAUDE]`
**Why:** `Resume Projects/Freelancing/Letter.pdf` is exactly the "external voice" a recruiter wants and it currently isn't anywhere on the site. One line under the Freight CRM writeup — *"Recommendation letter available on request"* or an inline blockquote with one sentence — flips the Freight CRM card from *"I claim this shipped"* to *"someone paid me and wrote about it."*
**You provide:** permission to quote (or a redacted excerpt).
**I do:** add to the writeup, and a "Selected mentions" strip in the Resume section.
**Effort:** 15 min once you say what can be quoted.
**Impact:** medium-large — external endorsements break the "one person making claims" frame.

#### D2 · Convert one writeup into a true case study  `[USER + CLAUDE]`
The Graph Routing or SoQ writeup is close. The SoQ INTERVIEW_PREP.md (Jul 6) already does this work privately — Sharpe gap analysis, lookahead bias, win-rate expectancy. Lifting that into a public writeup with explicit *Alternatives I considered and rejected* and *What I'd change if I rebuilt this* sections gives senior reviewers exactly what they look for. That INTERVIEW_PREP is a goldmine — it's already written, it just isn't public.
**Effort:** 1 evening (yours), 1 hour (mine).

#### D3 · Inline blog post  `[USER + CLAUDE]`
Pick the strongest report (Graph Routing or Quant), convert the PDF into a long-form inline HTML page on the site. This is a writing sample, a technical reasoning sample, and a design-doc sample in one. A single good post outweighs three more project cards. Same source material as D2, different treatment.
**Effort:** 1 evening.

#### D4 · Refresh "Currently learning"  `[USER]`
**Why:** Resume section still shows *"Distributed systems, Rust."* You've since shipped a production freight CRM, done a paid engagement, and are prepping for internship season. If distributed systems / Rust is still true, keep it. If it's stale, recruiters notice.
**You provide:** one sentence on what you're actually spending late-night time on right now.
**I do:** swap the chips.
**Effort:** 2 min.
**Impact:** small — but staleness is a signal.

#### D6 · Codeforces climb  `[USER]`
**Why:** A jump from Specialist to 1600+ Expert would do more for quant prospects than anything else on this list. The `limitless__` handle is already surfaced in the Highlights bento and the profile README. If the rating moves, everything else on the page compounds with it.
**Effort:** ongoing.
**Impact:** large for quant recruiting specifically.

---

## Tier E — On hold pending confirmation

These are unlocked once the underlying engagements are confirmed. Not blockers for any other work above.

#### E1 · Theoretical Cryptography research strip  `[ON HOLD — USER + CLAUDE]`
**Why:** Research under Prof. Sruthi Shekar (randomness extractors, leakage-resilient PRG/PRF, succinct proofs) would be a strong differentiator above the project grid and a natural narrative continuation from the CS409 card. Same advisor as the cryptography course.
**Blocker:** engagement not yet formally confirmed. Hold until status is firm.
**When unblocked:** small 2–3 line section between Hero and Projects with advisor name + date range + one-sentence direction.
**Effort:** 30 min once confirmed.

#### E2 · Teaching & Mentorship strip  `[ON HOLD — USER + CLAUDE]`
**Why:** TA · CS409 Intro to Cryptography (Prof. Sruthi Shekar) + Student Mentor · Summer of Science '26 (MnP Club, 10 mentees on crypto / ZK). Adds a "responsibility" signal the site doesn't carry today.
**Blocker:** TA appointment not yet formally confirmed.
**When unblocked:** compact one-row section near the Resume section listing both roles.
**Effort:** 30 min once confirmed.

---

## Recommended execution order

**This week (1 evening + 2 hours):** A3 (résumé PDF sync) + A5 (status pill sharpening) + D1 (recommendation letter surfacing). Three near-zero-effort recruiter-priority wins; A3 alone has the highest ROI on this document.

**This weekend:** A2 (photo) + A4 (dual-résumé Hero) + B1 (metric chips on the remaining 6 cards). All you-provides-input-then-I-integrate.

**This month:** B4 (pinned-repo READMEs) + B3 (About lead rewrite) + start C1 (scaffolding the original project). B6 (Advanced DL card) lands if lab material surfaces.

**Then:** D2 (case study — SoQ INTERVIEW_PREP is the source material) → D3 (inline blog post) → C1 ship.

**Unblock when confirmed:** E1 (research strip) + E2 (teaching strip). Both small in effort, large in narrative weight.

**Lowest priority (do last):** D5 (SEO baseline). Deferred — pick this up only after everything above has landed.

---

## Tier Z — Lowest priority

#### D5 · `<title>` tag SEO + sitemap.xml + robots.txt  `[CLAUDE]`
Update the title to `Harsha Vardhan — CS @ IIT Bombay · Portfolio`. Add `sitemap.xml` and `robots.txt` if you want this indexed by Google. Deprioritised — ship only after everything in Tiers A–E is done.
**Effort:** 15 min.

---

## What this document does NOT fix

Out of scope for the portfolio itself, but matter more for hiring outcomes than anything above:

1. **The projects beneath the cards.** No amount of card styling rescues a thin repo. The biggest leverage on hiring outcomes is having two or three projects deep enough to talk about for 30 minutes.
2. **CF rating and competitive programming credentials.** See D6.
3. **Internship history.** A first-summer internship — even unpaid, even small — would be more valuable than every Tier B / C / D item combined for the second-summer recruiting cycle. Freight CRM partially answers this now (paid, live, letter available), but a formal internship at a known company would land harder.

Fix those in parallel with what's on this list. The portfolio is necessary but not sufficient.

---

## Notes for working with me on this

- For `[CLAUDE]` items: just ask. They're scoped and deterministic.
- For `[USER + CLAUDE]` items: give me the raw material (photo, sentences, idea) and I'll integrate.
- For `[USER]` items: I can review what you write but the substance has to be yours.
