export function asyncTryCatch(fn, fallbackValue = null) {
  return async (...args) => {
    try {
      return await fn(...args);
    } catch (err) {
      console.error(`Async Error in ${fn.name || "anonymous"}: ${err.message}`);
      console.error(err.stack);
      return fallbackValue;
    }
  }
}
