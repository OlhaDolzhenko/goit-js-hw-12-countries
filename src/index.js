import './styles.css';
import debounce from 'lodash.debounce';
import singleResultTmpl from './templates/single-result.hbs';
import resultsListTmpl from './templates/results-list.hbs';
import API from './js/api-service';
import onError from './js/p-notify';
import getRefs from './js/get-refs';

const refs = getRefs();

refs.searchInput.addEventListener('input', debounce(onSearch, 500));

function onSearch(e) {
  const searchQuery = e.target.value.trim();

  API.fetchCountry(searchQuery).then(renderSearchResult).catch(onFetchError);
}

function renderSearchResult(countries) {
  if (countries.length === 1) {
    renderSingleResult(countries[0]);
  } else if (countries.length > 10) {
    return onError();
  } else {
    renderResultsList(countries);
  }
}

function renderSingleResult(country) {
  const countryCardMarkup = singleResultTmpl(country);
  return (refs.resultContainer.innerHTML = countryCardMarkup);
}

function renderResultsList(countries) {
  const countriesListMarkup = resultsListTmpl(countries);
  return (refs.resultContainer.innerHTML = countriesListMarkup);
}

function onFetchError() {
  refs.resultContainer.innerHTML = '';
}
