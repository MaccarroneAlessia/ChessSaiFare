import { expect, test } from '@playwright/test';

test('the board shows 64 squares with the starting position', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('.board-square')).toHaveCount(64);
  await expect(page.locator('.board-square', { hasText: '♔' })).toHaveCount(1);
});

test('an invalid FEN shows the reason and keeps the board', async ({ page }) => {
  await page.goto('/');
  await page.getByLabel('Posizione (FEN)').fill('not a fen');
  await expect(page.getByRole('status')).toHaveText('Il testo non è una posizione FEN valida.');
  await expect(page.locator('.board-square')).toHaveCount(64);
});

test('a valid FEN replaces the board with that position', async ({ page }) => {
  await page.goto('/');
  await page.getByLabel('Posizione (FEN)').fill('4k3/8/8/8/8/8/8/4K3 w - - 0 1');
  await expect(page.getByRole('status')).toHaveText('Posizione valida.');
  await expect(page.locator('.board-square', { hasText: '♔' })).toHaveCount(1);
  await expect(page.locator('.board-square', { hasText: '♚' })).toHaveCount(1);
  await expect(page.locator('.board-square', { hasText: '♙' })).toHaveCount(0);
});
