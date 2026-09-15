---
type: reviewer
course: "CS311 / CICS - Programming Languages"
institution: "University of Santo Tomas - College of Information and Computing Sciences"
instructor: "Prof. Bernard C. Fabro, PCpE"
academic_year: "1st Term AY 2026-2027"
tags: [proglang, prelims, cheat-sheet, high-yield, quick-review, flashcards/proglang]
status: completed
priority: high
mastery_score: 0
connections: "[[ProgLang_Prelim_Master_Forensic_Reviewer]]"
last-reviewed: 2026-09-14
---

# Programming Languages: Prelim Super Condensed Reviewer & Exam Cheat Sheet
### High-Yield Flash Summary for Modules 1, 2, and 3

> [!TIP] Exam Cramming Strategy
> This condensed cheat sheet extracts the **core definitions, formulas, code showdowns, comparison matrices, and official exam answers** from Modules 1, 2, and 3. Use this for rapid 15-minute reviews before the examination.

---

## 1. High-Yield Formula & Rule Matrix

```
┌─────────────────────────────────────────────────────────────────────────────────────────────┐
│                             HIGH-YIELD CORE CHEAT SHEET                                     │
├──────────────────────────┬──────────────────────────────────────────────────────────────────┤
│ Syntax vs. Semantics     │ Syntax = FORM / GRAMMAR; Semantics = MEANING / RUNTIME BEHAVIOR. │
├──────────────────────────┼──────────────────────────────────────────────────────────────────┤
│ Static vs. Dynamic Sem.  │ Static = Checked at COMPILE TIME (Type checking: `"hi" - 5`).    │
│                          │ Dynamic = Checked at RUN TIME (Infinite loops, divide by zero).  │
├──────────────────────────┼──────────────────────────────────────────────────────────────────┤
│ CFG 4-Tuple              │ G = (V, Σ, R, S) -> Non-terminals, Terminals, Rules, Start Sym.  │
├──────────────────────────┼──────────────────────────────────────────────────────────────────┤
│ Grammar Precedence Rule  │ DEEPER in grammar hierarchy = DEEPER in parse tree = HIGHER PREC.│
├──────────────────────────┼──────────────────────────────────────────────────────────────────┤
│ EBNF Metasymbols         │ [ ] = Optional (0 or 1); { } = Repetition (0+); ( ) = Grouping. │
├──────────────────────────┼──────────────────────────────────────────────────────────────────┤
│ Variable Sextuple        │ < Name, Address (l-value), Value (r-value), Type, Lifetime, Scope >│
├──────────────────────────┼──────────────────────────────────────────────────────────────────┤
│ Aliasing                 │ Multiple variable names pointing to the SAME memory address.     │
├──────────────────────────┼──────────────────────────────────────────────────────────────────┤
│ 6 Binding Times (Order)  │ Language Design -> Implementation -> Compile -> Link -> Load -> Run│
├──────────────────────────┼──────────────────────────────────────────────────────────────────┤
│ Static vs. Dynamic Scope │ Static = Program text structure; Dynamic = Runtime calling seq.  │
├──────────────────────────┼──────────────────────────────────────────────────────────────────┤
│ Scope vs. Lifetime       │ Scope is SPATIAL (where in code); Lifetime is TEMPORAL (when in RAM).│
├──────────────────────────┼──────────────────────────────────────────────────────────────────┤
│ Canonical Scope Trace    │ In nested `big() -> sub1(x=7) -> sub2(y=x)`:                     │
│                          │ Static Scope: y = 3 (from big); Dynamic Scope: y = 7 (from sub1).│
├──────────────────────────┼──────────────────────────────────────────────────────────────────┤
│ Java vs. C# Constants    │ Java `final` = Dynamic single-assignment (declaration/constructor).│
│                          │ C# `const` = Static compile-time literal; `readonly` = Dynamic runtime.│
└──────────────────────────┴──────────────────────────────────────────────────────────────────┘
```

---

## 2. Module 1 Quick Review: Concepts, Domains, & Implementation

### 2.1 The 9 Reasons for Studying Concepts of Programming Languages

