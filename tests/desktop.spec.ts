import { test, expect } from '@playwright/test';
import { loginData } from '../test-data/login.data';

test.describe('Desktop tests', () => {
  test.beforeEach(async ({ page }) => {
    const userID = loginData.userID;
    const userPassword = loginData.userPassword;

    await page.goto('/');
    await page.getByTestId('login-input').fill(userID);
    await page.getByTestId('password-input').fill(userPassword);
    await page.getByTestId('login-button').click();
  });

  test('Quick payment with correct data', async ({ page }) => {
    // arrange
    const reciverID = '2';
    const transferAmount = '150';
    const transferTitle = 'zwrot';
    const transferMessage = page.locator('#show_messages');

    // act

    await page.locator('#widget_1_transfer_receiver').selectOption(reciverID);
    await page.locator('#widget_1_transfer_amount').fill(transferAmount);
    await page.locator('#widget_1_transfer_title').fill(transferTitle);

    await page.locator('#execute_btn').click();
    await page.getByTestId('close-button').click();

    //asert
    await transferMessage.waitFor();
    await expect(transferMessage).toHaveText(
      `Przelew wykonany! Chuck Demobankowy - ${transferAmount},00PLN - ${transferTitle}`,
    );
  });

  test('Successful phone recharge', async ({ page }) => {
    const topupReciver = '503 xxx xxx';
    const topupAmount = '50';
    const reciverMessage = page.locator('#show_messages');

    await page.locator('#widget_1_topup_receiver').selectOption(topupReciver);
    await page.locator('#widget_1_topup_amount').fill(topupAmount);
    //await page.locator('#uniform-widget_1_topup_agreement span').click();
    await page.locator('#widget_1_topup_agreement').click();

    //await page.getByRole('button', { name: 'doładuj telefon' }).click();
    await page.locator('#execute_phone_btn').click();
    await page.getByTestId('close-button').click();

    await reciverMessage.waitFor();
    await expect(reciverMessage).toHaveText(
      `Doładowanie wykonane! ${topupAmount},00PLN na numer ${topupReciver}`,
    );
  });

  test('Correct balance after Successful phone recharge', async ({ page }) => {
    const topUpReceiver = '503 xxx xxx';
    const topUpAmount = '50';
    const initialBalance = await page.locator('#money_value').innerText();
    const expectedBalance = Number(initialBalance) - Number(topUpAmount);

    await page.locator('#widget_1_topup_receiver').selectOption(topUpReceiver);
    await page.locator('#widget_1_topup_amount').fill(topUpAmount);
    //await page.locator('#uniform-widget_1_topup_agreement span').click();
    await page.locator('#widget_1_topup_agreement').click();

    //await page.getByRole('button', { name: 'doładuj telefon' }).click();
    await page.locator('#execute_phone_btn').click();
    await page.getByTestId('close-button').click();

    await expect(page.locator('#money_value')).toHaveText(`${expectedBalance}`);
  });
});
