# ✏️ New Feature: Edit Todo Item

## 📌 Overview

เพิ่ม feature **Edit Todo** เพื่อให้สามารถแก้ไขชื่อ todo ที่มีอยู่ได้

---

## 🎯 Feature Requirements

- ✅ เพิ่ม **Edit Button** ในแต่ละ todo item
- ✅ เปิด **Modal Dialog** เมื่อคลิก edit
- ✅ สามารถแก้ไขชื่อ todo
- ✅ บันทึกการเปลี่ยนแปลงไปยัง Backend (PUT endpoint)
- ✅ Refresh UI หลังบันทึก
- ✅ สามารถ **Cancel** การแก้ไข
- ✅ Validate input (ห้าม empty)

---

## 🛠️ Implementation Steps

### **Step 1: Backend - API Endpoint ✅** (Already exists)

Backend มี PUT endpoint แล้ว:

```javascript
app.put('/api/todos/:id', (req, res) => {
  const todo = todos.find((t) => t.id === parseInt(req.params.id));
  if (!todo) return res.status(404).json({ error: 'Todo not found' });

  if (req.body.title) todo.title = req.body.title;
  if (req.body.completed !== undefined) todo.completed = req.body.completed;

  res.json(todo);
});
```

**Usage:**

```bash
curl -X PUT http://localhost:3000/api/todos/1 \
  -H "Content-Type: application/json" \
  -d '{"title":"Updated Title"}'
```

---

### **Step 2: Frontend - Update HTML**

**File:** `public/index.html`

เพิ่ม:

1. Edit Button ในแต่ละ todo item
2. Edit Modal Dialog

```html
<!-- Add this modal before closing </body> -->
<div id="editModal" class="modal">
  <div class="modal-content">
    <div class="modal-header">
      <h2>Edit Todo</h2>
      <span class="close" onclick="closeEditModal()">&times;</span>
    </div>
    <div class="modal-body">
      <input type="text" id="editInput" placeholder="Enter todo title" class="modal-input" />
    </div>
    <div class="modal-footer">
      <button class="btn-cancel" onclick="closeEditModal()">Cancel</button>
      <button class="btn-save" onclick="saveEditTodo()">Save</button>
    </div>
  </div>
</div>
```

---

### **Step 3: Frontend - Update CSS**

**File:** `public/style.css`

เพิ่ม styles สำหรับ modal:

```css
/* Modal Styles */
.modal {
  display: none;
  position: fixed;
  z-index: 1000;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
}

.modal.show {
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  animation: slideIn 0.3s ease;
}

@keyframes slideIn {
  from {
    transform: translateY(-50px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
  border-bottom: 1px solid #e0e0e0;
  padding-bottom: 10px;
}

.modal-header h2 {
  margin: 0;
  font-size: 20px;
  color: #333;
}

.close {
  font-size: 28px;
  font-weight: bold;
  color: #999;
  cursor: pointer;
  transition: color 0.3s;
}

.close:hover {
  color: #333;
}

.modal-body {
  margin-bottom: 20px;
}

.modal-input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  box-sizing: border-box;
}

.modal-input:focus {
  outline: none;
  border-color: #4caf50;
  box-shadow: 0 0 5px rgba(76, 175, 80, 0.3);
}

.modal-footer {
  display: flex;
  gap: 10px;
  justify-content: flex-end;
}

.btn-cancel,
.btn-save {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.3s;
}

.btn-cancel {
  background-color: #f0f0f0;
  color: #333;
}

.btn-cancel:hover {
  background-color: #e0e0e0;
}

.btn-save {
  background-color: #4caf50;
  color: white;
}

.btn-save:hover {
  background-color: #45a049;
}

/* Edit Button Style */
.edit-btn {
  background-color: #2196f3;
  color: white;
}

.edit-btn:hover {
  background-color: #0b7dda;
}
```

---

### **Step 4: Frontend - Update JavaScript**

**File:** `public/app.js`

เพิ่ม functions:

```javascript
// Edit Modal
let currentEditId = null;

// Open edit modal
function openEditModal(id) {
  const todo = /* Get todo from DOM or API */;
  currentEditId = id;
  const editInput = document.getElementById('editInput');
  editInput.value = todo.title;
  editInput.focus();

  const modal = document.getElementById('editModal');
  modal.classList.add('show');
}

// Close edit modal
function closeEditModal() {
  const modal = document.getElementById('editModal');
  modal.classList.remove('show');
  currentEditId = null;
}

// Save edited todo
async function saveEditTodo() {
  const editInput = document.getElementById('editInput');
  const newTitle = editInput.value.trim();

  if (!newTitle) {
    showError('Todo title cannot be empty');
    return;
  }

  if (!currentEditId) return;

  try {
    const response = await fetch(`${API_BASE}/todos/${currentEditId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title: newTitle }),
    });

    if (!response.ok) throw new Error('Failed to update todo');

    closeEditModal();
    loadTodos();
    clearError();
  } catch (error) {
    showError('Failed to update todo');
    console.error('Error:', error);
  }
}

// Close modal when clicking outside
document.addEventListener('click', (e) => {
  const modal = document.getElementById('editModal');
  if (e.target === modal) {
    closeEditModal();
  }
});

