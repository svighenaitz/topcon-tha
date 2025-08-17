import { test, expect } from '@playwright/test';

test.describe('Critical Path E2E Tests (Robust)', () => {
  test.beforeEach(async ({ page }) => {
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

    await page.goto('http://localhost:5173');
  });

  test('Critical Path 1: Profile Loading and Display Flow', async ({ page }) => {
    // Mock API to return a profile
    await page.route('**/profiles/next', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          id: 'profile-1',
          name: 'Alice Johnson',
          age: 28,
          bio: 'Love hiking and coffee ☕',
          photoUrl: 'https://example.com/alice.jpg'
        })
      });
    });

    // Wait for either skeleton or profile to appear (handles fast loading)
    await expect(async () => {
      const skeleton = page.locator('[data-testid="profile-card-skeleton"]');
      const profile = page.locator('[data-testid="profile-card"]');
      
      // Check if either skeleton or profile is visible
      const skeletonVisible = await skeleton.isVisible();
      const profileVisible = await profile.isVisible();
      
      if (!skeletonVisible && !profileVisible) {
        throw new Error('Neither skeleton nor profile is visible');
      }
    }).toPass();

    // Eventually should load and display profile
    await expect(page.locator('[data-testid="profile-card"]')).toBeVisible();
    await expect(page.locator('[data-testid="profile-name"]')).toHaveText('Alice Johnson, 28');
    await expect(page.locator('[data-testid="profile-age"]')).toHaveText('28');
    await expect(page.locator('[data-testid="profile-bio"]')).toHaveText('Love hiking and coffee ☕');

    // Should show both like and dislike buttons
    await expect(page.locator('[data-testid="like-button"]')).toBeVisible();
    await expect(page.locator('[data-testid="dislike-button"]')).toBeVisible();
  });

  test('Critical Path 2: Profile Decision and Match Flow', async ({ page }) => {
    // Mock API to return a profile
    await page.route('**/profiles/next', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          id: 'profile-1',
          name: 'Sarah Wilson',
          age: 26,
          bio: 'Adventure seeker and dog lover 🐕',
          photoUrl: 'https://example.com/sarah.jpg'
        })
      });
    });

    // Mock decide endpoint to return a match
    await page.route('**/profiles/*/decide', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ matched: true })
      });
    });

    // Wait for profile to load
    await expect(page.locator('[data-testid="profile-card"]')).toBeVisible();
    await expect(page.locator('[data-testid="profile-name"]')).toHaveText('Sarah Wilson, 26');

    // Click like button to trigger match
    await page.click('[data-testid="like-button"]');

    // Should show match notification
    await expect(page.locator('[data-testid="match-notification"]')).toBeVisible();
    await expect(page.locator('text=It\'s a match!')).toBeVisible();
    
    // Should show okay button to dismiss match
    await expect(page.locator('[data-testid="okay-button"]')).toBeVisible();
  });

  test('Critical Path 3: Error Handling and Recovery Flow', async ({ page }) => {
    // Mock API to return server error
    await page.route('**/profiles/next', async (route) => {
      await route.fulfill({
        status: 500,
        contentType: 'application/json',
        body: JSON.stringify({ error: 'Internal server error' })
      });
    });

    // Should show error message
    await expect(page.locator('[data-testid="error-display"]')).toBeVisible();
    await expect(page.locator('text=Failed to fetch next profile: 500')).toBeVisible();
    
    // Should show retry button
    await expect(page.locator('[data-testid="retry-button"]')).toBeVisible();

    // Mock API to succeed on retry
    await page.route('**/profiles/next', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          id: 'profile-1',
          name: 'Emma Davis',
          age: 29,
          bio: 'Coffee addict and book lover 📚',
          photoUrl: 'https://example.com/emma.jpg'
        })
      });
    });

    // Click retry button
    await page.click('[data-testid="retry-button"]');
    
    // Wait for either skeleton or profile to appear (handles fast loading)
    await expect(async () => {
      const skeleton = page.locator('[data-testid="profile-card-skeleton"]');
      const profile = page.locator('[data-testid="profile-card"]');
      
      // Check if either skeleton or profile is visible
      const skeletonVisible = await skeleton.isVisible();
      const profileVisible = await profile.isVisible();
      
      if (!skeletonVisible && !profileVisible) {
        throw new Error('Neither skeleton nor profile is visible after retry');
      }
    }).toPass();
    
    // Should load profile successfully after retry
    await expect(page.locator('[data-testid="profile-card"]')).toBeVisible();
    await expect(page.locator('[data-testid="profile-name"]')).toHaveText('Emma Davis, 29');
  });
});
