// make request on omdbapi and get the movie data from its response 
const fetchData = async searchTerm => {
    const response = await axios.get("http://www.omdbapi.com/", {
        params: {
            apikey: "8c14c8ce",
            s: searchTerm
        }
    });
    // check if response has Error property.
    if (response.data.Error) {
        return [];
    }
    // just return data that in search property from response data
    // because other data is not needed just the array of different movies is used
    return response.data.Search;
};

//create html element for reusable dropdown widget
// all the classname is based on bulma css framework for styling the dropdown
const root = document.querySelector('.autocomplete');
root.innerHTML = `
<label><b>Search For a Movie</b></label>
<input class="input"/>
<optionMovies class="dropdown">
<optionMovies class="dropdown-menu">
<optionMovies class="dropdown-content results"></optionMovies>
</optionMovies>
</optionMovies>
`;

// select the input tag and other necessary optionMovies
const input = document.querySelector("input");
const dropdown = document.querySelector('.dropdown');
const resultWrapper = document.querySelector('.results');



// asign the callback to fetch data and pass it to event listener
const onInput = async event => {
    const movies = await fetchData(event.target.value);

    resultWrapper.innerHTML = '';
    dropdown.classList.add('is-active');

    for (let movie of movies) {
        const optionMovies = document.createElement('a');
        const imgSrc = movie.Poster === "N/A" ? '' : movie.Poster;
        optionMovies.classList.add('dropdown-item');
        optionMovies.innerHTML = `
            <img src="${imgSrc}"/>
            ${movie.Title}
        `;
        resultWrapper.appendChild(optionMovies);
    }

};

// the second arg in debounce for the delay
input.addEventListener("input", debounce(onInput, 500));