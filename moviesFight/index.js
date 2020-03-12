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
const input = document.querySelector("#input-movie");


// asign the callback to fetch data and pass it to event listener
const onInput = async event => {
    const movies = await fetchData(event.target.value);

    for (let movie of movies) {
        const div = document.createElement('div');

        div.innerHTML = `
        <img src="${movie.Poster}"/>
        <h1>${movie.Title}</h1>
        `;
        document.querySelector('#target').appendChild(div);
    }

};

// the second arg in debounce for the delay
input.addEventListener("input", debounce(onInput, 500));