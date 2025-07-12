/**
 * Utility functions for number operations
 */

/**
 * Parses a number string in Spanish format (with dots as thousands separator and comma as decimal separator)
 * @param numberString - The number string to parse (e.g., "3.557,36")
 * @returns The parsed number as float
 * @throws Error if the number is invalid
 */
export const parseSpanishNumber = (numberString: string): number => {
  if (!numberString || typeof numberString !== 'string') {
    throw new Error('Invalid number string provided')
  }

  // Remove dots (thousands separator) and replace comma with dot (decimal separator)
  const cleanAmount = numberString
    .replace(/\./g, '') // Remove dots (thousands separator)
    .replace(',', '.')  // Replace comma with dot (decimal separator)
  
  const parsedNumber = parseFloat(cleanAmount)

  if (isNaN(parsedNumber)) {
    throw new Error('Invalid number format')
  }

  return parsedNumber
}

/**
 * Formats a number to Spanish currency format
 * @param number - The number to format
 * @param currency - The currency code (default: 'ARS')
 * @returns The formatted currency string
 */
export const formatSpanishCurrency = (number: number, currency: string = 'ARS'): string => {
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: currency,
  }).format(number)
}

/**
 * Validates if a string can be parsed as a valid number
 * @param numberString - The string to validate
 * @returns True if the string can be parsed as a valid number
 */
export const isValidNumber = (numberString: string): boolean => {
  try {
    parseSpanishNumber(numberString)
    return true
  } catch {
    return false
  }
} 