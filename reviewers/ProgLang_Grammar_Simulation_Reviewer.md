---
type: simulation-reviewer
title: "Programming Languages: Formal Grammars, Derivations & CFG Step-by-Step Simulation Lab"
course: "CS311 / CICS - Programming Languages"
institution: "University of Santo Tomas - College of Information and Computing Sciences"
instructor: "Prof. Bernard C. Fabro, PCpE"
academic_year: "1st Term AY 2026-2027"
format: "Step-by-Step Simulation + Plain-English Jargon Glossaries + Practice Variations"
target_file: "ProgLang_Grammar_Simulation_Reviewer.md"
tags: [proglang, grammar-simulator, derivations, cfg, bnf, parse-trees, ust-cics, fabro]
---

# 🔬 Formal Grammars, Derivations & CFG Step-by-Step Simulation Lab
### Complete Procedural Breakdown with Plain-English Explanations, Character Counts, and Practice Drills
**Designed for UST-CICS Prelims | Prof. Bernard C. Fabro, PCpE**

---

## 📖 Plain-English Jargon Glossary (Read First!)
*Every technical term used on exam slides explained simply without unnecessary complexity:*

- **Grammar (*rulebook*)**: The collection of formal rules that defines what statements are legally allowed in a programming language.
- **Terminal (*final character*)**: An actual character, symbol, or keyword that appears in the final written code (e.g., `A`, `+`, `*`, `int`, `;`). It is called "terminal" because it is a dead end—it cannot be expanded or broken down any further.
- **Non-terminal (*placeholder*)**: A temporary category or label enclosed in angle brackets (e.g., `⟨expr⟩`, `⟨id⟩`, `⟨Type⟩`). It is a variable that **must** be replaced by grammar rules until only terminals remain.
- **Production Rule (*replacement recipe*)**: A rule formatted as $\text{Left} \to \text{Right}$. It means: *"Whenever you see the placeholder on the left, you can replace it with the sequence on the right."*
- **Start Symbol (*starting point*)**: The initial non-terminal where every derivation begins (usually `⟨program⟩`, `⟨assign⟩`, or `⟨S⟩`).
- **Derivation (*step-by-step expansion*)**: The entire sequence of replacing non-terminals one by one until you reach the final line of code.
- **Sentential Form (*work-in-progress string*)**: The intermediate string of mixed placeholders and symbols at any single step during a derivation.
- **Leftmost Derivation (*left-to-right rule*)**: A derivation where you **always replace the leftmost remaining placeholder first** before touching any placeholders to its right.
- **Parse Tree (*visual family tree*)**: A tree diagram that graphically shows how grammar rules were applied. The root is the start symbol, branches are rule expansions, and leaves are the final terminal symbols.
- **$\varepsilon$ (Epsilon, *empty string / stop signal*)**: A special theoretical symbol that represents "nothing" or an empty string. In grammars, replacing a non-terminal with $\varepsilon$ means erasing it so the rule stops repeating.

---

# 🧪 SECTION 1: Step-by-Step Assignment Derivation Simulation
### Target Expression: $A = B * (A + C)$

### 1.1 The Formal Grammar Rules
Before starting, we have three production rules:
1. $\langle\text{assign}\rangle \to \langle\text{id}\rangle = \langle\text{expr}\rangle$  
   *(Meaning: An assignment statement consists of an identifier, an equals sign, and an expression)*
2. $\langle\text{expr}\rangle \to \langle\text{id}\rangle + \langle\text{expr}\rangle \mid \langle\text{id}\rangle * \langle\text{expr}\rangle \mid ( \langle\text{expr}\rangle ) \mid \langle\text{id}\rangle$  
   *(Meaning: An expression can be addition, multiplication, parenthesized expression, or a single identifier)*
3. $\langle\text{id}\rangle \to A \mid B \mid C$  
   *(Meaning: An identifier can be variable $A$, $B$, or $C$)*

---

### 1.2 Step-by-Step Procedural Simulation Table
*This table tracks every exact characteristic across all 8 transition steps: what comes next, character count, token count, and the exact reason for the choice.*

