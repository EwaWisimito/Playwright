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
    await page.getByRole('link', { name: 'płatności' }).click();
  });

  test('Simple Payment', async ({ page }) => {
    const transferReceiver = 'Jan Testowy';
    const accountNumber = '12 3456 7890 1234 5678 9012 34568';
    const transferAmount = '222';

    await page.getByTestId('transfer_receiver').fill(transferReceiver);
    await page.getByTestId('form_account_to').fill(accountNumber);
    await page.getByTestId('form_amount').fill(transferAmount);
    await page.getByRole('button', { name: 'wykonaj przelew' }).click();
    await page.getByTestId('close-button').click();

    await expect(page.getByTestId('message-text')).toHaveText(
      `Przelew wykonany! ${transferAmount},00PLN dla ${transferReceiver}`,
    );
  });
});
