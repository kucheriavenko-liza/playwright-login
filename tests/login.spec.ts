import { test, expect } from './fixtures/fixtures';

const VALID_EMAIL = 'test@example.com';
const VALID_PASSWORD = 'Password123';
const INVALID_PASSWORD = 'wrongpassword';
const INVALID_EMAIL = 'invalid-email';

test.describe('Login Page', () => {
  test('successful login with valid credentials', async ({ loginPage }) => {
    await loginPage.open();
    await expect(loginPage.emailInput).toBeVisible();
    await expect(loginPage.passwordInput).toBeVisible();
    await expect(loginPage.loginButton).toBeEnabled();

    await loginPage.login(VALID_EMAIL, VALID_PASSWORD);
    await expect(loginPage.successMessage).toBeVisible();
  });

  test('unsuccessful login with invalid password', async ({ loginPage }) => {
    await loginPage.open();
    await loginPage.login(VALID_EMAIL, INVALID_PASSWORD);
    await expect(loginPage.errorMessage).toBeVisible();
  });

  test('failed login with empty email and password fields', async ({ loginPage }) => {
    await loginPage.open();
    await loginPage.login('', '');

    await expect(loginPage.emailInput).toHaveAttribute('required');
    await expect(loginPage.passwordInput).toHaveAttribute('required');

    const emailValid = await loginPage.emailInput.evaluate((el: HTMLInputElement) => el.validity.valid);
    const passwordValid = await loginPage.passwordInput.evaluate((el: HTMLInputElement) => el.validity.valid);

    expect(emailValid).toBe(false);
    expect(passwordValid).toBe(false);
  });

  test('unsuccessful login with invalid email format', async ({ loginPage }) => {
    await loginPage.open();
    await loginPage.login(INVALID_EMAIL, VALID_PASSWORD);

    const emailValid = await loginPage.emailInput.evaluate((el: HTMLInputElement) => el.validity.valid);
    expect(emailValid).toBe(false);
  });

});
