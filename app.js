// Grammar Simulation Lab Application Logic
// Designed for UST-CICS CS311 Programming Languages

document.addEventListener('DOMContentLoaded', () => {
  initTabs();
  initObsidianViewer();
  initDerivationStepper();
  initParenthesesSimulator();
  initDeclarationsValidator();
  initCombinatoricsCalculator();
  initPracticeQuiz();
});

// ==========================================
// 1. TAB NAVIGATION
// ==========================================
function initTabs() {
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabPanes = document.querySelectorAll('.tab-pane');

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetTab = btn.getAttribute('data-tab');

      tabButtons.forEach(b => b.classList.remove('active'));
      tabPanes.forEach(p => p.classList.remove('active'));

      btn.classList.add('active');
      const targetPane = document.getElementById(`pane-${targetTab}`);
      if (targetPane) targetPane.classList.add('active');
    });
  });
}

// ==========================================
// 2. ASSIGNMENT DERIVATION STEPPER
// ==========================================
const DERIVATION_PRESETS = {
  slide_example: {
    title: 'A = B * (A + C)',
    steps: [
      {
        tokens: [{ text: '<assign>', type: 'nonterminal', isTarget: true }],
        rule: 'Start Symbol <assign>',
        nextTarget: '<assign>',
        reason: 'The derivation must begin at the root sentence/statement non-terminal symbol.'
      },
      {
        tokens: [
          { text: '<id>', type: 'nonterminal', isTarget: true },
          { text: '=', type: 'terminal' },
          { text: '<expr>', type: 'nonterminal', isTarget: false }
        ],
        rule: '<assign> \u2192 <id> = <expr>',
        nextTarget: '<id>',
        reason: 'Assignment statement structure requires an identifier on the left and an expression on the right.'
      },
      {
        tokens: [
          { text: 'A', type: 'terminal' },
          { text: '=', type: 'terminal' },
          { text: '<expr>', type: 'nonterminal', isTarget: true }
        ],
        rule: '<id> \u2192 A',
        nextTarget: '<expr>',
        reason: 'Leftmost rule: Replace the leftmost placeholder <id> with target variable A.'
      },
      {
        tokens: [
          { text: 'A', type: 'terminal' },
          { text: '=', type: 'terminal' },
          { text: '<id>', type: 'nonterminal', isTarget: true },
          { text: '*', type: 'terminal' },
          { text: '<expr>', type: 'nonterminal', isTarget: false }
        ],
        rule: '<expr> \u2192 <id> * <expr>',
        nextTarget: '<id>',
        reason: 'The target expression has multiplication outside parentheses: B * (...).'
      },
      {
        tokens: [
          { text: 'A', type: 'terminal' },
          { text: '=', type: 'terminal' },
          { text: 'B', type: 'terminal' },
          { text: '*', type: 'terminal' },
          { text: '<expr>', type: 'nonterminal', isTarget: true }
        ],
        rule: '<id> \u2192 B',
        nextTarget: '<expr>',
        reason: 'Leftmost rule: Replace the leftmost placeholder <id> with variable B.'
      },
      {
        tokens: [
          { text: 'A', type: 'terminal' },
          { text: '=', type: 'terminal' },
          { text: 'B', type: 'terminal' },
          { text: '*', type: 'terminal' },
          { text: '(', type: 'terminal' },
          { text: '<expr>', type: 'nonterminal', isTarget: true },
          { text: ')', type: 'terminal' }
        ],
        rule: '<expr> \u2192 ( <expr> )',
        nextTarget: '<expr>',
        reason: 'Wrap in parentheses before introducing addition so operations inside evaluate first.'
      },
      {
        tokens: [
          { text: 'A', type: 'terminal' },
          { text: '=', type: 'terminal' },
          { text: 'B', type: 'terminal' },
          { text: '*', type: 'terminal' },
          { text: '(', type: 'terminal' },
          { text: '<id>', type: 'nonterminal', isTarget: true },
          { text: '+', type: 'terminal' },
          { text: '<expr>', type: 'nonterminal', isTarget: false },
          { text: ')', type: 'terminal' }
        ],
        rule: '<expr> \u2192 <id> + <expr>',
        nextTarget: '<id>',
        reason: 'Inside parentheses, split expression into an addition: <id> + <expr>.'
      },
      {
        tokens: [
          { text: 'A', type: 'terminal' },
          { text: '=', type: 'terminal' },
          { text: 'B', type: 'terminal' },
          { text: '*', type: 'terminal' },
          { text: '(', type: 'terminal' },
          { text: 'A', type: 'terminal' },
          { text: '+', type: 'terminal' },
          { text: '<expr>', type: 'nonterminal', isTarget: true },
          { text: ')', type: 'terminal' }
        ],
        rule: '<id> \u2192 A',
        nextTarget: '<expr>',
        reason: 'Leftmost rule: Replace first operand inside parentheses with variable A.'
      },
      {
        tokens: [
          { text: 'A', type: 'terminal' },
          { text: '=', type: 'terminal' },
          { text: 'B', type: 'terminal' },
          { text: '*', type: 'terminal' },
          { text: '(', type: 'terminal' },
          { text: 'A', type: 'terminal' },
          { text: '+', type: 'terminal' },
          { text: '<id>', type: 'nonterminal', isTarget: true },
          { text: ')', type: 'terminal' }
        ],
        rule: '<expr> \u2192 <id>',
        nextTarget: '<id>',
        reason: 'Reduce the remaining <expr> to a single identifier placeholder.'
      },
      {
        tokens: [
          { text: 'A', type: 'terminal' },
          { text: '=', type: 'terminal' },
          { text: 'B', type: 'terminal' },
          { text: '*', type: 'terminal' },
          { text: '(', type: 'terminal' },
          { text: 'A', type: 'terminal' },
          { text: '+', type: 'terminal' },
          { text: 'C', type: 'terminal' },
          { text: ')', type: 'terminal' }
        ],
        rule: '<id> \u2192 C (TERMINATION)',
        nextTarget: 'None',
        reason: 'Final placeholder replaced with C. Zero non-terminals remain; derivation is complete!'
      }
    ]
  },
  variant_1: {
    title: 'A = B + C * A',
    steps: [
      {
        tokens: [{ text: '<assign>', type: 'nonterminal', isTarget: true }],
        rule: 'Start Symbol <assign>',
        nextTarget: '<assign>',
        reason: 'Initial start symbol.'
      },
      {
        tokens: [
          { text: '<id>', type: 'nonterminal', isTarget: true },
          { text: '=', type: 'terminal' },
          { text: '<expr>', type: 'nonterminal', isTarget: false }
        ],
        rule: '<assign> \u2192 <id> = <expr>',
        nextTarget: '<id>',
        reason: 'Assignment production.'
      },
      {
        tokens: [
          { text: 'A', type: 'terminal' },
          { text: '=', type: 'terminal' },
          { text: '<expr>', type: 'nonterminal', isTarget: true }
        ],
        rule: '<id> \u2192 A',
        nextTarget: '<expr>',
        reason: 'Leftmost id becomes A.'
      },
      {
        tokens: [
          { text: 'A', type: 'terminal' },
          { text: '=', type: 'terminal' },
          { text: '<id>', type: 'nonterminal', isTarget: true },
          { text: '+', type: 'terminal' },
          { text: '<expr>', type: 'nonterminal', isTarget: false }
        ],
        rule: '<expr> \u2192 <id> + <expr>',
        nextTarget: '<id>',
        reason: 'First binary operation is addition: B + (...).'
      },
      {
        tokens: [
          { text: 'A', type: 'terminal' },
          { text: '=', type: 'terminal' },
          { text: 'B', type: 'terminal' },
          { text: '+', type: 'terminal' },
          { text: '<expr>', type: 'nonterminal', isTarget: true }
        ],
        rule: '<id> \u2192 B',
        nextTarget: '<expr>',
        reason: 'Leftmost id becomes B.'
      },
      {
        tokens: [
          { text: 'A', type: 'terminal' },
          { text: '=', type: 'terminal' },
          { text: 'B', type: 'terminal' },
          { text: '+', type: 'terminal' },
          { text: '<id>', type: 'nonterminal', isTarget: true },
          { text: '*', type: 'terminal' },
          { text: '<expr>', type: 'nonterminal', isTarget: false }
        ],
        rule: '<expr> \u2192 <id> * <expr>',
        nextTarget: '<id>',
        reason: 'Expand remaining expression to multiplication: C * A.'
      },
      {
        tokens: [
          { text: 'A', type: 'terminal' },
          { text: '=', type: 'terminal' },
          { text: 'B', type: 'terminal' },
          { text: '+', type: 'terminal' },
          { text: 'C', type: 'terminal' },
          { text: '*', type: 'terminal' },
          { text: '<expr>', type: 'nonterminal', isTarget: true }
        ],
        rule: '<id> \u2192 C',
        nextTarget: '<expr>',
        reason: 'Leftmost id becomes C.'
      },
      {
        tokens: [
          { text: 'A', type: 'terminal' },
          { text: '=', type: 'terminal' },
          { text: 'B', type: 'terminal' },
          { text: '+', type: 'terminal' },
          { text: 'C', type: 'terminal' },
          { text: '*', type: 'terminal' },
          { text: '<id>', type: 'nonterminal', isTarget: true }
        ],
        rule: '<expr> \u2192 <id>',
        nextTarget: '<id>',
        reason: 'Reduce remaining expr to single id.'
      },
      {
        tokens: [
          { text: 'A', type: 'terminal' },
          { text: '=', type: 'terminal' },
          { text: 'B', type: 'terminal' },
          { text: '+', type: 'terminal' },
          { text: 'C', type: 'terminal' },
          { text: '*', type: 'terminal' },
          { text: 'A', type: 'terminal' }
        ],
        rule: '<id> \u2192 A (COMPLETE)',
        nextTarget: 'None',
        reason: 'Final placeholder becomes A. Complete string generated.'
      }
    ]
  },
  variant_2: {
    title: 'A = (B + C) * A',
    steps: [
      {
        tokens: [{ text: '<assign>', type: 'nonterminal', isTarget: true }],
        rule: 'Start Symbol <assign>',
        nextTarget: '<assign>',
        reason: 'Root statement start.'
      },
      {
        tokens: [
          { text: '<id>', type: 'nonterminal', isTarget: true },
          { text: '=', type: 'terminal' },
          { text: '<expr>', type: 'nonterminal', isTarget: false }
        ],
        rule: '<assign> \u2192 <id> = <expr>',
        nextTarget: '<id>',
        reason: 'Assignment rule.'
      },
      {
        tokens: [
          { text: 'A', type: 'terminal' },
          { text: '=', type: 'terminal' },
          { text: '<expr>', type: 'nonterminal', isTarget: true }
        ],
        rule: '<id> \u2192 A',
        nextTarget: '<expr>',
        reason: 'Target variable on left-hand side is A.'
      },
      {
        tokens: [
          { text: 'A', type: 'terminal' },
          { text: '=', type: 'terminal' },
          { text: '(', type: 'terminal' },
          { text: '<expr>', type: 'nonterminal', isTarget: true },
          { text: ')', type: 'terminal' }
        ],
        rule: '<expr> \u2192 ( <expr> )',
        nextTarget: '<expr>',
        reason: 'Wrap in parentheses first.'
      },
      {
        tokens: [
          { text: 'A', type: 'terminal' },
          { text: '=', type: 'terminal' },
          { text: '(', type: 'terminal' },
          { text: '<id>', type: 'nonterminal', isTarget: true },
          { text: '+', type: 'terminal' },
          { text: '<expr>', type: 'nonterminal', isTarget: false },
          { text: ')', type: 'terminal' }
        ],
        rule: '<expr> \u2192 <id> + <expr>',
        nextTarget: '<id>',
        reason: 'Inside parentheses, expand addition.'
      },
      {
        tokens: [
          { text: 'A', type: 'terminal' },
          { text: '=', type: 'terminal' },
          { text: '(', type: 'terminal' },
          { text: 'B', type: 'terminal' },
          { text: '+', type: 'terminal' },
          { text: '<expr>', type: 'nonterminal', isTarget: true },
          { text: ')', type: 'terminal' }
        ],
        rule: '<id> \u2192 B',
        nextTarget: '<expr>',
        reason: 'First term inside parentheses is B.'
      },
      {
        tokens: [
          { text: 'A', type: 'terminal' },
          { text: '=', type: 'terminal' },
          { text: '(', type: 'terminal' },
          { text: 'B', type: 'terminal' },
          { text: '+', type: 'terminal' },
          { text: 'C', type: 'terminal' },
          { text: ')', type: 'terminal' }
        ],
        rule: '<expr> \u2192 <id> \u2192 C',
        nextTarget: 'None',
        reason: 'Parentheses complete.'
      }
    ]
  },
  simple: {
    title: 'A = B + C',
    steps: [
      {
        tokens: [{ text: '<assign>', type: 'nonterminal', isTarget: true }],
        rule: 'Start Symbol <assign>',
        nextTarget: '<assign>',
        reason: 'Root statement.'
      },
      {
        tokens: [
          { text: '<id>', type: 'nonterminal', isTarget: true },
          { text: '=', type: 'terminal' },
          { text: '<expr>', type: 'nonterminal', isTarget: false }
        ],
        rule: '<assign> \u2192 <id> = <expr>',
        nextTarget: '<id>',
        reason: 'Expand to assignment structure.'
      },
      {
        tokens: [
          { text: 'A', type: 'terminal' },
          { text: '=', type: 'terminal' },
          { text: '<expr>', type: 'nonterminal', isTarget: true }
        ],
        rule: '<id> \u2192 A',
        nextTarget: '<expr>',
        reason: 'Assign variable A.'
      },
      {
        tokens: [
          { text: 'A', type: 'terminal' },
          { text: '=', type: 'terminal' },
          { text: '<id>', type: 'nonterminal', isTarget: true },
          { text: '+', type: 'terminal' },
          { text: '<expr>', type: 'nonterminal', isTarget: false }
        ],
        rule: '<expr> \u2192 <id> + <expr>',
        nextTarget: '<id>',
        reason: 'Split expression into addition.'
      },
      {
        tokens: [
          { text: 'A', type: 'terminal' },
          { text: '=', type: 'terminal' },
          { text: 'B', type: 'terminal' },
          { text: '+', type: 'terminal' },
          { text: '<expr>', type: 'nonterminal', isTarget: true }
        ],
        rule: '<id> \u2192 B',
        nextTarget: '<expr>',
        reason: 'Replace leftmost id with B.'
      },
      {
        tokens: [
          { text: 'A', type: 'terminal' },
          { text: '=', type: 'terminal' },
          { text: 'B', type: 'terminal' },
          { text: '+', type: 'terminal' },
          { text: '<id>', type: 'nonterminal', isTarget: true }
        ],
        rule: '<expr> \u2192 <id>',
        nextTarget: '<id>',
        reason: 'Reduce remaining expr to id.'
      },
      {
        tokens: [
          { text: 'A', type: 'terminal' },
          { text: '=', type: 'terminal' },
          { text: 'B', type: 'terminal' },
          { text: '+', type: 'terminal' },
          { text: 'C', type: 'terminal' }
        ],
        rule: '<id> \u2192 C (DONE)',
        nextTarget: 'None',
        reason: 'Derivation complete with all terminal symbols.'
      }
    ]
  }
};

