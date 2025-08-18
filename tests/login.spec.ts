import { test, expect } from '@playwright/test';

test.describe('User login to Demobank', () => {
  
  const userID = 'tester01';
  const uerPassword = 'Frytka12';
  const expectedUserName = 'Jan Demobankowy';
  
  test.beforeEach(async ({ page }) => {
    const urlDemoBank = 'https://demo-bank.vercel.app/';
    await page.goto(urlDemoBank);
    
    });

  test('Successful login', async ({ page }) => {
    //Arrange

    // Act
    await page.getByTestId('login-input').fill(userID);
    await page.getByTestId('password-input').fill(uerPassword);
    await page.getByTestId('login-button').click();

    // Assert
    await expect(page.getByTestId('user-name')).toHaveText(expectedUserName);
  });

  test('unsuccessful login with too short user name', async ({ page }) => {
    const incorrectLogin = 'test';

    await page.getByTestId('login-input').fill(incorrectLogin);
    await page.getByTestId('password-input').click();

    await expect(page.getByTestId('error-login-id')).toHaveText(
      'identyfikator ma min. 8 znaków',
    );
  });

  test('unsuccessful login with too short password', async ({ page }) => {
    const incorrectPassword = 'Fryt';
    const expectedErrorMessage = 'hasło ma min. 8 znaków';

    await page.getByTestId('login-input').fill(userID);
    await page.getByTestId('password-input').fill(incorrectPassword);
    await page.getByTestId('password-input').blur();

    await expect(page.getByTestId('error-login-password')).toHaveText(
      expectedErrorMessage,
    );
  });
});
