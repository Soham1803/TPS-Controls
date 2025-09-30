# Pre-commit Hook Example
# 
# To set up a git hook that automatically checks for lock file conflicts:
# 
# 1. Copy this file to .git/hooks/pre-commit
# 2. Make it executable: chmod +x .git/hooks/pre-commit
# 3. Now git will check lock files before each commit

#!/bin/sh

echo "🔍 Checking lock file configuration before commit..."

# Run the lock file checker
pnpm run check:lockfiles

if [ $? -ne 0 ]; then
    echo ""
    echo "❌ Commit aborted due to lock file conflicts!"
    echo "Please fix the lock file issues and try again."
    exit 1
fi

echo "✅ Pre-commit lock file check passed!"