let currentPresetKey = 'slide_example';
let currentStepIndex = 0;

function initDerivationStepper() {
  const select = document.getElementById('derivation-select');
  const btnPrev = document.getElementById('btn-prev-step');
  const btnNext = document.getElementById('btn-next-step');
  const btnReset = document.getElementById('btn-reset-step');

  select.addEventListener('change', (e) => {
    currentPresetKey = e.target.value;
    currentStepIndex = 0;
    renderDerivation();
  });

  btnPrev.addEventListener('click', () => {
    if (currentStepIndex > 0) {
      currentStepIndex--;
      renderDerivation();
    }
  });

  btnNext.addEventListener('click', () => {
    const preset = DERIVATION_PRESETS[currentPresetKey];
    if (currentStepIndex < preset.steps.length - 1) {
      currentStepIndex++;
      renderDerivation();
    }
  });

  btnReset.addEventListener('click', () => {
    currentStepIndex = 0;
    renderDerivation();
  });

  renderDerivation();
}

function renderDerivation() {
  const preset = DERIVATION_PRESETS[currentPresetKey];
  const step = preset.steps[currentStepIndex];
  const displayContainer = document.getElementById('derivation-string-display');
  const historyList = document.getElementById('derivation-history-list');

  // Render tokens
  displayContainer.innerHTML = '';
  let charCount = 0;
  let nonTerminalCount = 0;
  let terminalCount = 0;

  step.tokens.forEach(tok => {
    const span = document.createElement('span');
    span.textContent = tok.text;
    charCount += tok.text.replace(/<|>/g, '').length;

    if (tok.type === 'nonterminal') {
      nonTerminalCount++;
      if (tok.isTarget) {
        span.className = 'token-active-target';
      } else {
        span.className = 'token-nonterminal';
      }
    } else {
      terminalCount++;
      span.className = 'token-terminal';
    }
    displayContainer.appendChild(span);
  });

  // Metrics update
  document.getElementById('step-counter').textContent = `Step ${currentStepIndex} of ${preset.steps.length - 1}`;
  document.getElementById('metric-chars').textContent = charCount;
  document.getElementById('metric-tokens').textContent = step.tokens.length;
  document.getElementById('metric-nonterminals').textContent = nonTerminalCount;
  document.getElementById('metric-terminals').textContent = terminalCount;

  // Diagnostics update
  document.getElementById('diag-next-target').textContent = step.nextTarget;
  document.getElementById('diag-rule-applied').textContent = step.rule;
  document.getElementById('diag-reason').textContent = step.reason;

  const statusPill = document.getElementById('step-status-pill');
  if (nonTerminalCount === 0) {
    statusPill.textContent = 'Derivation Complete';
    statusPill.className = 'status-pill complete';
  } else {
    statusPill.textContent = 'In Progress (Leftmost Rule)';
    statusPill.className = 'status-pill';
  }

  // Render history list
  historyList.innerHTML = '';
  preset.steps.forEach((s, idx) => {
    const li = document.createElement('li');
    if (idx === currentStepIndex) li.className = 'active-step';
    const textSpan = document.createElement('span');
    textSpan.textContent = s.tokens.map(t => t.text).join(' ');
    const ruleSpan = document.createElement('span');
    ruleSpan.className = 'history-rule';
    ruleSpan.textContent = `[${s.rule}]`;
    li.appendChild(textSpan);
    li.appendChild(ruleSpan);

    li.addEventListener('click', () => {
      currentStepIndex = idx;
      renderDerivation();
    });
    historyList.appendChild(li);
  });
}

