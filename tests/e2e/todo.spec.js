import { test, expect } from '@playwright/test';

test.describe('Todo App E2E Tests', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to home page before each test
    await page.goto('/');
    // Wait for page to load
    await page.waitForLoadState('networkidle');
  });

  test('should display home page', async ({ page }) => {
    // Check page title
    await expect(page.locator('h1')).toContainText('📝 Todo App');

    // Check subtitle
    await expect(page.locator('.subtitle')).toContainText(
      'Simple Full Stack Application with CI/CD'
    );

    // Check input field exists
    const input = page.locator('#todoInput');
    await expect(input).toBeVisible();

    // Check add button exists
    const addBtn = page.locator('#addBtn');
    await expect(addBtn).toBeVisible();
  });

  test('should load todos from API', async ({ page }) => {
    // Wait for todos to load
    await page.waitForSelector('.todo-item', { timeout: 5000 });

    // Check that todos are displayed
    const todos = page.locator('.todo-item');
    const count = await todos.count();
    expect(count).toBeGreaterThan(0);
  });

  test('should display API status', async ({ page }) => {
    // Wait for API status to update
    await page.waitForTimeout(1000);

    // Check API status
    const apiStatus = page.locator('#apiStatus');
    const statusText = await apiStatus.textContent();
    expect(statusText).toMatch(/✅|❌/);
  });

  test('should add new todo', async ({ page }) => {
    const todoInput = page.locator('#todoInput');
    const addBtn = page.locator('#addBtn');

    // Clear input if needed
    await todoInput.clear();

    // Type new todo
    const newTodoTitle = `Test Todo ${Date.now()}`;
    await todoInput.fill(newTodoTitle);

    // Get initial count
    const initialTodos = page.locator('.todo-item');
    const initialCount = await initialTodos.count();

    // Click add button
    await addBtn.click();

    // Wait for new todo to appear
    await page.waitForTimeout(500);

    // Check that todo count increased
    const updatedTodos = page.locator('.todo-item');
    const updatedCount = await updatedTodos.count();
    expect(updatedCount).toBe(initialCount + 1);

    // Check that input is cleared
    const inputValue = await todoInput.inputValue();
    expect(inputValue).toBe('');
  });

  test('should add todo with Enter key', async ({ page }) => {
    const todoInput = page.locator('#todoInput');
    const addBtn = page.locator('#addBtn');

    // Clear input
    await todoInput.clear();

    // Type new todo
    const newTodoTitle = `Enter Key Test ${Date.now()}`;
    await todoInput.fill(newTodoTitle);

    // Get initial count
    const initialTodos = page.locator('.todo-item');
    const initialCount = await initialTodos.count();

    // Press Enter
    await todoInput.press('Enter');

    // Wait for new todo to appear
    await page.waitForTimeout(500);

    // Check that todo count increased
    const updatedTodos = page.locator('.todo-item');
    const updatedCount = await updatedTodos.count();
    expect(updatedCount).toBe(initialCount + 1);
  });

  test('should mark todo as completed', async ({ page }) => {
    // Get first todo
    const firstTodo = page.locator('.todo-item').first();

    // Check if it has .completed class
    const hasCompletedBefore = await firstTodo.evaluate((el) => el.classList.contains('completed'));

    // Click checkbox
    const checkbox = firstTodo.locator('.todo-checkbox');
    await checkbox.click();

    // Wait for update
    await page.waitForTimeout(500);

    // Reload to verify
    await page.reload();
    await page.waitForLoadState('networkidle');

    // Check that todo is marked (or not) as completed
    const firstTodoAfter = page.locator('.todo-item').first();
    const hasCompletedAfter = await firstTodoAfter.evaluate((el) =>
      el.classList.contains('completed')
    );
    expect(hasCompletedAfter).not.toBe(hasCompletedBefore);
  });

  test('should delete todo', async ({ page }) => {
    // Get initial count
    const initialTodos = page.locator('.todo-item');
    const initialCount = await initialTodos.count();

    // Click delete button on first todo
    const deleteBtn = page.locator('.delete-btn').first();

    // Handle confirm dialog
    page.on('dialog', async (dialog) => {
      expect(dialog.type()).toBe('confirm');
      await dialog.accept();
    });

    // Click delete
    await deleteBtn.click();

    // Wait for deletion
    await page.waitForTimeout(500);

    // Check that todo count decreased
    const updatedTodos = page.locator('.todo-item');
    const updatedCount = await updatedTodos.count();
    expect(updatedCount).toBe(initialCount - 1);
  });

  test('should show error when adding empty todo', async ({ page }) => {
    const addBtn = page.locator('#addBtn');
    const errorDiv = page.locator('#error');

    // Click add without entering text
    await addBtn.click();

    // Wait for error
    await page.waitForTimeout(300);

    // Check error message
    const errorText = await errorDiv.textContent();
    expect(errorText).toContain('Please enter a todo title');
  });

  test('should display todo count', async ({ page }) => {
    // Wait for todos to load
    await page.waitForSelector('.todo-item', { timeout: 5000 });

    // Get todo count from UI
    const todoCountElement = page.locator('#todoCount');
    const displayedCount = await todoCountElement.textContent();

    // Get actual todo count
    const actualTodos = page.locator('.todo-item');
    const actualCount = await actualTodos.count();

    // They should match
    expect(parseInt(displayedCount)).toBe(actualCount);
  });

  test('should have API endpoints info section', async ({ page }) => {
    // Check info section exists
    const infoSection = page.locator('.info-section');
    await expect(infoSection).toBeVisible();

    // Check heading
    await expect(infoSection.locator('h3')).toContainText('📡 API Endpoints');

    // Check endpoints are listed
    const endpoints = infoSection.locator('li');
    const count = await endpoints.count();
    expect(count).toBe(5); // 5 endpoints
  });

  test('should be responsive on mobile', async ({ browser }) => {
    const context = await browser.newContext({
      viewport: { width: 375, height: 667 }, // iPhone size
    });
    const page = await context.newPage();

    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Check that page renders on mobile
    const heading = page.locator('h1');
    await expect(heading).toBeVisible();

    // Check input is visible
    const input = page.locator('#todoInput');
    await expect(input).toBeVisible();

    // Check button is visible and clickable
    const addBtn = page.locator('#addBtn');
    await expect(addBtn).toBeVisible();

    await context.close();
  });
});
