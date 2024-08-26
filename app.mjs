// app.mjs
// =======

import { fetchCountryData, fetchMoreCountryInfo } from './myModules/fetch.mjs';
import { displayCountryData, displayMoreInformation } from './myModules/ui.mjs';

// Getting elements
const searchTextElement = document.getElementById('searchText');
const searchButtonRegion = document.getElementById('searchButtonRegion');
const searchButtonLanguage = document.getElementById('searchButtonLanguage');

// Asynchronous function for handling search
async function handleSearch(searchByVal) {
    const searchText = searchTextElement.value;

    try {
        if (searchByVal === 'region') {
            const data = await fetchCountryData(searchText, "region");
            displayCountryData(data, fetchMoreCountryInfo, displayMoreInformation);
        } else if (searchByVal === 'language') {
            const data = await fetchCountryData(searchText, "language");
            displayCountryData(data, fetchMoreCountryInfo, displayMoreInformation);
        } else if (searchByVal === 'all') {
            const data = await fetchCountryData(searchText, "all");
            displayCountryData(data, fetchMoreCountryInfo, displayMoreInformation);
        } else {
            alert('Please enter a value to search');
        }
    } catch (error) {
        alert(error);
    }
}

// Event listener for search buttons
searchButtonLanguage.addEventListener('click', () => handleSearch('language'));
searchButtonRegion.addEventListener('click', () => handleSearch('region'));
// Call handleSearch with "all" when the page loads
// window.addEventListener('load', () => handleSearch('all'));