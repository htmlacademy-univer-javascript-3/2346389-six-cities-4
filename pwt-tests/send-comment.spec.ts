import { test, expect } from '@playwright/test';

test.describe('Send Comment', () => {
  test('Should not let unauthorized user send a comment', async ({ page }) => {
    // load page and cards
    await page.goto('http://localhost:5173');
    await page.locator('.cities__card').first().waitFor();
    const cardElement = await page.locator('.cities__card').first();
    const aElement = await cardElement.locator('a').first();
    const href = await aElement.getAttribute('href');
    const cardId = href ? href.split('/').pop() : '';

    await cardElement.click();
    // wait for server response
    await page.waitForResponse((resp) => resp.url().includes(`/six-cities/offers/${cardId}`) && resp.status() === 200);
    // go to the card page
    page.waitForURL(`http://localhost:5173/offer/${cardId}`);
    const commentForm = await page.locator('.reviews__form');
    // check that the commentForm is hidden on the page
    expect(await commentForm.isHidden()).toBeTruthy();
  });

  test('Should let authorized user send a comment', async ({ page }) => {
    await page.goto('http://localhost:5173');
    await page.goto('http://localhost:5173/login');

    // fill in the form
    await page.fill('input[name="email"]', 'a@gmail.com');
    await page.fill('input[name="password"]', 'passwrd123');
    await page.click('button[type="submit"]');

    await page.locator('.cities__card').first().waitFor();
    const cardElement = await page.locator('.cities__card').first();
    const aElement = await cardElement.locator('a').first();
    const href = await aElement.getAttribute('href');
    const cardId = href ? href.split('/').pop() : '';

    await cardElement.click();
    // wait for server response
    await page.waitForResponse((resp) => resp.url().includes(`/six-cities/offers/${cardId}`) && resp.status() === 200);
    await page.locator('.offer__gallery').first().waitFor();
    // go to the card page
    page.waitForURL(`http://localhost:5173/offer/${cardId}`);
    const commentForm = await page.locator('.reviews__form');
    // expect the comment form is visible
    expect(await commentForm.isHidden()).not.toBeTruthy();
    await page.locator('.reviews__form').screenshot({path: 'img_test/send-comment/empty_rating.jpg'});

    // set rating
    const ratingInputs = await page.locator('.form__rating-label').all();
    await ratingInputs[0].click();

    // set comment
    const reviewText = 'Это стольный град,это лучший клуб.Это наш Зенит,это Петербург. Будет навсегда номером один. Только Петербург,только наш Зенит.';
    await page.fill('[name="review"]', reviewText);
    await page.screenshot({path: 'img_test/send-comment/comment.jpg'});

    await page.locator('button[type="submit"]').screenshot({path: 'img_test/send-comment/submit_button.jpg'});
    await page.screenshot({path: 'img_test/send-comment/set_comment.jpg'});
    await page.click('button[type="submit"]');

    // wait for server response
    await page.waitForResponse((resp) => resp.url().includes(`/six-cities/comments/${cardId}`) && resp.status() === 201);

    // wait for reviews to reload
    await page.locator('.offer__gallery').first().waitFor();
    // check the correspondence of comment
    const newReview = await page.locator('.reviews__item').first();
    const newReviewText = await newReview?.locator('.reviews__text').first()?.evaluate((el) =>
      el.textContent?.trim()
    );
    expect(newReviewText).toBe(reviewText);

    // check the correspondence of rating
    const newRating = await newReview?.locator('.reviews__stars').first()?.getAttribute('data-test');
    const newReviewRating = String(newRating).replace(/^\D+/g, '')
    expect(parseInt(newReviewRating)).toBe(5 * 20);

    // check the correspondence of name
    const newReviewUser = await newReview?.locator('.reviews__user-name').first()?.evaluate((el) =>
      el.textContent?.trim()
    );
    const userElement = await page.locator('.header__user-name').first();
    const userName = await userElement?.getAttribute('data-test');
    expect(newReviewUser).toBe(userName?.split('@')[0]);
    await page.screenshot({path: 'img_test/send-comment/reload_page.jpg'});
  });
});
