const { test, expect } = require('@playwright/test');

const loginPath = /\/login\/?(?:[?#].*)?$/;

test.describe('Login Page Automation Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/login');
  });

  test('TC-001: Login page loads', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Login', exact: true })).toBeVisible();
  });

  test('TC-002: Login fields are visible', async ({ page }) => {
    await expect(page.getByLabel('Username', { exact: true })).toBeVisible();
    await expect(page.getByLabel('Password', { exact: true })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Login', exact: true })).toBeVisible();
  });

  test('TC-003: Empty credentials', async ({ page }) => {
    await page.getByRole('button', { name: 'Login', exact: true }).click();
    await expect(page).toHaveURL(loginPath);
    await expect(page.getByLabel('Username', { exact: true })).toBeVisible();
  });

  test('TC-004: Invalid login', async ({ page }) => {
    await page.getByLabel('Username', { exact: true }).fill('invaliduser');
    await page.getByLabel('Password', { exact: true }).fill('wrongpassword');
    await page.getByRole('button', { name: 'Login', exact: true }).click();
    await expect(page).toHaveURL(loginPath);
    await expect(page.getByLabel('Password', { exact: true })).toBeVisible();
  });

  test('TC-005: Password is masked', async ({ page }) => {
    await expect(page.getByLabel('Password', { exact: true })).toHaveAttribute('type', 'password');
  });

  test('TC-006: Login with valid credentials', async ({ page }) => {
    await page.getByLabel('Username', { exact: true }).fill('Success');
    await page.getByLabel('Password', { exact: true }).fill('Success3400');
    await page.getByRole('button', { name: 'Login', exact: true }).click();

    // Assumes successful login navigates away from /login.
    await expect(page).not.toHaveURL(loginPath);
  });
});
