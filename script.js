const button = document.querySelector('button');
const searchButton = document.querySelector('.input-group');
const loader = document.querySelector('.loader');
const err = document.querySelector('.error');

const getCountries = () => {
    displayLoader();

    fetch('https://restcountries.eu/rest/v2/all')
        .then(response => response.json())
        .then(data => {
            let header = `<h1>Countries</h1>`;
            let output = ``;
            data.forEach(country => {
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
            })
            removeLoader(header, output);
        })
        .catch(() => {
            const errorMessage = `<img src="images/icon-error.svg">
                                <span>Failed to fetch countries, please check your internet connection.</span>`;
            displayError(errorMessage);
        })
}

// Function for UI

const displayLoader = () => {
    button.style.display = "none";
    err.style.display = "none";
    loader.style.visibility = "visible";
}

const removeLoader = (header, output) => {
    loader.style.visibility = "hidden";
    document.querySelector('.header').innerHTML = header;
    document.querySelector('.countries').innerHTML = output;
    searchButton.style.display = "block";
}

const displayError = (errorMessage) => {
    button.style.display = "block";
    loader.style.visibility = "hidden";
    err.innerHTML = errorMessage;
    err.style.display = "flex";
}

button.addEventListener("click", getCountries);

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