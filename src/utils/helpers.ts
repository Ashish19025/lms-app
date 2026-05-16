/**
 * Helper functions for formatting currency and dates in the app, providing a consistent way to display monetary values and dates across the user interface. 
 * These functions utilize the built-in Intl API to ensure that formatting is done according to the user's locale and preferences.
 */
export const formatCurrency = (amount: number, currency: string = 'USD') => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(amount);
};

/**
 * formatDate - A helper function that takes a date string as input and formats it into a more user-friendly format, displaying the date in a readable way for users. 
 * This function uses the built-in Date object and toLocaleDateString method to ensure that the date is formatted according to the user's locale and preferences.
 */
export const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};
