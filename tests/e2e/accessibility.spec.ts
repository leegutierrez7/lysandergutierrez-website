import { test, expect } from '@playwright/test'

test.describe('Accessibility', () => {
  test('should meet basic accessibility standards', async ({ page }) => {
    await page.goto('/')

    // Check for proper heading hierarchy
    const h1Elements = await page.locator('h1').count()
    expect(h1Elements).toBeGreaterThan(0)

    // Check for alt text on images
    const images = page.locator('img')
    const imageCount = await images.count()

    for (let i = 0; i < imageCount; i++) {
      const alt = await images.nth(i).getAttribute('alt')
      expect(alt).toBeTruthy()
    }

    // Check for proper form labels
    await page.goto('/contact')
    const inputs = page.locator('input, textarea')
    const inputCount = await inputs.count()

    for (let i = 0; i < inputCount; i++) {
      const input = inputs.nth(i)
      const id = await input.getAttribute('id')
      const label = page.locator(`label[for="${id}"]`)
      await expect(label).toBeVisible()
    }
  })

  test('should be keyboard navigable', async ({ page }) => {
    await page.goto('/')

    // Test tab navigation
    await page.keyboard.press('Tab')
    await expect(page.locator(':focus')).toBeVisible()

    // Test multiple tab presses
    for (let i = 0; i < 5; i++) {
      await page.keyboard.press('Tab')
    }

    // Ensure focus is still visible
    await expect(page.locator(':focus')).toBeVisible()
  })

  test('should support screen reader navigation', async ({ page }) => {
    await page.goto('/')

    // Check for proper ARIA landmarks
    await expect(page.locator('[role="main"], main')).toBeVisible()
    await expect(page.locator('[role="navigation"], nav')).toBeVisible()

    // Check for proper button labeling
    const buttons = page.locator('button')
    const buttonCount = await buttons.count()

    for (let i = 0; i < buttonCount; i++) {
      const button = buttons.nth(i)
      const ariaLabel = await button.getAttribute('aria-label')
      const textContent = await button.textContent()

      // Button should have either aria-label or text content
      expect(ariaLabel || textContent?.trim()).toBeTruthy()
    }
  })
})
