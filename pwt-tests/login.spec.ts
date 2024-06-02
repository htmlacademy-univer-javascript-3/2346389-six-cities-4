import { test, expect } from '@playwright/test';

test.describe('Login Form', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173'); // load page

    await page.locator('.header__nav-link').first().waitFor();
    const loginButton = await page.locator('.header__login');

    // go to login page
    await loginButton.first().click();
    await page.waitForURL('http://localhost:5173/login');
  });

  test('Successful log in', async ({ page }) => {
    const email = 'vitaliychaplin@gmail.com';
    // fill in the form
    await page.fill('input[name="email"]', email);
    await page.fill('input[name="password"]', 'passwrd6');

    // click submit button
    await page.click('button[type="submit"]');

    await page.screenshot({path: 'img_test/login_page.jpg'});

    // wait for server response
    await page.waitForResponse((resp) => resp.url().includes('/six-cities/login') && resp.status() === 201);
    await page.waitForURL('http://localhost:5173/');

    // redirecting to main page...

    await page.screenshot({path: 'img_test/login_mainpage.jpg'});

    // check the correspondence of emails
    const element = await page.locator('.header__user-name');
    const text = await element.getAttribute('data-test');
    expect(text).toEqual(email);
  });

  test('Error log in with invalid password', async ({ page }) => {
    // fill in the form
    await page.fill('input[name="email"]', 'vitaliy@gmail.com');
    await page.fill('input[name="password"]', 'passwrd');

    // click submit button
    await page.click('button[type="submit"]');

    await page.screenshot({path: 'img_test/failed_login_page.jpg'});

    // wait for the error message to appear
    await page.locator('.Toastify__toast-body').first().waitFor();

    await page.screenshot({path: 'img_test/failed_login_page2.jpg'});

    const url = page.url();
    // check whether the user has stayed on the login page
    expect(url).toBe('http://localhost:5173/login'); // page url should not change
  });
});