| Step # | Sentential Form (Current String) | Non-Terminals Remaining | Terminals Locked | Token Count | Char Count (No spaces) | What Comes Next? (Leftmost Target) | Rule Applied | Reason for Choice |
| :---: | :--- | :---: | :---: | :---: | :---: | :--- | :--- | :--- |
| **0** | `⟨assign⟩` | 1 (`⟨assign⟩`) | 0 | 1 | 8 | `⟨assign⟩` | Start Symbol | The derivation must begin at the root statement. |
| **1** | `⟨id⟩ = ⟨expr⟩` | 2 (`⟨id⟩`, `⟨expr⟩`) | 1 (`=`) | 3 | 11 | `⟨id⟩` | `⟨assign⟩ → ⟨id⟩ = ⟨expr⟩` | Establishes assignment structure with left-hand variable and equals sign. |
| **2** | `A = ⟨expr⟩` | 1 (`⟨expr⟩`) | 2 (`A`, `=`) | 3 | 8 | `⟨expr⟩` | `⟨id⟩ → A` | **Leftmost rule**: Expand leftmost placeholder `⟨id⟩` into target variable `A`. |
| **3** | `A = ⟨id⟩ * ⟨expr⟩` | 2 (`⟨id⟩`, `⟨expr⟩`) | 3 (`A`, `=`, `*`) | 5 | 13 | `⟨id⟩` | `⟨expr⟩ → ⟨id⟩ * ⟨expr⟩` | Target has `B * (...)`. Outer operation is multiplication. |
| **4** | `A = B * ⟨expr⟩` | 1 (`⟨expr⟩`) | 4 (`A`, `=`, `B`, `*`) | 5 | 10 | `⟨expr⟩` | `⟨id⟩ → B` | **Leftmost rule**: Expand leftmost placeholder `⟨id⟩` into variable `B`. |
| **5** | `A = B * ( ⟨expr⟩ )` | 1 (`⟨expr⟩`) | 6 (`A`, `=`, `B`, `*`, `(`, `)`) | 7 | 12 | `⟨expr⟩` | `⟨expr⟩ → ( ⟨expr⟩ )` | Target has parentheses around `(A + C)`. Wrap expression in `( )`. |
| **6** | `A = B * ( ⟨id⟩ + ⟨expr⟩ )` | 2 (`⟨id⟩`, `⟨expr⟩`) | 7 (`A`, `=`, `B`, `*`, `(`, `+`, `)`) | 9 | 17 | `⟨id⟩` | `⟨expr⟩ → ⟨id⟩ + ⟨expr⟩` | Inside parentheses, operation is addition. Split into `⟨id⟩ + ⟨expr⟩`. |
| **7** | `A = B * ( A + ⟨expr⟩ )` | 1 (`⟨expr⟩`) | 8 (`A`, `=`, `B`, `*`, `(`, `A`, `+`, `)`) | 9 | 14 | `⟨expr⟩` | `⟨id⟩ → A` | **Leftmost rule**: Replace first operand placeholder inside parentheses with `A`. |
| **8** | `A = B * ( A + ⟨id⟩ )` | 1 (`⟨id⟩`) | 8 (`A`, `=`, `B`, `*`, `(`, `A`, `+`, `)`) | 9 | 13 | `⟨id⟩` | `⟨expr⟩ → ⟨id⟩` | Target has a single variable `C`. Reduce remaining `⟨expr⟩` to single `⟨id⟩`. |
| **9** | **`A = B * ( A + C )`** | **0 (DONE!)** | **9 (All locked)** | **9** | **10** | **None (Complete)** | `⟨id⟩ → C` | Replace final placeholder `⟨id⟩` with `C`. All tokens are now terminals. |

---

### 1.3 Key Rules to Never Forget on the Exam
1. **The "Leftmost" Directive**: Always scan the string from left to right. Locate the **first opening bracket `⟨`**. That specific placeholder is the **only** one you are permitted to replace on that step.
2. **Parentheses Priority**: Notice Step 5. Before you can produce the addition `A + C`, you **must introduce the parentheses `( ⟨expr⟩ )`**. You cannot add inside parentheses until the parentheses themselves exist!
3. **Termination Condition**: A derivation is strictly complete when **zero non-terminals remain** (no more angle brackets `⟨ ⟩`).

---

### 1.4 Practice Question 1 (Similar Quiz Problem)
**Task**: Perform a leftmost derivation for the statement: `A = B + C * A` using the same grammar.

