const fetchData = async () => {
    const response = await axios.get('http://www.omdbapi.com/', {
        params: {
            apikey: '8c14c8ce',
            s: 'avengers'

        }

    });
    console.log(response.data);
    console.log(response);
};

fetchData();