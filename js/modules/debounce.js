export function debounce(fn, delay = 2000) {
  let timeout;

  return function (...args) {
    const context = this;

    clearTimeout(timeout);

    timeout = setTimeout(() => {
      fn.apply(context, args);
    }, delay);
  };
}