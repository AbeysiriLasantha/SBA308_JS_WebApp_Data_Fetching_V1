// fetch.mjs

export function fetchCountryData(userSearch, searchBy) {
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

export function fetchMoreCountryInfo(country) {
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