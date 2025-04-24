# Test info

- Name: authenticated user: Movies >> should load and display list of user watch list
- Location: /Users/mitradavoudi/Desktop/courses/Coding-Challenge/movie-db-app/tests/homepage.spec.ts:49:7

# Error details

```
Error: browserType.launch: Executable doesn't exist at /Users/mitradavoudi/Library/Caches/ms-playwright/chromium_headless_shell-1169/chrome-mac/headless_shell
╔═════════════════════════════════════════════════════════════════════════╗
║ Looks like Playwright Test or Playwright was just installed or updated. ║
║ Please run the following command to download new browsers:              ║
║                                                                         ║
║     npx playwright install                                              ║
║                                                                         ║
║ <3 Playwright Team                                                      ║
╚═════════════════════════════════════════════════════════════════════════╝
```

# Test source

```ts
   1 | import { test, expect } from "@playwright/test";
   2 |
   3 | test.describe("Unauthenticated user", () => {
   4 |   test("can access register page:", async ({ page }) => {
   5 |     await page.goto("/register");
   6 |
   7 |     await expect(
   8 |       page.getByRole("heading", { name: /Register/i })
   9 |     ).toBeVisible();
  10 |   });
  11 |   test("can access login page:", async ({ page }) => {
  12 |     await page.goto("/login");
  13 |
  14 |     await expect(page.getByRole("heading", { name: /Login/i })).toBeVisible();
  15 |   });
  16 | });
  17 |
  18 | test.describe("authenticated user: private routes access", () => {
  19 |   test.beforeEach(async ({ page, context }) => {
  20 |     await page.goto("/login");
  21 |     const emailInput = page.locator('input[name="email"]');
  22 |     const passwordInput = page.locator('input[name="password"]');
  23 |     await emailInput.fill("hassan@gmail.com");
  24 |     await passwordInput.fill("123456a@");
  25 |     const loginBtn = page.getByRole("button", {
  26 |       name: /Login/i,
  27 |     });
  28 |
  29 |     loginBtn.click();
  30 |     await page.waitForURL("/dashboard");
  31 |   });
  32 |   test("can access dashboard page:", async ({ page }) => {
  33 |     await expect(
  34 |       page.getByRole("heading", { name: /User Watch List/i })
  35 |     ).toBeVisible();
  36 |   });
  37 | });
  38 |
  39 | test.describe("authenticated user: Movies", () => {
  40 |   test.beforeEach(async ({ page, context }) => {
  41 |     await page.goto("/login");
  42 |     await page.fill('input[name="email"]', "hassan@gmail.com");
  43 |     await page.fill('input[name="password"]', "123456a@");
  44 |     await page.getByRole("button", { name: "Login" }).click();
  45 |
  46 |     await page.waitForURL("/dashboard");
  47 |   });
  48 |
> 49 |   test("should load and display list of user watch list", async ({ page }) => {
     |       ^ Error: browserType.launch: Executable doesn't exist at /Users/mitradavoudi/Library/Caches/ms-playwright/chromium_headless_shell-1169/chrome-mac/headless_shell
  50 |     await page.waitForSelector("h1", { state: "visible" });
  51 |
  52 |     const movies = await page.locator("h1").count();
  53 |     expect(movies).toBeTruthy();
  54 |   });
  55 |
  56 |   test("should display list of movies when user clicks on a Home", async ({
  57 |     page,
  58 |   }) => {
  59 |     const Home = page.locator("nav").first();
  60 |
  61 |     const homeTitle = await Home.textContent();
  62 |     expect(homeTitle).toBeTruthy();
  63 |   });
  64 | });
  65 |
```