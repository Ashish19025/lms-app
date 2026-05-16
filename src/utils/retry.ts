/**
 * withRetry - A utility function that wraps an asynchronous function with retry logic, allowing it to be retried a specified number of times with an exponential backoff delay between attempts. 
 * This is useful for handling transient errors, such as network issues, by giving the function multiple chances to succeed before ultimately throwing an error if all retries fail.
 */
export const withRetry = async <T>(
  fn: () => Promise<T>,
  retries: number = 3,
  delay: number = 1000
): Promise<T> => {
  try {
    return await fn();
  } catch (error) {
    if (retries <= 0) {
      throw error;
    }
    // Wait for the delay
    await new Promise((resolve) => setTimeout(resolve, delay));
    // Retry with exponential backoff (multiply delay by 2)
    return withRetry(fn, retries - 1, delay * 2);
  }
};
