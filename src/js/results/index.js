'use strict';

const URL = 'results';
const results = document.getElementById('results');
const resultsContainer = document.getElementById('results-list');
const openButton = document.getElementById('open-results-btn');
const closeButton = document.getElementById('close-results-btn');

const openResults = (container, className) => {
  container.classList.add(className);
};

const closeResults = (container, className) => {
  container.classList.remove(className);
};

const fetchResults = url => {
  return fetch(url)
    .then(data => data.json());
};

const createItem = item => {
  return `
    <li class="results__item">
      <span class="results__name">${item.name}</span>
      <span class="results__score">${item.score}</span>
    </li>`;
};

const renderResults = (results, container) => {
  container.innerHTML = results.reduce((list, item) => list + createItem(item), '');
};

const onOpenButtonClick = () => {
  fetchResults(URL)
    .then(data => renderResults(data, resultsContainer))
    .then(() => openResults(results, 'results--opened'));
};

const onCloseButtonClick = () => {
  closeResults(results, 'results--opened');
};

openButton.addEventListener('click', onOpenButtonClick);
closeButton.addEventListener('click', onCloseButtonClick);
