import { test, expect } from '@playwright/test';

test.describe('Loading Cards from server', () => {
  test('Correct card`s data loading from the server', async ({ page }) => {
    // load page
    await page.goto('http://localhost:5173');

    // wait for server response
    await page.waitForResponse((resp) => resp.url().includes('/six-cities/offers') && resp.status() === 200);

    // load cards
    await page.locator('.cities__card').first().waitFor();

    // check the availability of cards
    const cardElements = await page.locator('.cities__card').all();
    expect(cardElements.length).toBeGreaterThan(0);

    for (const element of cardElements) {
      // check card's attributes
      const text = await element.innerText();
      expect(text).toContain('night');
      expect(text).toContain('To bookmarks');
      expect(text).toContain('Rating');

      // check price availability
      const number = text.replace(/^\D+/g, '');
      expect(!isNaN(parseInt(number))).toBe(true);
    }
  });
});
