// make request on omdbapi and get the movie data from its response 
const fetchData = async searchTerm => {
    const response = await axios.get("http://www.omdbapi.com/", {
        params: {
            apikey: "8c14c8ce",
            s: searchTerm
        }
    });
    console.log(response.data);
};

// select the input tag
const input = document.querySelector("#input-movie");

// debounce input explanation in commentedcode.js, I am assign the delay a default of 1 second
const debounce = (func, delay = 1000) => {
    let timeoutId;
    return (...args) => {
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        timeoutId = setTimeout(() => {
            func.apply(null, args);
        }, delay);
    };
};

// asign the callback to fetch data and pass it to event listener
const onInput = event => {
    fetchData(event.target.value);
};

// the second arg in debounce for the delay
input.addEventListener("input", debounce(onInput, 10000));