| # | Core Reason | High-Yield Technical Summary | Real-World Exemplar / Analogy |
| :-: | :--- | :--- | :--- |
| **1** | **Learn New Languages** | Understanding core primitives (OOP, scopes) makes learning new syntax trivial. | Switching from Express.js (Node.js) to Django (Python). |
| **2** | **Implementation Insight** | Knowing how runtime systems (GC, activation records) work prevents memory bugs. | Game devs pooling memory in C# to prevent GC lag spikes. |
| **3** | **Informed Language Choice** | Selecting the exact right language for the domain trade-offs. | Choosing Go for concurrency vs. Python for data analytics. |
| **4** | **Write Efficient Code** | Understanding memory layout, cache locality, and parameter modes. | Using `const Matrix&` in C++ instead of pass-by-value copies. |
| **5** | **Advanced Debugging** | Grasping stack vs. heap allocation to trace segfaults and memory leaks. | DevOps engineers debugging crashes in shell scripts. |
| **6** | **Compiler/Parser Basis** | Understanding grammars (BNF/CFG) to build DSLs and AST tools. | Building custom rule engines via ANTLR or Lex/Yacc. |
| **7** | **Better Software Design** | Leveraging language modularity (packages, interfaces) for architecture. | Structuring enterprise Java backends via MVC and DI. |
| **8** | **Paradigm Exposure** | Functional and declarative styles prevent race conditions in concurrency. | Writing pure state reducers in React (JavaScript). |
| **9** | **Creativity & Innovation** | Inventing domain-specific scripting languages inside larger systems. | Embedding Lua scripting inside a C++ 3D game engine. |

---

### 2.2 The 6 Programming Domains

| Domain | Demands & Characteristics | Dominant Languages | Real-World Exemplar |
| :--- | :--- | :--- | :--- |
| **1. Scientific** | Floating-point precision, matrix math, raw speed. | FORTRAN, MATLAB, Python (NumPy), Julia. | NASA simulating rocket aerodynamics. |
| **2. Business** | Fixed-point decimal arithmetic, record I/O, reporting. | COBOL, Java, SQL. | Central bank ledgers settling billions daily. |
| **3. AI** | Symbolic reasoning, graphs, recursion, tensor graphs. | LISP, Prolog, Python (PyTorch, TensorFlow). | Self-driving car stop sign recognition. |
| **4. Systems** | Direct hardware control, manual memory/pointers, zero GC. | C, C++, Rust. | Linux kernel, USB drivers, drone firmware. |
| **5. Web** | Client-server networking, DOM rendering, async APIs. | JS/TS (frontend), PHP, Python, Node.js. | E-commerce web applications (Amazon). |
| **6. Scripting** | Rapid prototyping, lightweight syntax, OS automation. | Python, Bash, Perl. | Automated nightly server backup scripts. |

---

### 2.3 Evaluation Criteria & Analogies Showdown

- **Readability**: How easily code is understood. Harmed by **Feature Multiplicity** ($x=x+1, x+=1, x++, ++x$). Enhanced by **Orthogonality** (Lego block composability).
  - *Example*: Python (`if temp > 30: print("Hot")`) vs. Perl (`print "Hot" if $temp > 30;`).
- **Writability**: How easily code is created. Enhanced by **expressivity** and **abstraction**.
  - *Example*: Python list comprehension `[x**2 for x in range(10)]` vs. manual C `for` loop.
  - *Analogy*: Voice typing vs. manual keyboard typing.
- **Reliability**: Performing correctly under all conditions. Enforced by **static type checking**, **exception handling**, and **restricted aliasing**.
  - *Example*: Java compile error (`int x = "Hello";`) vs. JavaScript silent runtime bug (`let x = "Hello";`).
  - *Analogy*: Vehicle seatbelt protecting against unexpected collisions.
- **Cost**: Total lifecycle expenditure:
  $$\text{Total Cost} = \text{Training} + \text{Writing} + \text{Compiling} + \text{Execution} + \text{Reliability Failure} + \textbf{Maintenance (Dominant 2x–4x)}$$
  - *Analogy*: Car purchase price vs. 10 years of fuel, insurance, and repairs.
- **Portability**: Running across Windows, Mac, and Linux without rewrites.
  - *Analogy*: A universal international electrical travel adapter.
- **Generality**: Applicability across diverse problem domains (Python = Swiss Army Knife).
- **Well-Definedness**: Absolute clarity of specification (Python `5/2 = 2.5` vs. C `5/2 = 2`).
  - *Analogy*: A legally binding contract with zero loopholes.

---

### 2.4 The 7 Influences on Language Design

