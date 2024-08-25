


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


/////////////////////////////////
 function displayCountryData(data, fetchMoreCountryInfo, displayMoreInformation) {
    const countryInfoDivId = document.getElementById('countryInfoDivId');
    countryInfoDivId.innerHTML = '';

    const gridContainer = document.createElement('div');
    gridContainer.style.display = 'grid';
    gridContainer.style.gridTemplateColumns = 'repeat(2, 1fr)';
    gridContainer.style.gap = '10px';
    gridContainer.style.maxHeight = '300px';
    gridContainer.style.overflowY = 'scroll';

    const limitedData = data.slice(0, 10);

    limitedData.forEach((item) => {
        const countryDiv = document.createElement('div');
        countryDiv.style.border = '1px solid #ccc';
        countryDiv.style.padding = '10px';
        countryDiv.style.backgroundColor = '#f9f9f9';

        const countryName = document.createElement('a');
        countryName.href = '#';
        countryName.textContent = item.name.common;
        countryName.style.display = 'block';
        countryName.style.fontWeight = 'bold';
        countryName.style.marginBottom = '5px';

        countryName.addEventListener('click', function () {
            const countryQuery = item.name.common;
            fetchMoreCountryInfo(countryQuery)
                .then(data => displayMoreInformation(data))
                .catch(error => alert(error));
        });

        const officialName = document.createElement('p');
        officialName.textContent = `Official Name: ${item.name.official}`;

        countryDiv.appendChild(countryName);
        countryDiv.appendChild(officialName);
        gridContainer.appendChild(countryDiv);
    });

    countryInfoDivId.appendChild(gridContainer);
}

function displayMoreInformation(data) {
    const countryPlacesDivId = document.getElementById('countryPlacesDivId');
    countryPlacesDivId.innerHTML = '';

    data.query.search.forEach((item) => {
        const countryItemsDetails = document.createElement('a');
        countryItemsDetails.href = '#';
        countryItemsDetails.textContent = item.title;
        countryPlacesDivId.appendChild(countryItemsDetails);
    });
}


//////////////////////////
 function fetchCountryData(userSearch, searchBy) {
    if (userSearch === '') {
        alert('Please Enter Value to Search');
        return;
    }

    let baseUrl;
    let searchUrl;
    if (searchBy === "region") {
        baseUrl = 'https://restcountries.com/v3.1/region/';
        searchUrl = baseUrl + userSearch;
    } else if (searchBy === "language") {
        baseUrl = 'https://restcountries.com/v3.1/lang/';
        searchUrl = baseUrl + userSearch;
    }

    return new Promise((resolve, reject) => {
        fetch(searchUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error('There is no such a region');
                }
                return response.json();
            })
            .then(data => resolve(data))
            .catch(error => reject(error));
    });
}

 function fetchMoreCountryInfo(country) {
    return new Promise((resolve, reject) => {
        const apiUrl = `https://en.wikivoyage.org/w/api.php?action=query&list=search&srsearch=${country}%20tourism&format=json&origin=*`;

        fetch(apiUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Country Information could not be found');
                }
                return response.json();
            })
            .then(data => resolve(data))
            .catch(error => reject(error));
    });
}