// ==========================================
// 3. BALANCED PARENTHESES SIMULATOR
// ==========================================
let parenCurrentString = 'S';
let parenHistory = ['Start symbol S'];

function initParenthesesSimulator() {
  const display = document.getElementById('paren-output-display');
  const btnNest = document.getElementById('btn-paren-nest');
  const btnStop = document.getElementById('btn-paren-stop');
  const btnReset = document.getElementById('btn-paren-reset');

  btnNest.addEventListener('click', () => {
    if (parenCurrentString.includes('S')) {
      parenCurrentString = parenCurrentString.replace('S', '(S)S');
      parenHistory.push(`Expanded S \u2192 (S)S: ${parenCurrentString}`);
      renderParentheses();
    }
  });

  btnStop.addEventListener('click', () => {
    if (parenCurrentString.includes('S')) {
      parenCurrentString = parenCurrentString.replace('S', '');
      parenHistory.push(`Closed S with \u03B5: ${parenCurrentString === '' ? '"" (empty)' : parenCurrentString}`);
      renderParentheses();
    }
  });

  btnReset.addEventListener('click', () => {
    parenCurrentString = 'S';
    parenHistory = ['Start symbol S'];
    renderParentheses();
  });

  // Presets
  document.getElementById('btn-paren-preset-empty').addEventListener('click', () => {
    parenCurrentString = '';
    parenHistory = ['Direct stop: S \u2192 \u03B5 (empty string)'];
    renderParentheses();
  });

  document.getElementById('btn-paren-preset-single').addEventListener('click', () => {
    parenCurrentString = '()';
    parenHistory = ['S \u2192 (S)S \u2192 (\u03B5)\u03B5 \u2192 ()'];
    renderParentheses();
  });

  document.getElementById('btn-paren-preset-nested').addEventListener('click', () => {
    parenCurrentString = '(())';
    parenHistory = ['S \u2192 ((S)S)S \u2192 (())'];
    renderParentheses();
  });

  document.getElementById('btn-paren-preset-chained').addEventListener('click', () => {
    parenCurrentString = '()()';
    parenHistory = ['S \u2192 (S)(S)S \u2192 ()()'];
    renderParentheses();
  });

  document.getElementById('btn-paren-preset-complex').addEventListener('click', () => {
    parenCurrentString = '(()())';
    parenHistory = ['S \u2192 ((S)(S)S)S \u2192 (()())'];
    renderParentheses();
  });

  renderParentheses();
}

