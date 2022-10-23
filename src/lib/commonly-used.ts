import { browser } from '$app/environment';
import { writable } from 'svelte/store';

// create an object w/default values
let defaultValue = {}

// ensure this only runs in the browser
if (browser) {
  defaultValue = JSON.parse(localStorage.getItem('commonly-used')) || defaultValue;
}

// export the store for usage elsewhere
export const commonlyUsed = writable(defaultValue);

if (browser) {
  commonlyUsed.subscribe((value) => {
    return localStorage.setItem('commonly-used', JSON.stringify(value))
  });
}
