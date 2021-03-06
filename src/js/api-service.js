const BASE_URL = 'https://restcountries.eu/rest/v2/name';

function fetchCountry(countryName) {
  return fetch(`${BASE_URL}/${countryName}`).then(res => res.json());
}

export default { fetchCountry };
