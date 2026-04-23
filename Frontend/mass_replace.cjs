const fs = require('fs');
const path = require('path');

const replacements = [
  // Dark backgrounds -> #1F2B38
  { regex: /#0B090A/gi, replace: 'var(--bg-dark)' },
  { regex: /#050405/gi, replace: 'var(--bg-dark)' },
  { regex: /#0d1117/gi, replace: 'var(--bg-dark)' },
  { regex: /#090c10/gi, replace: 'var(--bg-dark)' },
  { regex: /#131920/gi, replace: 'var(--bg-dark-surface)' },
  { regex: /#161314/gi, replace: 'var(--bg-dark-surface)' },
  
  // Pure black to #1F2B38
  { regex: /#000/gi, replace: 'var(--bg-dark)' },
  { regex: /#000000/gi, replace: 'var(--bg-dark)' },
  { regex: /#0a0a0a/gi, replace: 'var(--bg-dark)' },
  { regex: /#0d0d0d/gi, replace: 'var(--bg-dark)' },
  { regex: /#111111/gi, replace: 'var(--bg-dark)' },

  // Primary / Reds -> Coral #FF6B6B
  { regex: /#C1121F/gi, replace: 'var(--color-coral)' },
  { regex: /#AE1F23/gi, replace: 'var(--color-coral)' },
  { regex: /#E53935/gi, replace: 'var(--color-coral)' },
  { regex: /#ff0000/gi, replace: 'var(--color-coral)' },
  { regex: /rgba\(193,\s*18,\s*31/g, replace: 'rgba(255, 107, 107' },

  // Sand / Accent -> Indigo #3D4B8E or Teal
  { regex: /#D8BA98/gi, replace: 'var(--color-indigo)' },
  { regex: /rgba\(216,\s*186,\s*152/g, replace: 'rgba(61, 75, 142' },
  
  // Steel blue / Accent -> Teal #2ABFBF
  { regex: /#5D83A6/gi, replace: 'var(--color-teal)' },
  { regex: /rgba\(93,\s*131,\s*166/g, replace: 'rgba(42, 191, 191' },
  
  // Text colors
  { regex: /#F5F3F4/gi, replace: 'var(--text-cream)' },
  { regex: /#e8edf3/gi, replace: 'var(--text-cream)' },
  { regex: /rgba\(245,\s*243,\s*244/g, replace: 'rgba(242, 237, 228' },
  { regex: /rgba\(180,\s*200,\s*224/g, replace: 'rgba(141, 160, 176' } // Maps roughly to body-dark
];

function replaceInFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;
  
  replacements.forEach(r => {
    content = content.replace(r.regex, r.replace);
  });
  
  // Only write if changed to avoid unnecessary I/O
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
console.log('Mass replacement done');
