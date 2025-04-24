import { test, expect } from "@playwright/test";

test.describe("Unauthenticated user", () => {
  test("can access register page:", async ({ page }) => {
    await page.goto("/register");

    await expect(
      page.getByRole("heading", { name: /Register/i })
    ).toBeVisible();
  });
  test("can access login page:", async ({ page }) => {
    await page.goto("/login");

    await expect(page.getByRole("heading", { name: /Login/i })).toBeVisible();
  });

  test("should display list of movies when user clicks on a Home", async ({
    page,
  }) => {
    await page.goto("/");
    const Home = page.locator("nav").first();

    const homeTitle = await Home.textContent();
    expect(homeTitle).toBeTruthy();
  });
});

test.describe("authenticated user: private routes access", () => {
  test.beforeEach(async ({ page, context }) => {
    await page.goto("/login");
    const emailInput = page.locator('input[name="email"]');
    const passwordInput = page.locator('input[name="password"]');
    await emailInput.fill("mitra@gmail.com");
    await passwordInput.fill("123456a@");
    const loginBtn = page.getByRole("button", {
      name: /Login/i,
    });

    loginBtn.click();
    await page.waitForURL("/dashboard");
  });
  test("can access dashboard page:", async ({ page }) => {
    await expect(
      page.getByRole("heading", { name: /User Watch List/i })
    ).toBeVisible();
  });
});

test.describe("authenticated user: Movies", () => {
  test.beforeEach(async ({ page, context }) => {
    await page.goto("/login");
    await page.fill('input[name="email"]', "mitra@gmail.com");
    await page.fill('input[name="password"]', "123456a@");
    await page.getByRole("button", { name: "Login" }).click();

    await page.waitForURL("/dashboard");
  });

  test("should display list of movies when user clicks on a Home", async ({
    page,
  }) => {
    await page.getByRole("link", { name: "Home" }).click();

    await page.waitForURL("/");

    const allCards = await page.locator("a.block");

    await expect(page.locator("a.block").first()).toBeVisible();
  });

  test("should display movie details page when user clicks on a movie card", async ({
    page,
  }) => {
    await page.getByRole("link", { name: "Home" }).click();

    await page.waitForURL("/");

    await page.getByAltText("avatar 5").click();

    await page.waitForURL("/movies/393209");

    await expect(page.getByRole("heading", { name: "Overview" })).toBeVisible();
  });
});
