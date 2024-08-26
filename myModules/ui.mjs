// ui.mjs
// ======

export function displayCountryData(data, fetchMoreCountryInfo, displayMoreInformation) {
    const countryInfoDivId = document.getElementById('countryInfoDivId');
    countryInfoDivId.innerHTML = '';

    const gridContainer = document.createElement('div');
    gridContainer.classList.add('countryDivStyles');

    const limitedData = data.slice(0, 150);

    limitedData.forEach((item) => {
        const countryDiv = document.createElement('div');
        countryDiv.classList.add('countryDivStyles');

        const countryName = document.createElement('a');
        countryName.href = '#';
        countryName.textContent = item.name.common;
        countryName.classList.add('countryNameStyles');

        countryName.addEventListener('click', function () {
            const countryQuery = item.name.common;
            const flagImg = document.getElementsByClassName ('flagImg');
            flagImg.src = item.flags.png;
            fetchMoreCountryInfo(countryQuery)
                .then(data => displayMoreInformation(data))
                .catch(error => alert(error));
        });

        const officialName = document.createElement('p');
        officialName.textContent = `Official Name: ${item.name.official}`;
        const mainRegion = document.createElement('p');
        mainRegion.textContent = `Region: ${item.region}`;
        const subRegion = document.createElement('p');
        subRegion.textContent = `Sub Region: ${item.subregion}`;

        const totalPopulation = document.createElement('p');
        totalPopulation.textContent = `Population: ${item.population}`;

        countryDiv.appendChild(countryName);
        countryDiv.appendChild(officialName);
        countryDiv.appendChild(mainRegion);
        countryDiv.appendChild(subRegion);
        countryDiv.appendChild(totalPopulation);
        

        gridContainer.appendChild(countryDiv);
    });

    countryInfoDivId.appendChild(gridContainer);
}

export function displayMoreInformation(data) {
    const countryPlacesDivId = document.getElementById('countryPlacesDivId');
    countryPlacesDivId.innerHTML = '';

    data.query.search.forEach((item) => {
        const countryItemsDetails = document.createElement('a');
        countryItemsDetails.href = '#';
        countryItemsDetails.textContent = item.title;
        countryPlacesDivId.appendChild(countryItemsDetails);
    });
}
