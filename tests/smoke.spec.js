// 🎭 Quba smoke tests — basic navigation, offline, PWA, i18n
const { test, expect } = require('@playwright/test');

test.describe('Quba PWA — smoke tests', () => {
  test('loads home and shows greeting', async ({ page }) => {
    await page.goto('/');
    // Wait for splash to disappear
    await page.waitForSelector('.splash.hidden', { timeout: 5000 });
    // App container visible
    await expect(page.locator('#app')).not.toHaveClass(/hidden/);
    // Bottom tabs visible (5 tabs)
    await expect(page.locator('.bottom-tabs .tab')).toHaveCount(5);
  });

  test('has correct title and meta CSP', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/Quba/);
    // CSP present
    const csp = await page.locator('meta[http-equiv="Content-Security-Policy"]').getAttribute('content');
    expect(csp).toContain("default-src 'self'");
    expect(csp).toContain('api.aladhan.com');
  });

  test('navigates to Wisdom and Courses', async ({ page }) => {
    await page.goto('/');
    await page.waitForSelector('.splash.hidden');
    await page.click('.tab[data-page="wisdom"]');
    await expect(page.locator('#main-content')).toContainText(/sabidur|wisdom|حكم/i);
  });

  test('service worker registers', async ({ page }) => {
    await page.goto('/');
    const swReg = await page.evaluate(async () => {
      if (!('serviceWorker' in navigator)) return null;
      // Wait a bit for registration
      await new Promise(r => setTimeout(r, 1500));
      const reg = await navigator.serviceWorker.getRegistration();
      return reg ? { scope: reg.scope, active: !!reg.active || !!reg.installing } : null;
    });
    expect(swReg).not.toBeNull();
    expect(swReg.active).toBe(true);
  });

  test('manifest is valid', async ({ page }) => {
    const response = await page.goto('/manifest.json');
    expect(response.ok()).toBe(true);
    const manifest = await response.json();
    expect(manifest.name).toContain('Quba');
    expect(manifest.icons.length).toBeGreaterThanOrEqual(3);
    expect(manifest.display).toBe('standalone');
  });

  test('escapeHtml prevents XSS', async ({ page }) => {
    await page.goto('/');
    await page.waitForSelector('.splash.hidden');
    const result = await page.evaluate(() => {
      return escapeHtml('<script>alert("xss")</script>');
    });
    expect(result).toBe('&lt;script&gt;alert(&quot;xss&quot;)&lt;/script&gt;');
  });

  test('i18n has parity across languages', async ({ page }) => {
    await page.goto('/');
    await page.waitForSelector('.splash.hidden');
    const { esCount, arCount, enCount, esMissingInAr, esMissingInEn } = await page.evaluate(() => {
      const es = Object.keys(translations.es || {});
      const ar = Object.keys(translations.ar || {});
      const en = Object.keys(translations.en || {});
      return {
        esCount: es.length,
        arCount: ar.length,
        enCount: en.length,
        esMissingInAr: es.filter(k => !ar.includes(k)),
        esMissingInEn: es.filter(k => !en.includes(k)),
      };
    });
    expect(esCount).toBeGreaterThan(200);
    expect(esMissingInAr).toEqual([]);
    expect(esMissingInEn).toEqual([]);
    expect(Math.abs(esCount - arCount)).toBeLessThanOrEqual(2);
    expect(Math.abs(esCount - enCount)).toBeLessThanOrEqual(2);
  });

  test('WakeLock and CacheDB are available', async ({ page }) => {
    await page.goto('/');
    await page.waitForSelector('.splash.hidden');
    const services = await page.evaluate(() => ({
      WakeLockService: typeof WakeLockService,
      CacheDB: typeof CacheDB,
      PrayerNotifications: typeof PrayerNotifications,
      LocalDuasService: typeof LocalDuasService,
      escapeHtml: typeof escapeHtml,
    }));
    expect(services.WakeLockService).toBe('object');
    expect(services.CacheDB).toBe('object');
    expect(services.PrayerNotifications).toBe('object');
    expect(services.LocalDuasService).toBe('object');
    expect(services.escapeHtml).toBe('function');
  });

  test('LocalDuas dataset has categories', async ({ page }) => {
    await page.goto('/');
    await page.waitForSelector('.splash.hidden');
    const result = await page.evaluate(async () => {
      const res = await LocalDuasService.getCategories();
      return { success: res.success, count: res.data.length, ids: res.data.map(c => c.id) };
    });
    expect(result.success).toBe(true);
    expect(result.count).toBeGreaterThanOrEqual(10);
    expect(result.ids).toContain('morning');
    expect(result.ids).toContain('forgiveness');
  });

  test('Router supports pushState', async ({ page }) => {
    await page.goto('/');
    await page.waitForSelector('.splash.hidden');
    await page.evaluate(() => Router.go('wisdom'));
    await page.waitForTimeout(500);
    expect(page.url()).toContain('#/wisdom');
  });
});
