import { test, expect } from '@playwright/test';

test.describe('Load cards from server', () => {
  test('Correct card`s data loading from the server', async ({ page }) => {
    // load page and cards
    await page.goto('http://localhost:5173');
    await page.waitForResponse((resp) => resp.url().includes('/six-cities/offers') && resp.status() === 200);
    await page.locator('.cities__card').first().waitFor();

    // check the availability of cards
    const cardElements = await page.locator('.cities__card').all();
    expect(cardElements.length > 0);

    for (const card of cardElements) {
      // check card's attributes
      const card_text = await card.innerText();
      expect(card_text).toContain('night');
      expect(card_text).toContain('To bookmarks');
      expect(card_text).toContain('Rating');

      const price = card_text.replace(/^\D+/g, '');
      expect(!isNaN(parseInt(price))).toBe(true);

      await page.screenshot({path: 'img_test/load-offers-cards/cards.jpg'});
    }
  });
});
