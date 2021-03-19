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

  if (searchQuery) {
    clearResults();
    API.fetchCountry(searchQuery).then(renderSearchResult).catch(clearResults);
  } else {
    clearResults();
  }
}

function renderSearchResult(countries) {
  if (countries.length === 1) {
    renderSingleResult(countries[0]);
  } else if (countries.length > 10) {
    return onError();
  } else if ((countries.length < 10) & (countries.length > 1)) {
    renderResultsList(countries);
  } else {
    refs.resultContainer.innerHTML = `☹️ No matches found. Please try a different search.🧐`;
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

function clearResults() {
  refs.resultContainer.innerHTML = '';
}
