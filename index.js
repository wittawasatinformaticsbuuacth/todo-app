const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Serve static files (HTML, CSS, JS)
app.use(express.static('public'));

// Sample data
let todos = [
  { id: 1, title: 'Learn Git', completed: false },
  { id: 2, title: 'Learn CI/CD', completed: false },
];

// GET all todos
app.get('/api/todos', (req, res) => {
  res.json(todos);
});

// GET single todo
app.get('/api/todos/:id', (req, res) => {
  const todo = todos.find((t) => t.id === parseInt(req.params.id));
  if (!todo) return res.status(404).json({ error: 'Todo not found' });
  res.json(todo);
});

// POST new todo
app.post('/api/todos', (req, res) => {
  const { title } = req.body;
  if (!title) return res.status(400).json({ error: 'Title required' });

  const newTodo = {
    id: Math.max(...todos.map((t) => t.id), 0) + 1,
    title,
    completed: false,
  };
  todos.push(newTodo);
  res.status(201).json(newTodo);
});

// DELETE todo
app.delete('/api/todos/:id', (req, res) => {
  const index = todos.findIndex((t) => t.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ error: 'Todo not found' });

  const deletedTodo = todos.splice(index, 1);
  res.json(deletedTodo[0]);
});

// UPDATE todo
app.put('/api/todos/:id', (req, res) => {
  const todo = todos.find((t) => t.id === parseInt(req.params.id));
  if (!todo) return res.status(404).json({ error: 'Todo not found' });

  if (req.body.title) todo.title = req.body.title;
  if (req.body.completed !== undefined) todo.completed = req.body.completed;

  res.json(todo);
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

const PORT = process.env.PORT || 3000;
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(`🌐 Frontend: http://localhost:${PORT}`);
    console.log(`📝 API: http://localhost:${PORT}/api/todos`);
    console.log(`❤️  Health: http://localhost:${PORT}/health`);
  });
}

module.exports = app;
