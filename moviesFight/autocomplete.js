const createAutoComplete = ({
  root,
  renderOption,
  onOptionSelect,
  inputValue,
  fetchData
}) => {
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
    const items = await fetchData(event.target.value);

    // checking if items containt something and remove Class 'is-active' to hide the dropdown
    if (!items.length) {
      dropdown.classList.remove("is-active");
      return;
    }
    //make resultWrapper empty string so the search from before didn't stack
    resultWrapper.innerHTML = "";
    dropdown.classList.add("is-active");

    for (let item of items) {
      const optionMovies = document.createElement("a");

      optionMovies.classList.add("dropdown-item");
      optionMovies.innerHTML = renderOption(item);
      /// add an eventListener for passing the movie name that user select and pass the movie name to input.value
      optionMovies.addEventListener("click", event => {
        dropdown.classList.remove("is-active");
        input.value = inputValue(item);
        onOptionSelect(item);
      });

      resultWrapper.appendChild(optionMovies);
    }
  };



  // the second arg in debounce for the delay, debounce is in utils.js
  input.addEventListener("input", debounce(onInput, 500));

  // add a click event for closing the dropdown if user is clicking outside root element and it's child
  document.addEventListener("click", event => {
    if (!root.contains(event.target)) {
      dropdown.classList.remove("is-active");
    }
  });
};