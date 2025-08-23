import { test, expect } from '@playwright/test'

test.describe('Contact Form', () => {
  test('should submit contact form successfully', async ({ page }) => {
    await page.goto('/contact')

    // Fill out the form
    await page.fill('[name="name"]', 'Test User')
    await page.fill('[name="email"]', 'test@example.com')
    await page.fill('[name="message"]', 'This is a test message')

    // Submit the form
    await page.click('button[type="submit"]')

    // Wait for success message
    await expect(page.locator('text=Thank you')).toBeVisible({ timeout: 10000 })
  })

  test('should show validation errors for empty form', async ({ page }) => {
    await page.goto('/contact')

    // Try to submit empty form
    await page.click('button[type="submit"]')

    // Check for validation messages
    await expect(page.locator('text=Name is required')).toBeVisible()
    await expect(page.locator('text=Email is required')).toBeVisible()
    await expect(page.locator('text=Message is required')).toBeVisible()
  })

  test('should validate email format', async ({ page }) => {
    await page.goto('/contact')

    // Fill invalid email
    await page.fill('[name="name"]', 'Test User')
    await page.fill('[name="email"]', 'invalid-email')
    await page.fill('[name="message"]', 'Test message')

    // Submit the form
    await page.click('button[type="submit"]')

    // Check for email validation error
    await expect(page.locator('text=Invalid email')).toBeVisible()
  })
})
