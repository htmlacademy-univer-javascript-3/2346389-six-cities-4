import { test, expect } from '@playwright/test';

test.describe('Favorites', () => {
  test('Redirect unauthorizes users to login page when trying to add to favorites from the main page',
    async ({ page }) => {
      // load page and cards
      await page.goto('http://localhost:5173');
      await page.locator('.cities__card').first().waitFor;
      const cardElement = await page.locator('.cities__card').first();
      // add to favorite button click
      await cardElement.locator('.place-card__bookmark-button').click();
      page.waitForURL('http://localhost:5173/login');
      await page.screenshot({path: 'img_test/favourites/login_page1.jpg'});
    });

  test('Redirect unauthorizes users to login page when trying to add to favorites from the offer page',
    async ({ page }) => {
      // load page and cards
      await page.goto('http://localhost:5173');
      await page.locator('.cities__card').first().waitFor;
      const cardElements = await page.locator('.cities__card');
      await cardElements.first().click();
      await page.locator('.offer__gallery').first().waitFor();
      const addToFavoritesButton = await page.locator('.offer__bookmark-button');
      // add to favorite button click
      await addToFavoritesButton.click();
      page.waitForURL('http://localhost:5173/login');
      await page.screenshot({path: 'img_test/favourites/login_page2.jpg'});
  });

  test('Redirect unauthorizes users to login page when trying to go to the favorites page by changing link',
    async ({ page }) => {
      await page.goto('http://localhost:5173');
      await page.locator('.cities__card').first().waitFor;
      await page.goto('http://localhost:5173/favorites');
      page.waitForURL('http://localhost:5173/login');
      await page.screenshot({path: 'img_test/favourites/login_page3.jpg'});
  });

  test('Redirect unauthorizes users to login page when trying to go to the favorites page by click',
    async ({ page }) => {
      await page.goto('http://localhost:5173');
      await page.locator('.cities__card').first().waitFor();
      const goToFavoritesButton = await page.locator('.header__nav-link.header__nav-link--profile');
      await goToFavoritesButton.click();
      page.waitForURL('http://localhost:5173/login');
      await page.screenshot({path: 'img_test/favourites/login_page4.jpg'});
  });

  test('Let authorized user add offer to favorites from the main page',
    async ({ page }) => {
      await page.goto('http://localhost:5173');
      await page.locator('.header__nav-link').first().waitFor();
      const loginButton = await page.locator('.header__login');
      await loginButton.first().click();
      await page.waitForURL('http://localhost:5173/login');
      // fill in the form
      const email = 'vita@gmail.com';
      await page.fill('input[name="email"]', email);
      await page.fill('input[name="password"]', 'passwrd6');
      await page.click('button[type="submit"]');

      await page.waitForURL('http://localhost:5173');
      // load cards
      await page.waitForSelector('.cities__card');

      const getFavoritesCount = async () =>
        parseInt(
          (await page.locator('.header__favorite-count').textContent()) || '0'
        );
      const initialFavoritesCount = await getFavoritesCount();
      const addToFavoritesButton = await page.locator('.place-card__bookmark-button').all();
      // add to favorites
      await addToFavoritesButton[0].click();

      //wait for server response
      await page.waitForResponse((resp) => resp.url().includes(`/six-cities/favorite/`)
          && resp.status() === 201);
      await page.waitForTimeout(100);
      expect(await getFavoritesCount()).toBe(initialFavoritesCount + 1);
      await page.screenshot({path: 'img_test/favourites/add_to_favourites.jpg'});

      // remove from favorites
      await addToFavoritesButton[0].click();
      //wait for server response
      await page.waitForResponse((resp) => resp.url().includes(`/six-cities/favorite/`) && resp.status() === 200);
      await page.waitForTimeout(100);
      expect(await getFavoritesCount()).toBe(initialFavoritesCount);
      await page.screenshot({path: 'img_test/favourites/remove_from_favourites.jpg'});
  });

  test('Let authorized user add offer to favorites from offer page',
    async ({ page }) => {
      await page.goto('http://localhost:5173');
      await page.goto('http://localhost:5173/login');
      // fill in the form
      const email = 'b@gmail.com';
      await page.fill('input[name="email"]', email);
      await page.fill('input[name="password"]', 'passwrd6');
      await page.click('button[type="submit"]');

      await page.waitForURL('http://localhost:5173');
      await page.locator('.cities__card').first().waitFor;
      const cardElements = await page.locator('.cities__card');
      await cardElements.first().click();
      await page.locator('.offer__gallery').first().waitFor();
      const addToFavoritesButton = await page.locator('.offer__bookmark-button');
      // add to favorite button click
      await addToFavoritesButton.click();

      const getFavoritesCount = async () =>
        parseInt(
          (await page.locator('.header__favorite-count').textContent()) || '0'
        );
      const initialFavoritesCount = await getFavoritesCount();

      //wait for server response
      await page.waitForResponse((resp) => resp.url().includes(`/six-cities/favorite/`)
          && resp.status() === 201);
      await page.waitForTimeout(100);
      expect(await getFavoritesCount()).toBe(initialFavoritesCount + 1);
      await page.screenshot({path: 'img_test/favourites/add_to_favourites2.jpg'});

      // remove from favorites
      await addToFavoritesButton.click();
      //wait for server response
      await page.waitForResponse((resp) => resp.url().includes(`/six-cities/favorite/`) && resp.status() === 200);
      await page.waitForTimeout(100);
      expect(await getFavoritesCount()).toBe(initialFavoritesCount);
      await page.screenshot({path: 'img_test/favourites/remove_from_favourites2.jpg'});
  });
});
