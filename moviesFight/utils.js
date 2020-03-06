// ..this is where all utility code reside to make index.js cleaner

// debounce input explanation in commentedcode.js, I am assign the delay a default of 1 second
const debounce = (func, delay = 1000) => {
    let timeoutId;
    return (...args) => {
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        timeoutId = setTimeout(() => {
            func.apply(null, args);
        }, delay);
    };
};