const fs = require('fs');
const path = require('path');

const conflictingFiles = ['package-lock.json', 'yarn.lock', '.yarn.lock'];
const requiredFile = 'pnpm-lock.yaml';

console.log('🔍 Checking lock file configuration...\n');

let hasConflicts = false;
let hasPnpmLock = false;

// Check for conflicting lock files
conflictingFiles.forEach(file => {
  if (fs.existsSync(file)) {
    console.log(`❌ Found conflicting lock file: ${file}`);
    hasConflicts = true;
  }
});

// Check for required pnpm lock file
if (fs.existsSync(requiredFile)) {
  console.log(`✅ Found required lock file: ${requiredFile}`);
  hasPnpmLock = true;
} else {
  console.log(`❌ Missing required lock file: ${requiredFile}`);
}

if (hasConflicts) {
  console.log('\n🚨 CONFLICT DETECTED!');
  console.log('This repository uses pnpm for package management.');
  console.log('Please remove conflicting lock files:');
  console.log('  pnpm run clean:lockfiles');
  console.log('  pnpm install');
  process.exit(1);
}

if (!hasPnpmLock) {
  console.log('\n⚠️  Missing pnpm lock file!');
  console.log('Please run: pnpm install');
  process.exit(1);
}

console.log('\n✅ Lock file configuration is correct!');
console.log('Using pnpm as the package manager. 🚀');
