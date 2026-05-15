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