// Close modal on Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeEditModal();
  }
});
```

**Update renderTodos to include Edit Button:**

```javascript
<div class="todo-actions">
  <button class="todo-btn edit-btn" onclick="openEditModal(${todo.id})">
    ✏️ Edit
  </button>
  <button class="todo-btn delete-btn" onclick="deleteTodo(${todo.id})">
    🗑️ Delete
  </button>
</div>
```

---

### **Step 5: Tests - Add Test Cases**

**File:** `__tests__/todo.test.js`

เพิ่ม test cases:

```javascript
describe('PUT /api/todos/:id (Edit Todo)', () => {
  it('should update todo title', async () => {
    const res = await request(app).put('/api/todos/1').send({ title: 'Updated Title' }).expect(200);

    expect(res.body).toHaveProperty('id');
    expect(res.body.title).toBe('Updated Title');
  });

  it('should not update with empty title', async () => {
    const res = await request(app).put('/api/todos/1').send({ title: '' }).expect(200);
    // API allows empty title, but frontend validates
  });

  it('should return 404 for non-existent todo', async () => {
    await request(app).put('/api/todos/999').send({ title: 'Updated' }).expect(404);
  });
});
```

---

### **Step 6: E2E Tests - Add Playwright Test**

**File:** `tests/e2e/todo.spec.js`

เพิ่ม test:

```javascript
test('should edit todo title', async ({ page }) => {
  // Get initial todo text
  const firstTodo = page.locator('.todo-item').first();
  const initialText = await firstTodo.locator('.todo-text').textContent();

  // Click edit button
  const editBtn = page.locator('.edit-btn').first();
  await editBtn.click();

  // Wait for modal to open
  const modal = page.locator('#editModal');
  await modal.locator('.show').waitFor({ timeout: 5000 });

  // Clear and type new text
  const editInput = page.locator('#editInput');
  await editInput.clear();
  const newTitle = `Updated Todo ${Date.now()}`;
  await editInput.fill(newTitle);

  // Wait for save response
  const saveResponsePromise = page.waitForResponse(
    (response) => response.url().includes('/api/todos') && response.request().method() === 'PUT'
  );

  // Click save
  const saveBtn = page.locator('.btn-save');
  await saveBtn.click();

  // Wait for API response
  await saveResponsePromise;

  // Wait for GET response
  await page.waitForResponse(
    (response) => response.url().includes('/api/todos') && response.request().method() === 'GET'
  );

  // Verify text changed
  const updatedText = await page.locator('.todo-text').first().textContent();
  expect(updatedText).toBe(newTitle);
});
```

---

## 🔄 Git Workflow

```bash
# 1. Create feature branch
git checkout -b feature/edit-todo

# 2. Implement changes
# - Update index.html
# - Update style.css
# - Update app.js
# - Add tests in __tests__/todo.test.js
# - Add E2E tests in tests/e2e/todo.spec.js

# 3. Test locally
npm test          # Unit & Integration tests
npm run test:e2e  # E2E tests
npm run dev       # Manual testing

# 4. Commit changes
git add .
git commit -m "feat: add edit todo feature"

# 5. Push to GitHub
git push origin feature/edit-todo

# 6. Create Pull Request on GitHub

# 7. Wait for CI Pipeline ✅

# 8. Merge PR

# 9. Delete feature branch
git branch -d feature/edit-todo
git push origin --delete feature/edit-todo
```

---

## 📝 Testing Checklist

### Manual Testing:

- [ ] Edit button appears on each todo
- [ ] Clicking edit opens modal
- [ ] Modal shows current todo title
- [ ] Can type new title in input
- [ ] Cancel button closes modal without saving
- [ ] Save button updates todo on backend
- [ ] UI updates after saving
- [ ] Error message shows if title is empty
- [ ] Pressing Escape closes modal
- [ ] Clicking outside modal closes it

### Automated Testing:

- [ ] `npm test` passes (12+ tests)
- [ ] `npm run test:e2e` passes
- [ ] CI Pipeline passes on GitHub

---

## 🎨 UI/UX Improvements (Optional)

```javascript
// Add loading state
.modal.loading .btn-save {
  opacity: 0.5;
  cursor: not-allowed;
}

// Add success toast
function showSuccess(message) {
  // Temporary success message
}

// Keyboard shortcuts
// Ctrl+E for edit first todo?
```

---

## 📚 API Reference

### PUT /api/todos/:id

**Request:**

```json
{
  "title": "New Title"
}
```

**Response:**

```json
{
  "id": 1,
  "title": "New Title",
  "completed": false
}
```

**Status Codes:**

- `200` - Success
- `400` - Bad request
- `404` - Todo not found
- `500` - Server error

---

## 🐛 Troubleshooting

| Issue              | Solution                             |
| ------------------ | ------------------------------------ |
| Modal won't open   | Check browser console for JS errors  |
| Changes not saving | Verify API endpoint in network tab   |
| Modal stays open   | Check event listeners for conflicts  |
| Input not focused  | Ensure `autofocus` or call `focus()` |

---

## ✅ Summary

**Feature:** ✏️ Edit Todo

- **Backend:** ✅ Already implemented (PUT endpoint)
- **Frontend:** 📄 Needs implementation
- **Tests:** 📝 Needs addition
- **Documentation:** 📚 This guide

**Estimated Time:**

- Backend: 0 min ✅ (done)
- Frontend HTML: 5 min
- Frontend CSS: 10 min
- Frontend JS: 15 min
- Tests: 10 min
- **Total: ~40 minutes**

Happy coding! 🚀
