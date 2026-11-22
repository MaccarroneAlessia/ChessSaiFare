import { expect, test } from '@playwright/test';

test('home page shows the title and status', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1, name: 'ChessSaiFare' })).toBeVisible();
  await expect(page.getByText('Stiamo costruendo la prima versione del sito.')).toBeVisible();
});

test('english home page is available at /en/', async ({ page }) => {
  await page.goto('/en/');
  await expect(page.getByRole('heading', { level: 1, name: 'LetsChess' })).toBeVisible();
  await expect(page.getByText('We are building the first version of the site.')).toBeVisible();
});

test('the logo image is shown in the header of both languages', async ({ page }) => {
  for (const path of ['/', '/en/']) {
    await page.goto(path);
    const logo = page.locator('header img.site-logo');
    await expect(logo).toBeVisible();
    await expect(logo).toHaveAttribute('src', '/brand/logo-adulti.png');
  }
});
