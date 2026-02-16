# Todo App - Full CI/CD Pipeline Demo

Simple Todo API สำหรับเรียนรู้เกี่ยวกับ Git, Build Automation, CI/CD Pipeline, และ Deployment

## 🚀 Quick Start

### 1. Clone Repository

```bash
git clone https://github.com/YOUR_USERNAME/todo-app.git
cd todo-app
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Run Local Server

```bash
npm run dev
```

Server จะรันที่ `http://localhost:3000`

### 4. Test API

```bash
# Get all todos
curl http://localhost:3000/api/todos

# Create todo
curl -X POST http://localhost:3000/api/todos \
  -H "Content-Type: application/json" \
  -d '{"title":"Learn Node.js"}'

# Delete todo
curl -X DELETE http://localhost:3000/api/todos/1

# Health check
curl http://localhost:3000/health
```

---

## 📋 Available Scripts

### Development

```bash
npm run dev          # Run with nodemon (auto-reload)
npm start            # Run production server
```

### Quality Checks

```bash
npm run lint         # Check code style
npm run lint:fix     # Fix code style automatically

npm test             # Run API tests (Jest + Supertest)
npm test -- --watch # Run tests in watch mode

npm run test:e2e     # Run E2E tests (Playwright)
npm run test:e2e:ui  # Run with UI dashboard
npx playwright show-report  # View test report
```

### Build

```bash
npm run build        # Build for production
```

---

## 📁 Project Structure

```
todo-app/
├── public/
│   ├── index.html              # Web page
│   ├── style.css               # Styling
│   └── app.js                  # Frontend JavaScript
├── tests/
│   └── e2e/
│       └── todo.spec.js        # E2E tests (Playwright)
├── __tests__/
│   └── todo.test.js            # API tests (Supertest)
├── .github/
│   └── workflows/
│       └── ci.yml              # GitHub Actions pipeline
├── .env.example                # Example environment variables
├── .eslintrc.json              # ESLint configuration
├── .gitignore                  # Git ignore rules
├── jest.config.js              # Jest configuration
├── playwright.config.js        # Playwright configuration
├── package.json                # Dependencies and scripts
├── index.js                    # Main application
└── README.md                   # This file
```

---

## 🔧 API Endpoints

### GET /api/todos

Get all todos

```bash
curl http://localhost:3000/api/todos
```

**Response:**

```json
[
  { "id": 1, "title": "Learn Git", "completed": false },
  { "id": 2, "title": "Learn CI/CD", "completed": false }
]
```

### GET /api/todos/:id

Get single todo

```bash
curl http://localhost:3000/api/todos/1
```

### POST /api/todos

Create new todo

```bash
curl -X POST http://localhost:3000/api/todos \
  -H "Content-Type: application/json" \
  -d '{"title":"New Todo"}'
```

### PUT /api/todos/:id

Update todo

```bash
curl -X PUT http://localhost:3000/api/todos/1 \
  -H "Content-Type: application/json" \
  -d '{"completed":true}'
```

### DELETE /api/todos/:id

Delete todo

```bash
curl -X DELETE http://localhost:3000/api/todos/1
```

### GET /health

Health check

```bash
curl http://localhost:3000/health
```

---

## 📝 Development Workflow

### 1. Create Feature Branch

```bash
git checkout -b feature/your-feature
```

### 2. Make Changes & Test Locally

```bash
npm run dev      # Test server
npm run lint     # Check code style
npm test         # Run tests
```

### 3. Commit & Push

```bash
git add .
git commit -m "feat: describe your feature"
git push origin feature/your-feature
```

### 4. Create Pull Request

- ไปที่ GitHub Repository
- กด "New Pull Request"
- ทำให้ครบถ้วน PR description

### 5. Wait for CI Pipeline

- GitHub Actions จะทำการ lint, test, build อัตโนมัติ
- รอให้ ✅ All checks passed

### 6. Merge & Deploy

- Approve PR
- Merge ไป main branch
- Auto-deploy ไป production

---

## ⚙️ Configuration

### .env File

สร้าง `.env` จาก `.env.example`:

```bash
cp .env.example .env
```

ตัวอย่าง:

```
PORT=3000
NODE_ENV=development
```

### ESLint Rules

ดู `.eslintrc.json` สำหรับ code style rules:

- Indentation: 2 spaces
- Quotes: Single quotes
- Semicolon: Always required

### Jest Configuration

ดู `jest.config.js` สำหรับ test setup

---

## 🧪 Testing

Run all tests:

```bash
npm test
```

Run with coverage:

```bash
npm test -- --coverage
```

---

## 🔍 Troubleshooting

### Port already in use

```bash
# Change PORT in .env
PORT=3001
```

### Dependencies not installed

```bash
npm install
```

### Lint errors

```bash
npm run lint:fix
```

### Tests failing

```bash
npm test -- --verbose
```

---

## 📚 Learn More

- [Git Workflow](../wk10-git-workflow.md)
- [Build Automation](../wk10-build-automation-pipeline.md)
- [Deployment Strategy](../wk10-deploument-strategy.md)
- [Full Demo Guide](../wk10-demo.md)

---

## 📄 License

ISC

---

**Created for Learning Git, CI/CD, and DevOps Concepts**
