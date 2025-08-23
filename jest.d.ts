import '@testing-library/jest-dom'

declare global {
  namespace jest {
    interface Matchers<R> {
      toBeInTheDocument(): R
      toHaveTextContent(text: string | RegExp): R
      toHaveAttribute(attr: string, value?: string): R
      toBeDisabled(): R
      toBeVisible(): R
      toHaveClass(className: string): R
      toHaveValue(value: string | string[] | number): R
      toBeChecked(): R
      toHaveFocus(): R
      toBePartiallyChecked(): R
      toHaveDescription(text?: string | RegExp): R
      toHaveAccessibleName(name?: string | RegExp): R
      toHaveAccessibleDescription(description?: string | RegExp): R
      toHaveErrorMessage(message?: string | RegExp): R
      toBeRequired(): R
      toBeInvalid(): R
      toBeValid(): R
      toHaveDisplayValue(value: string | RegExp | (string | RegExp)[]): R
      toHaveFormValues(expectedValues: Record<string, any>): R
      toHaveStyle(css: string | Record<string, any>): R
      toBeEmptyDOMElement(): R
    }
  }
}
