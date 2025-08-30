import { test, expect } from '@playwright/test';
import { loginData } from '../test-data/login.data';
import { LoginPage } from '../pages/login.page';
import { Desktop } from '../pages/desktop.page';

test.describe('User login to Demobank', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    loginPage = new LoginPage(page);
  });

  test(
    'Successful loginwith correct credential',
    {
      tag: ['@login', '@smoke'],
      annotation: {
        type: 'Happy path',
        description: 'Basic happy path for login',
      },
    },
    async ({ page }) => {
      //Arrange
      const userID = loginData.userID;
      const userPassword = loginData.userPassword;
      const expectedUserName = 'Jan Demobankowy';

      // Act
      await loginPage.login(userID, userPassword);

      // Assert
      const desktop = new Desktop(page);
      await expect(desktop.userNameID).toHaveText(expectedUserName);
    },
  );

  test(
    'unsuccessful login with too short user name',
    { tag: ['@login'] },
    async ({ page }) => {
      //Arrange
      const incorrectLogin = 'test';
      const expectedErrorLoginMessage = 'identyfikator ma min. 8 znaków';

      //Act
      await loginPage.loginInput.fill(incorrectLogin);
      await loginPage.passwordInput.click();

      //Assert
      await expect(loginPage.loginError).toHaveText(expectedErrorLoginMessage);
    },
  );

  test(
    'unsuccessful login with too short password',
    { tag: '@login' },
    async ({ page }) => {
      //Arrange
      const userID = loginData.userID;
      const incorrectPassword = 'Fryt';
      const expectedErrorMessage = 'hasło ma min. 8 znaków';

      //Act
      await loginPage.loginInput.fill(userID);
      await loginPage.passwordInput.fill(incorrectPassword);
      await loginPage.passwordInput.blur();

      //Assert
      await expect(loginPage.passwordError).toHaveText(expectedErrorMessage);
    },
  );
});
