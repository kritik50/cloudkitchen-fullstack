const fs = require('fs');

let css = fs.readFileSync('src/App.css', 'utf8');

// 1. Replace the root tokens
const newTokens = `:root {
  /* Dark surfaces */
  --bg-dark: #1F2B38;
  --bg-dark-surface: #273444;
  --bg-dark-card: #2A3A4A;

  /* Light surfaces */
  --bg-light: #F7F7F4;
  --bg-light-surface: #EEEEF8;

  /* Text */
  --text-cream: #F2EDE4;
  --text-indigo: #3D4B8E;
  --text-body-dark: #8DA0B0;
  --text-body-light: #5A5A6A;

  /* Accents */
  --color-teal: #2ABFBF;
  --color-amber: #E8963A;
  --color-coral: #FF6B6B;
  --color-indigo: #3D4B8E;

  /* Borders */
  --border-dark: rgba(255,255,255,0.07);
  --border-light: rgba(61,75,142,0.12);

  /* Mapping old variables for safety */
  --primary: var(--color-coral);
  --primary-hover: var(--color-coral);
  --primary-glow: rgba(255, 107, 107, 0.25);
  --border: var(--border-dark);
}`;

css = css.replace(/:root\s*\{[^}]+\}/, newTokens);

// Rule 9 & 10: Remove pure black/dark and pure red. 
css = css.replace(/var\(--bg-color\)/g, 'var(--bg-dark)');
css = css.replace(/background-color:\s*#[0-9a-fA-F]+/g, (match) => {
  if (match.toLowerCase().includes('0b090a') || match.toLowerCase().includes('050405') || match.toLowerCase().includes('0d1117') || match.toLowerCase().includes('090c10')) {
    return 'background-color: var(--bg-dark)';
  }
  return match;
});
css = css.replace(/#161314/gi, 'var(--bg-dark-surface)');

// 1. Navbar
css = css.replace(/\.nb\s*\{[^}]+\}/, (match) => {
  return match.replace(/background:\s*[^;]+;/, 'background: var(--bg-dark);').replace(/border-bottom:\s*[^;]+;/, 'border-bottom: 1px solid var(--border-dark);');
});
css = css.replace(/\.nb-logo-wordmark\s*\{[^}]+\}/, (match) => match.replace(/color:\s*[^;]+;/, 'color: var(--text-cream);'));
css = css.replace(/\.nb-logo-wordmark\s*em\s*\{[^}]+\}/, (match) => match.replace(/color:\s*[^;]+;/, 'color: var(--color-teal);')); // active word in headline
css = css.replace(/\.nb-link\s*\{[^}]+\}/, (match) => match.replace(/color:\s*[^;]+;/, 'color: var(--text-body-dark);'));
css = css.replace(/\.nb-link--active\s*\{[^}]+\}/, (match) => match.replace(/color:\s*[^;]+;/, 'color: var(--color-teal);'));
css = css.replace(/\.nb-link--active::after\s*\{[^}]+\}/, (match) => match.replace(/background:\s*[^;]+;/, 'background: var(--color-teal);'));
css = css.replace(/\.order-btn\s*\{[^}]+\}/, (match) => match.replace(/background:\s*[^;]+;/, 'background: var(--color-coral);').replace(/color:\s*[^;]+;/, 'color: white;'));

// 2. Hero
css = css.replace(/\.hero\s*\{[^}]+\}/, (match) => match.replace(/background-color:\s*[^;]+;/, 'background-color: var(--bg-dark);'));
css = css.replace(/\.hero-title\s*\{[^}]+\}/, (match) => match.replace(/color:\s*[^;]+;/, 'color: var(--text-cream);'));
css = css.replace(/\.hero-title\s*em\s*\{[^}]+\}/, (match) => match.replace(/color:\s*[^;]+;/, 'color: var(--color-teal);'));
css = css.replace(/\.hero-sub\s*\{[^}]+\}/, (match) => match.replace(/color:\s*[^;]+;/, 'color: var(--text-body-dark);'));
css = css.replace(/\.hero-stats\s*\{[^}]+\}/, (match) => match.replace(/background:\s*[^;]+;/, 'background: var(--bg-dark-surface);').replace(/border:\s*[^;]+;/, 'border: 1px solid var(--border-dark);'));
css = css.replace(/\.hero-stat-val\s*\{[^}]+\}/, (match) => match.replace(/color:\s*[^;]+;/, 'color: var(--color-amber);'));
css = css.replace(/\.hero-stat-lbl\s*\{[^}]+\}/, (match) => match.replace(/color:\s*[^;]+;/, 'color: var(--text-body-dark);'));
css = css.replace(/\.primary-btn\s*\{[^}]+\}/, (match) => match.replace(/background:\s*[^;]+;/, 'background: var(--color-coral);').replace(/color:\s*[^;]+;/, 'color: white;'));
css = css.replace(/\.secondary-btn\s*\{[^}]+\}/, (match) => match.replace(/color:\s*[^;]+;/, 'color: var(--text-cream);').replace(/border:\s*[^;]+;/, 'border: 1px solid var(--text-body-dark);'));
css = css.replace(/\.hero-blob--left\s*\{[^}]+\}/, (match) => match.replace(/background:\s*[^;]+;/, 'background: rgba(42, 191, 191, 0.15);')); // Teal blob
css = css.replace(/\.hero-blob--right\s*\{[^}]+\}/, (match) => match.replace(/background:\s*[^;]+;/, 'background: rgba(232, 150, 58, 0.1);')); // Amber blob

