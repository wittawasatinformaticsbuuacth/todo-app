# 🎭 E2E Tests with Playwright

End-to-End testing สำหรับ Frontend + Backend integration

---

## 📦 Setup

### 1. Install Playwright

```bash
npm install
# หรือ specific
npm install --save-dev @playwright/test
```

### 2. Install Browsers

```bash
npx playwright install
```

---

## ✅ Test Suites

### 10 Test Cases:

1. ✅ **Display Home Page** - หน้าโหลดถูกต้อง
2. ✅ **Load Todos from API** - API เชื่อมต่อได้
3. ✅ **Display API Status** - แสดงสถานะ API
4. ✅ **Add New Todo** - สามารถเพิ่ม todo
5. ✅ **Add Todo with Enter Key** - ใช้ keyboard ได้
6. ✅ **Mark Todo Completed** - สามารถติดเครื่องหมายเสร็จ
7. ✅ **Delete Todo** - สามารถลบ todo
8. ✅ **Error on Empty Input** - แสดง error ถูก
9. ✅ **Display Todo Count** - นับจำนวน todo ถูก
10. ✅ **Responsive on Mobile** - ใช้งานได้บน mobile

---

## 🚀 Run Tests

### Start Server First

```bash
npm run dev
```

### Backend Window ต่างหาก - Run Tests:

#### 1. Run All Tests (Headless)

```bash
npm run test:e2e
```

**Output:**

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

#### 2. Run Tests with UI (Interactive)

```bash
npm run test:e2e:ui
```

**Opens browser UI** - ดูการ test แบบ interactive

#### 3. Run Tests Headed (See Browser)

```bash
npm run test:e2e:headed
```

**Browser จะโชว์** สิ่งที่ test ทำ

#### 4. Run Single Test

```bash
npx playwright test tests/e2e/todo.spec.js -g "should add new todo"
```

#### 5. Run in Debug Mode

```bash
npx playwright test --debug
```

Opens **Playwright Inspector** - step-by-step debugging

---

## 📊 View Test Results

### HTML Report

```bash
npx playwright show-report
```

Opens test report in browser

---

## 🔍 Test Details

### Test Flow Example: "Add New Todo"

```javascript
test('Should add new todo', async ({ page }) => {
  // 1. Navigate to page
  await page.goto('/');

  // 2. Find input element
  const todoInput = page.locator('#todoInput');

  // 3. Type text
  await todoInput.fill('Learn Playwright');

  // 4. Click add button
  await page.locator('#addBtn').click();

  // 5. Wait for UI update
  await page.waitForTimeout(500);

  // 6. Assert - new todo appears
  const todos = page.locator('.todo-item');
  expect(await todos.count()).toBeGreaterThan(0);
});
```

---

## 🌐 Multi-Browser Testing

Playwright tests run on:

- ✅ Chromium (Chrome)
- ✅ Firefox
- ✅ WebKit (Safari)

**Mobile browsers:**

- ✅ Pixel 5 (Android)
- ✅ iPhone 12 (iOS)

---

## 📱 Example: Mobile Test

```javascript
test('should be responsive on mobile', async ({ browser }) => {
  // Create mobile context
  const context = await browser.newContext({
    viewport: { width: 375, height: 667 },
  });

  const page = await context.newPage();
  await page.goto('/');

  // Test on mobile viewport
  await expect(page.locator('h1')).toBeVisible();

  await context.close();
});
```

---

## 🛠️ Debugging

### 1. Add Breakpoint

```javascript
await page.pause(); // Opens inspector
```

### 2. Screenshot

```javascript
await page.screenshot({ path: 'screenshot.png' });
```

### 3. Trace

```javascript
// playwright.config.js
trace: 'on-first-retry'

// Then view:
npx playwright show-trace trace.zip
```

### 4. Log

```javascript
console.log(await page.locator('#todoCount').textContent());
```

---

## ⚙️ Configuration

### playwright.config.js

```javascript
// Base URL
baseURL: 'http://localhost:3000';

// Reporters
reporter: 'html';

// Retries
retries: 2;

// Timeout
timeout: 30000;

// Run tests in parallel
fullyParallel: true;
```

---

## 🌊 CI/CD Integration

### GitHub Actions

```yaml
- name: Run E2E tests
  run: |
    npm run dev &
    npm run test:e2e
```

Update `.github/workflows/ci.yml` to include:

```yaml
- name: Run E2E Tests
  if: github.ref == 'refs/heads/main'
  run: npm run test:e2e
```

---

## 📚 Selectors Used

| Element       | Selector         | Purpose           |
| ------------- | ---------------- | ----------------- |
| Input         | `#todoInput`     | Enter todo text   |
| Add Button    | `#addBtn`        | Add new todo      |
| Todo Items    | `.todo-item`     | List of todos     |
| Checkbox      | `.todo-checkbox` | Mark complete     |
| Delete Button | `.delete-btn`    | Delete todo       |
| API Status    | `#apiStatus`     | Connection status |
| Todo Count    | `#todoCount`     | Number display    |

---

## ✨ Best Practices

✅ **Wait for API**

```javascript
await page.waitForLoadState('networkidle');
```

✅ **Use ID/Class selectors**

```javascript
page.locator('#todoInput'); // Not by text
```

✅ **Test user interactions**

```javascript
await input.fill('text');
await button.click();
```

✅ **Assert expectations**

```javascript
expect(element).toBeVisible();
expect(text).toContain('error');
```

---

## 🚀 Complete Test Workflow

```
npm run dev
  ↓ (Backend running)
npm run test:e2e
  ↓ (Tests connect to frontend)
Tests load page
  ↓
Test interacts (click, type)
  ↓
Backend API responds
  ↓
Frontend updates
  ↓
Test asserts changes
  ↓
✅ Test passes or ❌ fails
```

---

## 📝 Common Commands

```bash
# Run all E2E tests
npm run test:e2e

# Run with UI
npm run test:e2e:ui

# Run headed (see browser)
npm run test:e2e:headed

# Debug single test
npx playwright test tests/e2e/todo.spec.js --debug

# Show report
npx playwright show-report

# Install browsers
npx playwright install

# Update Playwright
npm install --save-dev @playwright/test
```

---

## 🎯 Next Steps

1. ✅ Install dependencies: `npm install`
2. ✅ Install browsers: `npx playwright install`
3. ✅ Start server: `npm run dev`
4. ✅ Run tests: `npm run test:e2e`
5. ✅ View report: `npx playwright show-report`

---

**Happy Testing! 🎭**
