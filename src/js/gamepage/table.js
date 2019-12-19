'use strict';

import { Card } from './card';

export class Table {
  constructor(numberOfPairCards) {
    this.numberOfPairCards = numberOfPairCards;
    this.values = ['2', '3', '4', '5', '6', '7', '8', '9', '0', 'J', 'Q', 'K', 'A'];
    this.suits = ['S', 'C', 'D', 'H'];
    this.hand = [];
    this.container = document.querySelector('.gamepage__cards');
  }

  getRandomInt(max) {
    return Math.floor(Math.random() * (max + 1));
  }

  getRandomElFromArr(arr) {
    const r = this.getRandomInt(arr.length - 1);

    return arr.find((el, i) => {
      if (i === r) return el;
    });
  }

  getHand() {
    const hand = [];
    let i = 0;

    while (i < this.numberOfPairCards) {
      const el = this.getRandomElFromArr(this.values) + this.getRandomElFromArr(this.suits);

      if (hand.some(item => item === el)) continue;
      hand.push(el);
      i++;
    }

    this.hand = hand;
  }

  double() {
    this.hand = this.hand.concat(this.hand);
  }

  shuffle() {
    for (let i = this.hand.length - 1; i > 0; i--) {
      let j = this.getRandomInt(i);

      [this.hand[i], this.hand[j]] = [this.hand[j], this.hand[i]];
    }
  }

  render() {
    this.container.innerHTML = this.hand.reduce((hand, value) => {
      const card = new Card(value);

      return hand + card.render();
    }, '');
  }

  flipCards() {
    const cards = document.querySelectorAll('.card');

    cards.forEach(item => item.classList.toggle('card--is-flipped'));
  }

  onCardClick(e) {
    if (e.target.tagName !== 'IMG') return;

    const card = e.target.parentNode;

    card.classList.toggle('card--is-flipped');
  }

  init() {
    this.getHand();
    this.double();
    this.shuffle();
    this.render();
    setTimeout(() => {
      this.flipCards();
    }, 5000);
    this.container.addEventListener('click', e => this.onCardClick(e));
  }
}
