import { test, expect } from '@playwright/test';

test.describe('Error Handling and Recovery Flow', () => {
  test.beforeEach(async ({ page }) => {
    // Don't set up any mocks in beforeEach - each test will set up its own mocks
    await page.goto('http://localhost:5173');
  });

  test('should handle API server error when loading profiles', async ({ page }) => {
    // Mock API to return server error
    await page.route('**/profiles/next', async (route) => {
      await route.fulfill({
        status: 500,
        contentType: 'application/json',
        body: JSON.stringify({ error: 'Internal server error' })
      });
    });

    // Mock decide endpoint to avoid errors during decision flow
    await page.route('**/profiles/*/decide', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ matched: false })
      });
    });

    // Mock reset endpoint
    await page.route('**/profiles/reset', async (route) => {
      await route.fulfill({
        status: 200,
        body: ''
      });
    });

    // Should show error message
    await expect(page.locator('[data-testid="error-display"]')).toBeVisible();
    await expect(page.locator('[data-testid="error-display"]')).toContainText('Failed to fetch');
    
    // Should show retry button
    await expect(page.locator('[data-testid="retry-button"]')).toBeVisible();
  });

  test('should handle network timeout when loading profiles', async ({ page }) => {
    // Mock API to simulate timeout
    await page.route('**/profiles/next', async (route) => {
      // Simulate timeout by not fulfilling the request
      // This will cause the fetch to timeout
      await route.abort('failed');
    });

    // Mock decide endpoint
    await page.route('**/profiles/*/decide', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ matched: false })
      });
    });

    // Mock reset endpoint
    await page.route('**/profiles/reset', async (route) => {
      await route.fulfill({
        status: 200,
        body: ''
      });
    });

    // Should show error message after timeout
    await expect(page.locator('[data-testid="error-display"]')).toBeVisible();
    // Network errors might show different messages, so we check for a partial match
    await expect(page.locator('[data-testid="error-display"]')).toContainText('Failed to fetch');
  });

  

  test('should handle 404 not found error', async ({ page }) => {
    // Mock API to return 404
    await page.route('**/profiles/next', async (route) => {
      await route.fulfill({
        status: 404,
        contentType: 'application/json',
        body: JSON.stringify({ error: 'Not found' })
      });
    });

    // Mock decide endpoint
    await page.route('**/profiles/*/decide', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ matched: false })
      });
    });

    // Mock reset endpoint
    await page.route('**/profiles/reset', async (route) => {
      await route.fulfill({
        status: 200,
        body: ''
      });
    });

    // Should show error message
    await expect(page.locator('[data-testid="error-display"]')).toBeVisible();
    await expect(page.locator('[data-testid="error-display"]')).toContainText('Failed to fetch');
  });
});
