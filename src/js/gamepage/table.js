'use strict';

import { Card } from './card';

export class Table {
  constructor(options) {
    this.numberOfPairCards = options.numberOfPairCards;
    this.timeToRemember = options.timeToRemember;
    this.values = ['2', '3', '4', '5', '6', '7', '8', '9', '0', 'J', 'Q', 'K', 'A'];
    this.suits = ['S', 'C', 'D', 'H'];
    this.hand = [];
    this.container = document.querySelector('.gamepage__cards');
    this.guessedCard = null;
    this.score = 0;
    this.output = document.querySelector('.gamepage__scores');
    this.startAgainBtn = document.querySelector('.gamepage__btn');
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

  hideAllCards() {
    const cards = document.querySelectorAll('.card');

    cards.forEach(item => item.classList.add('card--is-flipped'));
  }

  deletePair(id) {
    const cardsWrappers = document.querySelectorAll('.gamepage__wrapper');

    cardsWrappers.forEach(item => {
      if (item.dataset.id === id) item.firstElementChild.remove();
    });
  }

  onCardClick(e) {
    if (e.target.tagName !== 'IMG') return;

    const cardsWrapper = e.target.closest('.gamepage__wrapper');
    const card = e.target.parentElement;
    const id = cardsWrapper.dataset.id;
    const cards = document.querySelectorAll('.card');

    if (this.guessedCard === null) {
      this.guessedCard = id;
      card.classList.toggle('card--is-flipped');
    } else {
      if (this.guessedCard === id) {
        card.classList.toggle('card--is-flipped');
        this.score += (cards.length / 2) * 42;
        this.output.textContent = this.score;
        setTimeout(() => {
          this.deletePair(id);
          this.guessedCard = null;
        }, 2000);
      } else {
        card.classList.toggle('card--is-flipped');
        this.guessedCard = null;
        this.score -= (9 - cards.length / 2) * 42;
        if (this.score < 0) this.score = 0;
        this.output.textContent = this.score;
        setTimeout(() => {
          this.hideAllCards();
        }, 2000);
      }
    }
  }

  init() {
    this.getHand();
    this.double();
    this.shuffle();
    this.render();
    setTimeout(() => {
      this.flipCards();
      this.container.addEventListener('click', e => this.onCardClick(e));
    }, this.timeToRemember);
  }
}
