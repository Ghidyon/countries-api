document.querySelector('button').addEventListener("click", getCountries);

function getCountries() {
    fetch('https://restcountries.eu/rest/v2/all')
        .then(response => response.json())
        .then(data => {
            console.log(data);
            let header = `<h2>Countries</h2>`;
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
            document.querySelector('.header').innerHTML = header;
            document.querySelector('.countries').innerHTML = output;
        })
        .catch(() => {
            const errorMessage = `<img src="images/icon-error.svg">
                                <span>Failed to fetch countries, please check your internet connection.</span>`;
            document.querySelector('.error').innerHTML = errorMessage;
        })
}