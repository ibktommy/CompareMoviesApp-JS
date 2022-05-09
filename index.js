// Fetch Movie Data
const fetchData = async (searchTerm) => {
	const response = await axios.get("http://www.omdbapi.com/", {
		params: {
			apikey: "b75b860a",
			s: searchTerm,
		},
	});

	if (response.data.Error) {
		return [];
	}

	return response.data.Search;
};

//Selecting Input Field for Search Results that Fetches Movie Data
const searchInput = document.querySelector("input");

const onInput = async (e) => {
	const movies = await fetchData(e.target.value);
	console.log(movies);

	for (let eachMovie of movies) {
		const div = document.createElement("div");
		div.innerHTML = `
                      <img src="${eachMovie.Poster}"/>
                      <h1>${eachMovie.Title}</h1>
                    `;
		document.querySelector("#target").appendChild(div);
	}
};

searchInput.addEventListener("input", debounce(onInput, 800));
