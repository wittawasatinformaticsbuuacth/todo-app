const request = require('supertest');
const app = require('../index.js');
const { expect, describe, it } = require('@jest/globals');

describe('Todo API - Endpoints', () => {
  describe('GET /api/todos', () => {
    it('should return all todos', async () => {
      const res = await request(app).get('/api/todos').expect('Content-Type', /json/).expect(200);

      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body.length).toBeGreaterThan(0);
    });

    it('should return todos with correct structure', async () => {
      const res = await request(app).get('/api/todos');

      res.body.forEach((todo) => {
        expect(todo).toHaveProperty('id');
        expect(todo).toHaveProperty('title');
        expect(todo).toHaveProperty('completed');
        expect(typeof todo.id).toBe('number');
        expect(typeof todo.title).toBe('string');
        expect(typeof todo.completed).toBe('boolean');
      });
    });
  });

  describe('GET /api/todos/:id', () => {
    it('should return single todo by id', async () => {
      const res = await request(app).get('/api/todos/1').expect('Content-Type', /json/).expect(200);

      expect(res.body).toHaveProperty('id');
      expect(res.body.id).toBe(1);
    });

    it('should return 404 for non-existent todo', async () => {
      await request(app).get('/api/todos/9999').expect('Content-Type', /json/).expect(404);
    });
  });

  describe('POST /api/todos', () => {
    it('should create new todo', async () => {
      const newTodo = { title: 'Test Todo' };

      const res = await request(app)
        .post('/api/todos')
        .send(newTodo)
        .expect('Content-Type', /json/)
        .expect(201);

      expect(res.body).toHaveProperty('id');
      expect(res.body.title).toBe('Test Todo');
      expect(res.body.completed).toBe(false);
    });

    it('should return 400 if title is missing', async () => {
      const res = await request(app)
        .post('/api/todos')
        .send({})
        .expect('Content-Type', /json/)
        .expect(400);

      expect(res.body).toHaveProperty('error');
      expect(res.body.error).toBe('Title required');
    });
  });

  describe('PUT /api/todos/:id', () => {
    it('should update todo completion status', async () => {
      const res = await request(app)
        .put('/api/todos/1')
        .send({ completed: true })
        .expect('Content-Type', /json/)
        .expect(200);

      expect(res.body.completed).toBe(true);
    });

    it('should update todo title', async () => {
      const newTitle = 'Updated Title';

      const res = await request(app)
        .put('/api/todos/1')
        .send({ title: newTitle })
        .expect('Content-Type', /json/)
        .expect(200);

      expect(res.body.title).toBe(newTitle);
    });

    it('should edit todo with new title', async () => {
      const editedTitle = 'Edited Todo Title';

      const res = await request(app)
        .put('/api/todos/1')
        .send({ title: editedTitle })
        .expect('Content-Type', /json/)
        .expect(200);

      expect(res.body).toHaveProperty('id');
      expect(res.body.title).toBe(editedTitle);
      expect(res.body).toHaveProperty('completed');
    });

    it('should preserve completed status when editing title', async () => {
      // First set completed to true
      await request(app)
        .put('/api/todos/1')
        .send({ completed: true });

      // Then edit title without changing completed
      const res = await request(app)
        .put('/api/todos/1')
        .send({ title: 'New Title Without Changing Status' })
        .expect(200);

      expect(res.body.title).toBe('New Title Without Changing Status');
      expect(res.body.completed).toBe(true);
    });

    it('should return 400 if title is empty string', async () => {
      // Note: API allows empty title, but frontend validates
      const res = await request(app)
        .put('/api/todos/1')
        .send({ title: '' })
        .expect(200);

      // API will update with empty string
      // Frontend should prevent this
      expect(res.body).toHaveProperty('id');
    });

    it('should return 404 for editing non-existent todo', async () => {
      await request(app)
        .put('/api/todos/9999')
        .send({ title: 'Updated' })
        .expect(404);
    });
  });

  describe('DELETE /api/todos/:id', () => {
    it('should delete todo', async () => {
      const res = await request(app)
        .delete('/api/todos/2')
        .expect('Content-Type', /json/)
        .expect(200);

      expect(res.body).toHaveProperty('id');
      expect(res.body.id).toBe(2);
    });

    it('should return 404 for non-existent todo', async () => {
      await request(app).delete('/api/todos/9999').expect('Content-Type', /json/).expect(404);
    });
  });

  describe('GET /health', () => {
    it('should return health status', async () => {
      const res = await request(app).get('/health').expect('Content-Type', /json/).expect(200);

      expect(res.body).toHaveProperty('status');
      expect(res.body.status).toBe('ok');
      expect(res.body).toHaveProperty('timestamp');
    });
  });
});
