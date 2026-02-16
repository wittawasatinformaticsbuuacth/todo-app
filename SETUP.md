# 🚀 ขั้นตอนการใช้งาน wk10-demo/

## 📦 โครงสร้างไฟล์

```
wk10-demo/
├── public/
│   ├── index.html              ← Web page
│   ├── style.css               ← Frontend styling
│   └── app.js                  ← Frontend JavaScript
├── tests/
│   └── e2e/
│       └── todo.spec.js        ← E2E Tests (Playwright)
├── __tests__/
│   └── todo.test.js            ← API Tests (Supertest)
├── .github/
│   └── workflows/
│       └── ci.yml              ← GitHub Actions Pipeline
├── .env.example                ← Environment variables template
├── .eslintrc.json              ← Code style rules
├── .gitignore                  ← Git ignore list
├── jest.config.js              ← Jest test configuration
├── playwright.config.js        ← Playwright configuration
├── package.json                ← Dependencies & scripts
├── index.js                    ← Main application
└── README.md                   ← Project documentation
```

---

## ✅ ขั้นตอนที่ 1: Copy ไปสร้าง GitHub Repository

### 1.1 สร้างชื่อ todo-app บน GitHub

```bash
# 1. ไปที่ https://github.com/new
# 2. Repository name: todo-app
# 3. Add README → No (เพราะจะใช้ของเรา)
# 4. Add .gitignore → No (เพราะมีแล้ว)
# 5. Create repository
```

### 1.2 Clone และ Copy Files

```bash
# Clone repository เปล่า
git clone https://github.com/YOUR_USERNAME/todo-app.git
cd todo-app

# Copy all files จากโฟลเดอร์ wk10-demo/ เข้ามา
# (ใช้ File Explorer หรือ cp command)
```

---

## ✅ ขั้นตอนที่ 2: Setup Local

### 2.1 Install Dependencies

```bash
npm install
```

**Expected Output:**

```
up to date, audited 200 packages in 5s
found 0 vulnerabilities
```

### 2.2 Create .env File

```bash
cp .env.example .env
```

### 2.3 Verify Project

```bash
# Check folder structure
ls -la

# Should see:
# .env.example
# .eslintrc.json
# .gitignore
# .github/
# __tests__/
# index.js
# jest.config.js
# package.json
# README.md
```

---

## ✅ ขั้นตอนที่ 3: Local Testing

### 3.1 Run Lint

```bash
npm run lint
```

**Expected:** ✅ No errors

### 3.2 Run Unit Tests (Jest + Supertest)

```bash
npm test
```

**Expected Output:**

```
PASS  __tests__/todo.test.js
  Todo API - Endpoints
    GET /api/todos
      ✓ should return all todos
      ✓ should return todos with correct structure
    GET /api/todos/:id
      ✓ should return single todo by id
      ✓ should return 404 for non-existent todo
    POST /api/todos
      ✓ should create new todo
      ✓ should return 400 if title is missing
    PUT /api/todos/:id
      ✓ should update todo completion status
      ✓ should update todo title
      ✓ should return 404 for non-existent todo
    DELETE /api/todos/:id
      ✓ should delete todo
      ✓ should return 404 for non-existent todo
    GET /health
      ✓ should return health status

Test Suites: 1 passed, 1 total
Tests:       13 passed, 13 total
Time:        2.456s
```

### 3.3 Run E2E Tests (Playwright)

**First time - Install browsers:**

```bash
npx playwright install
```

**Terminal 1 - Start backend:**

```bash
npm run dev
```

**Terminal 2 - Run tests:**

```bash
npm run test:e2e
```

**Expected Output:**

```
✓ should display home page
✓ should load todos from API
✓ should display API status
✓ should add new todo
✓ should add todo with Enter key
✓ should mark todo as completed
✓ should delete todo
✓ should show error when adding empty todo
✓ should display todo count
✓ should have API endpoints info section
✓ should be responsive on mobile

11 passed (5.2s)
```

**View E2E Report:**

```bash
npx playwright show-report
```

### 3.4 Run Development Server

```bash
npm run dev
```

**Expected Output:**

```
🚀 Server running on http://localhost:3000
📝 API: http://localhost:3000/api/todos
❤️  Health: http://localhost:3000/health
```

### 3.4 Test API in Another Terminal

```bash
# Test GET
curl http://localhost:3000/api/todos
# Output: [{"id":1,"title":"Learn Git","completed":false}, ...]

# Test Health Check
curl http://localhost:3000/health
# Output: {"status":"ok","timestamp":"..."}
```

**ให้ Ctrl+C ปิด server**

---

## ✅ ขั้นตอนที่ 4: Push ขึ้น GitHub

```bash
git add .
git commit -m "chore: Initial todo-app with CI/CD setup"
git push origin main
```

---

## ✅ ขั้นตอนที่ 5: Setup GitHub Actions

### 5.1 Verify .github/workflows/ci.yml

ตรวจสอบว่า file `.github/workflows/ci.yml` มีอยู่ใน repository:

```bash
ls -la .github/workflows/
# Should show: ci.yml
```

### 5.2 ดู Actions บน GitHub

```
1. ไปที่ GitHub repository
2. Actions tab
3. จะเห็น CI Pipeline running แล้ว
```

---

## 📝 Workflow: Feature Development

### Step 1: สร้าง Feature Branch

