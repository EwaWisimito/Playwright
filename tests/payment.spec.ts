import { test, expect } from '@playwright/test';
import { loginData } from '../test-data/login.data';
import { LoginPage } from '../pages/login.page';
import { Payment } from '../pages/payment.page';
import { Desktop } from '../pages/desktop.page';

test.describe('Payment Tab tests', () => {
  let payment: Payment;

  test.beforeEach(async ({ page }) => {
    //Arrange
    const userID = loginData.userID;
    const userPassword = loginData.userPassword;

    //Act
    const loginPage = new LoginPage(page);
    await page.goto('/');
    await loginPage.login(userID, userPassword);

    //Assert
    const desktop = new Desktop(page);
    await desktop.sideMenu.paymentMenuButton.click();

    payment = new Payment(page);
  });

  test('Simple Payment', async ({ page }) => {
    //Arrange
    const transferReceiver = 'Jan Testowy';
    const accountNumber = '12 3456 7890 1234 5678 9012 34568';
    const transferAmount = '222';
    const expectedTransferMessage = `Przelew wykonany! ${transferAmount},00PLN dla ${transferReceiver}`;

    //Act
    await payment.transferReceiverInput.fill(transferReceiver);
    await payment.accountNumberInput.fill(accountNumber);
    await payment.amountInput.fill(transferAmount);
    await payment.executeTransferButton.click();
    await payment.closeButton.click();

    //Assert
    await expect(payment.transferMessageText).toHaveText(
      expectedTransferMessage,
    );
  });
});
