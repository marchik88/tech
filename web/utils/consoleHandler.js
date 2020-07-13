const originalError = console.error;

console.error = (...args) => {
  if (/Warning/.test(args[0])) {
    return;
  }
  originalError.call(console, ...args);
};