#### Step-by-Step Solution:
1. `⟨assign⟩`
2. `⟹ ⟨id⟩ = ⟨expr⟩` *(Rule: `⟨assign⟩ → ⟨id⟩ = ⟨expr⟩`)*
3. `⟹ A = ⟨expr⟩` *(Rule: `⟨id⟩ → A`)*
4. `⟹ A = ⟨id⟩ + ⟨expr⟩` *(Rule: `⟨expr⟩ → ⟨id⟩ + ⟨expr⟩`)*
5. `⟹ A = B + ⟨expr⟩` *(Rule: `⟨id⟩ → B`)*
6. `⟹ A = B + ⟨id⟩ * ⟨expr⟩` *(Rule: `⟨expr⟩ → ⟨id⟩ * ⟨expr⟩`)*
7. `⟹ A = B + C * ⟨expr⟩` *(Rule: `⟨id⟩ → C`)*
8. `⟹ A = B + C * ⟨id⟩` *(Rule: `⟨expr⟩ → ⟨id⟩`)*
9. `⟹ A = B + C * A` *(Rule: `⟨id⟩ → A` — Derivation complete!)*

---

# 🧪 SECTION 2: Balanced Parentheses CFG Simulation
### Rule: $S \to (S)S \mid \varepsilon$

### 2.1 Anatomy of the Rule
This one single rule generates **every mathematically legal combination of balanced parentheses** in computer science.
- `(`: An opening terminal bracket.
- `S`: The nested inside (can hold more parentheses or stop).
- `)`: A closing terminal bracket.
- `S`: The chained right side (can hold adjacent parentheses or stop).
- `|`: "Or".
- `ε`: The stop button (replaces $S$ with nothing).

---

### 2.2 Simulation of the 4 Foundational Patterns

#### Pattern A: The Empty String (Zero Parentheses)
- Step 1: Start at $S$
- Step 2: Apply $S \to \varepsilon$
- Output: `""` *(Empty string, length = 0)*

#### Pattern B: Single Pair — `()`
- Step 1: $S$
- Step 2: $\implies (S)S$ *(Pick first option)*
- Step 3: $\implies (\varepsilon)S \implies ()S$ *(Turn inner $S$ to $\varepsilon$)*
- Step 4: $\implies ()\varepsilon \implies \mathbf{()}$ *(Turn trailing $S$ to $\varepsilon$)*
- Output: `()` *(Length = 2 characters)*

#### Pattern C: Nested Pair — `(())`
- Step 1: $S$
- Step 2: $\implies (S)S$
- Step 3: Expand the **inner** $S$: $\implies ((S)S)S$
- Step 4: Turn inner-most $S$ to $\varepsilon$: $\implies ((\varepsilon)S)S \implies (()S)S$
- Step 5: Turn middle $S$ to $\varepsilon$: $\implies (() \varepsilon)S \implies (())S$
- Step 6: Turn outer trailing $S$ to $\varepsilon$: $\implies (()) \varepsilon \implies \mathbf{(())}$
- Output: `(())` *(Length = 4 characters)*

#### Pattern D: Chained Pairs — `()()`
- Step 1: $S$
- Step 2: $\implies (S)S$
- Step 3: Turn inner $S$ to $\varepsilon$: $\implies ()S$
- Step 4: Expand trailing $S$: $\implies ()(S)S$
- Step 5: Turn inner $S$ of second pair to $\varepsilon$: $\implies ()()S$
- Step 6: Turn trailing $S$ to $\varepsilon$: $\implies \mathbf{()()}$
- Output: `()()` *(Length = 4 characters)*

---

### 2.3 Diagnostic Table: Can this Grammar Generate It?

| Candidate String | Valid or Invalid? | Reason / Derivation Path |
| :---: | :---: | :--- |
| `()` | **VALID** | $S \to (S)S \to (\varepsilon)\varepsilon \to ()$ |
| `(())` | **VALID** | Nested once: $S \to ((S)S)S \to (()) $ |
| `()()` | **VALID** | Chained once: $S \to (S)(S)S \to ()()$ |
| `((()))` | **VALID** | Nested twice: $S \to (((S)S)S)S \to ((()))$ |
| `(()())` | **VALID** | Combination: Outer pair wrapping two chained pairs |
| `)(` | **INVALID** | Opens with `)`. Grammar strictly forces `(` first in $(S)S$. |
| `(()` | **INVALID** | 2 opens, 1 close. Every `(` in $(S)S$ is paired with a matching `)`. |
| `())` | **INVALID** | 1 open, 2 closes. Unbalanced. |

---

# 🧪 SECTION 3: C-Style Declarations CFG Simulation
### Target Declarations: `int x;`, `float y, z;`, `char a, b, c;`

