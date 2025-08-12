import { test, expect } from '@playwright/test';

test('homepage has Vite + React text', async ({ page }) => {
  await page.goto('http://localhost:5173');
  await expect(page.locator('h1')).toHaveText(/Vite \+ React/);
}); 