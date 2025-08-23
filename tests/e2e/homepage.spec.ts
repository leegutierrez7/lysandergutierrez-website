import { test, expect } from '@playwright/test'

test.describe('Homepage', () => {
  test('should load and display main elements', async ({ page }) => {
    await page.goto('/')

    // Check page title
    await expect(page).toHaveTitle(/Lysander Gutierrez/)

    // Check main heading
    await expect(page.locator('h1')).toContainText('Lysander Gutierrez')

    // Check navigation
    await expect(page.locator('nav')).toBeVisible()

    // Check theme toggle
    await expect(page.locator('[aria-label*="theme"]')).toBeVisible()
  })

  test('should navigate to different sections', async ({ page }) => {
    await page.goto('/')

    // Test About navigation
    await page.click('text=About')
    await expect(page).toHaveURL(/about/)

    // Test Projects navigation
    await page.click('text=Projects')
    await expect(page).toHaveURL(/projects/)

    // Test Blog navigation
    await page.click('text=Blog')
    await expect(page).toHaveURL(/blog/)

    // Test Contact navigation
    await page.click('text=Contact')
    await expect(page).toHaveURL(/contact/)
  })

  test('should toggle theme', async ({ page }) => {
    await page.goto('/')

    // Get initial theme
    const html = page.locator('html')
    const initialClass = await html.getAttribute('class')

    // Click theme toggle
    await page.click('[aria-label*="theme"]')

    // Wait for theme change
    await page.waitForTimeout(500)

    // Check theme changed
    const newClass = await html.getAttribute('class')
    expect(newClass).not.toBe(initialClass)
  })
})
