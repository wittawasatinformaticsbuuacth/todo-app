# 🚀 GitHub Actions - CI Pipeline

## 📌 Overview

GitHub Actions เป็นระบบ **Continuous Integration (CI)** ที่ทำงานอัตโนมัติเพื่อ:
- ✅ ตรวจสอบโค้ด (Lint)
- ✅ รัน Unit Tests
- ✅ รัน E2E Tests
- ✅ Build project

ทุกครั้งที่มีการ push หรือสร้าง Pull Request ไปยัง `main` หรือ `develop` branch

---

## 📂 Workflow Configuration

**ไฟล์:** [.github/workflows/ci.yml](.github/workflows/ci.yml)

```yaml
name: CI Pipeline

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main, develop]
```

### เงื่อนไขการทำงาน:
- 📤 **Push** เข้า `main` หรือ `develop`
- 🔀 **Pull Request** ไปยัง `main` หรือ `develop`

---

## 🔄 CI Pipeline Workflow

### Jobs Configuration:
```yaml
jobs:
  build:
    runs-on: ubuntu-latest
    timeout-minutes: 10
    strategy:
      matrix:
        node-version: [18.x]
```

- **Environment:** Ubuntu latest
- **Timeout:** 10 นาที
- **Node.js Version:** 18.x

---

## 📋 Pipeline Steps

### 1️⃣ Checkout Code
```yaml
- name: Checkout code
  uses: actions/checkout@v3
```
- ดึงโค้ดจาก Git repository

### 2️⃣ Setup Node.js
```yaml
- name: Setup Node.js
  uses: actions/setup-node@v3
  with:
    node-version: ${{ matrix.node-version }}
    cache: 'npm'
```
- ติดตั้ง Node.js v18
- Cache npm packages สำหรับความเร็ว

### 3️⃣ Install Dependencies
```yaml
- name: Install dependencies
  run: npm ci
```
- `npm ci` = clean install (ตรวจสอบ lock file)

### 4️⃣ Run Linter
```yaml
- name: Run linter
  run: npm run lint
```
- ตรวจสอบ code style
- ตรวจจับ syntax errors

### 5️⃣ Run Tests
```yaml
- name: Run tests
  run: npm test
```
- รัน Unit Tests (Jest)
- ทดสอบ unit tests + integration tests

### 6️⃣ Build
```yaml
- name: Build
  run: npm run build
```
- Build project (MINIFY, BUNDLE, etc.)

### 7️⃣ Success Message
```yaml
- name: ✅ All checks passed!
  run: echo "Pipeline completed successfully"
```
- แสดงสถานะสำเร็จ

---

## 💡 GitHub Flow with CI

```
┌─────────────────────────────────────────────────┐
│ 1. Create Feature Branch                        │
│    git checkout -b feature/new-feature          │
└─────────────────────────────────────────────────┘
            ↓
┌─────────────────────────────────────────────────┐
│ 2. Develop & Test Locally                       │
│    npm run lint                                 │
│    npm test                                     │
│    npm run test:e2e                             │
└─────────────────────────────────────────────────┘
            ↓
┌─────────────────────────────────────────────────┐
│ 3. Push to GitHub                               │
│    git push origin feature/new-feature          │
└─────────────────────────────────────────────────┘
            ↓
┌─────────────────────────────────────────────────┐
│ 4. Create Pull Request                          │
│    (On GitHub UI)                               │
└─────────────────────────────────────────────────┘
            ↓
┌─────────────────────────────────────────────────┐
│ 5. CI Pipeline Runs Automatically 🤖             │
│    ✅ Lint Check                                │
│    ✅ Unit Tests                                │
│    ✅ Build Check                               │
│                                                 │
│    ❌ If any step fails → PR blocked            │
│    ✅ If all pass → PR ready to merge           │
└─────────────────────────────────────────────────┘
            ↓
┌─────────────────────────────────────────────────┐
│ 6. Code Review & Merge PR                       │
│    (After approval)                             │
└─────────────────────────────────────────────────┘
            ↓
┌─────────────────────────────────────────────────┐
│ 7. Delete Feature Branch                        │
│    git branch -d feature/new-feature            │
└─────────────────────────────────────────────────┘
```

---

## 🛠️ Local Development Commands

### Before Pushing to GitHub:

```bash
# 1. Install dependencies
npm install

# 2. Run linter
npm run lint

# 3. Fix linting issues
npm run lint:fix

# 4. Run unit tests
npm test

# 5. Run E2E tests
npm run test:e2e

# 6. Build
npm run build

# 7. Start dev server
npm run dev
```

---

## ✅ Troubleshooting

### ❌ CI Pipeline Failed

**Check:**
1. View detailed logs on GitHub Actions tab
2. Run commands locally:
   ```bash
   npm run lint   # Check for lint errors
   npm test       # Run tests
   npm run build  # Check build errors
   ```

### ❌ Lint Errors
```bash
npm run lint:fix  # Auto-fix style issues
```

### ❌ Test Failures
```bash
npm test -- --watch   # Debug tests in watch mode
npm test -- --coverage # Check coverage
```

---

## 📊 GitHub Actions Status

### Check CI Status:
1. ➡️ Go to **GitHub Repository**
2. ➡️ Click **"Actions"** tab
3. ➡️ View running/completed workflows

### PR Status:
1. ➡️ Open your **Pull Request**
2. ➡️ Scroll to **"Checks"** section
3. ➡️ See all CI jobs status

---

## 🔑 Key Concepts

| Concept | Description |
|---------|-------------|
| **Workflow** | Automated process defined in YAML |
| **Job** | Set of steps that run in sequence |
| **Step** | Individual task (run command, use action) |
| **Action** | Reusable component (checkout, setup-node) |
| **Branch** | Trigger condition (main, develop) |
| **Artifact** | Output files from workflow |

---

## 📚 Useful Links

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [GitHub Actions Best Practices](https://docs.github.com/en/actions/guides)
- [Node.js Setup Action](https://github.com/actions/setup-node)

---

## 🎯 Summary

✅ **CI Pipeline ช่วย:**
- ตรวจจับ bugs ก่อน merge
- ยืนยันว่าโค้ดใช้งานได้
- รักษา code quality
- ลดปัญหาใน production

🚀 **ทำให้ development ปลอดภัยและมีประสิทธิภาพมากขึ้น!**
