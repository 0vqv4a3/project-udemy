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

// add function for handling follow up request after user select a movie
const onMovieSelect = async movie => {
    const response = await axios.get("http://www.omdbapi.com/", {
        params: {
            apikey: "8c14c8ce",
            i: movie.imdbID
        }
    });
    document.querySelector("#summary").innerHTML = movieTemplate(response.data);
};

createAutoComplete({
    root: document.querySelector(".autocomplete"),
    // add html element for the data that will be rendered in autocomplete search dropdown
    renderOption(movie) {
        const imgSrc = movie.Poster === "N/A" ? "" : movie.Poster;
        return `
        <img src="${imgSrc}"/>
        ${movie.Title} (${movie.Year})
    `;
    }
});

// creating a bunch of html element for displaying the movie detail after user selected it
const movieTemplate = movieDetail => {
    return `
    <article class="media">
    <figure class="media-left">
        <p>
            <img src="${movieDetail.Poster}"/>
        </p>
    </figure>
    <div class="media-content">
        <div class="content">
            <h1>${movieDetail.Title}</h1>
            <h4>${movieDetail.Genre}</h4>
            <p>${movieDetail.Plot}</p>
        </div>
    </div>
    </article>
    <article class="notification is-primary">
    <p class="title">${movieDetail.Awards}</p>
    <p class="subtitle">Awards</p>
    </article>
    <article class="notification is-primary">
    <p class="title">${movieDetail.BoxOffice}</p>
    <p class="subtitle">Box Office</p>
    </article>
    <article class="notification is-primary">
    <p class="title">${movieDetail.Metascore}</p>
    <p class="subtitle">Metascore</p>
    </article>
    <article class="notification is-primary">
    <p class="title">${movieDetail.imdbRating}</p>
    <p class="subtitle">IMDB Rating</p>
    </article>
    <article class="notification is-primary">
    <p class="title">${movieDetail.imdbVotes}</p>
    <p class="subtitle">IMDB Votes</p>
    </article>
    `;
};