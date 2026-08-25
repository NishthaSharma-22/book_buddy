import { test, expect } from "@playwright/test";
import { clerk } from "@clerk/testing/playwright";

test.describe("Browse page", () => {
  test.beforeEach(async ({ page }) => {
    await clerk.signIn({
      page,
      signInParams: {
        strategy: "password",
        identifier: process.env.TEST_USER_EMAIL!,
        password: process.env.TEST_USER_PASSWORD!,
      },
    });
  });

  test("loads and shows book cards", async ({ page }) => {
    await page.goto("/books");
    await expect(page.locator('a[href^="/books/"]').first()).toBeVisible();
  });

  test("search box is visible", async ({ page }) => {
    await page.goto("/books");
    await expect(
      page.getByPlaceholder("Search by title, subject, author, ISBN..."),
    ).toBeVisible();
  });

  test("filters button opens the filter panel", async ({ page }) => {
    await page.goto("/books");
    await page.getByRole("button", { name: /filters/i }).click();
    await expect(page.getByText("Filter books")).toBeVisible();
  });

  test("typing in search reduces visible book cards", async ({ page }) => {
    await page.goto("/books");
    const countBefore = await page.locator('a[href^="/books/"]').count();
    await page
      .getByPlaceholder("Search by title, subject, author, ISBN...")
      .fill("zzzznotabook");
    const countAfter = await page.locator('a[href^="/books/"]').count();
    expect(countAfter).toBeLessThan(countBefore);
  });

  test("clicking a book card navigates to its detail page", async ({
    page,
  }) => {
    await page.goto("/books");
    await page.locator('a[href^="/books/"]').first().click();
    await expect(page).toHaveURL(/\/books\/[a-z0-9]+/);
  });
});
