#!/bin/bash

# Set your repository (Change this to your GitHub repo)
REPO="adham-2002/E-Commerce-Platform"

# Check if GitHub CLI is installed
if ! command -v gh &> /dev/null; then
    echo "❌ GitHub CLI (gh) is not installed. Please install it first."
    exit 1
fi

# Check if secrets.txt exists
if [ ! -f "secrets.txt" ]; then
    echo "❌ secrets.txt file not found!"
    exit 1
fi

# Authenticate if not logged in (Optional)
gh auth status > /dev/null 2>&1
if [ $? -ne 0 ]; then
    echo "🔑 Logging into GitHub CLI..."
    gh auth login
fi

# Read secrets from the file and add them to GitHub
echo "🚀 Adding secrets from secrets.txt to $REPO..."
while IFS=: read -r key value; do
    # Remove leading/trailing whitespace (if any)
    key=$(echo "$key" | xargs)
    value=$(echo "$value" | xargs)

    # Skip empty lines or invalid entries
    if [[ -z "$key" || -z "$value" ]]; then
        continue
    fi

    gh secret set "$key" --body "$value" --repo "$REPO"
    echo "✅ Secret $key added successfully!"
done < secrets.txt

# Verify added secrets
echo "🔍 Listing secrets in $REPO..."
gh secret list --repo "$REPO" | cat 
