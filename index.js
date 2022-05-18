// Object that contains methods that perform a specific function in our App
const dataConfigObject = {
	// Fetch Movie Data
	fetchData: async (searchTerm) => {
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
	},

	// Rendering and Formatting of Movie Options Text and Images
	renderOption: (eachMovie) => {
		// Fixing Broken Images in the API
		const imgSrc = eachMovie.Poster === "N/A" ? "" : eachMovie.Poster;
		return `
    <img src="${imgSrc}"/>
    ${eachMovie.Title} - (${eachMovie.Year})
  `;
	},

	inputValue: (eachMovie) => {
		return `${eachMovie.Title} - (${eachMovie.Year})`;
	},
};

// Spreading the dataConfigObject Properties and seleeting Left Data Container
dataContainerConfig({
	...dataConfigObject,
	rootElement: document.querySelector("#left-data-container"),

	// Actions Performed After Selecting A Movie Options
	onOptionSelect: (eachMovie) => {
		// Hiding the "Search For A Movie" title bar
		document.querySelector(".tutorial").classList.add("is-hidden");
		movieSelected(eachMovie, document.querySelector("#left-details"), "leftSide");
	},
});

// Spreading the dataConfigObject Properties and seleeting Right Data Container
dataContainerConfig({
	...dataConfigObject,
	rootElement: document.querySelector("#right-data-container"),

	// Actions Performed After Selecting A Movie Options
	onOptionSelect: (eachMovie) => {
		// Hiding the "Search For A Movie" title bar AFter Selecting A Movie Option
		document.querySelector(".tutorial").classList.add("is-hidden");
		movieSelected(eachMovie, document.querySelector("#right-details"), "rightSide");
	},
});

// Declaring variable for the side which Movie Details is Displayed
let rightSideDetails;
let leftSideDetails;

// Performing A request based on the movie option selected
const movieSelected = async (movie, movieDetailElement, sideDetails) => {
	const response = await axios.get("http://www.omdbapi.com/", {
		params: {
			apikey: "b75b860a",
			i: movie.imdbID,
		},
	});

	movieDetailElement.innerHTML = movieDetails(response.data);

	// Perfoming Condition to know what side we are displaying our data fetched
	if (sideDetails === "rightSide") {
		rightSideDetails = response.data;
	} else {
		leftSideDetails = response.data;
	}

	// Performing Condition to know if both sides have displayed data fetched USing Ternary Operator
	rightSideDetails && leftSideDetails ? runComparison() : null;
};

// Funtion to Compare both data fetched
const runComparison = () => {
	console.log("Run Comparison!");
};

// Creating Dynamic HTML to display the data for the movieSelected
const movieDetails = (movieData) => {
	// Extracting Values that will be used for comparing Movies Option Selected
	const boxOfficeValue = parseInt(movieData.BoxOffice.replace(/\$/g, "").replace(/,/g, ""));
	const metaScore = parseInt(movieData.Metascore);
	const imdbRating = parseFloat(movieData.imdbRating);
	const imdbVotes = parseInt(movieData.imdbVotes.replace(/,/g, ""));

	// console.log(boxOfficeValue, metaScore, imdbRating, imdbVotes);

	// Logic to get all number values in the MovieData.Awards so as to add it up
	const awards = movieData.Awards.split(" ").reduce((prev, word) => {
		const value = parseInt(word);

		if (isNaN(value)) {
			return prev;
		} else {
			return (prev += value);
		}
	}, 0);
	console.log(awards);

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
      <p class='title'>${movieData.imdbRating}</p>
      <p class="subtitle">IMDB Rating</p>
    </article>
    <article class="notification is-primary">
      <p class='title'>${movieData.imdbVotes}</p>
      <p class="subtitle">IMDB Votes</p>
    </article>
  `;
};
