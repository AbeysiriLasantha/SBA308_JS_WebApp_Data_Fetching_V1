// fetch.mjs
// =========

export async function fetchCountryData(userSearch, searchBy) {
    if (userSearch === '') {
        throw new Error('Please Enter Value to Search');
    }

    let baseUrl;
    let searchUrl;
    if (searchBy === "region") {
        baseUrl = 'https://restcountries.com/v3.1/region/';
        searchUrl = baseUrl + userSearch;
    } else if (searchBy === "language") {
        baseUrl = 'https://restcountries.com/v3.1/lang/';
        searchUrl = baseUrl + userSearch;
    }else if (searchBy === "all") {
        baseUrl = 'https://restcountries.com/v3.1/all';
        searchUrl = baseUrl;
    }

    try {
        const response = await fetch(searchUrl);
        if (!response.ok) {
            throw new Error(`There is no such a  ${searchBy}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        throw error;
    }
}

export function fetchMoreCountryInfo(country) {
    const apiUrl = `https://en.wikivoyage.org/w/api.php?action=query&list=search&srsearch=${country}%20tourism&format=json&origin=*`;

    return new Promise((resolve, reject) => {
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