### 3.1 The 3 Production Rules
1. $\langle\text{Decl}\rangle \to \langle\text{Type}\rangle\langle\text{VarList}\rangle;$  
   *(Every declaration requires a Type, followed by a Variable List, ending with a semicolon)*
2. $\langle\text{Type}\rangle \to \text{int} \mid \text{float} \mid \text{char}$  
   *(The data type must be chosen from int, float, or char)*
3. $\langle\text{VarList}\rangle \to \text{id} \mid \text{id} , \langle\text{VarList}\rangle$  
   *(A recursive comma-separated list: either a single id, or an id followed by a comma and more ids)*

---

### 3.2 Simulation: Single vs. Multiple Variable Declarations

#### Derivation A: Single Variable — `int x;`
1. $\langle\text{Decl}\rangle$
2. $\implies \langle\text{Type}\rangle\langle\text{VarList}\rangle;$
3. $\implies \text{int } \langle\text{VarList}\rangle;$ *(Rule: $\langle\text{Type}\rangle \to \text{int}$)*
4. $\implies \mathbf{\text{int } x;}$ *(Rule: $\langle\text{VarList}\rangle \to \text{id}$ where $\text{id} = x$)*
- **Token Count**: 3 (`int`, `x`, `;`)
- **Structure**: Type + single identifier + semicolon.

#### Derivation B: Multiple Variables with Recursion — `float y, z;`
1. $\langle\text{Decl}\rangle$
2. $\implies \langle\text{Type}\rangle\langle\text{VarList}\rangle;$
3. $\implies \text{float } \langle\text{VarList}\rangle;$ *(Rule: $\langle\text{Type}\rangle \to \text{float}$)*
4. $\implies \text{float } \text{id} , \langle\text{VarList}\rangle;$ *(Rule: $\langle\text{VarList}\rangle \to \text{id} , \langle\text{VarList}\rangle$)*
5. $\implies \text{float } y , \langle\text{VarList}\rangle;$ *(Replace leftmost id with $y$)*
6. $\implies \mathbf{\text{float } y, z;}$ *(Rule: $\langle\text{VarList}\rangle \to \text{id}$ where $\text{id} = z$)*
- **Token Count**: 5 (`float`, `y`, `,`, `z`, `;`)
- **Structure**: Type + recursive identifier list separated by commas + semicolon.

---

### 3.3 Diagnostic Table: Valid vs. Invalid Declarations

| Statement Candidate | Valid or Invalid? | Grammar Defect / Reason |
| :--- | :---: | :--- |
| `int x;` | **VALID** | Conforms to $\langle\text{Type}\rangle \langle\text{VarList}\rangle;$ |
| `float y, z;` | **VALID** | Uses recursive $\langle\text{VarList}\rangle \to \text{id}, \langle\text{VarList}\rangle$ |
| `char a, b, c;` | **VALID** | Recurses twice through $\langle\text{VarList}\rangle$ |
| `int x` | **INVALID** | Missing terminal semicolon `;` at the end |
| `double w;` | **INVALID** | `double` is not in $\langle\text{Type}\rangle \to \text{int} \mid \text{float} \mid \text{char}$ |
| `float y, ;` | **INVALID** | Trailing comma before semicolon; after `,` an identifier is strictly required |
| `x = 10;` | **INVALID** | Missing type identifier; this is an assignment, not a declaration |

---

# 🧪 SECTION 4: Combinatorial Language Sizing Proof
### Total Sentences Formula: $|\langle S \rangle| = |\langle NP \rangle| \times |\langle VP \rangle|$

### 4.1 The Formal Grammar Hierarchy
- Sentence Rule: $\langle S \rangle \to \langle NP \rangle \langle VP \rangle$ *(A sentence is a Noun Phrase followed by a Verb Phrase)*
- Noun Phrase Rule: $\langle NP \rangle \to \langle Det \rangle \langle N \rangle$ *(A Noun Phrase is a Determiner followed by a Noun)*
- Verb Phrase Rule: $\langle VP \rangle \to \langle V \rangle \langle NP \rangle$ *(A Verb Phrase is a Verb followed by a Noun Phrase)*

### 4.2 The Given Terminal Set
- $|\langle Det \rangle| = 2$ choices: `{"the", "a"}`
- $|\langle N \rangle| = 2$ choices: `{"dog", "cat"}`
- $|\langle V \rangle| = 2$ choices: `{"chased", "saw"}`

---

### 4.3 The 3-Step Mathematical Proof

