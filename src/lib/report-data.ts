import { browser } from '$app/environment';
import { writable } from 'svelte/store';

// create an object w/default values
let defaultValue = {
	address: null,
	policeDepartment: null,
	phoneNumber: null,
	situation: null,
	plateNumbers: null,
	vehicles: null,
	imageURLs: null,
	signature: null
};

// ensure this only runs in the browser
if (browser) {
	defaultValue = JSON.parse(localStorage.getItem('report-data')) || defaultValue;
}

// export the store for usage elsewhere
export const reportData = writable(defaultValue);

if (browser) {
	reportData.subscribe((value) => {
		return localStorage.setItem('report-data', JSON.stringify(value));
	});
}