function renderParentheses() {
  const display = document.getElementById('paren-output-display');
  const lengthDisplay = document.getElementById('paren-length');
  const openDisplay = document.getElementById('paren-open-count');
  const closeDisplay = document.getElementById('paren-close-count');
  const validityDisplay = document.getElementById('paren-validity');
  const historyList = document.getElementById('paren-history-list');

  display.textContent = parenCurrentString === '' ? '"" (Empty string \u03B5)' : parenCurrentString;
  lengthDisplay.textContent = parenCurrentString.length;

  const openCount = (parenCurrentString.match(/\(/g) || []).length;
  const closeCount = (parenCurrentString.match(/\)/g) || []).length;
  openDisplay.textContent = openCount;
  closeDisplay.textContent = closeCount;

  if (parenCurrentString.includes('S')) {
    validityDisplay.textContent = 'In Progress (contains S)';
    validityDisplay.className = 'metric-value text-accent';
  } else if (openCount === closeCount) {
    validityDisplay.textContent = 'Balanced & Valid';
    validityDisplay.className = 'metric-value text-success';
  } else {
    validityDisplay.textContent = 'Unbalanced';
    validityDisplay.className = 'metric-value text-danger';
  }

  historyList.innerHTML = '';
  parenHistory.forEach(h => {
    const li = document.createElement('li');
    li.textContent = h;
    historyList.appendChild(li);
  });
}

