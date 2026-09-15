# Formal Grammars & CFG Simulation Lab
> **UST-CICS CS311 Programming Languages &bull; Prof. Bernard C. Fabro, PCpE**

A minimalist, interactive step-by-step simulator and forensic practice lab for mastering **formal grammars, derivations, context-free grammars (CFGs), and combinatorial sentence sizing**.

---

## 🔬 Core Learning Modules

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
