# 🔧 Quick Commands Reference

## Setup

```bash
npm install              # Install all dependencies
cp .env.example .env     # Create .env from template
```

## Development

```bash
npm run dev              # Start dev server with auto-reload
npm start                # Start production server
```

## Quality Checks

```bash
npm run lint             # Check code style (ESLint)
npm run lint:fix         # Fix code style automatically

# Unit Tests (Jest + Supertest)
npm test                 # Run all API tests (13 tests)
npm test -- --watch     # Run tests in watch mode
npm test -- --coverage  # Run with coverage report

# E2E Tests (Playwright)
npx playwright install   # Install browsers (first time only)
npm run test:e2e         # Run all E2E tests (11 tests)
npm run test:e2e:ui      # Run with interactive UI
npm run test:e2e:headed  # Run with browser visible
npx playwright show-report # View test report
```

## Build & Production

```bash
npm run build            # Build for production
```

## API Testing (curl)

```bash
# Get all todos
curl http://localhost:3000/api/todos

# Get single todo
curl http://localhost:3000/api/todos/1

# Create todo
curl -X POST http://localhost:3000/api/todos \
  -H "Content-Type: application/json" \
  -d '{"title":"New Todo"}'

# Update todo
curl -X PUT http://localhost:3000/api/todos/1 \
  -H "Content-Type: application/json" \
  -d '{"completed":true}'

# Delete todo
curl -X DELETE http://localhost:3000/api/todos/1

# Health check
curl http://localhost:3000/health
```

## Git Workflow

```bash
# Create feature branch
git checkout -b feature/my-feature

# Check current branch
git branch

# View changes
git diff

# Add changes
git add .

# Commit
git commit -m "feat: describe your feature"

# Push to GitHub
git push origin feature/my-feature

# View commit history
git log --oneline -5
```

## GitHub Flow

```bash
1. Create feature branch
   git checkout -b feature/...

2. Test locally
   npm run lint
   npm test
   npm run dev

3. Commit & push
   git add .
   git commit -m "feat: ..."
   git push origin feature/...

4. Create Pull Request (on GitHub)

5. Wait for CI Pipeline ✅

6. Merge PR (on GitHub)

7. Delete feature branch
   git branch -d feature/...
   git push origin --delete feature/...

8. Continue to main
   git checkout main
   git pull origin main
```

## Troubleshooting

```bash
# Port already in use
# Edit .env and change: PORT=3001

# Clear npm cache
npm cache clean --force

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install

# Fix lint errors
npm run lint:fix

# Run tests verbose
npm test -- --verbose
```

---

> **Tip:** อ่าน README.md สำหรับ full documentation
