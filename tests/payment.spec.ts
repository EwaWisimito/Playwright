import { test, expect } from '@playwright/test';
import { loginData } from '../test-data/login.data';

test.describe('Payment Tab tests', () => {

  test.beforeEach(async ({ page }) => {
    const userID = loginData.userID;
    const userPassword = loginData.userPassword;

    await page.goto('/');
    await page.getByTestId('login-input').fill(userID);
    await page.getByTestId('password-input').fill(userPassword);
    await page.getByTestId('login-button').click();
  });

  test('Simple Payment', async ({ page }) => {
    await page.locator('body').click();

  });
});
