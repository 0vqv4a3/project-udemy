const autoCompleteConfig = {
    //control how to show each individual item in dropdown
    renderOption(movie) {
        const imgSrc = movie.Poster === "N/A" ? "" : movie.Poster;
        return `
        <img src="${imgSrc}"/>
        ${movie.Title} (${movie.Year})
    `;
    },
    /* // what to do if user select/click on one movie
    onOptionSelect(movie) {
        document.querySelector('.tutorial').classList.add('is-hidden');
        onMovieSelect(movie);
    }, */
    // what to kind of backfill inside of the input after user click on one 
    inputValue(movie) {
        return movie.Title;
    },
    // fetching the data 
    async fetchData(searchTerm) {
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
    }
};


/// autocomplete search input for the left side
// pass in autoCompleteConfig object in createAutoComplete()
createAutoComplete({
    //destructuring object
    ...autoCompleteConfig,
    // specify where to render autocomplete to in html 
    root: document.querySelector("#left-autocomplete"),
    // what to do if user select/click on one movie, and rendering it in summary div
    onOptionSelect(movie) {
        document.querySelector('.tutorial').classList.add('is-hidden');
        onMovieSelect(movie, document.querySelector('left-summary'));
    }
});


// for right sides
createAutoComplete({
    //destructuring object
    ...autoCompleteConfig
    // specify where to render autocomplete to in html 
    root: document.querySelector("#right-autocomplete"),
    onOptionSelect(movie) {
        document.querySelector('.tutorial').classList.add('is-hidden');
        onMovieSelect(movie, document.querySelector('#right-summary'));
    }
});

// add function for handling follow up request after user select a movie
const onMovieSelect = async (movie, summaryElement) => {
    const response = await axios.get("http://www.omdbapi.com/", {
        params: {
            apikey: "8c14c8ce",
            i: movie.imdbID
        }
    });
    summaryElement.innerHtml = movieTemplate(response.data);
};




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