# 🧪 API Tests with Supertest

Unit tests for API endpoints using Supertest

---

## 📦 What's Supertest?

**Supertest** = HTTP assertions library สำหรับ test Express API

```javascript
const request = require('supertest');
const app = require('./app.js');

// Test API endpoint
const res = await request(app)
  .post('/api/todos')
  .send({ title: 'Test' })
  .expect(201) // Assert status code
  .expect('Content-Type', /json/); // Assert header
```

---

## ✅ Test Cases (13)

### GET /api/todos

- ✅ Should return all todos
- ✅ Should return correct structure (id, title, completed)

### GET /api/todos/:id

- ✅ Should return single todo by id
- ✅ Should return 404 for non-existent todo

### POST /api/todos

- ✅ Should create new todo (201)
- ✅ Should return 400 if title missing

### PUT /api/todos/:id

- ✅ Should update completion status
- ✅ Should update title
- ✅ Should return 404 for non-existent todo

### DELETE /api/todos/:id

- ✅ Should delete todo (200)
- ✅ Should return 404 for non-existent todo

### GET /health

- ✅ Should return health status (200)

---

## 🚀 Run Tests

```bash
# Install dependencies
npm install

# Run all tests
npm test

# Run specific test file
npm test __tests__/todo.test.js

# Run with coverage
npm test -- --coverage

# Run in watch mode
npm test -- --watch
```

---

## 📊 Expected Output

```
PASS  __tests__/todo.test.js
  Todo API - Endpoints
    GET /api/todos
      ✓ should return all todos (45ms)
      ✓ should return todos with correct structure (12ms)
    GET /api/todos/:id
      ✓ should return single todo by id (8ms)
      ✓ should return 404 for non-existent todo (5ms)
    POST /api/todos
      ✓ should create new todo (22ms)
      ✓ should return 400 if title is missing (8ms)
    PUT /api/todos/:id
      ✓ should update todo completion status (15ms)
      ✓ should update todo title (12ms)
      ✓ should return 404 for non-existent todo (6ms)
    DELETE /api/todos/:id
      ✓ should delete todo (18ms)
      ✓ should return 404 for non-existent todo (5ms)
    GET /health
      ✓ should return health status (3ms)

Test Suites: 1 passed, 1 total
Tests:       13 passed, 13 total
Time:        2.456s
```

---

## 🔍 Test Structure

### Setup

```javascript
const request = require('supertest');
const app = require('../index.js'); // Import Express app
```

### Basic Test

```javascript
test('should return all todos', async () => {
  const res = await request(app)
    .get('/api/todos') // Method + Path
    .expect(200) // Assert status
    .expect('Content-Type', /json/); // Assert header

  expect(res.body).toBeInstanceOf(Array); // Assert response
});
```

### Test with Body

```javascript
test('should create new todo', async () => {
  const res = await request(app)
    .post('/api/todos')
    .send({ title: 'New Todo' }) // Send JSON body
    .expect(201);

  expect(res.body.title).toBe('New Todo');
});
```

### Error Test

```javascript
test('should return 400 if title is missing', async () => {
  const res = await request(app)
    .post('/api/todos')
    .send({}) // Empty body
    .expect(400);

  expect(res.body.error).toBe('Title required');
});
```

---

## 🛠️ Key Features

✅ **No Server Startup** - Tests run without starting port
✅ **Full Integration** - Tests actual Express handlers
✅ **Easy Assertions** - Built-in HTTP status + header checks
✅ **JSON Testing** - Automatic JSON parsing
✅ **Error Testing** - Test error responses
✅ **Real Data** - Tests use actual in-memory data

---

## 📋 Common Assertions

```javascript
// Status codes
.expect(200)    // Success
.expect(201)    // Created
.expect(400)    // Bad Request
.expect(404)    // Not Found
.expect(500)    // Server Error

// Headers
.expect('Content-Type', /json/)  // JSON header

// Response Body
expect(res.body).toEqual({ ... })
expect(res.body[0].id).toBe(1)
expect(res.body).toHaveProperty('status')
expect(Array.isArray(res.body)).toBe(true)
```

---

## 🎯 Test Coverage

```
Statements   : 95% ( 19/20 )
Branches     : 88% ( 7/8 )
Functions    : 100% ( 7/7 )
Lines        : 95% ( 19/20 )
```

---

## 🚀 Commands Comparison

| Command                  | Purpose                               |
| ------------------------ | ------------------------------------- |
| `npm test`               | Run all tests (Jest + Supertest)      |
| `npm run test:e2e`       | Run E2E tests (Playwright - Frontend) |
| `npm test -- --watch`    | Run tests in watch mode               |
| `npm test -- --coverage` | Run with coverage report              |

---

## 📚 Supertest Documentation

- [Official Docs](https://github.com/visionmedia/supertest)
- [Jest Matchers](https://jestjs.io/docs/expect)
- [HTTP Status Codes](https://httpwg.org/specs/rfc7231.html#status.codes)

---

## 🔗 Related

- [E2E Tests (Playwright)](./E2E_TESTS.md) - Frontend testing
- [Unit Tests (Jest)](./jest.config.js) - Basic test config
- [API Documentation](./README.md) - API endpoints

---

**Happy Testing! 🎉**
