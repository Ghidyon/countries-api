document.querySelector('button').addEventListener("click", getCountries);

function getCountries() {
    fetch('https://restcountries.eu/rest/v2/all')
        .then(response => response.json())
        .then(data => {
            console.log(data);
        })
        .catch(() => {
            const errorMessage = `<img src="images/icon-error.svg">
                                <span>Failed to fetch countries, please check your internet connection.</span>`;
            document.querySelector('.error').innerHTML = errorMessage;
        })
}