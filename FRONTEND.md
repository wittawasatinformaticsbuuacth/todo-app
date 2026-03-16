# 🌐 Frontend - Simple HTML Todo App

Simple HTML/CSS/JavaScript frontend สำหรับ Todo API

## 📦 ไฟล์

```
public/
├── index.html       ← Web page
├── style.css        ← Styling
└── app.js           ← JavaScript logic
```

---

## 🚀 Quick Start

### 1. Install & Run Backend

```bash
npm install
npm run dev
```

**Expected Output:**

```
🚀 Server running on http://localhost:3000
🌐 Frontend: http://localhost:3000
📝 API: http://localhost:3000/api/todos
❤️  Health: http://localhost:3000/health
```

### 2. Open in Browser

```
http://localhost:3000
```

---

## 🎨 Features

✅ **Add Todo** - เพิ่ม todo ใหม่  
✅ **List Todos** - แสดงรายการ todos  
✅ **Complete Todo** - ติดเครื่องหมายเสร็จ  
✅ **Delete Todo** - ลบ todo  
✅ **API Status** - แสดงสถานะการเชื่อมต่อ API  
✅ **Error Handling** - แสดงข้อความ error  
✅ **Responsive** - ใช้ได้บน mobile ด้วย

---

## 📡 API Integration

Frontend เรียก API endpoints:

```javascript
// GET all todos
fetch('/api/todos');

// POST new todo
fetch('/api/todos', {
  method: 'POST',
  body: JSON.stringify({ title: '...' }),
});

// PUT update todo
fetch('/api/todos/:id', {
  method: 'PUT',
  body: JSON.stringify({ completed: true }),
});

// DELETE todo
fetch('/api/todos/:id', {
  method: 'DELETE',
});

// Health check
fetch('/health');
```

---

## 🔍 Testing

### Test via Browser

```
1. http://localhost:3000
2. โครงสร้างของหน้า:
   - Input field สำหรับ todo ใหม่
   - Add button
   - API Status indicator
   - Todo count
   - List of todos
   - Delete button for each todo
```

### Test with DevTools

```
F12 → Console tab

// Check API calls
- Refresh page
- Open Network tab
- See all requests (fetch to /api/todos)
```

---

## 💡 Code Structure

### index.html

- HTML semantic structure
- Form input + button
- Status display
- Todo list container
- API info

### style.css

- Modern gradient background
- Flexbox layout
- Responsive grid
- Animation (slideIn)
- Mobile responsive

### app.js

- DOMContentLoaded listener
- Event listeners (add, delete, update)
- Fetch API calls
- Error handling
- HTML escaping (security)
- Health check interval (10s)

---

## 🛡️ Security Features

✅ **XSS Prevention** - `escapeHtml()` function  
✅ **CORS** - Backend enabled  
✅ **Input Validation** - Check title is not empty  
✅ **Error Handling** - Try/catch blocks

---

## 🎯 Live Demo Flow

```
1. npm run dev
   ↓
2. Open http://localhost:3000
   ↓ (Frontend loads)
3. loadTodos() → GET /api/todos
   ↓ (Display todos)
4. checkApiHealth() → GET /health
   ↓ (Show ✅ Online)
5. Enter title + click Add
   ↓ (POST /api/todos)
6. New todo renders
   ↓
7. Click checkbox → PUT /api/todos/:id
   ↓ (Mark completed)
8. Click Delete → DELETE /api/todos/:id
   ↓ (Remove todo)
```

---

## 📱 Browser Support

- ✅ Chrome/Edge
- ✅ Firefox
- ✅ Safari
- ✅ Mobile browsers

---

## 🚀 Deploy Frontend

### Option 1: Serve from Express (Current)

```
npm run dev
# http://localhost:3000 (includes frontend + API)
```

### Option 2: Deploy to Vercel (Separate)

```bash
# Copy public/ folder content to Vercel
# Update API_BASE in app.js to production API URL
# Deploy as static site
```

---

## 📚 Learn More

- [wk10-demo.md](../wk10-demo.md) - Full demo guide
- [SETUP.md](./SETUP.md) - Setup instructions
- [COMMANDS.md](./COMMANDS.md) - Command reference

---

**Happy Learning! 🎉**
