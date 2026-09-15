---
type: study-roadmap
title: "Programming Languages Modules 1-3: Ultra-Optimized 90-Minute Learning Protocol"
course: "CS311 / CICS - Programming Languages"
institution: "University of Santo Tomas - College of Information and Computing Sciences"
instructor: "Prof. Bernard C. Fabro, PCpE"
total_time: "90 Minutes (1 hour and 30 minutes)"
target_artifacts:
  - "ProgLang_Prelim_Super_Condensed_Reviewer.md"
  - "ProgLang_Modules_1_3_RemNote_Quiz.md"
  - "ProgLang_Prelim_Master_Forensic_Reviewer.md"
tags: [proglang, study-plan, 90-minute-sprint, exam-cram, ust-cics, fabro]
---

# ⏱️ 90-Minute Ultra-Optimized Mastery Roadmap: Programming Languages (Modules 1–3)

> [!IMPORTANT] The 90-Minute Cognitive Strategy
> You have **1 hour and 30 minutes** to build rock-solid recall across **3 Modules** and **10 exam assessment formats**.
> - **DO NOT** read dense textbooks or attempt to read the 2,100-line master reviewer line-by-line.
> - **USE THE TWO-TIER SYSTEM**:
>   1. Primary Review: [`ProgLang_Prelim_Super_Condensed_Reviewer.md`](file:///c:/dev/rye/30_Resources/Academics/Year_3/Semester%201/proglang/reviewers/ProgLang_Prelim_Super_Condensed_Reviewer.md) (high-yield rule sheets & tables).
>   2. Active Testing: [`ProgLang_Modules_1_3_RemNote_Quiz.md`](file:///c:/dev/rye/30_Resources/Academics/Year_3/Semester%201/proglang/reviewers/ProgLang_Modules_1_3_RemNote_Quiz.md) (the 135-item clozed active-recall engine).

---

## 🗺️ Master Time-Constraint Timeline (00:00 — 90:00)

```
[00:00 - 05:00]  PHASE 0: Cognitive Calibration & Setup (5 min)
[05:00 - 25:00]  PHASE 1: Module 1 Sprint — Taxonomy, Pipeline & History (20 min)
[25:00 - 50:00]  PHASE 2: Module 2 Deep Dive — Grammars, CFG Math & Derivations (25 min)
[50:00 - 75:00]  PHASE 3: Module 3 Heavyweight — The Sextuple, Scope Tracing & Lifetime (25 min)
[75:00 - 85:00]  PHASE 4: Active Recall Gauntlet — The 135-Item Cloze Drill (10 min)
[85:00 - 90:00]  PHASE 5: Formula Lock-in & Mental Anchor Polish (5 min)
```

---

## ⏱️ PHASE 0: 00:00 – 00:05 (5 Minutes) — Cognitive Calibration & Setup

### Objectives
1. Open the two operational files in split view:
   - Left: [`ProgLang_Prelim_Super_Condensed_Reviewer.md`](file:///c:/dev/rye/30_Resources/Academics/Year_3/Semester%201/proglang/reviewers/ProgLang_Prelim_Super_Condensed_Reviewer.md)
   - Right: [`ProgLang_Modules_1_3_RemNote_Quiz.md`](file:///c:/dev/rye/30_Resources/Academics/Year_3/Semester%201/proglang/reviewers/ProgLang_Modules_1_3_RemNote_Quiz.md)
2. Internalize the **Four Fundamental Anchor Questions** that govern 90% of exam points:
   - *Is this an issue of Grammar (Syntax) or Runtime Meaning (Semantics)?*
   - *When is this entity bound (Compile time vs. Run time)?*
   - *Where is the variable visible (Spatial / Scope) vs. When does it occupy RAM (Temporal / Lifetime)?*
   - *Am I tracing code by physical textual nesting (Static Scope) or by the function call stack (Dynamic Scope)?*

---

## ⏱️ PHASE 1: 00:05 – 00:25 (20 Minutes) — Module 1 Blitz
*Source: Condensed Reviewer §2 | Quiz Part I, IV, IX*

### Block 1A: 6 Application Domains & Languages (5 mins)
Memorize the domain signatures and classic representative languages:
- **Scientific**: Heavy math, matrix calculations, simulations $\to$ **Fortran, MATLAB, Python (NumPy/SciPy)**.
- **Business**: Transactions, structured data, reports, files $\to$ **COBOL, SQL, Java**.
- **AI**: Symbolic computation, logic inference, pattern matching $\to$ **LISP, Prolog, Python**.
- **Systems**: Hardware access, CPU/memory management, low overhead $\to$ **C, C++, Rust**.
- **Web**: Client-server architecture, front-end + back-end $\to$ **HTML/CSS/JS, PHP, Node.js**.
- **Scripting/Automation**: Repetitive tasks, gluing systems together, fast dev over speed $\to$ **Python, Bash, Perl**.

### Block 1B: Major Evaluation Criteria & Analogies (5 mins)
- **Readability**: Code read more often than written; affected by **Simplicity**, **Orthogonality** (Lego blocks), **Data Types**, **Syntax**.
- **Writability**: Productivity; affected by **Abstraction**, **Expressivity** (voice typing vs. manual typing).
- **Reliability**: Performs correctly under all conditions; **Type checking**, **Exception handling**, **Restricted aliasing** (Seatbelt analogy).
- **Cost**: Training, Development, Maintenance, Execution (Owning a car analogy).
- **Generality**: Used across multiple fields (Swiss Army knife analogy).
- **Well-definedness**: Precision, single interpretation (Legal contract analogy).

### Block 1C: Implementation Methods & The 7-Stage Compiler Pipeline (5 mins)
- **Compilation**: Source $\to$ Machine code ahead of time. Fast, hardware-optimized, platform-dependent.
- **Pure Interpretation**: Line-by-line at runtime. Slow, requires interpreter and source, highly portable.
- **Hybrid**: Source $\to$ **Bytecode** $\to$ **Virtual Machine (VM) / JIT**. Write once, run anywhere (Java JVM, C# CLR).
- **The 7 Pipeline Stages** *(Must memorize in exact order)*:
  1. `Source Code` $\to$ **Lexical Analysis (Scanner)** $\to$ `Tokens`
  2. `Tokens` $\to$ **Syntax Analysis (Parser)** $\to$ `Parse Tree`
  3. `Parse Tree` $\to$ **Semantic Analysis** $\to$ `Annotated Tree`
  4. `Annotated Tree` $\to$ **Intermediate Code Generation** $\to$ `IR Code`
  5. `IR Code` $\to$ **Code Optimization** $\to$ `Optimized IR`
  6. `Optimized IR` $\to$ **Code Generation** $\to$ `Machine Code`
  7. `Machine Code` $\to$ **Linking** $\to$ `Executable Program (.exe)`

### Block 1D: Language History Speed-Run (5 mins)
*Flash-memorize the creator, year, and purpose*:
- **1957**: **FORTRAN** (John Backus) — Formula Translation, scientific computing.
- **1958**: **LISP** (John McCarthy) — LISt Processing, AI & symbolic math.
- **1959**: **COBOL** (Grace Hopper) — Common Business-Oriented Language, banking (300 reserved words).
- **1964**: **BASIC** (Kemeny & Kurtz) — Beginner's symbolic code, student education.
- **1972**: **C** (Dennis Ritchie) — Built UNIX operating system at Bell Labs.
- **1980s**: **C++** (Bjarne Stroustrup) — Adds OOP to C.
- **1991**: **Python** (Guido van Rossum) — Readability and productivity.
- **1995**: **Java** (James Gosling) — "Write Once, Run Anywhere", JVM.
- **1995**: **JavaScript** (Brendan Eich) — Interactive client-side web pages.
- **1995**: **PHP** (Rasmus Lerdorf) — Server-side web scripting.
- **2000**: **C#** (Anders Hejlsberg) — .NET framework, C++ power + Java simplicity.
- **2009**: **Go** (Google: Griesemer, Pike, Thompson) — Fast cloud services & backend concurrency.
- **2010**: **Rust** (Graydon Hoare) — Memory safety without garbage collection.

---

## ⏱️ PHASE 2: 00:25 – 00:50 (25 Minutes) — Module 2 Mastery
*Source: Condensed Reviewer §3 | Quiz Part V, VIII*

### Block 2A: Syntax vs. Semantics Diagnostic Grid (5 mins)
- **Syntax** = Grammar / form / structure.
  - *Concrete Syntax*: Actual text rules (`x = 10;`).
  - *Abstract Syntax*: Internal parse tree representation (`3 + 5 * 2`, `*` tighter than `+`).
- **Semantics** = Meaning / runtime behavior.
  - *Static Semantics*: Checked at **compile time** (Type checking: `"Hello" - 5` in Java).
  - *Dynamic Semantics*: Checked at **run time** (Division by zero `5 / 0`, infinite loops).
- **English Analogies**:
  - *"Barks loudly the dog."* $\to$ **Syntax error** (word order violated).
  - *"The chair barks loudly."* $\to$ **Semantic error** (grammatically perfect, meaningless in reality).

### Block 2B: 6 General Problems in Describing Syntax (5 mins)
1. **Complexity**: Huge keyword lists, nested rules (Cookbook recipe analogy).
2. **Ambiguity**: Grammar allows $>1$ parse tree for the same statement (e.g., **dangling else**; *"I saw the man with the telescope"*).
3. **Context-Sensitivity**: Meaning depends on context; CFGs cannot check easily (e.g., `typedef int x;` in C; *"bank"* = money vs. river).
4. **Redundancy**: Multiple ways to write identical logic (`x = x + 1` vs `x += 1`).
5. **Readability of Formal Descriptions**: BNF is mathematically precise but hard for humans (Legal contract analogy).
6. **Language Evolution**: Updating grammars as features are added (`//` comments added to C; Traffic rules analogy).

### Block 2C: Recognizers vs. Generators (3 mins)
- **Recognizer**: Reads candidate strings over alphabet $\Sigma$, accepts or rejects. **Does NOT enumerate**; checks validity (compiler parser).
- **Generator**: Device that produces valid sentences (Button analogy). Used by humans to compare syntax against structure.

### Block 2D: Formal Grammar Engineering (BNF, EBNF, Railroad Diagrams, CFG) (12 mins)
- **BNF**: John Backus & Peter Naur (ALGOL-60). Production: `<non-terminal> ::= replacement`.
- **EBNF Shortcuts**:
  - `{ ... }` = Repetition (0 or more times).
  - `[ ... ]` = Optional (0 or 1 time).
  - `( ... )` = Grouping.
  - *While loop in EBNF*: `while_stmt = "while" "(" condition ")" statement ;`
- **Syntax / Railroad Diagrams**:
  - **Ovals / Circles** = Terminals (literals, keywords).
  - **Rectangles** = Non-terminals (syntactic categories).
  - **Loops** = Repetition.
- **CFG 4-Tuple**: $G = (V, \Sigma, R, S)$
  - $V$ = Variables / Non-terminals.
  - $\Sigma$ = Terminals.
  - $R$ = Production rules ($A \to \alpha$).
  - $S$ = Start symbol (root, usually `<program>`).
- **Combinatorial Sentence Math** *(Guaranteed exam item)*:
  $$\langle S \rangle \to \langle NP \rangle \langle VP \rangle$$
  - Choices for $\langle Det \rangle = 2$, $\langle N \rangle = 2 \implies \langle NP \rangle = 2 \times 2 = \mathbf{4}$
  - Choices for $\langle V \rangle = 2$, $\langle NP \rangle = 4 \implies \langle VP \rangle = 2 \times 4 = \mathbf{8}$
  - Total sentences: $\langle S \rangle = 4 \times 8 = \mathbf{32}$ possible sentences!
- **Balanced Parentheses CFG**: $S \to (S)S \mid \varepsilon$
- **Derivation of $A = B * (A + C)$**:
  $\langle \text{assign} \rangle \implies \langle \text{id} \rangle = \langle \text{expr} \rangle \implies A = \langle \text{id} \rangle * \langle \text{expr} \rangle \implies A = B * ( \langle \text{id} \rangle + \langle \text{expr} \rangle ) \implies A = B * ( A + C )$

---

## ⏱️ PHASE 3: 00:50 – 01:15 (25 Minutes) — Module 3 Heavyweight
*Source: Condensed Reviewer §4 | Quiz Part VI, VII, X*

### Block 3A: The Variable Sextuple & Memory Aliasing (5 mins)
Every imperative variable is characterized by 6 attributes:
1. **Name**: String of characters (Identifier).
   - *C99 limits*: **63 internal**, **31 external** characters.
   - *Reserved words*: Cannot be redefined (`if`, `while`).
   - *Keywords*: Special meaning but redefinable (historic Fortran).
2. **Address (l-value)**: Memory cell location. Can change in recursion/stack allocation.
   - **Aliasing**: Multiple names reference the same cell (pointers, references). Harms readability, complicates debugging.
3. **Value (r-value)**: Contents of the memory cell.
4. **Type**: Range of values and legal operations (Java `int`: -2,147,483,648 to 2,147,483,647).
5. **Lifetime**: Temporal duration bound to a memory location.
6. **Scope**: Spatial / textual range of statements where variable is visible.

### Block 3B: The 6 Binding Times (Order & Examples) (5 mins)
1. **Language Design Time**: Operator symbols bound to operations (`*` $\to$ multiplication).
2. **Language Implementation Time**: Type mapped to bit length/range (`int` $\to$ 32-bit two's complement).
3. **Compile Time**: Variable bound to data type via explicit declaration (`int x;`).
4. **Load Time**: Static variable bound to memory address before execution starts.
5. **Link Time**: External library function bound to call site (`sqrt()` in C).
6. **Run Time**: Variable bound to actual dynamic value (`sum = 25`).

### Block 3C: Storage Bindings & Lifetimes (4 mins)
- **Static Variables**: Bound before runtime, persist until program ends (`static int x;`, globals). Direct addressing, fast, zero allocation overhead. **Disadvantages**: No recursion support, inflexible memory reuse.
- **Stack-Dynamic Variables**: Bound on call stack when block/function elaborates, freed on exit. Enables recursion, saves memory.
- **Implicit Heap-Dynamic Variables**: Automatically allocated/freed on the heap upon assignment (Python, JS). High flexibility, generic code, but high runtime overhead and weak error checking.

### Block 3D: Static vs. Dynamic Scope Tracing (8 mins)
- **Static (Lexical) Scoping**: Determined **before execution** by inspecting textual structure.
  - Search order: Local block $\to$ Enclosing **Static Parent** $\to$ Outward ancestors $\to$ Undeclared error.
- **Dynamic Scoping**: Determined **at run time** based on the **calling sequence**.
  - Search order: Local declarations $\to$ Calling function (**Dynamic Parent**) $\to$ Call stack history.
- **The Canonical Tracing Showdown**:
  ```javascript
  function big() {
      function sub1() { var x = 7; sub2(); }
      function sub2() { var y = x; }
      var x = 3;
      sub1();
  }
  ```
  - **Static Scope**: In `sub2()`, `x` resolves to **`big`** $\to \mathbf{y = 3}$ (because `sub1` is not a lexical ancestor of `sub2`).
  - **Dynamic Scope**: In `sub2()`, `x` resolves to caller **`sub1`** $\to \mathbf{y = 7}$ (because `sub1` called `sub2`).

### Block 3E: Scope vs. Lifetime & Named Constants (3 mins)
- **Scope $\neq$ Lifetime**:
  - `static int count = 0;` inside a C function $\to$ **Local scope** (only visible in function), but **Global lifetime** (persists throughout execution).
  - In `compute()` calling `printHeader()` $\to$ `sum` in `compute` has **Lifetime** (stays allocated in RAM), but **NO Scope** inside `printHeader` (inaccessible).
- **Named Constants Comparison**:
  - **Java**: `final` $\to$ Dynamic binding at declaration or constructor (assigned once only).
  - **C#**: `const` $\to$ Static compile-time literal; `readonly` $\to$ Dynamic runtime in constructor.
  - **C++**: `const` $\to$ Dynamic at declaration, allows variable expressions.

---

## ⏱️ PHASE 4: 01:15 – 01:25 (10 Minutes) — Active Recall Cloze Gauntlet
*Tool: [`ProgLang_Modules_1_3_RemNote_Quiz.md`](file:///c:/dev/rye/30_Resources/Academics/Year_3/Semester%201/proglang/reviewers/ProgLang_Modules_1_3_RemNote_Quiz.md)*

Spend exactly 10 minutes rapid-testing yourself against the quiz:
1. **Minutes 75–78**: Test **Part II (Items 36–65, Identification)**. Cover the `{{cloze}}` tokens with your hand or mentally fill them in.
2. **Minutes 78–81**: Test **Part III (Items 66–80, True or False)**. Verify the forensic reason for each FALSE item.
3. **Minutes 81–83**: Test **Part VI (Items 106–115, Code Analysis)**. Check your prediction for variable shadowing (`score = 80`), C++ `::` scope operator, and Python `nonlocal`.
4. **Minutes 83–85**: Test **Part VIII & X (Derivations & Essay Synthesis)**. Re-derive $A = B * (A + C)$ and review the 4-6 sentence scope/binding justification.

---

## ⏱️ PHASE 5: 01:25 – 01:30 (5 Minutes) — Final Formula & Trap Lock-in

Spend the final 5 minutes locking in the **Top 5 Exam Trap Areas**:
1. **Java/C# Nested Scope Rule**: Declaring the same variable name inside an inner block of the same method is **ILLEGAL** (prevents confusion). C/C++ permits it (inner shadows outer).
2. **Python Global Rule**: You can **read** global variables without any keyword; you ONLY need `global var` if you are **assigning/modifying** it.
3. **C89 vs C99**: C89 required declarations strictly at the top of the block; modern languages (C99, C++, Java, C#) allow declarations anywhere.
4. **Grammar Depth vs. Precedence**: The **deeper** a construct is defined in the grammar hierarchy, the deeper it sits in the parse tree, meaning it has **HIGHER PRECEDENCE** (multiplication deeper than addition).
5. **Recognizer vs. Generator**: Recognizers validate given strings ($R$ accepts/rejects); they **NEVER enumerate** all sentences.

---
*Roadmap Complete. Execute each phase with strict timer discipline for 100% exam mastery.*