// ==========================================
// 4. C-STYLE DECLARATIONS VALIDATOR
// ==========================================
function initDeclarationsValidator() {
  const input = document.getElementById('decl-input');
  const btnValidate = document.getElementById('btn-validate-decl');
  const presetBtns = document.querySelectorAll('[data-decl]');

  btnValidate.addEventListener('click', () => {
    validateDeclaration(input.value.trim());
  });

  input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') validateDeclaration(input.value.trim());
  });

  presetBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const val = btn.getAttribute('data-decl');
      input.value = val;
      validateDeclaration(val);
    });
  });

  validateDeclaration(input.value.trim());
}

function validateDeclaration(str) {
  const badge = document.getElementById('decl-badge');
  const details = document.getElementById('decl-result-details');
  const list = document.getElementById('decl-derivation-list');

  list.innerHTML = '';

  // Grammar:
  // <Decl> -> <Type> <VarList> ;
  // <Type> -> int | float | char
  // <VarList> -> id | id , <VarList>

  const validTypes = ['int', 'float', 'char'];

  if (!str.endsWith(';')) {
    badge.textContent = 'INVALID SYNTAX';
    badge.className = 'badge-result invalid';
    details.innerHTML = '<strong>Error:</strong> Missing terminal semicolon <code>;</code> at the end of statement.';
    return;
  }

  const withoutSemi = str.slice(0, -1).trim();
  const tokens = withoutSemi.split(/\s+/);

  if (tokens.length < 2) {
    badge.textContent = 'INVALID SYNTAX';
    badge.className = 'badge-result invalid';
    details.innerHTML = '<strong>Error:</strong> Incomplete declaration. Must specify both a Type and at least one variable identifier.';
    return;
  }

  const typePart = tokens[0];
  const varPart = withoutSemi.slice(typePart.length).trim();

  if (!validTypes.includes(typePart)) {
    badge.textContent = 'INVALID SYNTAX';
    badge.className = 'badge-result invalid';
    details.innerHTML = `<strong>Error:</strong> Type <code>${typePart}</code> is not in the grammar rule <code>&lt;Type&gt; &rarr; int | float | char</code>.`;
    return;
  }

  // Check VarList
  if (varPart.endsWith(',')) {
    badge.textContent = 'INVALID SYNTAX';
    badge.className = 'badge-result invalid';
    details.innerHTML = '<strong>Error:</strong> Trailing comma before semicolon. Rule requires an identifier after every comma.';
    return;
  }

  const rawVars = varPart.split(',').map(v => v.trim());
  const invalidVar = rawVars.find(v => !/^[a-zA-Z_][a-zA-Z0-9_]*$/.test(v));

  if (invalidVar !== undefined) {
    badge.textContent = 'INVALID SYNTAX';
    badge.className = 'badge-result invalid';
    details.innerHTML = `<strong>Error:</strong> Invalid identifier <code>${invalidVar === '' ? '(empty)' : invalidVar}</code>.`;
    return;
  }

  // Valid! Generate derivation
  badge.textContent = 'VALID SYNTAX';
  badge.className = 'badge-result valid';
  details.innerHTML = `Conforms strictly to <code>&lt;Type&gt; &lt;VarList&gt; ;</code> with Type <strong>${typePart}</strong> and ${rawVars.length} variable(s): <code>${rawVars.join(', ')}</code>.`;

  const steps = [];
  steps.push('<Decl>');
  steps.push(`<Type> <VarList> ;`);
  steps.push(`${typePart} <VarList> ;`);

  let currentVarList = `${typePart} `;
  for (let i = 0; i < rawVars.length; i++) {
    if (i === rawVars.length - 1) {
      steps.push(`${currentVarList}${rawVars[i]} ;`);
    } else {
      steps.push(`${currentVarList}${rawVars[i]} , <VarList> ;`);
      currentVarList += `${rawVars[i]}, `;
    }
  }

  steps.forEach((s, idx) => {
    const li = document.createElement('li');
    li.textContent = `Step ${idx}: ${s}`;
    list.appendChild(li);
  });
}

