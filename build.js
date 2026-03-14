const fs = require('fs');
const path = require('path');

const SRC_DIR = path.join(__dirname, 'src');
const DIST_DIR = path.join(__dirname, 'dist');
const COMPONENTS_DIR = path.join(__dirname, 'components');

// Static directories/files to copy to dist
const STATIC_ASSETS = ['css', 'js', 'img', 'robots.txt', 'sitemap.xml'];

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

  // Process HTML templates
  const htmlFiles = findHtmlFiles(SRC_DIR);
  console.log(`Processing ${htmlFiles.length} HTML files...`);

  for (const relPath of htmlFiles) {
    const srcPath = path.join(SRC_DIR, relPath);
    const destPath = path.join(DIST_DIR, relPath);

    fs.mkdirSync(path.dirname(destPath), { recursive: true });

    const template = fs.readFileSync(srcPath, 'utf-8');
    const html = processTemplate(template, components);
    fs.writeFileSync(destPath, html);

    console.log(`  ${relPath}`);
  }

  // Copy static assets
  for (const asset of STATIC_ASSETS) {
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
