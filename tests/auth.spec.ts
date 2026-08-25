import test, { expect } from "@playwright/test";

test.describe("Auth protection", () => {
  test("redirects /book/add to sign-in when not logged in", async ({
    page,
  }) => {
    await page.goto("/books/add");
    await expect(page).toHaveURL(/sign-in/);
  });

  test("redirects /my-books to sign-in when not logged in", async ({
    page,
  }) => {
    await page.goto("/my-books");
    await expect(page).toHaveURL(/sign-in/);
  });

  test("redirects /books/messages to sign-in when not logged in", async ({
    page,
  }) => {
    await page.goto("/books/messages");
    await expect(page).toHaveURL(/sign-in/);
  });
});