// ==========================================
// 5. COMBINATORICS SIZING CALCULATOR
// ==========================================
function initCombinatoricsCalculator() {
  const inDet = document.getElementById('num-det');
  const inN = document.getElementById('num-n');
  const inV = document.getElementById('num-v');

  const update = () => {
    const det = Math.max(1, parseInt(inDet.value) || 1);
    const n = Math.max(1, parseInt(inN.value) || 1);
    const v = Math.max(1, parseInt(inV.value) || 1);

    const np = det * n;
    const vp = v * np;
    const total = np * vp;

    document.getElementById('math-det-val').textContent = det;
    document.getElementById('math-n-val').textContent = n;
    document.getElementById('res-np').textContent = np;

    document.getElementById('math-v-val').textContent = v;
    document.getElementById('math-np-val').textContent = np;
    document.getElementById('res-vp').textContent = vp;

    document.getElementById('math-final-np').textContent = np;
    document.getElementById('math-final-vp').textContent = vp;
    document.getElementById('res-total-sentences').textContent = `${total} Sentences`;

    // Render sample sentences
    renderCombinatorialSamples(det, n, v);
  };

  inDet.addEventListener('input', update);
  inN.addEventListener('input', update);
  inV.addEventListener('input', update);

  update();
}

function renderCombinatorialSamples(detCount, nCount, vCount) {
  const container = document.getElementById('sample-sentences-container');
  container.innerHTML = '';

  const sampleDets = ['the', 'a', 'every', 'one', 'each', 'this'].slice(0, detCount);
  const sampleNs = ['dog', 'cat', 'bird', 'rabbit', 'fox', 'wolf'].slice(0, nCount);
  const sampleVs = ['chased', 'saw', 'heard', 'followed', 'found'].slice(0, vCount);

  let samples = [];
  for (let d1 of sampleDets) {
    for (let n1 of sampleNs) {
      for (let v of sampleVs) {
        for (let d2 of sampleDets) {
          for (let n2 of sampleNs) {
            samples.push(`${d1} ${n1} ${v} ${d2} ${n2}`);
            if (samples.length >= 16) break;
          }
          if (samples.length >= 16) break;
        }
        if (samples.length >= 16) break;
      }
      if (samples.length >= 16) break;
    }
    if (samples.length >= 16) break;
  }

  samples.forEach(s => {
    const pill = document.createElement('div');
    pill.className = 'sentence-pill';
    pill.textContent = `\u2022 ${s}`;
    container.appendChild(pill);
  });
}

