import { expect, test } from '@playwright/test';

test('home page shows the title and status', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1, name: 'ChessSaiFare' })).toBeVisible();
  await expect(page.getByText('Stiamo costruendo la prima versione del sito.')).toBeVisible();
});
