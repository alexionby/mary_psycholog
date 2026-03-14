const fs = require('fs');
const path = require('path');

const SRC_DIR = path.join(__dirname, 'src');
const DIST_DIR = path.join(__dirname, 'dist');
const COMPONENTS_DIR = path.join(__dirname, 'components');

// Static directories/files to copy to dist
const STATIC_ASSETS = ['css', 'js', 'img', 'fonts', 'robots.txt', 'sitemap.xml'];

// Load component templates
function loadComponents() {
  const components = {};
  const files = fs.readdirSync(COMPONENTS_DIR);
  for (const file of files) {
    if (file.endsWith('.html')) {
      const name = file.replace('.html', '');
      components[name] = fs.readFileSync(path.join(COMPONENTS_DIR, file), 'utf-8').trim();
    }
  }
  return components;
}

// Replace {{component-name}} placeholders with component HTML
function processTemplate(html, components) {
  return html.replace(/\{\{(\w[\w-]*)\}\}/g, (match, name) => {
    if (components[name] !== undefined) {
      return components[name];
    }
    console.warn(`  Warning: unknown component "{{${name}}}"`);
    return match;
  });
}

// Recursively copy directory
function copyDir(src, dest) {
  if (!fs.existsSync(src)) return;

  fs.mkdirSync(dest, { recursive: true });
  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

// Recursively find all HTML files in src/
function findHtmlFiles(dir, base = '') {
  const results = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const rel = path.join(base, entry.name);
    if (entry.isDirectory()) {
      results.push(...findHtmlFiles(path.join(dir, entry.name), rel));
    } else if (entry.name.endsWith('.html')) {
      results.push(rel);
    }
  }
  return results;
}

// Safe CSS minification — only remove comments and extra whitespace
function minifyCSS(css) {
  return css
    .replace(/\/\*[\s\S]*?\*\//g, '')   // remove comments
    .replace(/\n\s*\n/g, '\n')          // collapse blank lines
    .trim();
}

// Simple JS minification (remove comments and collapse whitespace)
function minifyJS(js) {
  // Remove single-line comments (but not URLs with //)
  js = js.replace(/(?<![:"'])\/\/(?![/"']).*$/gm, '');
  // Remove multi-line comments
  js = js.replace(/\/\*[\s\S]*?\*\//g, '');
  // Collapse whitespace (careful with strings)
  js = js.replace(/\n\s*\n/g, '\n');
  return js.trim();
}

// Main build
function build() {
  console.log('Building site...');

  // Clean dist
  if (fs.existsSync(DIST_DIR)) {
    fs.rmSync(DIST_DIR, { recursive: true });
  }
  fs.mkdirSync(DIST_DIR, { recursive: true });

  // Load components
  const components = loadComponents();
  console.log(`Loaded components: ${Object.keys(components).join(', ')}`);

  // Combine CSS (no aggressive minification — Cloudflare handles gzip)
  // Note: fonts.css is NOT included here — @font-face is in critical.css (inlined in <head>)
  const styleCss = fs.readFileSync(path.join(__dirname, 'css', 'style.css'), 'utf-8');
  const responsiveCss = fs.readFileSync(path.join(__dirname, 'css', 'responsive.css'), 'utf-8');
  const combinedCSS = minifyCSS(styleCss + '\n' + responsiveCss);
  fs.mkdirSync(path.join(DIST_DIR, 'css'), { recursive: true });
  fs.writeFileSync(path.join(DIST_DIR, 'css', 'style.min.css'), combinedCSS);
  console.log(`  CSS: ${(styleCss.length + responsiveCss.length)} → ${combinedCSS.length} bytes (combined)`);

  // Load critical CSS for inlining in <head>
  const criticalCss = fs.readFileSync(path.join(__dirname, 'css', 'critical.css'), 'utf-8');
  const criticalInline = minifyCSS(criticalCss);
  console.log(`  Critical CSS: ${criticalInline.length} bytes (will be inlined)`);

  // Minify JS
  const mainJs = fs.readFileSync(path.join(__dirname, 'js', 'main.js'), 'utf-8');
  const minJs = minifyJS(mainJs);
  fs.mkdirSync(path.join(DIST_DIR, 'js'), { recursive: true });
  fs.writeFileSync(path.join(DIST_DIR, 'js', 'main.min.js'), minJs);
  console.log(`  JS: ${mainJs.length} → ${minJs.length} bytes (minified)`);

  // Process HTML templates
  const htmlFiles = findHtmlFiles(SRC_DIR);
  console.log(`Processing ${htmlFiles.length} HTML files...`);

  for (const relPath of htmlFiles) {
    const srcPath = path.join(SRC_DIR, relPath);
    const destPath = path.join(DIST_DIR, relPath);

    fs.mkdirSync(path.dirname(destPath), { recursive: true });

    let template = fs.readFileSync(srcPath, 'utf-8');
    let html = processTemplate(template, components);

    // Inline critical CSS (includes @font-face) and load combined CSS
    html = html.replace(
      /\s*<link rel="stylesheet" href="\/css\/style\.css">\s*\n\s*<link rel="stylesheet" href="\/css\/responsive\.css">/,
      `\n    <style>${criticalInline}</style>\n    <link rel="preload" as="font" type="font/woff2" href="/fonts/inter-cyrillic.woff2" crossorigin>\n    <link rel="preload" as="font" type="font/woff2" href="/fonts/playfair-cyrillic.woff2" crossorigin>\n    <link rel="stylesheet" href="/css/style.min.css">`
    );

    // Replace JS reference with minified version and add defer
    html = html.replace(
      '<script src="/js/main.js"></script>',
      '<script src="/js/main.min.js" defer></script>'
    );

    fs.writeFileSync(destPath, html);
    console.log(`  ${relPath}`);
  }

  // Copy static assets (skip css/js since we handle them above)
  for (const asset of STATIC_ASSETS) {
    if (asset === 'css' || asset === 'js') continue; // already handled

    const srcPath = path.join(__dirname, asset);
    const destPath = path.join(DIST_DIR, asset);

    if (!fs.existsSync(srcPath)) {
      console.warn(`  Warning: ${asset} not found, skipping`);
      continue;
    }

    const stat = fs.statSync(srcPath);
    if (stat.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
    console.log(`  Copied: ${asset}`);
  }

  console.log(`\nBuild complete! Output: ${DIST_DIR}`);
  console.log(`Total pages: ${htmlFiles.length}`);
}

build();
