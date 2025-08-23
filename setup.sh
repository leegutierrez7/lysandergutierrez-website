#!/bin/bash

# Portfolio Website Setup Script
# This script helps set up the development environment

echo "🚀 Setting up Lysander Gutierrez Portfolio Website..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js version 18+ is required. Current version: $(node -v)"
    exit 1
fi

echo "✅ Node.js $(node -v) detected"

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Copy environment variables template
if [ ! -f .env.local ]; then
    cp .env.example .env.local
    echo "📝 Created .env.local from template"
    echo "⚠️  Please update .env.local with your actual values"
else
    echo "📝 .env.local already exists"
fi

# Setup Husky (Git hooks)
echo "🔧 Setting up Git hooks..."
npx husky install

# Create husky pre-commit hook
npx husky add .husky/pre-commit "npx lint-staged"

# Run initial tests to ensure everything works
echo "🧪 Running initial tests..."
npm run test -- --passWithNoTests

# Check TypeScript compilation
echo "🔍 Checking TypeScript..."
npm run type-check

# Run linting
echo "🔍 Running linter..."
npm run lint

echo ""
echo "🎉 Setup complete!"
echo ""
echo "Next steps:"
echo "1. Update .env.local with your environment variables"
echo "2. Run 'npm run dev' to start the development server"
echo "3. Open http://localhost:3000 in your browser"
echo ""
echo "Available scripts:"
echo "  npm run dev          - Start development server"
echo "  npm run build        - Build for production"
echo "  npm run test         - Run unit tests"
echo "  npm run test:e2e     - Run end-to-end tests"
echo "  npm run lighthouse   - Run performance audits"
echo "  npm run analyze      - Analyze bundle size"
echo ""
echo "Happy coding! 🚀"
