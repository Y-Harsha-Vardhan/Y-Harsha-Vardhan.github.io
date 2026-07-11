<div align="center">

# Harsha Vardhan Yalamanchili

**CS @ IIT Bombay** · Honours in Computer Science · JEE Advanced AIR 170 '24

Systems · Algorithms · Applied Cryptography · Web

[![Portfolio](https://img.shields.io/badge/Portfolio-y--harsha--vardhan.github.io-08080d?style=flat-square&logo=githubpages&logoColor=white)](https://y-harsha-vardhan.github.io)
[![GitHub](https://img.shields.io/badge/GitHub-Y--Harsha--Vardhan-181717?style=flat-square&logo=github)](https://github.com/Y-Harsha-Vardhan)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Harsha%20Vardhan-0A66C2?style=flat-square&logo=linkedin)](https://www.linkedin.com/in/harsha-vardhan-yalamanchili-086a60323)
[![Codeforces](https://img.shields.io/badge/Codeforces-limitless__-1F8ACB?style=flat-square&logo=codeforces)](https://codeforces.com/profile/limitless__)
[![Email](https://img.shields.io/badge/Email-yharshavardhan37@gmail.com-EA4335?style=flat-square&logo=gmail)](mailto:yharshavardhan37@gmail.com)

</div>

---

Second-year CS undergrad at IIT Bombay (Honours track). I work across systems, algorithms, applied cryptography, and the web — most of what's pinned below was built either for a course I wanted to push past the brief on, or for a real engagement where the code had to survive contact with users.

For the full writeups, decision logs, and reports, see the **[portfolio](https://y-harsha-vardhan.github.io)**.

---

## Selected Projects

The order below mirrors the project grid on the portfolio.

### 1. [AI Chess Engine](https://github.com/Y-Harsha-Vardhan/AI-Chess-Bot)

A fully playable chess engine built from scratch around classic AI search.

**Approach:** Minimax with Alpha-Beta pruning, a hand-tuned static evaluator (material, piece-square tables, mobility), move ordering for pruning efficiency. Full rule set including en passant, castling, promotion.

**Stack:** ![Python](https://img.shields.io/badge/Python-3776AB?style=flat-square&logo=python&logoColor=white)

---

### 2. [Quantitative Trading Models — Summer of Quant](https://github.com/Y-Harsha-Vardhan/SoQ-Project)

Backtested systematic strategies built during the **Summer of Quant** program at IIT Bombay. **Finished Top 10** in the cohort.

**Approach:** Stochastic processes and time-series analysis on real market data, feature engineering, risk-adjusted performance metrics (Sharpe, drawdown), walk-forward validation.

**Stack:** ![Python](https://img.shields.io/badge/Python-3776AB?style=flat-square&logo=python&logoColor=white) ![Pandas](https://img.shields.io/badge/Pandas-150458?style=flat-square&logo=pandas&logoColor=white) ![NumPy](https://img.shields.io/badge/NumPy-013243?style=flat-square&logo=numpy&logoColor=white)

---

### 3. [Freight CRM](https://github.com/Ganeshrane1234/Advanced_CRM) *(team repo on a teammate's account)*

Production freight-forwarding CRM for a Mumbai logistics firm. Paid freelance engagement, ~5 weeks, team of four (lead + 3 devs). **Live deployment.**

**My scope:** the React 19 SPA framework the team rallied around, plus Buckets 6B–11 — email drafts, enquiry board (Kanban + timeline), sea/air enquiry forms, agent dispatch with 4-hour IMAP reminder loop, and the rates table with L1 freeze + margin calculator. ~50 of 124 endpoints, 13 of 31 tables.

**Stack:** ![React](https://img.shields.io/badge/React%2019-20232A?style=flat-square&logo=react&logoColor=61DAFB) ![Vite](https://img.shields.io/badge/Vite%208-646CFF?style=flat-square&logo=vite&logoColor=white) ![Node.js](https://img.shields.io/badge/Node.js%2022-339933?style=flat-square&logo=node.js&logoColor=white) ![Express](https://img.shields.io/badge/Express-000000?style=flat-square&logo=express&logoColor=white) ![SQLite](https://img.shields.io/badge/better--sqlite3-003B57?style=flat-square&logo=sqlite&logoColor=white)

**Infra:** GCP `e2-small` · Ubuntu 22.04 · Nginx + Certbot · PM2 under systemd · daily SQLite snapshots to GCS.

📄 Full writeup with architecture, AI-scoring weights, and team & work split → **[portfolio writeup](https://y-harsha-vardhan.github.io/assets/writeups/freight-crm.html)**

---

### 4. [SAT Puzzle Solvers (CS228)](https://github.com/Y-Harsha-Vardhan/Sem-3/tree/main/CS228-Logic/Assignments/Assignment%201)

SAT-based puzzle solvers built for CS228 Logic — encode the puzzle into CNF, hand off to a SAT solver, decode the model back into a solution. Walks through the encoding choices that actually matter for solver runtime.

**Stack:** ![Python](https://img.shields.io/badge/Python-3776AB?style=flat-square&logo=python&logoColor=white)

---

### 5. [Applied Cryptography (CS409)](https://github.com/Y-Harsha-Vardhan/Sem-3/tree/main/CS409-Cryptography/Labs)

Lab work from CS409 under Prof. Sruthi Shekar — symmetric primitives, public-key constructions, attacks on weak ciphers, and protocol-level analysis.

**Stack:** ![Python](https://img.shields.io/badge/Python-3776AB?style=flat-square&logo=python&logoColor=white) ![C](https://img.shields.io/badge/C-A8B9CC?style=flat-square&logo=c&logoColor=black)

---

### 6. [Advanced Algorithms (CS213)](https://github.com/Y-Harsha-Vardhan/Sem-3/tree/main/CS213-DSA)

CS213 DSA coursework — randomised algorithms, approximation algorithms, network flow, and competitive analysis. Writeups walk through alternatives considered and rejected, not just the chosen implementation.

**Stack:** ![C++](https://img.shields.io/badge/C%2B%2B-00599C?style=flat-square&logo=cplusplus&logoColor=white)

---

### 7. [Restaurant E-Commerce Platform](https://github.com/8787233419/e-commerce-dashboard) *(team repo)*

Full-stack web app for browsing menus and managing orders. Component-state cart, modular React architecture, clean frontend/backend separation.

**Stack:** ![React](https://img.shields.io/badge/React-20232A?style=flat-square&logo=react&logoColor=61DAFB) ![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=node.js&logoColor=white) ![Express](https://img.shields.io/badge/Express-000000?style=flat-square&logo=express&logoColor=white)

---

### 8. [Graph Routing (CS293 Team Project)](https://github.com/Y-Harsha-Vardhan/CS293-TeamProject)

CS293 team project on graph routing — algorithm selection, complexity analysis, benchmarking, and a written report. One of the writeups I'm currently expanding into a deeper case study (alternatives considered, what I'd change on a rebuild).

**Stack:** ![C++](https://img.shields.io/badge/C%2B%2B-00599C?style=flat-square&logo=cplusplus&logoColor=white)

---

## Tech Stack

| Domain | Tools |
|---|---|
| **Languages** | C/C++, Python, JavaScript, Bash, Assembly, Verilog |
| **Web** | React 19, Node.js, Express, Vite, SQLite |
| **ML / Data** | TensorFlow, Keras, Pandas, NumPy |
| **Infra** | Git, Docker, GCP, Nginx, PM2, LaTeX |
| **Areas** | Systems Programming, Applied Cryptography, Algorithms, Quant, ML |

---

## Currently

- **Honours track** in Computer Science at IIT Bombay
- Pushing on systems, applied cryptography, and the quant/ML overlap
- Competitive programming on Codeforces — [limitless__](https://codeforces.com/profile/limitless__)

---

## Get in Touch

If you're working on something in systems, applied crypto, quant, or production web — happy to talk.

- **Email:** [yharshavardhan37@gmail.com](mailto:yharshavardhan37@gmail.com)
- **LinkedIn:** [Harsha Vardhan Yalamanchili](https://www.linkedin.com/in/harsha-vardhan-yalamanchili-086a60323)
- **Portfolio:** [y-harsha-vardhan.github.io](https://y-harsha-vardhan.github.io)

---

<div align="center">
<sub>IIT Bombay · Computer Science · Building things to understand them</sub>
</div>
