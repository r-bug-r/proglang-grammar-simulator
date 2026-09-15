# Formal Grammars & CFG Simulation Lab & Obsidian Reviewer Center
> **UST-CICS CS311 Programming Languages &bull; Prof. Bernard C. Fabro, PCpE**

A minimalist, scholarly learning application, interactive CFG simulator, and portable Obsidian-inspired reviewing vault designed for mastering **formal grammars, derivations, context-free grammars (CFGs), and combinatorial language sizing**.

---

## 🎨 Architectural Design & User Experience

- **Scholarly White Learning Theme**: Crisp white paper aesthetic (`#ffffff`) with deep slate typography (`#0f172a`), refined academic accents, and high readability inspired by editorial reading tools (with built-in dark theme toggle).
- **Sharp Minimalist Geometry**: 0px border radius across all cards, buttons, callouts, and pills—eliminating bubbly containers for a disciplined, Swiss-style architectural look.
- **Borderless Flat Containers**: Clean surface separation and hairline dividers without heavy, boxy container outlines.
- **Poco X8 Pro Max Responsive Architecture**: Optimized for tall ~20:9 mobile aspect ratios (1220x2712 / 1080x2400) with safe area insets, touch-friendly 44px+ tap targets, swipeable navigation tabs, and a slide-out drawer for browsing the reviewer vault.

---

## 🔬 Core Learning Modules

### 0. Obsidian Reviewer Vault (Portable Reviewing Center)
- Dedicated Obsidian-inspired Markdown viewer and portable study center with full light/dark theme support.
- Bundles all **7 core academic reviewers & study guides** directly inside the repository (`/reviewers/`).
- **Active Recall Cloze Toggle**: Switch between **Study Mode** (cloze blanks hidden with click/tap-to-reveal interaction) and **Reading Mode** (all answers revealed).
- **Mobile Off-Canvas Drawer**: On smartphones (such as Poco X8 Pro Max), an off-canvas drawer allows instant document switching with one thumb while preserving 100% full-width reading immersion.
- **Chapter Bottom Navigation**: Seamlessly navigate `← Previous Reviewer` and `Next Reviewer →` directly at the foot of each document.
- **Vault File Explorer**: Real-time search filter across all documents with word counts, read times, and YAML frontmatter metadata cards.
- **Obsidian Callouts & Wikilinks**: Full visual support for `> [!NOTE]`, `> [!TIP]`, `> [!IMPORTANT]`, `> [!WARNING]`, and clickable `[[DocName]]` links.
- **Import Local Files**: Easily load any external `.md` notes from your computer on the fly.

### 1. Leftmost Assignment Derivations: $A = B * (A + C)$
- Step-by-step expansion tracking character counts, remaining non-terminals, and rule applications.
- Previews "what comes next" using the strict leftmost derivation rule.
- Includes practice variants: $A = B + C * A$, $A = (B + C) * A$, and $A = B + C$.

### 2. Balanced Parentheses CFG: $S \to (S)S \mid \varepsilon$
- Interactive generator showing how nesting, chaining, and base-case termination work.
- Live validation proving why unbalanced strings like `)(` or `(()` are mathematically impossible.

### 3. C-Style Declarations CFG
- Validates candidate statements against $\langle\text{Decl}\rangle \to \langle\text{Type}\rangle\langle\text{VarList}\rangle;$.
- Enforces mandatory semicolons, legal types (`int`, `float`, `char`), and recursive comma-separated identifier lists.

### 4. Combinatorial Language Sizing Proof
- Interactive calculator implementing the Fundamental Counting Principle.
- Proof: $|\langle NP \rangle| = 2 \times 2 = 4$, $|\langle VP \rangle| = 2 \times 4 = 8 \implies |\langle S \rangle| = 4 \times 8 = \mathbf{32\text{ sentences}}$.
- Test arbitrary vocabularies and adjective-augmented grammars.

### 5. Interactive Exam Practice Quiz
- 10 quiz questions mirroring departmental exam formats with instant feedback and explanations.

---

## 📖 Plain-English Jargon Reference

| Term | Plain-English Meaning | Example |
| :--- | :--- | :--- |
| **Terminal** | Final, literal code symbol that cannot be expanded | `A`, `*`, `+`, `int`, `;` |
| **Non-terminal** | Temporary placeholder in angle brackets that must be replaced | `⟨expr⟩`, `⟨id⟩`, `⟨Type⟩` |
| **Production Rule** | Replacement recipe in the form $\text{Left} \to \text{Right}$ | `⟨id⟩ → A` |
| **Derivation** | Step-by-step replacement sequence from start symbol to code | `⟨assign⟩ ⟹ A = B + C` |
| **Sentential Form** | Work-in-progress string of mixed symbols at any step | `A = ⟨id⟩ * ⟨expr⟩` |
| **Leftmost Rule** | Replacing the very first placeholder on the left before others | Expand left `⟨id⟩` first |
| **$\varepsilon$ (Epsilon)** | Empty string / stop signal that erases a placeholder | $S \to \varepsilon \implies \text{""}$ |
| **Parse Tree** | Visual tree diagram showing grammar rules as branches | Root = `<program>`, Leaves = code |

---

## 🚀 How to Run Locally

This application is built with vanilla HTML5, CSS3, and modern JavaScript. It has zero external dependencies and runs completely offline.

1. Clone or navigate to the directory:
   ```bash
   git clone https://github.com/r-bug-r/proglang-grammar-simulator.git
   cd proglang-grammar-simulator
   ```
2. Open `index.html` directly in any modern browser:
   - **Windows (PowerShell)**: `Start-Process index.html`
   - **macOS**: `open index.html`
   - **Linux**: `xdg-open index.html`
   - Or use any static file server: `npx serve .`

---

## 📁 Repository Structure

```
proglang-grammar-simulator/
├── index.html       # Single-page application markup & tab panes
├── style.css        # Minimalist dark developer design system
├── app.js           # Interactive derivation engine, CFG validator & quiz
└── README.md        # Technical breakdown, formulas, and usage guide
```
