// Fetch Movie Data
const fetchData = async () => {
	const response = await axios.get("http://www.omdbapi.com/", {
		params: {
			apikey: "b75b860a",
			s: "avengers",
		},
	});

	console.log(response);
	console.log(response.data);
};

// Call Fetch Data Function
fetchData();
