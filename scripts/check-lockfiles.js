import fs from 'fs';
import path from 'path';

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
  console.log(`⚠️  Missing lock file: ${requiredFile}`);
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
  console.log('\n💡 Missing pnpm lock file.');
  console.log('This is normal for initial setup. Run:');
  console.log('  pnpm install');
  console.log('');
  console.log('After running pnpm install, commit the generated pnpm-lock.yaml file.');
  // Don't exit with error for missing lockfile - just inform
} else {
  console.log('\n✅ Lock file configuration is correct!');
  console.log('Using pnpm as the package manager. 🚀');
}
