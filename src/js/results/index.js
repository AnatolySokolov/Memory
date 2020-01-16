'use strict';

import { library } from '../library';

export class Results {
  constructor(options) {
    this.url = options.url;
    this.mainContainer = options.mainContainer;
    this.listContainer = options.listContainer;
    this.openButton = options.openButton;
    this.closeButton = options.closeButton;
  }

  createTemplateItem(result) {
    return `
      <li class="results__item">
        <span class="results__name">${result.name}</span>
        <span class="results__score">${result.score}</span>
      </li>`;
  }

  fetchResults(url) {
    return fetch(url)
      .then(data => data.json());
  }

  renderResults(results, container) {
    container.innerHTML = results.reduce((list, item) => list + this.createTemplateItem(item), '');
  }

  onOpenButtonClick() {
    this.fetchResults(this.url)
      .then(data => this.renderResults(data, this.listContainer))
      .then(() => library.openContainer(this.mainContainer, 'results--opened'));
  }

  onCloseButtonClick() {
    library.closeContainer(this.mainContainer, 'results--opened');
  }

  enableListeners() {
    this.openButton.addEventListener('click', () => this.onOpenButtonClick());
    this.closeButton.addEventListener('click', () => this.onCloseButtonClick());
  }
}
