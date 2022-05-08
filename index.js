// Fetch Movie Data
const fetchData = async (searchTerm) => {
	const response = await axios.get("http://www.omdbapi.com/", {
		params: {
			apikey: "b75b860a",
			s: searchTerm,
		},
	});

	console.log(response);
	console.log(response.data);
};

//Selecting Input Field for Search Results that Fetches Movie Data
const searchInput = document.querySelector("input");

// Function that gets called in the searchInput Event
let timeOutId; /*Number Value assigned to setTimeout*/
const onInput = (e) => {
	if (timeOutId) {
		clearTimeout(timeOutId);
	}
	timeOutId = setTimeout(() => {
		fetchData(e.target.value);
	}, 100);
};

searchInput.addEventListener("input", onInput);
