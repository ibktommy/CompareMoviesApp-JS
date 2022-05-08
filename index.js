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
const debounce = (callback, delay) => {
	/*Number Value assigned to setTimeout before its timeout seconds completes*/
	let timeOutId;
	return (...args) => {
		if (timeOutId) {
			clearTimeout(timeOutId);
		}
		timeOutId = setTimeout(() => {
			callback.apply(null, args);
		}, delay);
	};
};

const onInput = (e) => {
	fetchData(e.target.value);
};

searchInput.addEventListener("input", debounce(onInput, 500));
