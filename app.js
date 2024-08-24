// Getting elements
const regionHref = document.getElementById('region');
const searchText = document.getElementById('searchText');
const countryInfoDivId = document.getElementById('countryInfoDivId');

function fetchByRegion(region) {
    if (region=== '') {
        alert('Please Enter Value to Search');
       return;
    }

    return new Promise((resolve, reject) => {     
        
        const baseUrl = 'https://restcountries.com/v3.1/region/';
        const searchTextValue = region;
        const searchUrl = baseUrl + searchTextValue;

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

function displayCountryData(data) {
    // Clear previous content
    countryInfoDivId.innerHTML = '';

    // Create a container for the grid
    const gridContainer = document.createElement('div');
    gridContainer.style.display = 'grid';
    gridContainer.style.gridTemplateColumns = 'repeat(2, 1fr)'; // 2 columns grid
    gridContainer.style.gap = '10px';
    gridContainer.style.maxHeight = '300px'; // Limit height for scroll
    gridContainer.style.overflowY = 'scroll'; // Enable vertical scrolling

    // Limit data to 10 items for the grid
    const limitedData = data.slice(0, 10);

    limitedData.forEach((item) => {
        // Create a container for each country's data
        const countryDiv = document.createElement('div');
        countryDiv.style.border = '1px solid #ccc';
        countryDiv.style.padding = '10px';
        countryDiv.style.backgroundColor = '#f9f9f9';

        // Create href element for the country name
        const countryName = document.createElement('a');
        countryName.href = '#';
        countryName.textContent = item.name.common;
        countryName.style.display = 'block';
        countryName.style.fontWeight = 'bold';
        countryName.style.marginBottom = '5px';

        // Add click event listener to fetch more details on the country
        // countryName.addEventListener('click', function () {
        //     const countryQuery = item.name.common;
        //     fetchMoreCountryInfo(countryQuery);
        // });
        countryName.addEventListener('click', function () {
            const countryQuery = item.name.common;
            fetchMoreCountryInfo(countryQuery)
                .then(data => displayMoreInfomation(data))
                //.catch(error => console.error('Error fetching data:', error));
                .catch(error => alert(error));
              
        });
        

        // Official name
        const officialName = document.createElement('p');
        officialName.textContent = `Official Name: ${item.name.official}`;

        // Append elements to the countryDiv
        countryDiv.appendChild(countryName);
        countryDiv.appendChild(officialName);

        // Append countryDiv to the grid container
        gridContainer.appendChild(countryDiv);
    });

    // Append the grid container to the main div
    countryInfoDivId.appendChild(gridContainer);
}

 // Function to fetch more details about a country
 //add await here
 function fetchMoreCountryInfo(country) {
    const apiUrl = `https://en.wikivoyage.org/w/api.php?action=query&list=search&srsearch=${country}%20tourism&format=json&origin=*`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            // Handle the data received from the API
            console.log(data);
            alert(`Fetched additional information for ${country}`);
        })
        .catch(error => {
            console.error('Error fetching country information:', error);
        });
}

//Display country More information
function displayMoreInfomation(data){
    data.forEach((item) => {
        //need to create styles for this section
        const countryMoreInfoDiv = document.createElement('div');
        
        const comoreInfo = document.createElement('a');
        comoreInfo.href = '#';
        comoreInfo.textContent = item.name.common;;


          })
 }
// Event listener
regionHref.addEventListener('click', function () {
    fetchByRegion(searchText.value)
        .then(data => displayCountryData(data))
        //.catch(error => console.error('Error fetching data:', error));
        .catch(error => alert(error));
      
});
