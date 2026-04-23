const fs = require('fs');
const path = require('path');

const replacements = [
  { regex: /#e6edf3/gi, replace: 'var(--text-cream)' },
  { regex: /#8b949e/gi, replace: 'var(--text-body-dark)' },
  { regex: /#0a0b0d/gi, replace: 'var(--bg-dark)' },
  { regex: /#f87171/gi, replace: 'var(--color-coral)' },
  { regex: /#5fa8ff/gi, replace: 'var(--color-teal)' },
  { regex: /#7ee787/gi, replace: 'var(--color-teal)' },
  { regex: /#f2cc60/gi, replace: 'var(--color-amber)' },
  { regex: /#a78bfa/gi, replace: 'var(--color-indigo)' },
  { regex: /#060a0f/gi, replace: 'var(--bg-dark)' },
  { regex: /#0e1318/gi, replace: 'var(--bg-dark)' },
  { regex: /#d4f53c/gi, replace: 'var(--color-teal)' },
  { regex: /#f0f0ed/gi, replace: 'var(--text-cream)' }
];

function replaceInFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;
  
  replacements.forEach(r => {
    content = content.replace(r.regex, r.replace);
  });
  
  if (content !== original) {
    fs.writeFileSync(filePath, content);
  }
}

function traverse(dir) {
  fs.readdirSync(dir).forEach(file => {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      traverse(fullPath);
    } else if (fullPath.endsWith('.css') || fullPath.endsWith('.jsx')) {
      replaceInFile(fullPath);
    }
  });
}

traverse('src');
console.log('Second mass replacement done');
