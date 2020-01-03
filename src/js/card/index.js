'use strict';

export class Card {
  constructor(value) {
    this.value = value;
  }

  render() {
    return `
      <li class="gamepage__wrapper">
        <div class="card" data-id=${this.value}>
          <img class="card__face card__face--front" src="/assets/img/${this.value}.png" alt="card" width="226" height="314">
          <img class="card__face card__face--back" src="/assets/img/shirt.jpg" alt="card" width="226" height="314">
        </div>
      </li>`;
  }
}
