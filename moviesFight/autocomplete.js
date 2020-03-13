const createAutoComplete = ({ root, renderOption }) => {
  root.innerHTML = `
        <label><b>Search For a Movie</b></label>
        <input class="input"/>
        <div class="dropdown">
            <div class="dropdown-menu">
                <div class="dropdown-content results"></div>
            </div>
        </div>
    `;

  // select the input tag and other necessary optionMovies
  const input = root.querySelector("input");
  const dropdown = root.querySelector(".dropdown");
  const resultWrapper = root.querySelector(".results");

  // asign the callback to fetch data and pass it to event listener
  const onInput = async event => {
    const movies = await fetchData(event.target.value);

    // checking if movies containt something and remove 'is-active' for hide the dropdown
    if (!movies.length) {
      dropdown.classList.remove("is-active");
      return;
    }
    //make resultWrapper empty string so the search from before didn't stack
    resultWrapper.innerHTML = "";
    dropdown.classList.add("is-active");

    for (let movie of movies) {
      const optionMovies = document.createElement("a");

      optionMovies.classList.add("dropdown-item");
      optionMovies.innerHTML = renderOption(movie);
      /// add an eventListener for passing the movie name that user select and pass the movie name to input.value
      optionMovies.addEventListener("click", event => {
        dropdown.classList.remove("is-active");
        input.value = movie.Title;
        onMovieSelect(movie);
      });

      resultWrapper.appendChild(optionMovies);
    }
  };

  // the second arg in debounce for the delay
  input.addEventListener("input", debounce(onInput, 500));

  // add a click event for closing the dropdown if user is clicking outside root element and it's child
  document.addEventListener("click", event => {
    if (!root.contains(event.target)) {
      dropdown.classList.remove("is-active");
    }
  });
};
