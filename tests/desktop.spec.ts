import { test, expect } from '@playwright/test';
import { loginData } from '../test-data/login.data';
import { LoginPage } from '../pages/login.page';
import { Desktop } from '../pages/desktop.page';

test.describe('Desktop tests', () => {
  let desktop: Desktop;

  test.beforeEach(async ({ page }) => {
    const userID = loginData.userID;
    const userPassword = loginData.userPassword;

    await page.goto('/');

    const loginPage = new LoginPage(page);

    await loginPage.login(userID, userPassword);

    desktop = new Desktop(page);
  });

  test.only(
    'Quick payment with correct data',
    {
      tag: ['@desktop', '@integration'],
      annotation: {
        type: 'Documentation',
        description: 'https://jaktestowac.pl/course/playwright-wprowadzenie/',
      },
    },
    async ({ page }) => {
      // arrange
      const reciverID = '2';
      const transferAmount = '150';
      const transferTitle = 'zwrot';
      const expectedTransferMessage = `Przelew wykonany! Chuck Demobankowy - ${transferAmount},00PLN - ${transferTitle}`;

      // act
      await desktop.makeQuickPayment(reciverID, transferAmount, transferTitle);

      //assert
      await expect(desktop.showMessages).toHaveText(expectedTransferMessage);
    },
  );

  test(
    'Successful phone recharge',
    { tag: ['@desktop', '@integration'] },
    async ({ page }) => {
      //Arrange
      const topupReciver = '503 xxx xxx';
      const topupAmount = '50';
      const expectedTopupMessage = `Doładowanie wykonane! ${topupAmount},00PLN na numer ${topupReciver}`;

      //Act
      await desktop.rechargePhone(topupReciver, topupAmount);

      //Assert
      await expect(desktop.showMessages).toHaveText(expectedTopupMessage);
    },
  );

  test(
    'Correct balance after Successful phone recharge',
    { tag: ['@desktop', '@integration'] },
    async ({ page }) => {
      //Arrange
      const topupReciver = '503 xxx xxx';
      const topupAmount = '50';
      const initialBalance = await desktop.topUpMoneyValue.innerText();
      const expectedBalance = Number(initialBalance) - Number(topupAmount);

      //Act

      await desktop.rechargePhone(topupReciver, topupAmount);

      //Assert
      await expect(desktop.topUpMoneyValue).toHaveText(`${expectedBalance}`);
    },
  );
});
