import { test, expect } from '@playwright/test';

// Start the application separately: npm run dev (or npm run build && npm start).
const baseURL = process.env.PLAYWRIGHT_BASE_URL || 'http://127.0.0.1:3000';

test('profile, education and contact information are accurate', async ({ page }) => {
  await page.goto(baseURL);
  await expect(page).toHaveTitle(/MD. FOISAL IQBAL/);
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('MD. FOISAL IQBAL');
  await expect(page.getByText('Computer Science & Engineering Graduate', { exact: true })).toBeVisible();
  await page.locator('#education').scrollIntoViewIfNeeded();
  await expect(page.getByText('Jawaharlal Nehru Technological University (JNTU), India')).toBeVisible();
  await expect(page.getByText('Varendra College, Rajshahi, Bangladesh')).toBeVisible();
  await page.locator('#contact').scrollIntoViewIfNeeded();
  const emailLinks = page.locator('#contact a[href="mailto:foisaliqbal09@gmail.com"]');
  await expect(emailLinks).toHaveCount(2);
  for (const link of await emailLinks.all()) await expect(link).toBeVisible();
  await expect(page.locator('#contact a[href="tel:+8801518951073"]')).toBeVisible();
});

test('all navigation anchors have targets', async ({ page }) => {
  await page.goto(baseURL);
  const hashes = await page.locator('a[href^="#"]').evaluateAll(links => links.map(link => link.getAttribute('href')));
  for (const hash of hashes) await expect(page.locator(hash)).toHaveCount(1);
});

test('mobile menu is keyboard accessible and closes after navigation', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(baseURL);
  const menu = page.getByRole('button', { name: 'Open menu' });
  await menu.focus();
  await page.keyboard.press('Enter');
  await expect(page.getByRole('button', { name: 'Close menu' })).toHaveAttribute('aria-expanded', 'true');
  await page.locator('#mobile-navigation').getByRole('link', { name: 'Skills' }).click();
  await expect(page).toHaveURL(/#skills$/);
  await expect(menu).toHaveAttribute('aria-expanded', 'false');
  await expect(page.locator('#skills')).toBeFocused();
  await menu.click();
  await page.keyboard.press('Escape');
  await expect(menu).toHaveAttribute('aria-expanded', 'false');
  await expect(menu).toBeFocused();
});

test('mobile layout does not overflow and reduced motion is respected', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.setViewportSize({ width: 320, height: 740 });
  await page.goto(baseURL);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  const duration = await page.locator('.orbit').first().evaluate(el => getComputedStyle(el).animationDuration);
  expect(parseFloat(duration)).toBeLessThanOrEqual(0.001);
  await expect(page.locator('#about')).toBeVisible();
});

test('page has no browser errors', async ({ page }) => {
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto(baseURL);
  await page.locator('footer').scrollIntoViewIfNeeded();
  await expect(page.locator('footer')).toBeVisible();
  expect(errors).toEqual([]);
});
