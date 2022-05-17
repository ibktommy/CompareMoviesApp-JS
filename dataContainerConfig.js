const dataContainerConfig = ({
	rootElement,
	renderOption,
	onOptionSelect,
	inputValue,
	fetchData,
}) => {
	// Creating Dynamic HTML Elements Thats Displays The Fetched Data
	rootElement.innerHTML = `
    <label><b>Search For a Movie</b></label>
    <input class="input" type='search'/>
    <div class='dropdown'>
      <div class= 'dropdown-menu'>
        <div class='dropdown-content results'></div>
      </div>
    </div>
  `;

	const dropdown = rootElement.querySelector(".dropdown");
	const resultsWrapper = rootElement.querySelector(".results");

	//Selecting Input Field for Search Results that Fetches Movie Data
	const searchInput = rootElement.querySelector("input");

	const onInput = async (e) => {
		const items = await fetchData(e.target.value);

		// Clear dropdown menu if no movies are fetched
		if (!items.length) {
			dropdown.classList.remove("is-active");
			return;
		}

		// Clear existing Displayed Movie List
		resultsWrapper.innerHTML = "";

		// Add class to display Menu Dropdown
		dropdown.classList.add("is-active");

		// Create Loop to run through Data Result
		for (let eachItem of items) {
			const option = document.createElement("a");

			option.classList.add("dropdown-item");
			option.innerHTML = renderOption(eachItem);

			// Upating the "searchInput text value when we click on a particular movie option"
			option.addEventListener("click", () => {
				dropdown.classList.remove("is-active");
				searchInput.value = inputValue(eachItem);
				onOptionSelect(eachItem);
			});

			resultsWrapper.appendChild(option);
		}
	};

	searchInput.addEventListener("input", debounce(onInput, 1000));

	// Closing the dropdown menu when we click anywhere on the document aside from the the "dataContainer"

	document.addEventListener("click", (event) => {
		if (!rootElement.contains(event.target)) {
			dropdown.classList.remove("is-active");
		}
	});
};
