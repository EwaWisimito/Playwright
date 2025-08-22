import { test, expect } from '@playwright/test';

test.describe('Quick Payment tests', () => {
  test.beforeEach(async ({ page }) => {
    const userID = 'tester01';
    const uerPassword = 'Frytka12';

    await page.goto('/');
    await page.getByTestId('login-input').fill(userID);
    await page.getByTestId('password-input').fill(uerPassword);
    await page.getByTestId('login-button').click();
  });

  test('Quick payment with correct data', async ({ page }) => {
    // arrange
    const reciverID = '2';
    const transferAmount = '150';
    const transferTitle = 'zwrot';

    // act

    await page.locator('#widget_1_transfer_receiver').selectOption(reciverID);
    await page.locator('#widget_1_transfer_amount').fill(transferAmount);
    await page.locator('#widget_1_transfer_title').fill(transferTitle);

    //   await page.getByRole('button', { name: 'wykonaj' }).click();
    await page.locator('#execute_btn').click();
    await page.getByTestId('close-button').click();
    //   await page.getByRole('link', { name: 'Przelew wykonany! Chuck' }).click();

    //asert
    await expect(page.locator('#show_messages')).toHaveText(
      `Przelew wykonany! Chuck Demobankowy - ${transferAmount},00PLN - ${transferTitle}`,
    );
  });

  test('Successful phone recharge', async ({ page }) => {
    const topupReciver = '503 xxx xxx';
    const topupAmount = '50';

    await page.locator('#widget_1_topup_receiver').selectOption(topupReciver);
    await page.locator('#widget_1_topup_amount').fill(topupAmount);
    //await page.locator('#uniform-widget_1_topup_agreement span').click();
    await page.locator('#widget_1_topup_agreement').click();

    //await page.getByRole('button', { name: 'doładuj telefon' }).click();
    await page.locator('#execute_phone_btn').click();
    await page.getByTestId('close-button').click();

    await expect(page.locator('#show_messages')).toHaveText(
      `Doładowanie wykonane! ${topupAmount},00PLN na numer ${topupReciver}`,
    );
  });
});
