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

// select the input tag
// const input = document.querySelector("#input-movie");
const div = document.querySelector('.autocomplete');
const input = document.createElement('input');
div.appendChild(input);

const divd = document.createElement('div');
const divm = document.createElement('div');
const divc = document.createElement('div');
divd.className += 'dropdown is-active';
divm.className += 'dropdown-menu';
divc.className += 'dropdown-content';
div.appendChild(divd)
divd.appendChild(divm);
divm.appendChild(divc);


// asign the callback to fetch data and pass it to event listener
const onInput = async event => {
    const movies = await fetchData(event.target.value);

    // for (let movie of movies) {
    //     const div = document.createElement('div');
    //     div.className += 'dropdown-item';
    //     div.innerHTML = `
    //     <img src="${movie.Poster}"/>
    //     <h1>${movie.Title}</h1>
    //     `;
    //     document.querySelector('.dropdown-content').appendChild(div);
    // }

    for (let movie of movies) {

        const divi = document.createElement('div');
        divi.className += 'dropdown-item';
        divi.innerHTML = `
         <img src="${movie.Poster}"/>
         <h1>${movie.Title}</h1>
         `;
        divc.appendChild(divi);
    }

};

// the second arg in debounce for the delay
input.addEventListener("input", debounce(onInput, 500));