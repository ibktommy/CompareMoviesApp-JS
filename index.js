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

	// Clear existing Displayed Movie List
	resultsWrapper.innerHTML = "";

	// Add class to display Menu Dropdown
	dropdown.classList.add("is-active");

	// Create Loop to run through Data Result
	for (let eachMovie of movies) {
		const option = document.createElement("a");

		option.classList.add("dropdown-item");
		option.innerHTML = `
      <img src="${eachMovie.Poster}"/>
      ${eachMovie.Title}
    `;
		resultsWrapper.appendChild(option);
	}
};

searchInput.addEventListener("input", debounce(onInput, 1000));
