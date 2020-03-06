const fetchData = async searchTerm => {
  const response = await axios.get("http://www.omdbapi.com/", {
    params: { /// params is for assign apikey in url and the 's' is for the search///
      apikey: "8c14c8ce",
      s: searchTerm
    }
  });
  console.log(response.data);
};

/// need some refactoring

/* const input = document.querySelector("input");
let timeoutId;

const onInput = event => {
  if (timeoutId) {
    clearTimeout(timeoutId);
  }
  timeoutId = setTimeout(() => {
    fetchData(event.target.value);
  }, 500);
};

input.addEventListener("input", onInput); */

// this is the result of refactoring above commented code
// it can be used not just for the input
const input = document.querySelector("input");

/// i could add second argument in debounce
/// so when is called
/// i could use it in more flexible way instead just 1 second
/* const debounce = func => {
  return (...args) => {
    let timeoutId;
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      func.apply(null, args);
    }, 1000);
  };
};
*/

////I am assign the delay a default of 1 second
const debounce = (func, delay = 1000) => {
  return (...args) => {
    let timeoutId;
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      func.apply(null, args); // null in here to say this is a pure function whithout "this" contex assign, so the result will always the same
    }, delay);
  };
};

/// the debounce could be applied here if you want to
/// call onInput with debounce every single time

/* const onInput = debounce(event => { 
    fetchData(event.target.value);
}); */

const onInput = event => {
  fetchData(event.target.value);
};

/// or use debounce here if you want to call onInput without debounce latter//
input.addEventListener("input", debounce(onInput));