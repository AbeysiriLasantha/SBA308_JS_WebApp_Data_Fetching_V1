// app.js

import { fetchCountryData, fetchMoreCountryInfo } from './myModules/fetch.mjs';
import { displayCountryData, displayMoreInformation } from './myModules/ui.mjs';

// Getting elements
const regionHref = document.getElementById('region');
const languageHref = document.getElementById('language');
const searchText = document.getElementById('searchText');

regionHref.addEventListener('click', function () {
    fetchCountryData(searchText.value, "region")
        .then(data => displayCountryData(data, fetchMoreCountryInfo, displayMoreInformation))
        .catch(error => alert(error));
});

languageHref.addEventListener('click', function () {
    fetchCountryData(searchText.value, "language")
        .then(data => displayCountryData(data, fetchMoreCountryInfo, displayMoreInformation))
        .catch(error => alert(error));
});
