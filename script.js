const container = document.querySelector('.countries');
const button = document.querySelector('button');
const searchField = document.querySelector('#search')
const searchButton = document.querySelector('.input-group');
const loader = document.querySelector('.loader');
const err = document.querySelector('.error');

const loadCountries = async () => {
    displayLoader();

    try {
        const response = await fetch('https://restcountries.eu/rest/v2/all');
        const countries = await response.json();
        const header = `<h1>Countries</h1>`;
        let output = ``;
        countries.forEach(country => {
            const { name, capital, region, timezones, currencies, flag } = country;
            output += `<div class="country">
                    <ul>
                        <li><strong>${name}</strong></li>
                        <li>Capital: ${capital}</li>
                        <li>Region: ${region}</li>
                        <li>Time zone: ${timezones[0]}</li>
                        <li>Currency: ${currencies[0].name}, ${currencies[0].symbol}</li>
                    </ul>
                    <div>
                        <img class="flag" src="${flag}" title="${name}">
                    </div>
                </div>`;
        });
        document.querySelector('.header').innerHTML = header;
        document.querySelector('.countries').innerHTML = output;
        searchButton.style.display = "block";
        loader.style.visibility = "hidden";
    }
    catch (error) {
        const errorMessage = `<img src="images/icon-error.svg">
                                <span>Failed to fetch countries, please check your internet connection.</span>`;
        displayError(errorMessage);
    }
}

const getCountries = async searchValue => {

    const response = await fetch('https://restcountries.eu/rest/v2/all');
    const countries = await response.json();

    // Get matches to current text input
    const countryMatches = countries.filter(country => {
        const regex = new RegExp(`^${searchValue}`, 'gi');
        return country.name.match(regex) || country.capital.match(regex);
    })

    const header = `<h1>Countries</h1>`;
    let output = ``;
    console.log(countryMatches);

    countryMatches.forEach(country => {
        const { name, capital, region, timezones, currencies, flag } = country;
        output += `<div class="country">
                        <ul>
                            <li><strong>${name}</strong></li>
                            <li>Capital: ${capital}</li>
                            <li>Region: ${region}</li>
                            <li>Time zone: ${timezones[0]}</li>
                            <li>Currency: ${currencies[0].name}, ${currencies[0].symbol}</li>
                        </ul>
                        <div>
                            <img class="flag" src="${flag}" title="${name}">
                        </div>
                    </div>`;
    });
    displayCountries(header, output);

    if (countryMatches.length === 0) {
        return document.querySelector('.header').innerHTML = "<h1>No Matches Found</h1>";
    }

    const width = window.matchMedia('(min-width: 768px)');

    const changeWidth = width => {
        if (width.matches) { //if media query matches
            container.style.width = "350px";
        }
    }

    if (countryMatches.length === 1) {
        changeWidth(width);
        width.addListener(changeWidth);
    }
    else {
        container.style.width = "100%";
    }
}

// Set UI

const displayCountries = (header, output) => {
    container.style.justifyContent = "start";
    document.querySelector('.header').innerHTML = header;
    document.querySelector('.countries').innerHTML = output;
    searchButton.style.display = "block";
    loader.style.visibility = "hidden";
}

const displayLoader = () => {
    button.style.display = "none";
    err.style.display = "none";
    loader.style.visibility = "visible";
}

const displayError = (errorMessage) => {
    button.style.display = "block";
    loader.style.visibility = "hidden";
    err.innerHTML = errorMessage;
    err.style.display = "flex";
    searchButton.style.display = "none";
}

button.addEventListener('click', loadCountries);
searchField.addEventListener("input", e => getCountries(searchField.value));

// UI when page is not fully loaded

document.onreadystatechange = () => {
    if (document.readyState !== "complete") {
        loader.style.visibility = "visible";
        button.disabled = true;
        button.style.opacity = .2;
    } else {
        loader.style.visibility = "hidden";
        button.style.opacity = 1;
        button.disabled = false;
    }
}