/* eslint-env browser */

const API_BASE = 'http://localhost:3000/api';

// DOM Elements
const todoInput = document.getElementById('todoInput');
const addBtn = document.getElementById('addBtn');
const todosList = document.getElementById('todosList');
const apiStatus = document.getElementById('apiStatus');
const todoCount = document.getElementById('todoCount');
const errorDiv = document.getElementById('error');

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  loadTodos();
  checkApiHealth();
  setupEventListeners();

  // Check API health every 10 seconds
  setInterval(checkApiHealth, 10000);
});

// Setup event listeners
function setupEventListeners() {
  addBtn.addEventListener('click', addTodo);
  todoInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      addTodo();
    }
  });
}

// Load all todos
async function loadTodos() {
  try {
    const response = await fetch(`${API_BASE}/todos`);
    if (!response.ok) throw new Error('Failed to load todos');

    const todos = await response.json();
    renderTodos(todos);
    updateTodoCount(todos.length);
    clearError();
  } catch (error) {
    showError('Failed to load todos');
    console.error('Error:', error);
  }
}

// Render todos
function renderTodos(todos) {
  if (!todos || todos.length === 0) {
    todosList.innerHTML = `
      <div class="empty">
        <div class="empty-icon">✨</div>
        <p>No todos yet. Create one to get started!</p>
      </div>
    `;
    return;
  }

  todosList.innerHTML = todos
    .map(
      (todo) => `
    <div class="todo-item ${todo.completed ? 'completed' : ''}">
      <input 
        type="checkbox" 
        class="todo-checkbox" 
        ${todo.completed ? 'checked' : ''}
        onchange="toggleTodo(${todo.id})"
      >
      <span class="todo-text">${escapeHtml(todo.title)}</span>
      <div class="todo-actions">
        <button class="todo-btn delete-btn" onclick="deleteTodo(${todo.id})">
          🗑️ Delete
        </button>
      </div>
    </div>
  `
    )
    .join('');
}

// Add new todo
async function addTodo() {
  const title = todoInput.value.trim();

  if (!title) {
    showError('Please enter a todo title');
    return;
  }

  try {
    const response = await fetch(`${API_BASE}/todos`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title }),
    });

    if (!response.ok) throw new Error('Failed to add todo');

    const newTodo = await response.json();
    todoInput.value = '';
    loadTodos();
    clearError();
  } catch (error) {
    showError('Failed to add todo');
    console.error('Error:', error);
  }
}

// Toggle todo completion
async function toggleTodo(id) {
  try {
    const response = await fetch(`${API_BASE}/todos/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ completed: true }),
    });

    if (!response.ok) throw new Error('Failed to update todo');

    loadTodos();
  } catch (error) {
    showError('Failed to update todo');
    console.error('Error:', error);
  }
}

// Delete todo
async function deleteTodo(id) {
  if (!confirm('Are you sure you want to delete this todo?')) {
    return;
  }

  try {
    const response = await fetch(`${API_BASE}/todos/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) throw new Error('Failed to delete todo');

    loadTodos();
    clearError();
  } catch (error) {
    showError('Failed to delete todo');
    console.error('Error:', error);
  }
}

// Check API health
async function checkApiHealth() {
  try {
    const response = await fetch('http://localhost:3000/health');
    if (response.ok) {
      apiStatus.textContent = '✅ Online';
      apiStatus.className = 'status-value ok';
    } else {
      throw new Error('API not responding');
    }
  } catch (error) {
    apiStatus.textContent = '❌ Offline';
    apiStatus.className = 'status-value error';
    console.error('Health check failed:', error);
  }
}

// Update todo count
function updateTodoCount(count) {
  todoCount.textContent = count;
}

// Show error message
function showError(message) {
  errorDiv.textContent = `⚠️ ${message}`;
  errorDiv.style.display = 'block';
}

// Clear error message
function clearError() {
  errorDiv.textContent = '';
  errorDiv.style.display = 'none';
}

// Escape HTML to prevent XSS
function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}