1. **Computer Architecture**: Von Neumann model (CPU + RAM) gave us variables, memory cells, assignment. (Analogy: Car mechanical parts).
2. **Programming Methodologies**: Shift from procedural $\to$ OOP $\to$ functional $\to$ reactive. (Analogy: Didactic lecture vs. hands-on teaching).
3. **Application Domain Requirements**: COBOL for accounting; MATLAB for matrix math. (Analogy: Doctor vs. carpenter toolkits).
4. **Security & Reliability**: Ada for defense systems; Rust for memory safety without GC. (Analogy: Hospital building earthquake codes).
5. **Influence of Previous Languages**: C $\to$ C++ $\to$ Java (removed pointers) $\to$ C#. (Analogy: Iterative automobile generations).
6. **User Needs & Simplicity**: Python readability; Scratch visual blocks. (Analogy: Modern smartphone touchscreens).
7. **Tooling & Ecosystem**: JavaScript powered by npm/browsers; Python by PyTorch/Jupyter. (Analogy: Camera accessories & lenses).

#### The IoT Language Case Study (`device DoorLock`)
```text
device DoorLock {
    on start { connectWifi("HomeNet", "Pass123"); schedule(lock, at("22:00")); }
    on fingerprintScan(user) { if isAuthorized(user) unlock(); else alarm("unauthorized"); }
    on tamperDetected { alarm("tampering detected"); sendAlertToOwner(); }
}
```
*Why it works*: **Event-driven**, **built-in security defaults**, **syntactic simplicity**, and **domain-specific primitives**.

---

### 2.5 The 4 Paradigms Compared: Smart Home Scenario

- **Imperative**: Step-by-step state changes: `if (time >= 18:00) turnLightsOn();`
- **Functional**: Pure function evaluation: `const lightsOn = (time) => time >= 18;`
- **Logic-Based**: Facts and deduction rules: `turn_on(R) :- occupied(R), time(T), T >= 1800.`
- **Object-Oriented**: Objects encapsulating state & methods: `Light.turnOn();`

---

### 2.6 Language Design Trade-Offs (10 Languages Matrix)

| Language | Prioritized Attribute | Sacrificed / Deprioritized | Concrete Trade-Off Case |
| :--- | :--- | :--- | :--- |
| **Python** | Readability, rapid development | Raw CPU execution speed | AI prototypes built fast in Python, rewritten in C++ for prod. |
| **C** | Maximum raw speed, hardware control | Safety (manual memory, buffer overflows)| Linux OS speed vs. vulnerability to pointer bugs. |
| **Java** | Portability (WORA), static reliability| Peak native speed (JVM & GC overhead) | Banking enterprise apps vs. AAA gaming engines. |
| **JavaScript**| Dynamic flexibility, web ubiquity | Static type safety | Rapid web feature shipping vs. runtime type errors. |
| **Rust** | Compile-time safety without GC | Initial developer speed & easy learning| Mozilla Servo browser engine eliminating memory CVEs. |
| **C++** | Blazing speed, multi-paradigm | Simplicity and safe memory defaults | Unreal Engine 5 performance vs. complex pointer bugs. |
| **PHP** | Frictionless web deployment | Syntactic consistency and strict safety| WordPress rapid hosting vs. large enterprise scaling. |
| **Haskell** | Mathematical purity, correctness | Ease of learning, industrial adoption | High-assurance FinTech trading vs. general web apps. |
| **Go** | Simplicity, concurrency, fast builds | Syntactic expressivity (no generics early)| Cloud infrastructure (Docker, K8s) vs. complex metaprogramming. |
| **MATLAB** | Matrix math, built-in toolboxes | General-purpose speed, licensing cost | Engineering algorithms prototyped before C++ deployment. |

---

### 2.7 Implementation Methods: Compilers, Interpreters & Hybrids

```
COMPILATION:    Source Code ──► Compiler ──► Machine Code ──► Execution (Fastest, OS-dependent)
INTERPRETATION: Source Code ──► Interpreter Engine ──────────► Line-by-line Execution (Slowest)
HYBRID:         Source Code ──► Compiler ──► Bytecode ──► VM / JIT ──► Execution (Portable + Fast)
```

#### The 7 Compilation Phases Pipeline
1. **Lexical Analysis (Scanner)**: Source text $\to$ Tokens (`int x = 5;` $\to$ `[int] [x] [=] [5] [;]`).
2. **Syntax Analysis (Parser)**: Tokens $\to$ Parse Tree (checks grammar: `x = x + 1;` vs. `x + = 1;`).
3. **Semantic Analysis**: Checks static semantics (type matching: `int x; x = "Hello";` fails).
4. **Intermediate Code Generation (ICG)**: Generates three-address IR: `t1 = b * c; x = a + t1;`.
5. **Code Optimization**: Eliminates dead code: `t1 = b * c; t2 = b * c;` $\to$ reuse `t1`.
6. **Code Generation**: Translates IR to target machine assembly (`MOV AX, b; MUL c; ADD AX, a;`).
7. **Linking**: Combines object code with system libraries (e.g., binding `sqrt()` in C).

