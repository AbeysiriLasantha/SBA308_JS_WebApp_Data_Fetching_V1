// app.js

import { fetchCountryData, fetchMoreCountryInfo } from './myModules/fetch.mjs';
import { displayCountryData, displayMoreInformation } from './myModules/ui.mjs';

// Getting elements
const searchRegion = document.getElementById('searchRegion');
const searchLanguage = document.getElementById('searchLanguage');
const searchButton = document.getElementById('searchButton');

searchButton.addEventListener('click', function () {
    const regionValue = searchRegion.value;
    const languageValue = searchLanguage.value;

    if (regionValue) {
        fetchCountryData(regionValue, "region")
            .then(data => displayCountryData(data, fetchMoreCountryInfo, displayMoreInformation))
            .catch(error => alert(error));
    } else if (languageValue) {
        fetchCountryData(languageValue, "language")
            .then(data => displayCountryData(data, fetchMoreCountryInfo, displayMoreInformation))
            .catch(error => alert(error));
    } else {
        alert('Please enter a value to search');
    }
});
