#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

const THEME_DIR = path.resolve(__dirname, '../wordpress/wp-content/themes/concrete-child');
const SRC_TEMPLATES = path.resolve(__dirname, 'src', 'templates');
const SRC_PARTS = path.resolve(__dirname, 'src', 'parts');
const BUILD_SCRIPT = path.join(__dirname, 'build-theme-files.cjs');
const WATCH_PARTS_ONLY = process.argv.includes('--parts-only') || process.env.WATCH_PARTS_ONLY === '1';

let buildRunning = false;
let buildQueued = false;
let timer = null;

function runBuild() {
  if (buildRunning) {
    buildQueued = true;
    return;
  }

  buildRunning = true;
  console.log('\n[watch-theme-files] Building templates...');

  const buildArgs = [BUILD_SCRIPT];
  if (WATCH_PARTS_ONLY) buildArgs.push('--only', 'parts');

  const child = spawn(process.execPath, buildArgs, {
    cwd: THEME_DIR,
    stdio: 'inherit',
  });

  child.on('close', (code) => {
    buildRunning = false;

    if (code === 0) {
      console.log('[watch-theme-files] Build completed.');
    } else {
      console.error('[watch-theme-files] Build failed with exit code:', code);
    }

    if (buildQueued) {
      buildQueued = false;
      runBuild();
    }
  });
}

function scheduleBuild() {
  if (timer) clearTimeout(timer);
  timer = setTimeout(runBuild, 250);
}

function watchDir(dirPath) {
  if (!fs.existsSync(dirPath)) return;

  fs.watch(dirPath, { recursive: true }, (eventType, filename) => {
    if (!filename || !filename.endsWith('.html')) return;
    console.log('[watch-theme-files] Change detected:', path.join(path.basename(dirPath), filename));
    scheduleBuild();
  });
}

console.log('[watch-theme-files] Watching HTML source files...');
if (WATCH_PARTS_ONLY) {
  console.log('[watch-theme-files] Mode: parts-only');
  console.log('[watch-theme-files] -', SRC_PARTS);
  watchDir(SRC_PARTS);
} else {
  console.log('[watch-theme-files] Mode: full (templates + parts)');
  console.log('[watch-theme-files] -', SRC_TEMPLATES);
  console.log('[watch-theme-files] -', SRC_PARTS);
  watchDir(SRC_TEMPLATES);
  watchDir(SRC_PARTS);
}

runBuild();