---

### 2.8 Programming Environments & Analogies

- **Text Editor + CLI** (Vim, GCC): *A basic shed with hand tools.*
- **IDE** (Visual Studio, IntelliJ, PyCharm): *A fully-equipped manufacturing factory.*
- **Web-Based** (Replit, Google Colab): *A traveling toolkit accessible anywhere.*
- **CLI + Build Automation** (Make, CMake, Gradle): *Automated assembly line.*
- **Virtualized / Containerized** (Docker, Vagrant): *A controlled, repeatable scientific sandbox.*
- **Domain-Specific** (MATLAB, Arduino IDE): *A specialized audio or photography studio.*
- **Low-Code / No-Code** (Scratch, PowerApps): *Snap-together LEGO building blocks.*

---

### 2.9 Historical Language Evolution Cheat Sheet

| Year | Language | Creator | Key Innovation / Hello World | Primary Domain |
| :---: | :--- | :--- | :--- | :--- |
| **1940s**| Machine Code | Early Engineers | `10110000 01100001` (Binary opcodes) | Hardware control |
| **1950s**| Assembly | Early Pioneers | `MOV AX, 1; ADD AX, 2` (Mnemonics) | Embedded systems |
| **1957** | **FORTRAN** | John Backus | `PROGRAM HELLO; PRINT *, "Hello!"; END` | Scientific & Math |
| **1958** | **LISP** | John McCarthy | `(print "Hello, World!")` | AI & Symbolic Lists |
| **1959** | **COBOL** | Grace Hopper | `DISPLAY "Hello, World!"` | Business Records & Banks |
| **1964** | **BASIC** | Kemeny & Kurtz | `10 PRINT "HELLO!"; 20 END` | Beginner Education |
| **1972** | **C** | Dennis Ritchie | `#include <stdio.h> ... printf("Hello\n");` | Unix OS & Systems |
| **1980s**| **C++** | Bjarne Stroustrup | `cout << "Hello, World!" << endl;` | OOP Systems & Gaming |
| **1991** | **Python** | Guido van Rossum | `print("Hello, World!")` | AI, Data, Scripting |
| **1995** | **Java** | James Gosling | `System.out.println("Hello, World!");` | Enterprise WORA & Android |
| **1995** | **JavaScript**| Brendan Eich | `console.log("Hello, World!");` | Interactive Web Browsers |
| **1995** | **PHP** | Rasmus Lerdorf | `<?php echo "Hello, World!"; ?>` | Server-Side Web |
| **2000** | **C#** | Anders Hejlsberg | `Console.WriteLine("Hello, World!");` | .NET Enterprise & Unity |
| **2009** | **Go** | Griesemer, Pike, Thompson| `fmt.Println("Hello, World!")` | Cloud & Microservices |
| **2010** | **Rust** | Graydon Hoare | `println!("Hello, World!");` | Safe Systems Programming |

---

## 3. Module 2 Quick Review: Syntax & Semantics

### 3.1 The 4 Linguistic Quadrants

- **Valid Syntax, Valid Semantics**: `int x = 10; int y = x + 5;` ("The dog barks loudly.")
- **Valid Syntax, Invalid Semantics**: `int x = 5 / 0;` ("The chair barks loudly.")
  - *SQL Example*: `SELECT color FROM Students;` (Valid SQL syntax, but fails semantically if no `color` column exists).
- **Invalid Syntax**: `int x = + * 5;` ("Barks loudly the dog.") / Python `print"Hello"` in Python 3.

---

### 3.2 The 6 General Syntax Problems

1. **Complexity**: Language explosion (C `for` loop $\to$ dozens of grammar rules). *Analogy: Master cookbook recipe explosion.*
2. **Ambiguity**: Multiple parse trees for one string (Dangling else problem). *Analogy: "I saw the man with the telescope."*
3. **Context-Sensitivity**: C `int x; x = 10;` vs. `typedef int x;`. *Analogy: The word "bank" in English.*
4. **Redundancy**: `x = x + 1;` vs. `x += 1;` vs. `x++;`. *Analogy: Long vs. short driving directions.*
5. **Readability**: Pure BNF is mathematically rigorous but hard for humans. *Analogy: Complex legal contracts.*
6. **Evolution**: Adding `//` to C required grammar updates. *Analogy: Updating traffic laws for e-scooters.*

