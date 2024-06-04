import { test, expect } from '@playwright/test';

test.describe('Click on card', () => {
  test('Checking the operability of the card transition', async ({ page }) => {
    // load page and cards
    await page.goto('http://localhost:5173');
    await page.locator('.cities__card').first().waitFor();
    const cardElement = await page.locator('.cities__card').first();

    // get card's parameters
    const cardNameElement = await cardElement.locator('.place-card__name a').first();
    const cardName = await cardNameElement.evaluate((el) => el.textContent?.trim());
    const cardPriceElement = await cardElement.locator('.place-card__price-value').first();
    const cardPrice = await cardPriceElement.evaluate((el) => el.textContent?.trim());
    const aElement = await cardElement.locator('a').first();
    const href = await aElement.getAttribute('href');
    const cardId = href ? href.split('/').pop() : '';

    await cardElement.click();
    // wait for server response
    await page.waitForResponse((resp) => resp.url().includes(`/six-cities/offers/${cardId}`) && resp.status() === 200);
    // go to the card page
    page.waitForURL(`http://localhost:5173/offer/${cardId}`);

    // get card's parameters
    const offerNameElement = await page.locator('.offer__name').first();
    const offerName = await offerNameElement.evaluate((el) => el.textContent?.trim());
    const offerPriceElement = await page.locator('.offer__price-value').first();
    const offerPrice = await offerPriceElement.evaluate((el) => el.textContent?.trim());

    await page.screenshot({path: 'img_test/open-card/card_page.jpg'});

    // check the correspondence of parameters
    expect(offerName).toBe(cardName);
    expect(offerPrice).toBe(cardPrice);
  });
});
