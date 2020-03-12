const fetchData = async searchTerm => {
  const response = await axios.get("http://www.omdbapi.com/", {
    params: { /// params is for assign apikey in url and the 's' is for the search///
      apikey: "8c14c8ce",
      s: searchTerm
    }
  });
  // console.log(response.data);
  // check if response has Error property, if it has then it means an error but not in the stricest sense of error instead the request is 
  //succesfull but the design API in omdb is just throw that error if the movie is not found and its a bad design
  if (response.data.Error) {
    return [];
    // return alert('movie not found')
  }
  // use S instead s because the data property that passed by omdbapi
  // use uppercase letter that is not a standard way,
  // the standard is lower case like many other api
  return response.data.Search
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
  let timeoutId;
  return (...args) => {
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

const onInput = async event => {
  // add await keyword cause if fetchData assign in movies it will return promise instead of the data because its a async func
  const movies = await fetchData(event.target.value);

  // for (let movie of movies) {
  //   const div = document.createElement('div');

  //   div.innerHTML = `
  //   <img src="${movie.Poster}">
  //   <h1>${movie.Title}</h1>
  //   `;
  // }

  // document.querySelector('.dropdown-content').appendChild(div);
};

/// or use debounce here if you want to call onInput without debounce latter//
input.addEventListener("input", debounce(onInput));