```
Step 1: Calculate Noun Phrase possibilities (|NP|)
        Formula: |NP| = |Det| × |N|
        Math:    |NP| = 2 × 2 = 4 possibilities
        Choices: {"the dog", "the cat", "a dog", "a cat"}

Step 2: Calculate Verb Phrase possibilities (|VP|)
        Formula: |VP| = |V| × |NP|
        Math:    |VP| = 2 × 4 = 8 possibilities
        Choices: {
          "chased the dog", "chased the cat", "chased a dog", "chased a cat",
          "saw the dog",    "saw the cat",    "saw a dog",    "saw a cat"
        }

Step 3: Calculate Total Sentence possibilities (|S|)
        Formula: |S| = |NP| × |VP|
        Math:    |S| = 4 × 8 = 32 unique sentences!
```

---

### 4.4 Why the Multiplication Rule Applies (Fundamental Counting Principle)
Whenever a composite structure requires making a sequence of independent choices:
- Choice 1: Subject Noun Phrase ($4$ ways)
- Choice 2: Predicate Verb Phrase ($8$ ways)
Because every subject can be paired with any predicate, the total combinations are:
$$\text{Total Sentences} = 4 \times 8 = \mathbf{32}$$

---

### 4.5 Practice Drills with Different Numbers (Exam Variations)

#### Drill Variation 1: Expanded Vocabularies
Suppose the professor gives this question on the quiz:
- $|\langle Det \rangle| = 3$ choices: `{"the", "a", "one"}`
- $|\langle N \rangle| = 4$ choices: `{"dog", "cat", "bird", "fish"}`
- $|\langle V \rangle| = 3$ choices: `{"chased", "saw", "heard"}`

**How many valid sentences can this grammar generate?**
1. $|\langle NP \rangle| = 3 \times 4 = \mathbf{12}$
2. $|\langle VP \rangle| = 3 \times 12 = \mathbf{36}$
3. $|\langle S \rangle| = |\langle NP \rangle| \times |\langle VP \rangle| = 12 \times 36 = \mathbf{432\text{ sentences}}$

#### Drill Variation 2: Adding an Adjective Phrase
Suppose $\langle NP \rangle \to \langle Det \rangle \langle Adj \rangle \langle N \rangle$ where:
- $|\langle Det \rangle| = 2$
- $|\langle Adj \rangle| = 3$ `{"big", "small", "quick"}`
- $|\langle N \rangle| = 2$
- $|\langle V \rangle| = 2$

**How many valid sentences?**
1. $|\langle NP \rangle| = 2 \times 3 \times 2 = \mathbf{12}$
2. $|\langle VP \rangle| = 2 \times 12 = \mathbf{24}$
3. $|\langle S \rangle| = 12 \times 24 = \mathbf{288\text{ sentences}}$

---

## 🎯 SUMMARY OF CORE EXAM CHARACTERISTICS

```
┌──────────────────────────────────────────────────────────────────────────────────────────────────┐
│                                 CHARACTERISTICS QUICK REFERENCE                                  │
├──────────────────────────┬───────────────────────┬───────────────────────────────────────────────┤
│ Concept                  │ Key Identifiers       │ Critical Rule / Formula                       │
├──────────────────────────┼───────────────────────┼───────────────────────────────────────────────┤
│ Leftmost Derivation      │ Starts at <assign>    │ ALWAYS replace the leftmost <placeholder> 1st;│
│                          │ 9 tokens in final     │ Parentheses must be generated BEFORE addition!│
├──────────────────────────┼───────────────────────┼───────────────────────────────────────────────┤
│ Balanced Parentheses     │ S -> (S)S | ε         │ ε is the stop button; nesting puts ( ) inside;│
│                          │                       │ chaining puts ( ) on the right.               │
├──────────────────────────┼───────────────────────┼───────────────────────────────────────────────┤
│ C-Style Declarations     │ <Type> <VarList> ;    │ Type is int/float/char; comma recursion;      │
│                          │                       │ semicolon is MANDATORY at the end.            │
├──────────────────────────┼───────────────────────┼───────────────────────────────────────────────┤
│ Combinatorial Language   │ |S| = |NP| × |VP|     │ |NP| = |Det| × |N|;                           │
│ Sizing                   │ 4 × 8 = 32 sentences  │ |VP| = |V| × |NP|; multiply components.       │
└──────────────────────────┴───────────────────────┴───────────────────────────────────────────────┘
```

---
*End of Simulation Reviewer. Practice the step-by-step tables and drill questions to lock in 100% exam accuracy.*
