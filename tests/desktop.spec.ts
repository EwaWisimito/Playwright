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

  test('Quick payment with correct data', async ({ page }) => {
    // arrange
    const reciverID = '2';
    const transferAmount = '150';
    const transferTitle = 'zwrot';
    const expectedTransferMessage = `Przelew wykonany! Chuck Demobankowy - ${transferAmount},00PLN - ${transferTitle}`;

    // act
    await desktop.receiverInput.selectOption(reciverID);
    await desktop.transferAmountInput.fill(transferAmount);
    await desktop.transferTitleInput.fill(transferTitle);

    await desktop.desktopExecuteButton.click();
    await desktop.desktopCloseButton.click();

    //assert
    await expect(desktop.showMessages).toHaveText(expectedTransferMessage);
  });

  test('Successful phone recharge', async ({ page }) => {
    //Arrange
    const topupReciver = '503 xxx xxx';
    const topupAmount = '50';
    const expectedTopupMessage = `Doładowanie wykonane! ${topupAmount},00PLN na numer ${topupReciver}`;

    //Act
    await desktop.topUpReceiver.selectOption(topupReciver);
    await desktop.topUpAmount.fill(topupAmount);
    await desktop.topUpAgreement.click();

    await desktop.executePhoneButton.click();
    await desktop.desktopCloseButton.click();

    //Assert
    await expect(desktop.showMessages).toHaveText(expectedTopupMessage);
  });

  test('Correct balance after Successful phone recharge', async ({ page }) => {
    //Arrange
    const topUpReceiver = '503 xxx xxx';
    const topUpAmount = '50';
    const initialBalance = await desktop.topUpMoneyValue.innerText();
    const expectedBalance = Number(initialBalance) - Number(topUpAmount);

    //Act

    await desktop.topUpReceiver.selectOption(topUpReceiver);
    await desktop.topUpAmount.fill(topUpAmount);
    await desktop.topUpAgreement.click();

    await desktop.executePhoneButton.click();
    await desktop.desktopCloseButton.click();

    //Assert
    await expect(desktop.topUpMoneyValue).toHaveText(`${expectedBalance}`);
  });
});
