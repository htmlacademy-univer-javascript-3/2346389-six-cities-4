import { test, expect } from '@playwright/test';

test.describe('Favorites', () => {
  test('Redirect unauthorizes users to login page when trying to add to favorites',
    async ({ page }) => {
      await page.goto('http://localhost:5173');

      // load cards
      await page.locator('.cities__card').first().waitFor;
      const cardElement = await page.locator('.cities__card').first();
      // add to favorite button click
      await cardElement.locator('.place-card__bookmark-button').click();
      // should redirect to login page
      page.waitForURL('http://localhost:5173/login');


      await page.goto('http://localhost:5173');

      // load cards
      await page.locator('.cities__card').first().waitFor;
      const cardElements = await page.locator('.cities__card');
      await cardElements.first().click();
      await page.locator('.offer__gallery').first().waitFor();
      const addToFavoritesButton = await page.locator('.offer__bookmark-button');
      // add to favorite button click
      await addToFavoritesButton.click();
      // should redirect to login page
      page.waitForURL('http://localhost:5173/login');
    });

  test('Redirect unauthorizes users to login page when trying to go to the favorites page',
  async ({ page }) => {
    await page.goto('http://localhost:5173');
    // load cards
    await page.locator('.cities__card').first().waitFor;
    // try to go to favorites
    await page.goto('http://localhost:5173/favorites');
    // should redirect to login page
    page.waitForURL('http://localhost:5173/login');
  });

  test('Let authorized user add offer to favorites', async ({ page }) => {
    const getFavoritesCount = async () =>
      parseInt(
        (await page.locator('.header__favorite-count').textContent()) || '0'
      );

    await page.goto('http://localhost:5173');
    await page.goto('http://localhost:5173/login');

    // fill in the form
    await page.fill('input[name="email"]', 'vitaliy@gmail.com');
    await page.fill('input[name="password"]', 'polytech123');
    await page.click('button[type="submit"]');

    await page.waitForURL('http://localhost:5173');
    // load cards
    await page.waitForSelector('.cities__card');

    const initialFavoritesCount = await getFavoritesCount();

    const addToFavoritesButton = await page.locator('.place-card__bookmark-button').all();
     // add to favorites
    await addToFavoritesButton[0].click();

    //wait for server response
    await page.waitForResponse((resp) => resp.url().includes(`/six-cities/favorite/`)
         && resp.status() === 201);
    await page.waitForTimeout(100);
    expect(await getFavoritesCount()).toBe(initialFavoritesCount + 1);

    // remove from favorites
    await addToFavoritesButton[0].click();
    //wait for server response
    await page.waitForResponse((resp) => resp.url().includes(`/six-cities/favorite/`) && resp.status() === 200);
    await page.waitForTimeout(100);
    expect(await getFavoritesCount()).toBe(initialFavoritesCount);
  });
});