---

### 3.3 BNF vs. EBNF Conversion Rules

```bnf
-- BNF: Digits (Recursive) --
<digits> ::= <digit> | <digit> <digits>
<digit>  ::= 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9

-- EBNF: Digits (Repetition {}) --
digits = { digit } ;
digit  = "0" | "1" | ... | "9" ;

-- BNF: While Loop --
<while_stmt> ::= while ( <condition> ) <statement>

-- EBNF: While Loop --
while_stmt = "while" "(" condition ")" statement ;

-- EBNF Optional Construct [] --
if_stmt = "if" "(" expr ")" stmt [ "else" stmt ] ;
```

---

### 3.4 Canonical Derivations & Parse Trees

#### Assignment Derivation: $A = B * ( A + C )$
$$\begin{aligned}
\langle\text{assign}\rangle &\implies \langle\text{id}\rangle = \langle\text{expr}\rangle \implies A = \langle\text{expr}\rangle \implies A = \langle\text{id}\rangle * \langle\text{expr}\rangle \\
&\implies A = B * \langle\text{expr}\rangle \implies A = B * ( \langle\text{expr}\rangle ) \implies A = B * ( \langle\text{id}\rangle + \langle\text{expr}\rangle ) \\
&\implies A = B * ( A + \langle\text{id}\rangle ) \implies \mathbf{A = B * ( A + C )}
\end{aligned}$$

#### Balanced Parentheses CFG: $S \to (S)S \mid \varepsilon$
Generates: `()`, `(())`, `()()`, `((()))`.

#### C-Style Declarations CFG:
$$\langle\text{Decl}\rangle \to \langle\text{Type}\rangle \langle\text{VarList}\rangle ; \quad \langle\text{Type}\rangle \to \text{int} \mid \text{float} \mid \text{char} \quad \langle\text{VarList}\rangle \to \text{id} \mid \text{id}, \langle\text{VarList}\rangle$$
Generates: `int x;`, `float y, z;`, `char a, b, c;`. *(Analogy: Comma-separated shopping list).*

#### Combinatorial Language Sizing Proof:
Given $\langle S\rangle \to \langle NP\rangle \langle VP\rangle$ where $\langle Det\rangle=2$, $\langle N\rangle=2$, $\langle V\rangle=2$:
$$|\langle NP\rangle| = 2 \times 2 = 4 \quad |\langle VP\rangle| = 2 \times 4 = 8 \implies |\langle S\rangle| = 4 \times 8 = \mathbf{32 \text{ sentences}}.$$

---

## 4. Module 3 Quick Review: Names, Bindings, Scopes & Lifetimes

### 4.1 The Variable Sextuple

$$\text{Variable} = \langle \text{Name}, \text{Address}, \text{Value}, \text{Type}, \text{Lifetime}, \text{Scope} \rangle$$
- **Address (l-value)**: Memory location. Changes in recursive calls.
- **Value (r-value)**: Contents stored in memory cells.
- **Aliasing Trap**: Multiple names referencing the same address (`int *ptr = &x;`). Harms optimization and debugging.

---

### 4.2 The 6 Canonical Binding Times

| Binding Time | Concrete Example | Mutability |
| :--- | :--- | :--- |
| **Language Design** | Symbol `*` bound to multiplication. | Permanent standard. |
| **Language Implementation** | `int` bound to 32-bit range ($-2,147,483,648$ to $2,147,483,647$). | Target CPU/compiler fixed. |
| **Compile Time** | Variable `count` bound to type `int`. | Checked statically. |
| **Link Time** | Call to `sqrt()` bound to math library binary. | Fixed before loading. |
| **Load Time** | Static variable bound to fixed memory segment in RAM. | Fixed at program start. |
| **Run Time** | Variable bound to value 42 via assignment statement. | Dynamic runtime changes. |

---

### 4.3 The 4 Storage Lifetime Classes

1. **Static Variables**: Allocated before execution; exist for entire program run (`static int c = 0;`, globals). Fast direct addressing; **no recursion support**.
2. **Stack-Dynamic Variables**: Allocated on stack when elaboration reaches declaration; deallocated on block exit. **Supports recursion**; allocation overhead.
3. **Explicit Heap-Dynamic**: Explicitly allocated/freed by programmer (`new int[100]` in C++, `malloc()` in C). Flexible structures (trees); risks memory leaks and dangling pointers.
4. **Implicit Heap-Dynamic**: Automatically allocated on assignment (Python lists, JavaScript objects). Maximum flexibility; high runtime overhead.

---

