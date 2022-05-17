// Fetch Movie Data
const fetchData = async (searchTerm) => {
	const response = await axios.get("http://www.omdbapi.com/", {
		params: {
			apikey: "b75b860a",
			s: searchTerm,
		},
	});

	// Return empty array if "searchTerm" is not available in API server
	if (response.data.Error) {
		return [];
	}

	return response.data.Search;
};

dataContainerConfig({
	rootElement: document.querySelector(".data-container"),
	renderOption: (eachMovie) => {
		// Fixing Broken Images in the API
		const imgSrc = eachMovie.Poster === "N/A" ? "" : eachMovie.Poster;
		return `
    <img src="${imgSrc}"/>
    ${eachMovie.Title} - (${eachMovie.Year})
  `;
	},
});

// Performing A request based on the movie option selected
const movieSelected = async (movie) => {
	const response = await axios.get("http://www.omdbapi.com/", {
		params: {
			apikey: "b75b860a",
			i: movie.imdbID,
		},
	});

	document.querySelector("#summary").innerHTML = movieDetails(response.data);
};

// Creating Dynamic HTML to display the data for the movieSelected
const movieDetails = (movieData) => {
	return `
    <article class="media">
      <figure class="media-left">
        <p class="image">
          <img src="${movieData.Poster}"/>
        </p>
      </figure>
      <div class="media-content">
        <div class="content">
          <h1>${movieData.Title}</h1>
          <h4>${movieData.Genre}</h4>
          <p>${movieData.Plot}</p>
        </div>
      </div>
    </article>
    <article class="notification is-primary">
      <p class='title'>${movieData.Awards}</p>
      <p class="subtitle">Awards</p>
    </article>
    <article class="notification is-primary">
      <p class='title'>${movieData.BoxOffice}</p>
      <p class="subtitle">BoxOffice</p>
    </article>
    <article class="notification is-primary">
      <p class='title'>${movieData.Metascore}</p>
      <p class="subtitle">Metascore</p>
    </article>
    <article class="notification is-primary">
      <p class='title'>${movieData.imdRating}</p>
      <p class="subtitle">IMDB Rating</p>
    </article>
    <article class="notification is-primary">
      <p class='title'>${movieData.imdbVotes}</p>
      <p class="subtitle">IMDB Votes</p>
    </article>
  `;
};
