import { test, expect } from '@playwright/test';

test.describe('Login Form', () => {
  test('Go to log in page', async ({ page }) => {
    await page.goto('http://localhost:5173');
    await page.locator('.header__nav-link').first().waitFor();
    const loginButton = await page.locator('.header__login');
    await loginButton.first().click();
    await page.waitForURL('http://localhost:5173/login');
    await page.screenshot({path: 'img_test/login/login.jpg'});
  });

  test('Error log in with invalid password', async ({ page }) => {
    await page.goto('http://localhost:5173');
    await page.locator('.header__nav-link').first().waitFor();
    const loginButton = await page.locator('.header__login');
    await loginButton.first().click();
    await page.waitForURL('http://localhost:5173/login');
    // fill in the form
    await page.fill('input[name="email"]', 'vital@gmail.com');
    await page.fill('input[name="password"]', 'passwrd');
    await page.click('button[type="submit"]');

    // check whether the user has stayed on the login page
    const url = page.url();
    expect(url).toBe('http://localhost:5173/login');
    await page.screenshot({path: 'img_test/login/failed_login_page.jpg'});
  });

  test('Successful log in', async ({ page }) => {
    await page.goto('http://localhost:5173');
    await page.locator('.header__nav-link').first().waitFor();
    const loginButton = await page.locator('.header__login');
    await loginButton.first().click();
    await page.waitForURL('http://localhost:5173/login');
    // fill in the form
    const email = 'vit@gmail.com';
    await page.fill('input[name="email"]', email);
    await page.fill('input[name="password"]', 'passwrd6');
    await page.click('button[type="submit"]');

    await page.screenshot({path: 'img_test/login/login_page.jpg'});

    // wait for server response
    await page.waitForResponse((resp) => resp.url().includes('/six-cities/login') && resp.status() === 201);
    // redirecting to main page...
    await page.waitForURL('http://localhost:5173/');
    await page.locator('.cities__card').first().waitFor();
    await page.screenshot({path: 'img_test/login/login_mainpage.jpg'});
  });
});