### 4.4 Static vs. Dynamic Scoping Showdown

```javascript
function big() {
    function sub1() { var x = 7; sub2(); }
    function sub2() { var y = x; }
    var x = 3;
    sub1();
}
```
- **Static (Lexical) Scoping**:
  - Traverses the **program text hierarchy**. Static parent of `sub2` is `big`.
  - **Result: $y = 3$** (`sub1` is a sibling, not an ancestor).
- **Dynamic Scoping**:
  - Traverses the **active runtime call stack**: `big() -> sub1() -> sub2()`. Caller of `sub2` is `sub1`.
  - **Result: $y = 7$** (finds active local `x = 7` inside caller `sub1`).

---

### 4.5 Scope $\neq$ Lifetime Counter-Examples

- **Function-Local Static**: `void f() { static int count = 0; }` $\implies$ Scope is strictly local to `f()`, but lifetime is the **entire program run**.
- **Active Caller Variables**: `compute()` allocates local `sum = 50` and calls `printHeader()` $\implies$ `sum` is alive in RAM (has lifetime), but is completely invisible inside `printHeader()` (has no scope).

---

### 4.6 Block Scoping & Shadowing Across Languages

- **ALGOL 60**: Introduced blocks with local stack-dynamic scopes.
- **Nested Duplicate Names**: Legal in C/C++, **strictly illegal in Java and C#** to prevent bugs:
  ```c
  void sub() { int count; while (...) { int count; count++; } } // OK in C, Error in Java!
  ```
- **Declaration Order**: C89 required declarations at top of block; C99/C++/Java allow anywhere.
- **JavaScript**: `var` is function-scoped (hoisted); `let` and `const` are block-scoped.

---

### 4.7 Global Scope Mechanisms Across Languages

- **C / C++**: Accessible in other files via `extern`. Hidden globals accessible via scope operator `::x`.
- **PHP**: Globals not visible in functions unless imported via `global $var;` or `$GLOBALS['var']`.
- **Python**: Variables in functions read globals; assigning to a global requires `global var`. Modifying enclosing non-globals requires `nonlocal var`.
- **F#**: All top-level declarations are global; scope extends to the end of the source file.

---

### 4.8 Named Constants Cheat Sheet

- **Why Use**: Readability (replaces magic numbers), Reliability (compiler enforces immutability), Modifiability / Parameterization (`final int LEN = 100;`).
- **Language Mechanisms**:
  - **C++ (`const`)**: Dynamic binding at declaration; can use expressions (`const int r = 2 * w + 1;`).
  - **Java (`final`)**: Dynamic binding at declaration or in constructor; single-assignment.
  - **C# (`const`)**: Static compile-time literal only (`const int MAX = 50;`).
  - **C# (`readonly`)**: Dynamic runtime constant bound in constructor per instance (`readonly int ID = userID;`).
- **Initialization Binding**:
  - *Static Initialization*: `static int limit = 10;` (Bound before runtime).
  - *Dynamic Initialization*: `int *ptr = &sum; char name[] = "George";` (Bound at runtime).

---

## 5. Official Exam Answer Key & Forensic Solution Matrix

*Directly verified against `names_bindings_scopes_answers.txt`:*

### Part I: Multiple Choice Rapid Answers
1. **B. Name** (String of characters identifying an entity).
2. **C. Address** (Memory location; l-value).
3. **A. r-value** (Contents of memory cell on right-hand side of assignment).
4. **B. Binding** (Association between an attribute and an entity).
5. **B. Compile-time binding** (Occurs before run time, remains unchanged).
6. **B. Dynamic binding** (Occurs during run time, can change while running).
7. **C. At run time** (When dynamic type binding is determined).
8. **A. Python** (Uses dynamic type binding).
9. **B. Scope** (Range of statements where variable is visible).
10. **C. Local variable** (Declared inside a block or subprogram).
11. **B. Program structure** (Determines static scope).
12. **C. Calling sequence** (Determines dynamic scope).
13. **B. Lifetime** (Time variable is bound to specific memory cell).
14. **C. Named constant** (Bound to value only once; read-only).
15. **B. final** (Java keyword for named constants).

---

### Part II: Identification
1. **Binding** — Association between attribute and entity.
2. **Binding Time** — The instant when a binding takes place.
3. **Address** — Memory location associated with a variable (l-value).
4. **Value** — Data contents stored in the memory cell (r-value).
5. **Scope** — Textual/spatial range where variable is visible.
6. **Lifetime** — Temporal duration of memory allocation.
7. **Global Variable** — Declared outside all subprograms; program-wide visibility.
8. **Local Variable** — Declared inside a block/subprogram.
9. **Static Scope** — Scoping determined at compile time by code structure.
10. **Dynamic Scope** — Scoping determined at run time by calling sequence.

