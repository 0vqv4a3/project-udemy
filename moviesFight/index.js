// make request on omdbapi and get the movie data from its response 
const fetchData = async searchTerm => {
    const response = await axios.get("http://www.omdbapi.com/", {
        params: {
            apikey: "8c14c8ce",
            s: searchTerm
        }
    });
    // just return data that in search property from response data
    // because other data is not needed
    return response.data.Search;
};

// select the input tag
const input = document.querySelector("#input-movie");


// asign the callback to fetch data and pass it to event listener
const onInput = event => {
    fetchData(event.target.value);
};

// the second arg in debounce for the delay
input.addEventListener("input", debounce(onInput, 500));