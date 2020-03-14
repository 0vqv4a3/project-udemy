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
        onMovieSelect(movie, document.querySelector('#left-summary'), 'left');
    }
});


// for right sides
createAutoComplete({
    //destructuring object
    ...autoCompleteConfig,
    // specify where to render autocomplete to in html 
    root: document.querySelector("#right-autocomplete"),
    onOptionSelect(movie) {
        document.querySelector('.tutorial').classList.add('is-hidden');
        onMovieSelect(movie, document.querySelector('#right-summary'), 'right');
    }
});

// make variable and use it as refference for comparison on each stat of movie
let rightMovie;
let leftMovie;
// add function for handling follow up request after user select a movie
const onMovieSelect = async (movie, summaryElement, side) => {
    const response = await axios.get("http://www.omdbapi.com/", {
        params: {
            apikey: "8c14c8ce",
            i: movie.imdbID
        }
    });

    summaryElement.innerHTML = movieTemplate(response.data);

    // check which autocomplete movie side is currently get requested & pass the data to variable for comparison
    if (side === 'right') {
        rightMovie = response.data;
    } else {
        leftMovie = response.data;
    }

    // checking if left and right movie is found then do comparison
    if (rightMovie && leftMovie) {
        runComparison();
    }
};

//compare each movie stat on right and left 
const runComparison = () => {
    // select all stats element for left and right side respectively and it will return and array of stats elements
    const leftSideStats = document.querySelectorAll('#left-summary .notification');
    const rightSideStats = document.querySelectorAll('#right-summary .notification');

    leftSideStats.forEach((leftStat, index) => {
        const rightStat = rightSideStats[index];

        const leftStatValue = parseInt(leftStat.dataset.value);
        const rightStatValue = parseInt(rightStat.dataset.value);

        //style the movie stats the loss one is yellow & the winner didn't change color
        if (leftStatValue > rightStatValue) {
            rightStat.classList.remove('is-primary');
            rightStat.classList.add('is-warning');
        } else {
            leftStat.classList.remove('is-primary');
            leftStat.classList.add('is-warning');
        }
    });

}


// creating a bunch of html element for displaying the movie detail after user selected it
const movieTemplate = movieDetail => {
    const imdbRating = parseFloat(movieDetail.imdbRating);
    const imdbVotes = parseInt(movieDetail.imdbVotes.replace(/,/g, ''));
    const metascore = parseInt(movieDetail.Metascore);
    const dollars = parseInt(
        movieDetail.BoxOffice.replace(/\$/g, '').replace(/,/g, '')
    );
    const awards = movieDetail.Awards.split(' ').reduce((prev, word) => {
        const value = parseInt(word);

        if (isNaN(value)) {
            return prev;
        } else {
            return prev + value;
        }

    }, 0);


    return `
    <article class="media">
        <figure class="media-left">
            <p class="image">
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
    <article data-value="${awards}"class="notification is-primary">
        <p class="title">${movieDetail.Awards}</p>
        <p class="subtitle">Awards</p>
    </article>
    <article data-value="${dollars}" class="notification is-primary">
        <p class="title">${movieDetail.BoxOffice}</p>
        <p class="subtitle">Box Office</p>
    </article>
    <article data-value="${metascore}" class="notification is-primary">
        <p class="title">${movieDetail.Metascore}</p>
        <p class="subtitle">Metascore</p>
    </article>
    <article data-value="${imdbRating}" class="notification is-primary">
        <p class="title">${movieDetail.imdbRating}</p>
        <p class="subtitle">IMDB Rating</p>
    </article>
    <article data-value="${imdbVotes}" class="notification is-primary">
        <p class="title">${movieDetail.imdbVotes}</p>
        <p class="subtitle">IMDB Votes</p>
    </article>
    `;
};