# 📚 wk10-demo Comprehension Test (QA)

ทดสอบความเข้าใจเกี่ยวกับ wk10-demo project พร้อมคำตอบ

---

## 🔵 Part 1: Backend Basics (Express & Node.js)

### Q1.1: Express คืออะไร?

**Question:** Express คือโมดูลของ Node.js ที่ใช้ทำอะไร?

**Related:** [Q5.1 (GitHub Actions)](#q51-github-actions), [Q7.1 (Workflow)](#q71-local-development-workflow)

**Expected Answer:**

- สร้าง web server
- สร้าง REST API
- จัดการ routing
- จัดการ middleware

**Full Answer:**
Express คือ web framework สำหรับ Node.js ที่ใช้สร้าง server และ API ได้อย่างสะดวก มันจัดการ HTTP requests/responses และ routing ระหว่าง clients กับ server

---

### Q1.2: Port 3000 ทำให้ทำไม?

**Question:** ทำไมต้องใช้ port 3000 ในไฟล์ `index.js`?

**Expected Answer:**

- Port 3000 เป็นพอร์ตที่ไม่ใช้งาน (ปกติ)
- ใช้สำหรับ dev server
- สามารถกำหนดค่าผ่าน environment variables

**Full Answer:**

```javascript
const PORT = process.env.PORT || 3000;
```

Port 3000 คือพอร์ต default ที่ใช้ในขั้น development เพื่อให้ server accessible ที่ `http://localhost:3000` หากต้องการใช้พอร์ตอื่น สามารถกำหนดค่าผ่าน environment variables ได้

---

### Q1.3: Middleware `express.json()` ทำอะไร?

**Question:** `app.use(express.json())` บรรทัดนี้ทำให้ express ทำอะไร?

**Expected Answer:**

- Parse JSON body จาก request
- Convert string ตัวอักษร เป็น object
- จำเป็นสำหรับ POST/PUT requests ที่มี body

**Full Answer:**

```javascript
app.use(express.json());
```

บรรทัดนี้บอกให้ Express parse incoming requests ที่มี JSON content-type ให้เป็น JavaScript objects ในคุณสมบัติ `req.body` โดยไม่มี middleware นี้ Express จะไม่สามารถอ่านข้อมูล JSON ได้

---

### Q1.4: `app.get()` vs `app.post()` ต่างกันยังไง?

**Question:** เหตุใดจึงใช้ `app.get()` สำหรับ fetch todos และ `app.post()` สำหรับสร้าง?

**Related:** [Q2.2 (fetch API)](#q22-fetch-api), [Q3.1 (Supertest)](#q31-supertest-คืออะไร), [Q8.3 (REST principles)](#q83-restful-api-principles)

**Expected Answer:**

- GET: ดึงข้อมูล (Safe, no side effects)
- POST: สร้างข้อมูลใหม่ (Creates data)
- REST convention

**Full Answer:**

```javascript
// GET - ดึง data
app.get('/api/todos', (req, res) => {
  res.json(todos);
});

// POST - สร้าง data ใหม่
app.post('/api/todos', (req, res) => {
  const newTodo = { id: Date.now(), title: req.body.title };
  todos.push(newTodo);
  res.status(201).json(newTodo);
});
```

GET ใช้สำหรับดึงข้อมูล (idempotent - ไม่เปลี่ยนสถานะเซิร์ฟเวอร์)
POST ใช้สำหรับสร้างข้อมูลใหม่ (non-idempotent - เปลี่ยนสถานะเซิร์ฟเวอร์)
นี่เรียกว่า REST convention

---

### Q1.5: ID ใน todos ถูกสร้างอย่างไร?

**Question:** ในโค้ด `index.js` ตัวแปร `id` ถูกสร้างอย่างไร?

**Related:** [Q8.5 (Performance)](#q85-performance-คิดยังไง) - scalability ของ ID generation

**Expected Answer:**

```javascript
id: Math.max(...todos.map((t) => t.id), 0) + 1;
```

- หาค่า id สูงสุดในอาร์เรย์
- บวก 1 เข้าไป
- ทำให้ id unique

---

### Q1.6: Error Handling ที่บรรทัดนี้ทำอะไร?

**Question:** `if (!todo) return res.status(404).json({error:'Todo not found'})` ทำให้ทำไม?

**Expected Answer:**

- ตรวจสอบว่า todo มีอยู่หรือไม่
- ถ้าไม่มี → ส่ง 404 status code
- ส่ง error message เป็น JSON

**Full Answer:**
404 = Not Found status code ซึ่งใช้บ่งบอกว่า resource ที่ขอไม่มีอยู่ ในการทดสอบด้วย Supertest เราจะ `.expect(404)` เพื่อประเมินว่า error handling ทำงานถูกต้อง

---

## 🔴 Part 2: Frontend (HTML/CSS/JavaScript)

### Q2.1: DOM Elements ในหน้า index.html มีอะไรบ้าง?

**Question:** ระบุ DOM elements สำคัญในหน้า frontend

**Expected Answer:**

```html
<input id="todoInput" />
<!-- input field -->
<button id="addBtn">Add</button>
<!-- add button -->
<div id="todosList"></div>
<!-- list container -->
<div id="apiStatus"></div>
<!-- API status indicator -->
<div id="todoCount"></div>
<!-- todo count display -->
<div id="error"></div>
<!-- error display -->
```

---

### Q2.2: `fetch()` API ทำไมต้องใช้?

**Question:** ในไฟล์ `app.js` เหตุใดจึงใช้ `fetch()` API?

**Related:** [Q1.4 (HTTP Methods)](#q14-appget-vs-apppost-ต่างกันยังไง), [Q3.1 (API Testing)](#q31-supertest-คืออะไร), [Q4.1 (E2E Testing)](#q41-e2e-testing-คืออะไร)

**Expected Answer:**

- ส่ง HTTP requests จาก JavaScript
- ไม่ต้อง refresh page
- ได้ response แบบ asynchronous

**Full Answer:**

```javascript
const response = await fetch(`${API_BASE}/todos`);
const todos = await response.json();
```

`fetch()` ช่วยให้ frontend สามารถติดต่อ backend API โดยไม่ต้อง reload page เป็นการสื่อสาร asynchronous ที่ไม่บล็อก UI

---

### Q2.3: `async/await` ใช้ตรงไหน?

**Question:** ทำไมต้องใช้ `async/await` ในฟังก์ชัน `loadTodos()`?

**Expected Answer:**

- `fetch()` return promise
- ต้องรอให้ response กลับมา
- ถ้าไม่รอ → undefined error

**Full Answer:**

```javascript
async function loadTodos() {
  try {
    const response = await fetch(`${API_BASE}/todos`);
    const todos = await response.json();
    renderTodos(todos);
  } catch (error) {
    showError('Failed to load todos');
  }
}
```

`async/await` ช่วยให้เขียนโค้ด asynchronous แบบ synchronous ทำได้เข้าใจง่าย `await` จะหลีกเลี่ยง callback hell ที่เกิดจากการใช้ `.then()` หลายครั้ง

---

### Q2.4: `renderTodos()` ฟังก์ชันนี้ทำอะไร?

**Question:** ฟังก์ชัน `renderTodos()` ในไฟล์ `app.js` ทำไร?

**Related:** [Q2.1 (DOM Elements)](#q21-dom-elements-ในหน้า-indexhtml-มีอะไรบ้าง), [Q4.5 (E2E Test)](#q45-test-workflow-example) - testing this render

**Expected Answer:**

- แปลง todos array เป็น HTML
- ใส่ HTML ใน DOM
- ถ้าไม่มี todos → แสดง empty state

**Full Answer:**

```javascript
function renderTodos(todos) {
  todosList.innerHTML = todos
    .map(
      (todo) => `
      <div class="todo-item">
        <input type="checkbox" onchange="toggleTodo(${todo.id})">
        <span>${todo.title}</span>
        <button onclick="deleteTodo(${todo.id})">Delete</button>
      </div>
    `
    )
    .join('');
}
```

ฟังก์ชันนี้แปลง JavaScript array เป็น HTML string และใส่ลงใน DOM ทำให้ user เห็นรายการ todos

---

### Q2.5: Content Security - `escapeHtml()` ทำอะไร?

**Question:** ทำไมต้องใช้ `escapeHtml()` ก่อน insert html?

**Related:** [Q8.4 (Security)](#q84-security-concerns) - XSS prevention

**Expected Answer:**

- ป้องกัน XSS attack
- แปลง `<` เป็น `&lt;`
- แปลง `>` เป็ `&gt;`

**Full Answer:**
ถ้า user input มี HTML code เช่น `<img src=x onerror="alert('XSS')">` และเรา do `innerHTML = userInput` มัน จะ execute JavaScript ที่มีความเสี่ยง `escapeHtml()` แปลง HTML characters ให้เป็น entities ป้องกันการ inject

---

### Q2.6: `DOMContentLoaded` event ทำอะไร?

**Question:** เหตุใดจึงใช้ `document.addEventListener('DOMContentLoaded', ...)`?

**Expected Answer:**

- รอให้ HTML load เสร็จก่อน
- ตั้งค่า event listeners เมื่อพร้อม
- หลีกเลี่ยง "cannot read property of undefined"

**Full Answer:**
หากเราพยายาม access DOM elements ก่อน HTML load เสร็จ มันจะ return undefined และเกิด error `DOMContentLoaded` event ให้ความมั่นใจว่า DOM พร้อมแล้วก่อนเรียก `loadTodos()` และ `setupEventListeners()`

---

## 🟠 Part 3: Testing - API (Supertest)

### Q3.1: Supertest คืออะไร?

**Question:** Supertest (ในไฟล์ `__tests__/todo.test.js`) ใช้สำหรับอะไร?

**Related:** [Q1.4 (HTTP Methods)](#q14-appget-vs-apppost-ต่างกันยังไง), [Q3.2 (Jest)](#q32-jest-คืออะไร), [Q4.1 (E2E vs API)](#q41-e2e-testing-คืออะไร)

**Expected Answer:**

- Test HTTP API endpoints
- ไม่ต้อง manual curl commands
- Check status codes and response body

**Full Answer:**
Supertest คือ library ที่ช่วยให้ทดสอบ Express API ได้ง่าย โดยไม่ต้องเปิด browser หรือ curl ทุกครั้ง เขียน test cases ใกล้เคียงกับโค้ด production ทำให้ easy to maintain

---

### Q3.2: Jest คืออะไร?

**Question:** Jest (test runner) ทำอะไร?

**Related:** [Q3.1 (Supertest)](#q31-supertest-คืออะไร), [Q4.1 (Playwright)](#q41-e2e-testing-คืออะไร)

**Expected Answer:**

- Test framework for JavaScript
- Run test files ending with `.test.js`
- Provide assertions (expect)

**Full Answer:**

```javascript
test('should return all todos', async () => {
  const res = await request(app).get('/api/todos');
  expect(res.status).toBe(200);
  expect(res.body).toBeInstanceOf(Array);
});
```

Jest คือ test framework ที่ใช้รัน test files และให้ assertions functions เช่น `expect()`, `toBe()`, `toBeInstanceOf()` เป็นต้น

---

### Q3.3: `request(app).get()` ทำอะไร?

**Question:** `await request(app).get('/api/todos')` ส่วนนี้ทำไร?

**Expected Answer:**

- Simulate GET request ไปยัง `/api/todos`
- ส่ง request เข้า Express app
- Return response object

**Full Answer:**
Supertest `request(app)` ใช้ Express app โดยตรง (ไม่ต้องเปิด server) แล้ว `.get()` ส่ง GET request ไปยัง `/api/todos` return response object ที่มี `status`, `body`, `headers` ฯลฯ

---

### Q3.4: `.expect()` vs `expect()` ต่างกันยังไง?

**Question:** ในการทดสอบ API ต่างกันยังไง:

1. `.expect(200)` (Supertest method)
2. `expect(res.status).toBe(200)` (Jest assertion)

**Expected Answer:**

- ทั้งคู่ทำได้เหมือนกัน
- `.expect()` คือ Supertest convenience method
- `expect()` คือ Jest assertion

**Full Answer:**

```javascript
// Supertest method (short)
await request(app).get('/api/todos').expect(200);

// Jest assertion (explicit)
const res = await request(app).get('/api/todos');
expect(res.status).toBe(200);
```

ทั้งคู่ทำให้ผลเหมือนกัน แต่ `.expect()` สั้นกว่าและสามารถ chain ได้พร้อมกัน

---

### Q3.5: Test ที่สำคัญที่สุด 3 ตัว?

**Question:** ถ้าต้องเลือก 3 test cases ที่สำคัญที่สุด จะเลือกอะไร?

**Related:** [Q7.3 (Test Coverage)](#q73-full-test-coverage-ต้อง), [Q7.1 (Development)](#q71-local-development-workflow)

**Expected Answer:**

1. POST /api/todos - สร้าง data ได้หรือไม่
2. GET /api/todos - ดึง data ได้หรือไม่
3. Error handling (404, 400) - API ระหวังข้อมูลไม่สมบูรณ์ได้หรือไม่

**Full Answer:**

- หาก 3 test นี้ผ่านก็บ่งบอกว่า happy path ทำงาน
- Error handling ช่วยจับ bug ก่อนไปยัง production
- CRUD operations ครบ ← ฟีเจอร์หลัก

---

### Q3.6: `npm test` vs `npm test -- --watch` ต่างกันยังไง?

**Question:** เหตุใดต้องใช้ `--watch` flag?

**Expected Answer:**

- `npm test`: รัน test 1 ครั้งแล้วเสร็จ
- `npm test -- --watch`: รัน test ทุกครั้งที่ file มีการเปลี่ยนแปลง

**Full Answer:**
ในขณะ development `.--watch` mode ช่วยให้เราไม่ต้องรัน test ทีละครั้ง มันติดตาม file changes และ auto-run test ให้ feedback อย่างรวดเร็ว

---

## 🟡 Part 4: Testing - E2E (Playwright)

### Q4.1: E2E Testing คืออะไร?

**Question:** E2E (End-to-End) testing ต่างจาก API testing ยังไง?

**Related:** [Q2.2 (fetch API)](#q22-fetch-api), [Q3.1 (API Tests)](#q31-supertest-คืออะไร), [Q4.2 (Playwright)](#q42-playwright-คืออะไร)

**Expected Answer:**

- E2E: ทดสอบจากมุมมอง user (browser)
- API: ทดสอบ endpoints อย่างตรงไป
- E2E: ยิ่งเข้าใจจริง (realistic)

**Full Answer:**

```
API Testing:        E2E Testing:
Backend only        Browser + Backend
Status codes        User interactions
Response body       Click, type, submit
No UI               UI rendering
Fast                Slower
```

E2E testing ทดสอบทั้งระบบจาก perspective ของ user - click button, fill form, check page display ใกล้เคียงกับการใช้งานจริง

---

### Q4.2: Playwright คืออะไร?

**Question:** Playwright (ในไฟล์ `tests/e2e/todo.spec.js`) ทำอะไร?

**Expected Answer:**

- Browser automation tool
- ควบคุม browser แบบ programmatically
- Support Chrome, Firefox, Safari

**Full Answer:**
Playwright คือ library ที่ช่วยให้ automate browser actions เช่น open browser, click buttons, fill forms, read elements เพื่อทดสอบ user flows End-to-End

---

### Q4.3: `page.goto()` และ `page.click()` ทำอะไร?

**Question:** ในการให้ Playwright ทดสอบ ใช้เมธอดไหน?

**Expected Answer:**

- `page.goto(url)`: เปิด URL
- `page.click(selector)`: click element
- `page.fill(selector, text)`: fill input field
- `page.textContent(selector)`: อ่านข้อความ

**Full Answer:**

```javascript
await page.goto('http://localhost:3000');
await page.fill('#todoInput', 'Learn Playwright');
await page.click('#addBtn');
const todoText = await page.textContent('.todo-item');
```

Playwright ให้ API สำหรับ user interactions โดยสร้าง full browser context ที่สามารถทำ click, type, check page content ได้

---

### Q4.4: `expect()` ใน Playwright ต่างจาก Jest ยังไง?

**Question:** Playwright ใช้ assertions แบบไหน?

**Expected Answer:**

```javascript
// Jest
expect(res.status).toBe(200);

// Playwright
await expect(page.locator('.todo-item')).toHaveCount(3);
```

- Playwright assertions คือ async
- รอให้ element มีอยู่ก่อน assert

---

### Q4.5: Test Workflow Example?

**Question:** Playwright test case ดูแบบไหน?

**Related:** [Q2.4 (renderTodos)](#q24-rendertodos-ฟังก์ชันนี้ทำอะไร), [Q4.2 (Playwright)](#q42-playwright-คืออะไร)

**Expected Answer:**

```javascript
test('should add todo and display it', async ({ page }) => {
  // Setup
  await page.goto('http://localhost:3000');

  // Action
  await page.fill('#todoInput', 'Test Todo');
  await page.click('#addBtn');

  // Assert
  await expect(page.locator('.todo-item')).toContainText('Test Todo');
});
```

---

### Q4.6: เหตุใดต้องใช้ `npm run test:e2e:headed`?

**Question:** ต่างจาก `npm run test:e2e` ยังไง?

**Expected Answer:**

- `test:e2e`: headless browser (ธรรมชาติเร็ว)
- `test:e2e:headed`: มองเห็น browser desktop (debugging)

**Full Answer:**
ในการ debug test fail ใช้ `--headed` flag ช่วยให้เราเห็น browser นั้นจริง ๆ สามารถเห็นว่า test ทำอะไร บน desktop ทำให้ diagnose issues ได้ง่ายขึ้น

---

## 🟢 Part 5: Git & CI/CD

### Q5.1: GitHub Actions คืออะไร?

**Question:** ไฟล์ `.github/workflows/ci.yml` ทำให้ GitHub ทำอะไร?

**Related:** [Q1.1 (Express)](#q11-express-คืออะไร), [Q7.1 (Dev Workflow)](#q71-local-development-workflow), [Q5.2 (Pipeline Steps)](#q52-cicd-pipeline-ขั้นตอนไหน)

**Expected Answer:**

- Automate tasks เมื่อมีการ push code
- รัน tests โดยอัตโนมัติ
- รัน linters
- Prevent bad code จาก merge

**Full Answer:**
GitHub Actions คือ CI/CD service ที่จัดการ workflows บน cloud เมื่อคุณ push code ขึ้น GitHub มันจะ trigger workflows ที่กำหนดใน `ci.yml` เช่น install dependencies, lint, test, build ฯลฯ

---

### Q5.2: CI/CD Pipeline ขั้นตอนไหน?

**Question:** ตามลำดับ Pipeline ทำอะไร?

**Related:** [Q5.1 (GitHub Actions)](#q51-github-actions-คืออะไร), [Q3.1-3.6 (Testing)](#q31-supertest-คืออะไร), [Q5.3-5.6 (CI Details)](#q53-npm-ci-ต่างจาก-npm-install-ยังไง)

**Expected Answer:**

1. Checkout code (download source code)
2. Setup Node.js (prepare environment)
3. Install dependencies (`npm ci`)
4. Lint (`npm run lint`)
5. Test (`npm test`)
6. Build (`npm run build`)

---

### Q5.3: `npm ci` ต่างจาก `npm install` ยังไง?

**Question:** เหตุใด CI/CD ใช้ `npm ci` แทน `npm install`?

**Expected Answer:**

- `npm install`: สำหรับ dev (อาจ update packages)
- `npm ci`: สำหรับ CI (lock versions exactly)
- `ci` = "clean install"

**Full Answer:**
`npm ci` ใช้ `package-lock.json` เพื่อ install exact versions ของทุก dependency ทำให้ consistent ระหว่าง dev และ CI/CD ส่วน `npm install` อาจ update packages ไม่คาดหวัง

---

### Q5.4: Status Badge ใน README ทำไม?

**Question:** ทำไมต้องใส่ badge เช่น `![CI](https://...)` ใน README?

**Expected Answer:**

- แสดงสถานะ CI Pipeline
- ถ้า passing → green badge
- ถ้า failing → red badge
- Quick status check

---

### Q5.5: Branch Protection Rules?

**Question:** ถ้าต้องการป้องกัน merge bad code เข้า `main` ควรทำไง?

**Expected Answer:**

- GitHub → Repository settings
- Branches → Add rule for `main`
- Require CI to pass before merge
- Require code review

**Full Answer:**
หาก CI pipeline fail (tests fail, lint error) จะไม่อนุญาต merge เข้า `main` branch นี่จะตรวจสอบว่า code quality ก่อนไปยัง production

---

### Q5.6: ทำให้ CI run ได้ตรงไหน?

**Question:** ถ้า CI fail ต้องแก้ไขไฟล์ไหน?

**Expected Answer:**

- Test fail → แก้ `__tests__/*.test.js`
- Lint fail → แก้ `index.js`, `public/*.js`
- Build fail → check `package.json` dependencies

---

## 🔵 Part 6: Project Structure & Dependencies

### Q6.1: `package.json` ส่วนไหนสำคัญ?

**Question:** ระบุส่วนสำคัญของ `package.json`

**Related:** [Q5.3 (npm ci)](#q53-npm-ci-ต่างจาก-npm-install-ยังไง), [Q6.2-6.6 (Config Files)](#q62-version-symbols---ทำไม)

**Expected Answer:**

```json
{
  "name": "todo-app", // Project name
  "version": "1.0.0", // Version
  "scripts": {
    // Commands
    "start": "node index.js",
    "test": "jest"
  },
  "dependencies": {
    // Production packages
    "express": "^4.18.2"
  },
  "devDependencies": {
    // Dev-only packages
    "jest": "^29.5.0"
  }
}
```

---

### Q6.2: Version Symbols `^`, `~` ทำไม?

**Question:** `"express": "^4.18.2"` ตัว `^` ทำให้ทำไม?

**Expected Answer:**

- `^4.18.2`: ≥ 4.18.2 และ < 5.0.0
- Allow minor + patch updates
- `~4.18.2`: ≥ 4.18.2 และ < 4.19.0 (patch only)

---

### Q6.3: `.eslintrc.json` ทำอะไร?

**Question:** ESLint configuration ทำไร?

**Expected Answer:**

- กำหนด code style rules
- Prevent common errors
- Enforce best practices

---

### Q6.4: `.gitignore` มีอะไร?

**Question:** ไฟล์ที่สำคัญที่ต้อง ignore ไหน?

**Expected Answer:**

- `node_modules/` (huge, can reinstall)
- `.env` (secrets, passwords)
- `coverage/` (test reports)
- `.DS_Store` (OS files)

---

### Q6.5: `jest.config.js` คืออะไร?

**Question:** Jest configuration files ทำให้ Jest อ่านค่าไหน?

**Expected Answer:**

- `testEnvironment: 'node'`
- `testMatch: ['**/__tests__/*.js']`
- Coverage settings

---

### Q6.6: `playwright.config.js` คืออะไร?

**Question:** Playwright configuration ระบุอะไร?

**Expected Answer:**

- `baseURL: 'http://localhost:3000'`
- `timeout: 30000`
- `use: { headless: true }`

---

## 🟣 Part 7: Integration & Workflow

### Q7.1: Local Development Workflow?

**Question:** ถ้าต้องเพิ่ม feature ใหม่ ขั้นตอนไหน?

**Related:** [Q5.1-5.2 (CI/CD)](#q51-github-actions-คืออะไร), [Q3.1-4.6 (Testing)](#q31-supertest-คืออะไร), [Q1.1-2.6 (Backend/Frontend)](#q11-express-คืออะไร)

**Expected Answer:**

```bash
# 1. Create feature branch
git checkout -b feature/new-feature

# 2. Develop
npm run dev                      # Run server
npm test -- --watch            # Run tests while coding

# 3. Test
npm run lint
npm test
npm run test:e2e

# 4. Commit & Push
git add .
git commit -m "feat: add new feature"
git push origin feature/new-feature

# 5. GitHub → Create Pull Request
# 6. CI runs automatically
# 7. If CI pass → Merge to main
```

---

### Q7.2: ถ้า API endpoint fail test ต้องแก้ไขไหน?

**Question:** หากทดสอบ POST /api/todos fail ต้องทำไง?

**Expected Answer:**

1. อ่าน test error message
2. Debug ในไฟล์ `__tests__/todo.test.js` หรือ `index.js`?
3. ใช้ `npm run dev` รัน locally
4. ใช้ Postman หรือ curl debug
5. แก้ไขและ rerun `npm test`

---

### Q7.3: Full Test Coverage ต้อง?

**Question:** ต้องทดสอบไฟล์ไหนบ้าง?

**Expected Answer:**

- `index.js`: API tests ✅
- `public/app.js`: E2E tests (user actions) ✅
- `public/index.html`: Manual (structure check) ✅
- Unit tests for utility functions

---

### Q7.4: Deployment เมื่อไหร่?

**Question:** เมื่อไหร่เหมาะสมที่จะ deploy?

**Expected Answer:**

- ✅ หากทุก tests pass
- ✅ หากทุก linters pass
- ✅ หากทั้งหมด reviews approve
- ✅ หากเป็น main branch

---

### Q7.5: Monitoring Production?

**Question:** Deploy ไปแล้ว ต้องเฝ้าดูยังไง?

**Related:** [Q7.4 (Deployment)](#q74-deployment-เมื่อไหร่), [Q1.6 (Error Handling)](#q16-error-handling-ที่บรรทัดนี้ทำอะไร)

**Expected Answer:**

- Check `/health` endpoint regularly
- Monitor error logs
- Setup alerts for failures
- Monitor performance

---

### Q7.6: Rollback Plan?

**Question:** ถ้า deployment มีปัญหา ต้องทำไง?

**Expected Answer:**

- Git revert ไปยัง version เดิม
- ใช้ CI/CD deploy เดิม
- Investigate ก่อน push ใหม่

---

## 🎓 Part 8: Concept Questions

### Q8.1: State Management In-Memory vs Database?

**Question:** ในตัวอย่าง `todos` เก็บใน memory array ทำไมไม่ใช้ database?

**Expected Answer:**

- Memory: ง่าย สำหรับ demo
- Database: persistent, scalable
- Memory: data loss on restart
- Production ต้อง database

---

### Q8.2: CORS คืออะไร?

**Question:** ทำไม `app.use(cors())` จำเป็น?

**Related:** [Q2.2 (fetch API)](#q22-fetch-api), [Q8.4 (Security)](#q84-security-concerns)

**Expected Answer:**

- CORS = Cross-Origin Resource Sharing
- Allow frontend ที่ origin ต่างกัน access API
- Without CORS → browser block requests

---

### Q8.3: RESTful API Principles?

**Question:** API endpoints ของเรา ถือว่า RESTful หรือไม่? ทำไม?

**Related:** [Q1.4 (HTTP Methods)](#q14-appget-vs-apppost-ต่างกันยังไง), [Q3.1 (API Testing)](#q31-supertest-คืออะไร)

**Expected Answer:**

- ✅ ใช้ HTTP methods precisely (GET, POST, PUT, DELETE)
- ✅ ใช้ standard status codes (200, 201, 404)
- ✅ Stateless
- ✅ ใช้ resource-based URLs (`/api/todos`)

---

### Q8.4: Security Concerns?

**Question:** มี security issues ในโปรเจคนี้หรือไม่?
**Related:** [Q2.5 (XSS Prevention)](#q25-content-security---escapehtml-ทำอะไร), [Q8.2 (CORS)](#q82-cors-คืออะไร)
**Expected Answer:**

- ❌ ไม่มี authentication (public API)
- ❌ ไม่มี input validation (SQL injection risk ถ้ามี DB)
- ✅ CORS ไม่ restrict (แต่ OK สำหรับ demo)
- ✅ HTML escaping ใน frontend
- Recommendation: เพิ่ม input validators

---

### Q8.5: Performance คิดไง?

**Question:** ถ้า todos > 10,000 items ที่ต้องกังวล?

**Related:** [Q1.5 (ID Generation)](#q15-id-ใน-todos-ถูกสร้างอย่างไร), [Q8.6 (Scalability)](#q86-scalability)

**Expected Answer:**

- Memory usage (Array in memory)
- Rendering performance (DOM manipulation)
- Network latency (fetch 10K items)
- Solution: Pagination, filtering, indexing

---

### Q8.6: Scalability?

**Question:** ถ้าต้องรองรับ 1 ล้าน users ต้องเปลี่ยนอะไร?

**Expected Answer:**

- Database (MongoDB, PostgreSQL)
- Caching layer (Redis)
- Load balancing
- Microservices architecture
- CDN for static files

---

## 📊 Summary & Self-Assessment

### Learning Checklist

1. **Backend (Express)**
   - [ ] เข้าใจ routing (GET, POST, PUT, DELETE)
   - [ ] เข้าใจ middleware
   - [ ] เข้าใจ error handling

2. **Frontend (HTML/CSS/JS)**
   - [ ] เข้าใจ fetch API
   - [ ] เข้าใจ DOM manipulation
   - [ ] เข้าใจ event listeners

3. **Testing**
   - [ ] เข้าใจ API testing (Supertest)
   - [ ] เข้าใจ E2E testing (Playwright)
   - [ ] เข้าใจ Jest assertions

4. **Git & CI/CD**
   - [ ] เข้าใจ branches & commits
   - [ ] เข้าใจ GitHub Actions workflow
   - [ ] เข้าใจ automated testing

5. **Architecture**
   - [ ] เข้าใจ request-response flow
   - [ ] เข้าใจ separation of concerns
   - [ ] เข้าใจ testing strategy

---

## ✅ Answers Lookup Table

| Question | Answer                                    | Difficulty |
| -------- | ----------------------------------------- | ---------- |
| Q1.1     | Express is a Node.js web framework        | Easy       |
| Q1.2     | Port 3000 for development                 | Easy       |
| Q1.3     | Parse JSON bodies                         | Easy       |
| Q1.4     | GET vs POST (REST convention)             | Easy       |
| Q1.5     | ID generation with Math.max               | Medium     |
| Q1.6     | 404 error handling                        | Easy       |
| Q2.1     | DOM elements in HTML                      | Easy       |
| Q2.2     | fetch() for HTTP requests                 | Easy       |
| Q2.3     | async/await for promises                  | Medium     |
| Q2.4     | renderTodos converts array to HTML        | Medium     |
| Q2.5     | HTML escaping prevents XSS                | Hard       |
| Q2.6     | DOMContentLoaded waits for DOM            | Medium     |
| Q3.1     | Supertest for API testing                 | Easy       |
| Q3.2     | Jest as test runner                       | Easy       |
| Q3.3     | request(app).get() simulates HTTP request | Easy       |
| Q3.4     | .expect() vs expect() difference          | Medium     |
| Q3.5     | Most important 3 tests                    | Hard       |
| Q3.6     | --watch for auto-rerun                    | Easy       |
| Q4.1     | E2E testing from user perspective         | Easy       |
| Q4.2     | Playwright browser automation             | Easy       |
| Q4.3     | page methods (goto, click, fill)          | Easy       |
| Q4.4     | Playwright async assertions               | Medium     |
| Q4.5     | E2E test workflow                         | Medium     |
| Q4.6     | --headed for debugging                    | Easy       |
| Q5.1     | GitHub Actions CI/CD                      | Easy       |
| Q5.2     | CI Pipeline steps                         | Easy       |
| Q5.3     | npm ci vs npm install                     | Medium     |
| Q5.4     | Status badges                             | Easy       |
| Q5.5     | Branch protection                         | Medium     |
| Q5.6     | Debugging CI failures                     | Medium     |
| Q6.1     | package.json structure                    | Easy       |
| Q6.2     | Version symbols ^ and ~                   | Medium     |
| Q6.3     | ESLint configuration                      | Easy       |
| Q6.4     | .gitignore contents                       | Easy       |
| Q6.5     | jest.config.js                            | Easy       |
| Q6.6     | playwright.config.js                      | Easy       |
| Q7.1     | Development workflow                      | Hard       |
| Q7.2     | Debugging failed tests                    | Hard       |
| Q7.3     | Full test coverage                        | Hard       |
| Q7.4     | When to deploy                            | Hard       |
| Q7.5     | Production monitoring                     | Hard       |
| Q7.6     | Rollback plan                             | Hard       |
| Q8.1     | Memory vs Database                        | Hard       |
| Q8.2     | CORS concept                              | Hard       |
| Q8.3     | RESTful principles                        | Hard       |
| Q8.4     | Security concerns                         | Hard       |
| Q8.5     | Performance considerations                | Hard       |
| Q8.6     | Scalability                               | Hard       |

---

**Created:** 2025-02-16  
**Total Questions:** 58  
**Difficulty Range:** Easy → Hard  
**Topics Covered:** Backend, Frontend, Testing, Git, CI/CD, Architecture
