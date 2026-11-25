import { expect, test } from '@playwright/test';

test('the colour filter keeps only lessons of that colour', async ({ page }) => {
  await page.goto('/');
  const cards = page.locator('.lesson-card');
  const total = await cards.count();
  expect(total).toBeGreaterThan(0);

  const black = page.getByRole('button', { name: 'Nero', exact: true });
  await black.click();
  await expect(black).toHaveAttribute('aria-pressed', 'true');

  const shown = await cards.count();
  expect(shown).toBeLessThanOrEqual(total);
  for (const card of await cards.all()) {
    await expect(card).toContainText('Nero');
  }
});

test('the level filter can show an empty listing with its message', async ({ page }) => {
  await page.goto('/');
  // Both filters together can match nothing in the samples: the message must appear instead of an empty list.
  await page.getByRole('button', { name: 'Avanzato', exact: true }).click();
  await page.getByRole('button', { name: 'Bianco', exact: true }).click();
  const cards = page.locator('.lesson-card');
  if ((await cards.count()) === 0) {
    await expect(page.getByText('Nessuna lezione con questi filtri.')).toBeVisible();
  }
});

test('"Tutti" resets the filter', async ({ page }) => {
  await page.goto('/');
  const total = await page.locator('.lesson-card').count();
  await page.getByRole('button', { name: 'Nero', exact: true }).click();
  await page.getByRole('group', { name: 'Colore' }).getByRole('button', { name: 'Tutti' }).click();
  await expect(page.locator('.lesson-card')).toHaveCount(total);
});

test('the header switches language from Italian to English and back', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('link', { name: 'English' }).click();
  await expect(page).toHaveURL(/\/en\/?$/);
  await expect(page.getByRole('heading', { level: 1, name: 'LetsChess' })).toBeVisible();

  await page.getByRole('link', { name: 'Italiano' }).click();
  await expect(page).toHaveURL(/\/$/);
  await expect(page.getByRole('heading', { level: 1, name: 'ChessSaiFare' })).toBeVisible();
});

test('the lessons link in the header points to the listing', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('link', { name: 'Lezioni' })).toHaveAttribute('href', '/#lezioni');
});