---

### Part III: Analyze the Code
1. `int x = 10; void test() { int y = 20; }` $\implies$ **`x`: Global variable; `y`: Local variable**.
2. `int score = 100; void display() { int score = 80; print(score); }` $\implies$ **Output: `80`** (Local shadows outer global).
3. `final double PI = 3.14159; PI = 3.14;` $\implies$ **Compile Error** (Bound once via `final`; immutable).
4. `void count() { static int count = 0; count++; }` $\implies$ **Scope: Local; Lifetime: Entire program execution**.
5. `int age = 20;` $\implies$ **Name: `age`, Type: `int`, Initial Value: `20`, Binding: Compile-time static type binding**.

---

### Part IV: Static vs. Dynamic Scope
1. Value of `x` under **Static Scope**: **`3`** (Resolved via static parent `big`).
2. Value of `x` under **Dynamic Scope**: **`7`** (Resolved via dynamic caller `sub1`).
3. Core difference: **Static scope follows program structure (`big` encloses `sub2`); dynamic scope follows calling sequence (`sub1` called `sub2`)**.

---

### Part V: Summative Application
```python
school = "UST"
def department():
    course = "Computer Science"
    def student():
        year = 3
```
1. Classify variables: **`school`: Global; `course`: Nonlocal; `year`: Local**.
2. Referencing environment of `student()`: **`school`, `course`, `year`**.
3. Can `department()` access `year`? **No** (Outer scopes cannot access local variables of inner functions).
4. Effect of local `course = "IS"` inside `student()`: **Hides/shadows `course` in `department()`**.
5. Software engineering justification: **Lexical scope isolates state and prevents accidental side effects; early static type binding allows compilers to catch type errors ahead of time, ensuring reliable, maintainable code.**

---

## 6. Top 25 Rapid-Fire Flashcards (Collapsible Recall)

#### FC 1: Feature Multiplicity
> [!QUESTION] Flashcard 1
> What is feature multiplicity, and what does it harm?
> > [!SUCCESS]- Answer: **Having multiple ways to perform the same operation (e.g., $x++$, $x+=1$); harms Readability.** ✓

#### FC 2: Orthogonality
> [!QUESTION] Flashcard 2
> What is orthogonality in language design?
> > [!SUCCESS]- Answer: **Small set of primitive constructs that combine consistently without arbitrary exceptions (like Legos).** ✓

#### FC 3: Aliasing
> [!QUESTION] Flashcard 3
> Define aliasing and state its danger.
> > [!SUCCESS]- Answer: **Two or more names referencing the exact same memory address; causes invisible side effects and harms reliability.** ✓

#### FC 4: Dominant Software Lifecycle Cost
> [!QUESTION] Flashcard 4
> Which phase represents the largest cost over a software system's lifecycle?
> > [!SUCCESS]- Answer: **Maintenance ($2\times$ to $4\times$ initial development cost).** ✓

#### FC 5: JIT Compiler
> [!QUESTION] Flashcard 5
> What does a Just-In-Time (JIT) compiler do?
> > [!SUCCESS]- Answer: **Compiles frequently executed bytecode ("hot spots") into native machine code during execution for speed.** ✓

#### FC 6: Static vs. Dynamic Semantics
> [!QUESTION] Flashcard 6
> Give an example of a static semantic error vs. a dynamic semantic error.
> > [!SUCCESS]- Answer: **Static: Type error at compile time (`"hi" - 5`). Dynamic: Divide by zero or infinite loop at runtime.** ✓

#### FC 7: Ambiguous Grammar
> [!QUESTION] Flashcard 7
> When is a grammar formally ambiguous?
> > [!SUCCESS]- Answer: **When it generates two or more distinct parse trees for the exact same valid string (e.g., Dangling Else).** ✓

#### FC 8: BNF Precedence Hierarchy
> [!QUESTION] Flashcard 8
> How is operator precedence represented in a BNF grammar?
> > [!SUCCESS]- Answer: **Operators lower down in the grammar hierarchy evaluate first (deeper in parse tree).** ✓

#### FC 9: EBNF Repetition vs. Option
> [!QUESTION] Flashcard 9
> In EBNF, what do `{ }` and `[ ]` represent?
> > [!SUCCESS]- Answer: **`{ }` = Repetition ($0$ or more times); `[ ]` = Optional ($0$ or $1$ time).** ✓

