import { test, expect } from "@playwright/test";

test.describe("User login to Demobank", () => {

  test("Successful login", async ({ page }) => {
    await page.goto("https://demo-bank.vercel.app/");
    await page.getByTestId("login-input").fill("tester01");
    await page.getByTestId("password-input").fill("Frytka12");
    await page.getByTestId("login-button").click();

    await expect(page.getByTestId("user-name")).toHaveText("Jan Demobankowy");
  });

  test("unsuccessful login with too short user name", async ({ page }) => {
    await page.goto("https://demo-bank.vercel.app/");
    await page.getByTestId("login-input").fill("test");
    await page.getByTestId("password-input").click();

    await expect(page.getByTestId("error-login-id")).toHaveText(
      "identyfikator ma min. 8 znaków");
  });

  test("unsuccessful login with too short password", async ({ page }) => {
    await page.goto("https://demo-bank.vercel.app/");
    await page.getByTestId("login-input").fill("tester01");
    await page.getByTestId("password-input").fill("Fryt");
    await page.getByTestId("password-input").blur();

    await expect(page.getByTestId("error-login-password")).toHaveText("hasło ma min. 8 znaków");
  });
});