// 3. Who is GymBites for? (Light section)
css = css.replace(/\.who-section\s*\{[^}]+\}/, (match) => match.replace(/background-color:\s*[^;]+;/, 'background-color: var(--bg-light);'));
css = css.replace(/\.who-eyebrow\s*\{[^}]+\}/, (match) => match.replace(/color:\s*[^;]+;/, 'color: var(--text-indigo);'));
css = css.replace(/\.who-title\s*\{[^}]+\}/, (match) => match.replace(/color:\s*[^;]+;/, 'color: var(--text-indigo);'));
css = css.replace(/\.who-subtitle\s*\{[^}]+\}/, (match) => match.replace(/color:\s*[^;]+;/, 'color: var(--text-body-light);'));
css = css.replace(/\.who-card\s*\{[^}]+\}/, (match) => match.replace(/background:\s*[^;]+;/, 'background: var(--bg-light-surface);').replace(/border:\s*[^;]+;/, 'border: 1px solid var(--border-light);'));
css = css.replace(/\.who-card-title\s*\{[^}]+\}/, (match) => match.replace(/color:\s*[^;]+;/, 'color: var(--text-indigo);'));
css = css.replace(/\.who-card-desc\s*\{[^}]+\}/, (match) => match.replace(/color:\s*[^;]+;/, 'color: var(--text-body-light);'));
// We will need to set macros specifically for the who-card-stat in the components or by generic CSS
css += `\n.who-card-stat:nth-child(1) .who-card-stat-val { color: var(--color-amber); }\n.who-card-stat:nth-child(2) .who-card-stat-val { color: var(--color-teal); }\n`;
css += `\n.who-card-stat-val { color: var(--color-teal); }\n`; // Default fallback
css += `\n.who-card-stat-lbl { color: var(--text-body-light); }\n`;

// 6. Menu item cards
css = css.replace(/\.meals-section\s*\{[^}]+\}/, (match) => match.replace(/background-color:\s*[^;]+;/, 'background-color: var(--bg-light);'));
css += `\n.meals-section { background-color: var(--bg-light); }\n`;
css += `\n.meals-eyebrow, .meals-title { color: var(--text-indigo); }\n.meals-subtitle { color: var(--text-body-light); }\n`;
css += `\n.meal-card { background: var(--bg-light-surface); border: 1px solid var(--border-light); }\n`;
css += `\n.meal-name { color: var(--text-indigo); }\n.meal-desc { color: var(--text-body-light); }\n`;
css += `\n.meal-macro-lbl { color: var(--text-body-light); }\n`;

// 7. Why Choose GymBites (Dark section)
css = css.replace(/\.why-section\s*\{[^}]+\}/, (match) => match.replace(/background-color:\s*[^;]+;/, 'background-color: var(--bg-dark);'));
css += `\n.why-section { background-color: var(--bg-dark); }\n`;
css += `\n.why-box { background: var(--bg-dark-surface); border: 1px solid var(--border-dark); }\n`;
css += `\n.why-box-text h3 { color: var(--text-cream); }\n.why-box-text p { color: var(--text-body-dark); }\n`;
css += `\n.why-box-stat-val { color: var(--color-teal); }\n.why-box-stat-lbl { color: var(--text-body-dark); }\n`;
css += `\n.why-title, .why-eyebrow { color: var(--text-cream); }\n.why-subtitle { color: var(--text-body-dark); }\n`;
css += `\n.why-highlight-val { color: var(--color-teal); }\n.why-highlight-lbl { color: var(--text-body-dark); }\n`;
css += `\n.why-cta { background: var(--color-coral); color: white; }\n`;

// Reviews (Light Section)
css = css.replace(/\.reviews-section\s*\{[^}]+\}/, (match) => match.replace(/background-color:\s*[^;]+;/, 'background-color: var(--bg-light);'));
css += `\n.reviews-section { background-color: var(--bg-light); }\n`;
css += `\n.reviews-title, .reviews-eyebrow { color: var(--text-indigo); }\n.reviews-subtitle { color: var(--text-body-light); }\n`;
css += `\n.review-card { background: var(--bg-light-surface); border: 1px solid var(--border-light); }\n`;
css += `\n.review-text { color: var(--text-body-light); }\n.review-name { color: var(--text-indigo); }\n.review-plan { color: var(--text-body-light); }\n`;
css += `\n.review-result-val { color: var(--color-teal); }\n`;

// 8. Footer (Dark section)
css = css.replace(/\.footer\s*\{[^}]+\}/, (match) => match.replace(/background-color:\s*[^;]+;/, 'background-color: var(--bg-dark);'));
css += `\n.footer { background-color: var(--bg-dark); }\n`;
css += `\n.footer-logo, .footer-tagline, .footer-col h4, .footer p { color: var(--text-body-dark); }\n`;
css += `\n.footer a { color: var(--text-body-dark); }\n.footer a:hover { color: var(--color-teal); }\n`;
css += `\n.footer-col h4 { color: var(--text-cream); }\n`;

// General cleanup of red/teal/amber globally that were previously defined
css = css.replace(/var\(--primary\)/g, 'var(--color-coral)');
css = css.replace(/var\(--text-main\)/g, 'inherit'); // Since text changes per section

fs.writeFileSync('src/App.css', css);
console.log('Done refactoring theme to Variant 1 in App.css');
