export const createTimeout = (ms) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject(new Error(`Execution timed out after ${ms}ms`));
    }, ms);
  });
};