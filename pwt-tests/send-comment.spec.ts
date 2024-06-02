import { test, expect } from '@playwright/test';

test.describe('Send Comment', () => {
  test('Should not let unauthorized user send a comment', async ({ page }) => {
    // load page
    await page.goto('http://localhost:5173');

    // load cards
    await page.locator('.cities__card').first().waitFor();
    const cardElements = await page.locator('.cities__card');
    await cardElements.first().click();

    // wait for offer page to load
    await page.locator('.offer__gallery').first().waitFor();
    const commentForm = await page.locator('.reviews__form');
    // check that the commentForm is hidden on the page
    expect(await commentForm.isHidden()).toBeTruthy();
  });

  test('Should let authorized user send a comment', async ({ page }) => {
    await page.goto('http://localhost:5173');
    await page.goto('http://localhost:5173/login');

    // fill in the form
    await page.fill('input[name="email"]', 'email@gmail.com');
    await page.fill('input[name="password"]', 'passwrd123');
    await page.click('button[type="submit"]');

    await page.locator('.cities__card').first().waitFor(); // load cards
    const cardElement = await page.locator('.cities__card').first();

    // get first card's id
    const aElement = await cardElement.locator('a').first();
    const href = await aElement.getAttribute('href');
    const cardId = href ? href.split('/').pop() : '';

    await cardElement.click();

    // go to the card page
    await page.waitForURL(`http://localhost:5173/offer/${ cardId}`);
    await page.locator('.offer__gallery').first().waitFor();

    const commentForm = await page.locator('.reviews__form');
    // expect the comment form is visible
    expect(await commentForm.isHidden()).not.toBeTruthy();

    // set comment
    const reviewText = 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.';
    await page.fill('[name="review"]', reviewText);

    // set rating
    const ratingInputs = await page.locator('.form__rating-label').all();
    await ratingInputs[0].click();

    await page.click('button[type="submit"]');

    // wait for server response
    await page.waitForResponse((resp) => resp.url().includes(`/six-cities/comments/${ cardId}`) && resp.status() === 201);

    // wait for reviews to reload
    await page.locator('.offer__gallery').first().waitFor();
    const newReview = await page.locator('.reviews__item').first();

    const newReviewText = await newReview?.locator('.reviews__text').first()?.evaluate((el) =>
      el.textContent?.trim()
    );

    // check the correspondence of comment
    expect(newReviewText).toBe(reviewText);

    // make sure rating is correct
    const newReviewRating = await newReview?.locator('.reviews__stars').first()?.getAttribute('data-test');
    expect(parseInt(String(newReviewRating).replace(/^\D+/g, ''))).toBe(5 * 20);

    const newReviewUser = await newReview?.locator('.reviews__user-name').first()?.evaluate((el) =>
      el.textContent?.trim()
    );
    const element = await page.locator('.header__user-name').first();
    const headerUser = await element?.getAttribute('data-test');
    // check the correspondence of emails
    expect(newReviewUser).toBe(headerUser?.split('@')[0]);
  });
});