// ==========================================
// 6. PRACTICE QUIZ (10 QUESTIONS)
// ==========================================
const QUIZ_QUESTIONS = [
  {
    q: "In a leftmost derivation, which non-terminal is selected for replacement at each step?",
    opts: [
      "The rightmost placeholder in angle brackets",
      "The leftmost placeholder in angle brackets",
      "Any placeholder selected randomly by the parser",
      "Only the start symbol"
    ],
    ans: 1,
    exp: "Leftmost derivation strictly mandates replacing the very first (leftmost) non-terminal symbol encountered from left to right."
  },
  {
    q: "In the derivation A = B * (A + C), why must <expr> \u2192 ( <expr> ) be applied before expanding addition?",
    opts: [
      "Because multiplication has lower precedence than addition",
      "Because the parentheses must exist in the sentential form before addition can be placed inside them",
      "Because C requires all expressions to be parenthesized",
      "Because non-terminals cannot be inside parentheses"
    ],
    ans: 1,
    exp: "A grammar cannot place terms inside a container that has not yet been generated. The parentheses ( <expr> ) must exist before addition <id> + <expr> can be substituted inside."
  },
  {
    q: "What does the epsilon symbol (\u03B5) represent in the CFG rule S \u2192 (S)S | \u03B5?",
    opts: [
      "A syntax error indicator",
      "The empty string (stop signal) that erases the placeholder",
      "An opening bracket",
      "A comment delimiter"
    ],
    ans: 1,
    exp: "Epsilon (\u03B5) is the empty string. In recursive CFGs, it acts as the base-case termination condition."
  },
  {
    q: "Can the grammar S \u2192 (S)S | \u03B5 generate the string ')('?",
    opts: [
      "Yes, by applying S \u2192 \u03B5 first",
      "No, because every expansion strictly introduces '(' before ')'",
      "Yes, because S is symmetrical",
      "Only if parentheses are inverted by the compiler"
    ],
    ans: 1,
    exp: "The production rule (S)S hardcodes '(' on the left and ')' on the right. An opening bracket always precedes its partner, making ')' first mathematically impossible."
  },
  {
    q: "Which of the following is an INVALID C-style declaration according to <Decl> \u2192 <Type> <VarList> ;?",
    opts: [
      "int x;",
      "float y, z;",
      "char a, b, c;",
      "int x"
    ],
    ans: 3,
    exp: "'int x' lacks the mandatory terminal semicolon ';' required by the production rule."
  },
  {
    q: "Given |<Det>| = 3, |<N>| = 4, and |<V>| = 2 for sentence grammar <S> \u2192 <NP> <VP>, what is |<NP>|?",
    opts: [
      "7",
      "12",
      "24",
      "48"
    ],
    ans: 1,
    exp: "|<NP>| = |<Det>| \u00D7 |<N>| = 3 \u00D7 4 = 12 combinations."
  },
  {
    q: "Continuing the previous question (|<NP>| = 12, |<V>| = 2), what is the total number of sentences |<S>|?",
    opts: [
      "24",
      "144",
      "288",
      "576"
    ],
    ans: 2,
    exp: "|<VP>| = |<V>| \u00D7 |<NP>| = 2 \u00D7 12 = 24. Total sentences |<S>| = |<NP>| \u00D7 |<VP>| = 12 \u00D7 24 = 288."
  },
  {
    q: "In railroad / syntax diagrams, how are terminal symbols represented?",
    opts: [
      "Rectangles",
      "Ovals or circles",
      "Diamonds",
      "Dotted arrows"
    ],
    ans: 1,
    exp: "In syntax diagrams (railroad diagrams), terminal symbols (literals) are enclosed in ovals or circles, whereas non-terminals are drawn in rectangles."
  },
  {
    q: "In a Context-Free Grammar 4-tuple G = (V, \u03A3, R, S), what does \u03A3 (Sigma) represent?",
    opts: [
      "The set of non-terminals",
      "The set of terminals (alphabet symbols and keywords)",
      "The set of production rewrite rules",
      "The start symbol"
    ],
    ans: 1,
    exp: "\u03A3 (Sigma) is the alphabet of terminal symbols that appear directly in the final code."
  },
  {
    q: "When is a formal grammar classified as ambiguous?",
    opts: [
      "When it contains both terminals and non-terminals",
      "When it can generate two or more distinct parse trees for the same sentence",
      "When it contains recursive rules",
      "When it has more than 10 production rules"
    ],
    ans: 1,
    exp: "Ambiguity in formal grammar theory means a single string can be parsed into two or more distinct parse trees (e.g., the dangling-else problem)."
  }
];

let quizScore = 0;
const answeredQuestions = new Set();

function initPracticeQuiz() {
  const container = document.getElementById('quiz-items-container');
  container.innerHTML = '';

  QUIZ_QUESTIONS.forEach((item, qIdx) => {
    const card = document.createElement('div');
    card.className = 'quiz-item-card';

    const qNum = document.createElement('div');
    qNum.className = 'quiz-q-num';
    qNum.textContent = `Question ${qIdx + 1} of 10`;

    const qTitle = document.createElement('div');
    qTitle.className = 'quiz-question';
    qTitle.textContent = item.q;

    const optsList = document.createElement('div');
    optsList.className = 'quiz-options';

    const expBox = document.createElement('div');
    expBox.className = 'quiz-explanation';
    expBox.innerHTML = `<strong>Explanation:</strong> ${item.exp}`;

    item.opts.forEach((optText, optIdx) => {
      const btn = document.createElement('button');
      btn.className = 'quiz-opt-btn';
      btn.textContent = optText;

      btn.addEventListener('click', () => {
        if (answeredQuestions.has(qIdx)) return;
        answeredQuestions.add(qIdx);

        if (optIdx === item.ans) {
          btn.classList.add('correct');
          quizScore++;
        } else {
          btn.classList.add('wrong');
          // Highlight correct answer
          optsList.children[item.ans].classList.add('correct');
        }

        expBox.classList.add('show');
        document.getElementById('quiz-score-display').textContent = `Score: ${quizScore} / 10`;
      });

      optsList.appendChild(btn);
    });

    card.appendChild(qNum);
    card.appendChild(qTitle);
    card.appendChild(optsList);
    card.appendChild(expBox);

    container.appendChild(card);
  });
}

// ==========================================
// 7. OBSIDIAN REVIEWER VAULT LOGIC
// ==========================================
let activeDocumentKey = 'ProgLang_Top5_HighYield_Exam_Mastery.md';
let markdownEngineInstance = null;

