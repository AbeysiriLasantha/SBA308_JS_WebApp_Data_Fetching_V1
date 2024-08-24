// Getting Elements
const regionHref = document.getElementById ('region');
const searchText = document.getElementById ('searchText');
const countryInfoDivId= document.getElementById ('countryInfoDivId');


async function fetchByRegion(region) {
    
    if(searchText.value ===''){
        alert('Please Enter Value to Search');
        return;
    }

    const baseUrl = 'https://restcountries.com/v3.1/region/';
    const searchTextValue = searchText.value;
    const searchUrl= 'https://restcountries.com/v3.1/region/' + searchTextValue;

    const response = await fetch(searchUrl);
    const data = await response.json();

    const ul1 = document.createElement ('ul');

    data.forEach((item) => {
        const li1 = document.createElement('li');
        li1.textContent = item.name.common;
        
        const li2 = document.createElement('li');
        li2.textContent = item.name.official;
        ul1.append(li1, li2);
    });
    countryInfoDivId.append(ul1);
}



//Event Listner 
regionHref.addEventListener("click", function() {
    fetchByRegion(searchText);
});