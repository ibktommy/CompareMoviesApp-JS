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

// Creating Dynamic HTML Elements Thats Displays The Fetched Data
const dataContainer = document.querySelector(".data-container");
dataContainer.innerHTML = `
    <label><b>Search For a Movie</b></label>
    <input class="input" type='search'>
    <div class='dropdown'>
      <div class= 'dropdown-menu'>
        <div class='dropdown-content results'></div>
      </div>
    </div>
  `;

const input = document.querySelector("input");
const dropdown = document.querySelector(".dropdown");
const resultsWrapper = document.querySelector(".results");

//Selecting Input Field for Search Results that Fetches Movie Data
const searchInput = document.querySelector("input");

const onInput = async (e) => {
	const movies = await fetchData(e.target.value);

	// Clear dropdown menu if no movies are fetched
	if (!movies.length) {
		dropdown.classList.remove("is-active");
		return;
	}

	// Clear existing Displayed Movie List
	resultsWrapper.innerHTML = "";

	// Add class to display Menu Dropdown
	dropdown.classList.add("is-active");

	// Create Loop to run through Data Result
	for (let eachMovie of movies) {
		const option = document.createElement("a");

		// Fixing Broken Images in the API
		const imgSrc = eachMovie.Poster === "N/A" ? "" : eachMovie.Poster;

		option.classList.add("dropdown-item");
		option.innerHTML = `
      <img src="${imgSrc}"/>
      ${eachMovie.Title}
    `;

		// Upating the "searchInput text value when we click on a particular movie option"
		option.addEventListener("click", () => {
			dropdown.classList.remove("is-active");
			searchInput.value = eachMovie.Title;
			movieSelected(eachMovie);
		});

		resultsWrapper.appendChild(option);
	}
};

searchInput.addEventListener("input", debounce(onInput, 1000));

// Closing the dropdown menu when we click anywhere on the document aside from the the "dataContainer"

document.addEventListener("click", (event) => {
	if (!dataContainer.contains(event.target)) {
		dropdown.classList.remove("is-active");
	}
});

// Performing A request based on the movie option selected
const movieSelected = async (movie) => {
	const response = await axios.get("http://www.omdbapi.com/", {
		params: {
			apikey: "b75b860a",
			i: movie.imdbID,
		},
	});

	console.log(response);
};
