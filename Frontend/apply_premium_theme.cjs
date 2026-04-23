const fs = require('fs');
const path = require('path');

const cssContent = `
@import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@300;400;500&family=Outfit:wght@300;400;500;600;700;800;900&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&display=swap');

:root {
  /* LIGHT THEME (Default) */
  --bg-base: #FAFAFA;
  --bg-surface: #FFFFFF;
  --bg-surface-elevated: #FFFFFF;
  --bg-base-rgb: 250, 250, 250;
  
  --text-main: #1A1C1E;
  --text-muted: #6C757D;
  
  --color-primary: #E24A2B;
  --color-primary-hover: #C63D21;
  --color-primary-glow: rgba(226, 74, 43, 0.2);
  
  --color-secondary: #1F615D;
  --color-accent-amber: #E07A2B;
  
  --border-color: rgba(0, 0, 0, 0.06);
  --shadow-sm: 0 4px 20px rgba(0, 0, 0, 0.03);
}

@media (prefers-color-scheme: dark) {
  :root {
    /* DARK THEME */
    --bg-base: #121315;
    --bg-surface: #1A1D21;
    --bg-surface-elevated: #22262B;
    --bg-base-rgb: 18, 19, 21;
    
    --text-main: #EDEDED;
    --text-muted: #9A9FA5;
    
    --color-primary: #FC6A4A;
    --color-primary-hover: #FA502C;
    --color-primary-glow: rgba(252, 106, 74, 0.25);
    
    --color-secondary: #2CB5A9;
    --color-accent-amber: #F09A54; 
    
    --border-color: rgba(255, 255, 255, 0.08);
    --shadow-sm: 0 8px 30px rgba(0, 0, 0, 0.4);
  }
}
`;

function transformFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');

  // Replace old :root completely if it's App.css
  if (filePath.endsWith('App.css')) {
    content = content.replace(/:root\s*\{[\s\S]*?\}(?=\s*body)/m, cssContent);
  }

  // Global replacements for unified theme
  content = content.replace(/var\(--bg-dark\)/g, 'var(--bg-base)');
  content = content.replace(/var\(--bg-light\)/g, 'var(--bg-base)');
  content = content.replace(/var\(--bg-dark-surface\)/g, 'var(--bg-surface)');
  content = content.replace(/var\(--bg-light-surface\)/g, 'var(--bg-surface)');
  content = content.replace(/var\(--bg-dark-card\)/g, 'var(--bg-surface-elevated)');
  
  content = content.replace(/var\(--text-cream\)/g, 'var(--text-main)');
  content = content.replace(/var\(--text-indigo\)/g, 'var(--text-main)');
  content = content.replace(/var\(--text-body-dark\)/g, 'var(--text-muted)');
  content = content.replace(/var\(--text-body-light\)/g, 'var(--text-muted)');
  
  content = content.replace(/var\(--color-coral\)/g, 'var(--color-primary)');
  content = content.replace(/var\(--color-teal\)/g, 'var(--color-secondary)');
  content = content.replace(/var\(--color-indigo\)/g, 'var(--color-secondary)');
  content = content.replace(/var\(--color-amber\)/g, 'var(--color-accent-amber)');
  
  content = content.replace(/var\(--border-dark\)/g, 'var(--border-color)');
  content = content.replace(/var\(--border-light\)/g, 'var(--border-color)');
  
  // Specific UI Polish as per instructions
  // Navbar blur background
  content = content.replace(/background:\s*rgba\(13,\s*17,\s*23,\s*0\.95\);/g, 'background: rgba(var(--bg-base-rgb), 0.85);');
  
  // Clean up remaining hardcoded colors
  content = content.replace(/color:\s*white;/g, 'color: #FFFFFF;');
  
  fs.writeFileSync(filePath, content);
}

function traverse(dir) {
  fs.readdirSync(dir).forEach(file => {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      traverse(fullPath);
    } else if (fullPath.endsWith('.css')) {
      transformFile(fullPath);
    }
  });
}

traverse('src');
console.log('Premium theme applied successfully.');
