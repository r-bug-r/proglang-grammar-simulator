const fs = require('fs');
const path = require('path');

const revDir = path.join(__dirname, 'reviewers');
const files = fs.readdirSync(revDir);
const data = {};

for (const file of files) {
  const fullPath = path.join(revDir, file);
  const stat = fs.statSync(fullPath);
  if (stat.isFile()) {
    const content = fs.readFileSync(fullPath, 'utf8');
    let title = file.replace(/\.md$|\.txt$/, '').replace(/_/g, ' ');
    const titleMatch = content.match(/^title:\s*["']?(.*?)["']?$/m) || content.match(/^#\s+(.*)/m);
    if (titleMatch && titleMatch[1]) title = titleMatch[1].replace(/["']/g, '');

    let category = 'Master Reviewers';
    if (file.includes('Quiz') || file.includes('answers')) category = 'Quizzes & Answer Keys';
    else if (file.includes('Simulation') || file.includes('Top5')) category = 'Simulations & High-Yield';
    else if (file.includes('Roadmap')) category = 'Study Protocols';

    data[file] = {
      filename: file,
      title: title,
      category: category,
      sizeBytes: stat.size,
      content: content
    };
  }
}

const jsContent = 'window.REVIEWERS_DATA = ' + JSON.stringify(data, null, 2) + ';\n';
fs.writeFileSync(path.join(__dirname, 'reviewers_data.js'), jsContent, 'utf8');
console.log('Successfully generated reviewers_data.js with ' + Object.keys(data).length + ' files');
