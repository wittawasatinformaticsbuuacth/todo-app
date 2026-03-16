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

    // Type new todo with unique timestamp
    const newTodoTitle = `Test Todo ${Date.now()}`;
    await todoInput.fill(newTodoTitle);

    // Click add button
    await addBtn.click();

    // Wait for the specific todo with our title to appear
    await page
      .locator('.todo-item:has(.todo-text:text-is("' + newTodoTitle + '"))')
      .waitFor({ state: 'attached', timeout: 5000 });

    // Check that input is cleared
    const inputValue = await todoInput.inputValue();
    expect(inputValue).toBe('');

    // Verify the todo is in the list
    const todoText = page.locator('.todo-text').filter({ hasText: newTodoTitle });
    await expect(todoText).toBeVisible();
  });

  test('should add todo with Enter key', async ({ page }) => {
    const todoInput = page.locator('#todoInput');

    // Clear input
    await todoInput.clear();

    // Type new todo with unique timestamp
    const newTodoTitle = `Enter Key Test ${Date.now()}`;
    await todoInput.fill(newTodoTitle);

    // Press Enter
    await todoInput.press('Enter');

    // Wait for the specific todo with our title to appear
    await page
      .locator('.todo-item:has(.todo-text:text-is("' + newTodoTitle + '"))')
      .waitFor({ state: 'attached', timeout: 5000 });

    // Verify the todo is in the list
    const todoText = page.locator('.todo-text').filter({ hasText: newTodoTitle });
    await expect(todoText).toBeVisible();

    // Verify input is cleared
    const inputValue = await todoInput.inputValue();
    expect(inputValue).toBe('');
  });

  test('should mark todo as completed', async ({ page }) => {
    // Create a unique todo to test completion
    const todoToComplete = `Complete Test ${Date.now()}`;
    const todoInput = page.locator('#todoInput');
    const addBtn = page.locator('#addBtn');

    // Add the todo
    await todoInput.clear();
    await todoInput.fill(todoToComplete);
    await addBtn.click();

    // Wait for the todo to appear
    await page
      .locator('.todo-item')
      .filter({ hasText: todoToComplete })
      .waitFor({ state: 'attached', timeout: 5000 });

    // Get the todo and check if it's completed (should be false initially)
    const todoItem = page.locator('.todo-item').filter({ hasText: todoToComplete }).first();
    const wasCompleted = await todoItem.evaluate((el) => el.classList.contains('completed'));
    expect(wasCompleted).toBe(false);

    // Click the checkbox to toggle completion
    const checkbox = todoItem.locator('.todo-checkbox');
    await checkbox.click();

    // Wait for network to settle
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(100);

    // Verify the todo is now marked as completed
    const updatedTodo = page.locator('.todo-item').filter({ hasText: todoToComplete }).first();
    const isNowCompleted = await updatedTodo.evaluate((el) => el.classList.contains('completed'));
    expect(isNowCompleted).toBe(true);

    // Reload to verify the change persisted
    await page.reload();
    await page.waitForLoadState('networkidle');

    // Verify completion state persisted
    const afterReloadTodo = page.locator('.todo-item').filter({ hasText: todoToComplete }).first();
    const persistedCompleted = await afterReloadTodo.evaluate((el) =>
      el.classList.contains('completed')
    );
    expect(persistedCompleted).toBe(true);
  });

  test('should delete todo', async ({ page }) => {
    // Create a unique todo to delete
    const todoToDelete = `Delete Test ${Date.now()}`;
    const todoInput = page.locator('#todoInput');
    const addBtn = page.locator('#addBtn');

    // Add a todo that we'll delete
    await todoInput.clear();
    await todoInput.fill(todoToDelete);
    await addBtn.click();

    // Wait for the todo to appear in the list
    await page
      .locator('.todo-item')
      .filter({ hasText: todoToDelete })
      .waitFor({ state: 'attached', timeout: 5000 });

    // Now delete it
    let dialogHandled = false;
    page.once('dialog', async (dialog) => {
      dialogHandled = true;
      await dialog.accept();
    });

    // Find and click delete button for our created todo
    const todoItem = page.locator('.todo-item').filter({ hasText: todoToDelete }).first();
    const deleteBtn = todoItem.locator('.delete-btn');
    await deleteBtn.click();

    // Wait for dialog and deletion to complete
    await page.waitForTimeout(300);
    await page.waitForLoadState('networkidle');

    // Verify dialog was shown
    expect(dialogHandled).toBe(true);

    // Verify the todo is no longer in the list by checking it doesn't exist
    await expect(page.locator('.todo-item').filter({ hasText: todoToDelete })).toHaveCount(0);
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
