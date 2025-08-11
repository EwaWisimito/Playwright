import { test, expect } from "@playwright/test";


test.describe('Phone recharge tests', () => {

    test.only('Successful phone recharge', async ({ page }) => {
  await page.goto('https://demo-bank.vercel.app/');
  await page.getByTestId('login-input').fill('tester01');
  await page.getByTestId('password-input').fill('Frytka12');
  await page.getByTestId('login-button').click();

  await page.locator('#widget_1_topup_receiver').selectOption('503 xxx xxx');
  await page.locator('#widget_1_topup_amount').fill('50');
  //await page.locator('#uniform-widget_1_topup_agreement span').click();
  await page.locator('#widget_1_topup_agreement').click();

  //await page.getByRole('button', { name: 'doładuj telefon' }).click();
  await page.locator('#execute_phone_btn').click();
  await page.getByTestId('close-button').click();
  

  await expect(page.locator('#show_messages')).toHaveText('Doładowanie wykonane! 50,00PLN na numer 503 xxx xxx');


  });

   });