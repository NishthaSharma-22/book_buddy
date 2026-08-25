import test, { expect } from "@playwright/test";

test.describe("Landing Page", () => {
  test("shows the book_buddy heading", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole('main').getByRole('heading', { name: 'book_buddy' })).toBeVisible();});

  test("shows the sign up button", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByText("Sign up to get started")).toBeVisible();
  });

  test("plays the hero video", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("video")).toBeVisible({ timeout: 10000 });
  });
});
