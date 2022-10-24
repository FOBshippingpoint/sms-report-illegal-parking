import { browser } from '$app/environment';
import { writable } from 'svelte/store';

// create an object w/default values
let defaultValue = ''

// ensure this only runs in the browser
if (browser) {
  defaultValue = JSON.parse(localStorage.getItem('sms-text')) || defaultValue;
}

// export the store for usage elsewhere
export const smsText = writable(defaultValue);

if (browser) {
  smsText.subscribe((value) => {
    return localStorage.setItem('sms-text', JSON.stringify(value))
  });
}
