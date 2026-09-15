// Obsidian & RemNote Markdown Rendering Engine
// Supports Frontmatter, Callouts, Tables, Lists, Code Fences, Wikilinks, and Cloze Deletions

class ObsidianMarkdownEngine {
  constructor() {
    this.studyMode = true; // true = clozes hidden/clickable; false = revealed
  }

  setStudyMode(enabled) {
    this.studyMode = enabled;
  }

  render(markdown) {
    if (!markdown) return '';

    let content = markdown;
    let frontmatterHtml = '';

    // 1. Extract YAML Frontmatter
    const frontmatterMatch = content.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);
    if (frontmatterMatch) {
      frontmatterHtml = this.parseFrontmatter(frontmatterMatch[1]);
      content = content.slice(frontmatterMatch[0].length);
    }

    // 2. Extract & Preserve Code Fences to prevent internal formatting collisions
    const codeBlocks = [];
    content = content.replace(/```([a-zA-Z0-9_\-]+)?\r?\n([\s\S]*?)```/g, (match, lang, code) => {
      const id = `__CODE_BLOCK_${codeBlocks.length}__`;
      codeBlocks.push({ lang: lang || 'text', code: code });
      return id;
    });

    // 3. Extract & Preserve Inline Code
    const inlineCodes = [];
    content = content.replace(/`([^`\n]+)`/g, (match, inline) => {
      const id = `__INLINE_CODE_${inlineCodes.length}__`;
      inlineCodes.push(inline);
      return id;
    });

    // 4. Parse Obsidian Callouts (> [!NOTE] Title \n > body)
    content = this.parseCallouts(content);

    // 5. Parse Tables
    content = this.parseTables(content);

    // 6. Headers
    content = content.replace(/^###### (.*$)/gim, '<h6>$1</h6>');
    content = content.replace(/^##### (.*$)/gim, '<h5>$1</h5>');
    content = content.replace(/^#### (.*$)/gim, '<h4>$1</h4>');
    content = content.replace(/^### (.*$)/gim, '<h3>$1</h3>');
    content = content.replace(/^## (.*$)/gim, '<h2>$1</h2>');
    content = content.replace(/^# (.*$)/gim, '<h1>$1</h1>');

    // 7. Horizontal Rules
    content = content.replace(/^---$/gim, '<hr class="obsidian-hr">');

    // 8. Blockquotes (standard)
    content = content.replace(/^> (.*$)/gim, '<blockquote>$1</blockquote>');

    // 9. Wikilinks [[TargetDoc]]
    content = content.replace(/\[\[(.*?)\]\]/g, (match, target) => {
      const cleanTarget = target.trim();
      return `<a href="javascript:void(0)" class="obsidian-wikilink" data-wikilink="${cleanTarget}">[[${cleanTarget}]]</a>`;
    });

    // 10. RemNote Clozes {{cloze}}
    content = content.replace(/\{\{(.*?)\}\}/g, (match, clozeText) => {
      const clean = clozeText.trim();
      if (this.studyMode) {
        return `<span class="obsidian-cloze cloze-hidden" title="Click to reveal" onclick="this.classList.toggle('cloze-revealed')"><span class="cloze-content">${clean}</span></span>`;
      } else {
        return `<span class="obsidian-cloze cloze-revealed"><span class="cloze-content">${clean}</span></span>`;
      }
    });

    // 11. Bold, Italic, Strikethrough
    content = content.replace(/\*\*\*(.*?)\*\*\*/g, '<strong><em>$1</em></strong>');
    content = content.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    content = content.replace(/\*(.*?)\*/g, '<em>$1</em>');
    content = content.replace(/~~(.*?)~~/g, '<del>$1</del>');

    // 12. Task Checkboxes
    content = content.replace(/^- \[ \]\s+(.*$)/gim, '<li class="task-item"><input type="checkbox" disabled> <span>$1</span></li>');
    content = content.replace(/^- \[x\]\s+(.*$)/gim, '<li class="task-item task-done"><input type="checkbox" checked disabled> <span>$1</span></li>');

    // 13. Lists (Unordered & Ordered)
    content = this.parseLists(content);

    // 14. Paragraphs
    content = content.split(/\n\s*\n/).map(block => {
      block = block.trim();
      if (!block) return '';
      if (/^<(h[1-6]|div|table|ul|ol|li|hr|blockquote|pre)/i.test(block)) {
        return block;
      }
      return `<p>${block.replace(/\n/g, '<br>')}</p>`;
    }).join('\n\n');

    // 15. Restore Inline Code
    inlineCodes.forEach((code, idx) => {
      content = content.replace(`__INLINE_CODE_${idx}__`, `<code>${this.escapeHtml(code)}</code>`);
    });

    // 16. Restore Code Fences
    codeBlocks.forEach((block, idx) => {
      const escaped = this.escapeHtml(block.code.trim());
      const replacement = `
        <div class="obsidian-code-wrapper">
          <div class="code-banner">
            <span class="code-lang">${block.lang}</span>
            <button class="btn-copy-code" onclick="navigator.clipboard.writeText(this.closest('.obsidian-code-wrapper').querySelector('code').innerText); this.textContent='Copied!'; setTimeout(()=>this.textContent='Copy', 1500)">Copy</button>
          </div>
          <pre><code class="language-${block.lang}">${escaped}</code></pre>
        </div>
      `;
      content = content.replace(`__CODE_BLOCK_${idx}__`, replacement);
    });

    return frontmatterHtml + content;
  }

  parseFrontmatter(yaml) {
    const lines = yaml.split('\n');
    const tags = [];
    const fields = [];

    lines.forEach(line => {
      const parts = line.split(':');
      if (parts.length >= 2) {
        const key = parts[0].trim();
        const val = parts.slice(1).join(':').trim().replace(/^["']|["']$/g, '');
        if (key === 'tags') {
          const match = val.match(/\[(.*?)\]/);
          if (match) {
            match[1].split(',').forEach(t => tags.push(t.trim()));
          }
        } else {
          fields.push({ key, val });
        }
      }
    });

    let html = `
      <div class="obsidian-metadata-card">
        <div class="metadata-header">
          <span class="metadata-icon">&#9881;</span>
          <span class="metadata-title">Document Metadata</span>
        </div>
        <div class="metadata-fields">
    `;

    fields.forEach(f => {
      html += `<div class="meta-row"><span class="meta-key">${f.key}:</span> <span class="meta-val">${this.escapeHtml(f.val)}</span></div>`;
    });

    if (tags.length > 0) {
      html += `<div class="meta-tags-row">`;
      tags.forEach(t => {
        html += `<span class="obsidian-tag">#${this.escapeHtml(t)}</span>`;
      });
      html += `</div>`;
    }

    html += `</div></div>`;
    return html;
  }

  parseCallouts(text) {
    const calloutRegex = /^>\s*\[!(NOTE|TIP|IMPORTANT|WARNING|CAUTION|INFO)\]\s*([^\n]*)\n((?:>.*\n?)*)/gim;

    return text.replace(calloutRegex, (match, type, title, body) => {
      const cleanType = type.toUpperCase();
      const cleanTitle = title.trim() || cleanType;
      const cleanBody = body.replace(/^>\s?/gm, '').trim();

      return `
        <div class="obsidian-callout callout-${cleanType.toLowerCase()}">
          <div class="callout-header">
            <span class="callout-indicator"></span>
            <span class="callout-title">${this.escapeHtml(cleanTitle)}</span>
          </div>
          <div class="callout-content">
            <p>${cleanBody.replace(/\n/g, '<br>')}</p>
          </div>
        </div>
      `;
    });
  }

  parseTables(text) {
    const lines = text.split('\n');
    let inTable = false;
    let tableLines = [];
    const newLines = [];

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      if (line.startsWith('|') && line.endsWith('|')) {
        inTable = true;
        tableLines.push(line);
      } else {
        if (inTable) {
          newLines.push(this.renderTableHtml(tableLines));
          tableLines = [];
          inTable = false;
        }
        newLines.push(lines[i]);
      }
    }
    if (inTable) {
      newLines.push(this.renderTableHtml(tableLines));
    }
    return newLines.join('\n');
  }

  renderTableHtml(lines) {
    if (lines.length < 2) return lines.join('\n');

    const headers = lines[0].slice(1, -1).split('|').map(h => h.trim());
    // skip line 1 (alignment |---|---|)
    const rows = lines.slice(2).map(l => l.slice(1, -1).split('|').map(c => c.trim()));

    let html = '<div class="obsidian-table-wrapper"><table class="obsidian-table"><thead><tr>';
    headers.forEach(h => html += `<th>${h}</th>`);
    html += '</tr></thead><tbody>';

    rows.forEach(r => {
      html += '<tr>';
      r.forEach(cell => html += `<td>${cell}</td>`);
      html += '</tr>';
    });

    html += '</tbody></table></div>';
    return html;
  }

  parseLists(text) {
    const lines = text.split('\n');
    let inUl = false;
    let inOl = false;
    const output = [];

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const ulMatch = line.match(/^(\s*)[-*+]\s+(.*)$/);
      const olMatch = line.match(/^(\s*)\d+\.\s+(.*)$/);

      if (ulMatch) {
        if (!inUl) { output.push('<ul class="obsidian-ul">'); inUl = true; }
        output.push(`<li>${ulMatch[2]}</li>`);
      } else if (olMatch) {
        if (!inOl) { output.push('<ol class="obsidian-ol">'); inOl = true; }
        output.push(`<li>${olMatch[2]}</li>`);
      } else {
        if (inUl) { output.push('</ul>'); inUl = false; }
        if (inOl) { output.push('</ol>'); inOl = false; }
        output.push(line);
      }
    }
    if (inUl) output.push('</ul>');
    if (inOl) output.push('</ol>');

    return output.join('\n');
  }

  escapeHtml(str) {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }
}

window.ObsidianMarkdownEngine = ObsidianMarkdownEngine;