#### FC 10: The Variable Sextuple
> [!QUESTION] Flashcard 10
> Enumerate the 6 attributes of an imperative variable.
> > [!SUCCESS]- Answer: **Name, Address (l-value), Value (r-value), Type, Lifetime, Scope.** ✓

#### FC 11: L-value vs. R-value
> [!QUESTION] Flashcard 11
> Differentiate l-value from r-value.
> > [!SUCCESS]- Answer: **L-value = Memory Address (left of assignment); R-value = Data Contents (right of assignment).** ✓

#### FC 12: Six Binding Times
> [!QUESTION] Flashcard 12
> Order the 6 binding times chronologically.
> > [!SUCCESS]- Answer: **Language Design $\to$ Language Implementation $\to$ Compile $\to$ Link $\to$ Load $\to$ Run Time.** ✓

#### FC 13: Static vs. Stack-Dynamic Lifetime
> [!QUESTION] Flashcard 13
> Why do stack-dynamic variables support recursion while static variables cannot?
> > [!SUCCESS]- Answer: **Stack-dynamic variables allocate fresh activation records on the stack per recursive call; static variables share a single fixed memory cell.** ✓

#### FC 14: Static Scoping Resolution
> [!QUESTION] Flashcard 14
> How does static scoping resolve a variable reference?
> > [!SUCCESS]- Answer: **Search current block $\to$ enclosing static parent $\to$ traverse outward through static ancestor text nesting.** ✓

#### FC 15: Dynamic Scoping Resolution
> [!QUESTION] Flashcard 15
> How does dynamic scoping resolve a variable reference?
> > [!SUCCESS]- Answer: **Search current block $\to$ calling function (dynamic parent) $\to$ traverse backward up active runtime call stack.** ✓

#### FC 16: Scope $\neq$ Lifetime
> [!QUESTION] Flashcard 16
> Prove that scope does not equal lifetime using C++ `static`.
> > [!SUCCESS]- Answer: **A function-local `static int c = 0;` has local scope (only visible in function), but static lifetime (remains in RAM for entire program execution).** ✓

#### FC 17: Python `nonlocal`
> [!QUESTION] Flashcard 17
> What does Python's `nonlocal` keyword do?
> > [!SUCCESS]- Answer: **Binds an identifier to a variable in an enclosing (non-global) outer function scope.** ✓

#### FC 18: Java `final` vs. C# `const`
> [!QUESTION] Flashcard 18
> Contrast Java `final` with C# `const`.
> > [!SUCCESS]- Answer: **C# `const` is bound statically at compile time (must be literal); Java `final` is bound dynamically at declaration or constructor execution.** ✓

#### FC 19: C# `readonly`
> [!QUESTION] Flashcard 19
> When is C# `readonly` bound?
> > [!SUCCESS]- Answer: **At runtime during constructor execution; can differ per object instance.** ✓

#### FC 20: Combinatorial Language Size
> [!QUESTION] Flashcard 20
> If a grammar has $S \to A \; B$ with $|A|=3$ choices and $|B|=4$ choices, how many sentences can it generate?
> > [!SUCCESS]- Answer: **$3 \times 4 = 12$ sentences.** ✓

#### FC 21: Dangling Else Disambiguation
> [!QUESTION] Flashcard 21
> How do modern languages resolve the dangling else problem?
> > [!SUCCESS]- Answer: **By binding the `else` to the nearest preceding open `if` statement.** ✓

#### FC 22: First High-Level Language
> [!QUESTION] Flashcard 22
> What was the first high-level programming language, who created it, and in what year?
> > [!SUCCESS]- Answer: **FORTRAN, created by John Backus in 1957 for scientific and mathematical calculations.** ✓

#### FC 23: First Functional Language
> [!QUESTION] Flashcard 23
> What was the first functional language and who designed it?
> > [!SUCCESS]- Answer: **LISP, designed by John McCarthy in 1958 for AI research.** ✓

#### FC 24: Common Business-Oriented Language
> [!QUESTION] Flashcard 24
> What language was associated with Grace Hopper in 1959 for business reporting?
> > [!SUCCESS]- Answer: **COBOL (Common Business-Oriented Language).** ✓

#### FC 25: Memory Safety without GC
> [!QUESTION] Flashcard 25
> What language was created in 2010 to provide memory safety without a garbage collector?
> > [!SUCCESS]- Answer: **Rust, created by Graydon Hoare at Mozilla using a compile-time borrow checker.** ✓
