'use strct';

import { library } from '../library';

export class Request {
  constructor(options) {
    this.score = 0;
    this.output = options.output;
    this.storageName = options.storageName;
    this.url = options.url;
    this.closeButton = options.closeButton;
    this.container = options.container;
    this.form = options.form;
  }

  getScore(storageName) {
    this.score = localStorage.getItem(storageName);
  }

  sendData(url, data) {
    return fetch(url, {
      method: 'post',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(data)
    });
  }

  showScore(el, score) {
    el.textContent = score;
  }

  removeStorage(storageName) {
    localStorage.removeItem(storageName);
  }

  onCloseButtonClick() {
    library.closeContainer(this.container, 'request--opened');
  }

  onFormSubmit(e) {
    e.preventDefault();

    const playerData = {
      name: this.form.elements.name.value,
      score: this.score
    };

    this.sendData(this.url.score, playerData)
      .then(() => {
        this.onCloseButtonClick();
        this.form.elements.name.value = '';
      });
  }

  init() {
    this.getScore(this.storageName);
    this.closeButton.addEventListener('click', () => this.onCloseButtonClick());
    this.form.addEventListener('submit', e => this.onFormSubmit(e));
    this.sendData(this.url.request, { score: this.score })
      .then(data => data.json())
      .then(response => {
        this.showScore(this.output, this.score);
        this.removeStorage(this.storageName);
        if (response) library.openContainer(this.container, 'request--opened');
      });
  }
}
