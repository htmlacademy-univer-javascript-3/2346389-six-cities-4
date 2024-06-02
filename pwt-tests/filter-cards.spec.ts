import { test, expect } from '@playwright/test';

test.describe('Filter Cards by Price and Rating', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173');

    await page.locator('.cities__card').first().waitFor();

    const filterMenu = await page.locator('.places__sorting-type').first();
    filterMenu.click();
  });

  test('Filter cards by price (low to high)', async ({page}) => {
    const filters = await page.locator('.places__option').all();
    // click on filter option
    await filters[1].click();
    await page.locator('.places__found').first().waitFor();
    await page.locator('.cities__card').first().waitFor();

    // get cards
    const cardElements = await page.locator('.cities__card').all();
    expect(cardElements.length).toBeGreaterThan(0);

    const pricesLocators = await page.locator('.cities__card .place-card__price-value').all();

    // get all prices
    const prices = await Promise.all(pricesLocators.map(async (locator) => {
      const text = await locator.innerText();
      return parseInt(text.replace(/^\D+/g, ''));
    }));

    // sort prices low to high
    const sortedPrices = [...prices].sort((a, b) => a - b);
    expect(prices).toEqual(sortedPrices);
  });

  test('Filter cards by price (high to low)', async ({page}) => {
    const filters = await page.locator('.places__option').all();
    // click on filter option
    await filters[2].click();
    await page.locator('.places__found').first().waitFor();
    await page.locator('.cities__card').first().waitFor();

    // get cards
    const cardElements = await page.locator('.cities__card').all();
    expect(cardElements.length).toBeGreaterThan(0);

    const pricesLocators = await page.locator('.cities__card .place-card__price-value').all();

    // get all prices
    const prices = await Promise.all(pricesLocators.map(async (locator) => {
      const text = await locator.innerText();
      return parseInt(text.replace(/^\D+/g, ''));
    }));

    // sort prices high to low
    const sortedPrices = [...prices].sort((a, b) => b - a);
    expect(prices).toEqual(sortedPrices);
  });

  test('Filter cards by rating (top rated first)', async ({page}) => {
    const filters = await page.locator('.places__option').all();
    // click on filter option
    await filters[3].click();
    await page.locator('.places__found').first().waitFor();
    await page.locator('.cities__card').first().waitFor();

    // get cards
    const cardElements = await page.locator('.cities__card').all();
    expect(cardElements.length).toBeGreaterThan(0);

    const ratingsLocators = await page.locator('.place-card__rating').all();

    // get all ratings
    const ratings = await Promise.all(ratingsLocators.map(async (locator) => {
      const rating = await locator.getAttribute('data-test');
      return await parseFloat(String(rating).replace(/^\D+/g, '') ?? '0');
    }));

    // sort ratings high to low
    const sortedRatings = [...ratings].sort((a, b) => b - a);
    expect(ratings).toEqual(sortedRatings);
  });
});

test.describe('Filter Cards by City', () => {
  test('Filter cards by city', async ({ page }) => {
    await page.goto('http://localhost:5173');

    await page.locator('.cities__card').first().waitFor();

    // get cities names
    const locations = await page.locator('.locations__item-link').all();
    for (const location of locations) {
      const cityNameTab = await location.getAttribute('city-name');

      await location.click();

      await page.locator('.places__found').first().waitFor();
      await page.locator('.cities__card').first().waitFor();

       // get cards
      const cardElements = await page.locator('.cities__card').all();
      expect(cardElements.length).toBeGreaterThan(0);

      const boardText = await page.locator('.places__found').first()?.evaluate((el) =>
        el.textContent?.trim()
      );
      // get city name
      const cityNameBoard = boardText?.split(' ').pop();
      // compare cities
      expect(cityNameTab).toBe(cityNameBoard);
    }
  });
});
