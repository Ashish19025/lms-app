// Logger utility for consistent logging across the application, with different log levels (info, warn, error)
export const logger = {
  info: (message: string, ...args: any[]) => {
    if (__DEV__) {
      console.log(`📘 [INFO] ${message}`, ...args);
    }
  },
  warn: (message: string, ...args: any[]) => {
    if (__DEV__) {
      console.warn(`📙 [WARN] ${message}`, ...args);
    }
  },
  error: (message: string, error?: any) => {
    if (__DEV__) {
      console.error(`📕 [ERROR] ${message}`, error);
    }
  },
};
