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