```bash
git checkout -b feature/update-todo

# ตรวจสอบ branch
git branch
# Output: * feature/update-todo
```

### Step 2: ทำการเปลี่ยนแปลง

เปิด index.js แล้วแก้ไขฟังก์ชั่นอะไรสักอย่าง

### Step 3: ทดสอบ Local

```bash
# Lint
npm run lint

# Test
npm test

# Dev Server
npm run dev
```

### Step 4: Commit & Push

```bash
git add .
git commit -m "feat: update todo feature"
git push origin feature/update-todo
```

### Step 5: Create Pull Request

```
1. ไปที่ GitHub
2. หา "Compare & pull request" button
3. กรอก PR description
4. Create pull request
```

### Step 6: CI Pipeline Runs

```
GitHub Actions จะ:
✓ Checkout code
✓ Setup Node.js
✓ Install dependencies
✓ Run linter (npm run lint)
✓ Run tests (npm test)
✓ Build (npm run build)

ผลลัพธ์: ✅ All checks passed
```

### Step 7: Merge PR

```
1. รอให้ CI ✅ pass
2. Approve PR
3. Merge pull request
4. Delete branch
```

---

## 🐛 Troubleshooting

### npm install ล้มเหลว

```bash
# Clear npm cache
npm cache clean --force

# Try again
npm install
```

### Port 3000 ถูกใช้อยู่

```bash
# Change PORT in .env
PORT=3001

npm run dev
```

### Lint Error: quotes

```bash
# Fix automatically
npm run lint:fix
```

### Test ล้มเหลว

```bash
# Run with verbose
npm test -- --verbose

# Check __tests__/todo.test.js
```

### GitHub Actions ล้มเหลว

```bash
1. ไปที่ Actions tab
2. คลิก failed workflow
3. ดู step ไหนผิด
4. ดู error message
5. แก้ไขใน local + push ใหม่
```

---

## 📚 Commands Reference

| Command            | Purpose               |
| ------------------ | --------------------- |
| `npm install`      | Install dependencies  |
| `npm start`        | Run production server |
| `npm run dev`      | Run with auto-reload  |
| `npm run lint`     | Check code style      |
| `npm run lint:fix` | Fix code style auto   |
| `npm test`         | Run tests             |
| `npm run build`    | Build for production  |

---

## 🎯 Learning Checklist

### Phase 1: Setup & Environment

- [ ] Fork/Clone repository
- [ ] Install dependencies (npm install)
- [ ] Create .env file from .env.example
- [ ] Verify project structure

### Phase 2: Code Quality & Testing

- [ ] Run lint (npm run lint)
- [ ] Fix lint errors (npm run lint:fix)
- [ ] Run API tests with Supertest (npm test)
- [ ] Run E2E tests with Playwright (npm run test:e2e)
- [ ] Understand test outputs and coverage

### Phase 3: Local Development

- [ ] Run dev server (npm run dev)
- [ ] Test API endpoints manually (curl or Postman)
- [ ] Test frontend UI (add, edit, delete todos)
- [ ] Test mobile responsiveness
- [ ] Check console for errors

### Phase 4: Git & CI/CD Workflow

- [ ] Create feature branch (git checkout -b feature/...)
- [ ] Make code changes
- [ ] Run tests locally before push
- [ ] Commit changes (git commit -m "...")
- [ ] Push to GitHub (git push)
- [ ] Create Pull Request on GitHub
- [ ] Wait for GitHub Actions CI Pipeline
- [ ] Review CI/CD results (lint, test, build)
- [ ] Merge PR to main branch
- [ ] Verify deployment (if configured)

### Phase 5: Understanding Components

- [ ] Understand Express API architecture
- [ ] Understand Supertest API testing
- [ ] Understand Playwright E2E testing
- [ ] Understand GitHub Actions workflow
- [ ] Learn about 3-layer testing (Unit + API + E2E)

---

## ✨ What You've Learned

✅ **Git & GitHub Workflow**

- Feature branch development
- Atomic commits with meaningful messages
- Pull Requests for code review
- GitHub repository management

✅ **Build Automation & Code Quality**

- npm scripts for development tasks
- ESLint for code style enforcement
- Prettier for code formatting
- Automated linting in CI/CD pipeline

✅ **Comprehensive Testing Strategy**

- **Unit Tests:** Data structure validation
- **API Tests (Supertest):** HTTP endpoint testing with 13 test cases
  - GET /api/todos (array response)
  - GET /api/todos/:id (single item lookup)
  - POST /api/todos (create with validation)
  - PUT /api/todos/:id (update with status check)
  - DELETE /api/todos/:id (remove items)
- **E2E Tests (Playwright):** User workflow automation with 11 test scenarios
  - Add todo functionality
  - Mark complete/incomplete
  - Delete todos
  - Mobile responsiveness
  - Error handling

✅ **CI/CD Pipeline**

- GitHub Actions workflow automation
- Trigger on push and pull requests
- Multi-step validation (lint → test → build)
- Prevents bad code from merging
- Ensures code quality standards

✅ **Full Development Cycle**

- Local testing before commits
- Automated code review via CI
- Peer review via Pull Requests
- Continuous deployment readiness
- Production-quality code practices

✅ **Real-World DevOps Skills**

- API integration testing
- Browser automation testing
- Automated workflow orchestration
- Test-driven development
- Code quality gates

---

**Happy Learning! 🎉**
