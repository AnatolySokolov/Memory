'use strict';

import { library } from '../library';

const url = 'results',
  mainContainer = document.getElementById('results'),
  listContainer = document.getElementById('results-list'),
  openButton = document.getElementById('open-results-btn'),
  closeButton = document.getElementById('close-results-btn');

openButton.addEventListener('click', onOpenButtonClick);
closeButton.addEventListener('click', onCloseButtonClick);

function createTemplateItem(result, index) {
  return `
      <li class="results__item">
        <span class="results__content results__content--index">${index + 1}</span>
        <span class="results__content results__content--name">${result.name}</span>
        <span class="results__content results__content--score">${result.score}</span>
      </li>`;
}

function fetchResults(url) {
  return fetch(url)
    .then(data => data.json());
}

function renderResults(results, container) {
  container.innerHTML = results.reduce((list, item, i) => list + createTemplateItem(item, i), '');
}

function onOpenButtonClick() {
  fetchResults(url)
    .then(results => renderResults(results, listContainer))
    .then(() => library.openContainer(mainContainer, 'results--opened'));
}

function onCloseButtonClick() {
  library.closeContainer(mainContainer, 'results--opened');
}