function initObsidianViewer() {
  if (!window.ObsidianMarkdownEngine) return;
  markdownEngineInstance = new window.ObsidianMarkdownEngine();

  const filterInput = document.getElementById('vault-filter-input');
  const clozeToggle = document.getElementById('cloze-toggle');
  const clozeText = document.getElementById('cloze-toggle-text');
  const btnCopyDoc = document.getElementById('btn-copy-doc');
  const fileUpload = document.getElementById('custom-file-upload');

  const filesData = window.REVIEWERS_DATA || {};

  renderVaultTree(filesData);

  // Search filter
  if (filterInput) {
    filterInput.addEventListener('input', (e) => {
      const q = e.target.value.toLowerCase().trim();
      renderVaultTree(filesData, q);
    });
  }

  // Cloze Mode Toggle
  if (clozeToggle) {
    clozeToggle.addEventListener('change', (e) => {
      markdownEngineInstance.setStudyMode(e.target.checked);
      if (clozeText) {
        clozeText.textContent = e.target.checked ? 'Study Mode (Cloze Active)' : 'Reading Mode (All Revealed)';
      }
      renderActiveDocument(filesData);
    });
  }

  // Copy Document Button
  if (btnCopyDoc) {
    btnCopyDoc.addEventListener('click', () => {
      const doc = filesData[activeDocumentKey];
      if (doc) {
        navigator.clipboard.writeText(doc.content);
        const originalSvg = btnCopyDoc.innerHTML;
        btnCopyDoc.innerHTML = '<span style="font-size:0.75rem; color:#56d364; font-weight:700;">Copied!</span>';
        setTimeout(() => { btnCopyDoc.innerHTML = originalSvg; }, 1500);
      }
    });
  }

  // Custom File Upload
  if (fileUpload) {
    fileUpload.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          const content = event.target.result;
          const customKey = file.name;
          filesData[customKey] = {
            filename: file.name,
            title: file.name.replace(/\.md$|\.txt$/, ''),
            category: 'Imported Files',
            sizeBytes: file.size,
            content: content
          };
          activeDocumentKey = customKey;
          renderVaultTree(filesData);
          renderActiveDocument(filesData);
        };
        reader.readAsText(file);
      }
    });
  }

  // Render initial active doc
  renderActiveDocument(filesData);
}

function renderVaultTree(filesData, filter = '') {
  const vaultTree = document.getElementById('vault-file-tree');
  if (!vaultTree) return;
  vaultTree.innerHTML = '';

  const categories = {};
  Object.keys(filesData).forEach(key => {
    const file = filesData[key];
    if (filter && !file.filename.toLowerCase().includes(filter) && !file.title.toLowerCase().includes(filter)) {
      return;
    }
    const cat = file.category || 'General Reviewers';
    if (!categories[cat]) categories[cat] = [];
    categories[cat].push(file);
  });

  const categoryOrder = [
    'Simulations & High-Yield',
    'Master Reviewers',
    'Quizzes & Answer Keys',
    'Study Protocols',
    'Imported Files'
  ];

  const sortedCatNames = Object.keys(categories).sort((a, b) => {
    const idxA = categoryOrder.indexOf(a);
    const idxB = categoryOrder.indexOf(b);
    if (idxA !== -1 && idxB !== -1) return idxA - idxB;
    if (idxA !== -1) return -1;
    if (idxB !== -1) return 1;
    return a.localeCompare(b);
  });

  sortedCatNames.forEach(catName => {
    const catGroup = document.createElement('div');
    catGroup.className = 'vault-category';

    const catTitle = document.createElement('div');
    catTitle.className = 'vault-category-title';
    catTitle.innerHTML = `<span style="color:#7b68ee;">&#128193;</span> ${catName}`;
    catGroup.appendChild(catTitle);

    categories[catName].forEach(file => {
      const item = document.createElement('div');
      item.className = `vault-file-item ${file.filename === activeDocumentKey ? 'active' : ''}`;
      
      const left = document.createElement('div');
      left.className = 'file-item-left';
      left.innerHTML = `<span class="file-item-icon">&#9632;</span> <span title="${file.filename}">${file.title || file.filename}</span>`;

      const size = document.createElement('span');
      size.className = 'file-item-size';
      size.textContent = formatBytes(file.sizeBytes);

      item.appendChild(left);
      item.appendChild(size);

      item.addEventListener('click', () => {
        activeDocumentKey = file.filename;
        document.querySelectorAll('.vault-file-item').forEach(el => el.classList.remove('active'));
        item.classList.add('active');
        renderActiveDocument(filesData);
      });

      catGroup.appendChild(item);
    });

    vaultTree.appendChild(catGroup);
  });
}

function renderActiveDocument(filesData) {
  const doc = filesData[activeDocumentKey];
  if (!doc) return;

  const titleElem = document.getElementById('doc-active-title');
  if (titleElem) titleElem.textContent = doc.filename;

  // Stats
  const words = doc.content.split(/\s+/).filter(Boolean).length;
  const wordElem = document.getElementById('doc-word-count');
  if (wordElem) wordElem.textContent = `${words.toLocaleString()} words`;
  const readTime = Math.ceil(words / 200);
  const readElem = document.getElementById('doc-read-time');
  if (readElem) readElem.textContent = `${readTime} min read`;

  // Render markdown
  const viewContainer = document.getElementById('obsidian-rendered-view');
  if (viewContainer && markdownEngineInstance) {
    viewContainer.innerHTML = markdownEngineInstance.render(doc.content);

    // Wire up wikilinks [[Target]]
    viewContainer.querySelectorAll('.obsidian-wikilink').forEach(link => {
      link.addEventListener('click', () => {
        const target = link.getAttribute('data-wikilink');
        const foundKey = Object.keys(filesData).find(k => 
          k.toLowerCase().includes(target.toLowerCase()) || 
          filesData[k].title.toLowerCase().includes(target.toLowerCase())
        );
        if (foundKey) {
          activeDocumentKey = foundKey;
          renderVaultTree(filesData);
          renderActiveDocument(filesData);
          const canvas = document.querySelector('.obsidian-reading-canvas');
          if (canvas) canvas.scrollTo({ top: 0, behavior: 'smooth' });
        }
      });
    });
  }
}

function formatBytes(bytes) {
  if (!bytes) return '0 B';
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
}

