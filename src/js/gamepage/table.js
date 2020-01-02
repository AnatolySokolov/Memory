'use strict';

import { Card } from './card';

export class Table {
  constructor(options) {
    this.numberOfPairCards = options.numberOfPairCards;
    this.timeToRemember = options.timeToRemember;
    this.values = ['2', '3', '4', '5', '6', '7', '8', '9', '0', 'J', 'Q', 'K', 'A'];
    this.suits = ['S', 'C', 'D', 'H'];
    this.hand = [];
    this.guessedCard = null;
    this.score = 0;
    this.container = document.querySelector('.gamepage__cards');
    this.output = document.querySelector('.gamepage__scores');
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

  createHand(hand, values, suits, limit) {
    let i = 0;

    while (i < limit) {
      const el =
        this.getRandomElFromArr(values) + this.getRandomElFromArr(suits);

      if (hand.some(item => item === el)) continue;
      hand.push(el);
      i++;
    }
  }

  double() {
    this.hand = this.hand.concat(this.hand);
  }

  shuffle(hand) {
    for (let i = hand.length - 1; i > 0; i--) {
      let j = this.getRandomInt(i);

      [hand[i], hand[j]] = [hand[j], hand[i]];
    }
  }

  render(container, hand) {
    container.innerHTML = hand.reduce((cards, value) => {
      const card = new Card(value);

      return cards + card.render();
    }, '');
  }

  flipCard(card) {
    card.classList.toggle('card--is-flipped');
  }

  flipCards(arr) {
    arr.forEach(item => item.classList.toggle('card--is-flipped'));
  }

  hideAllCards(arr) {
    arr.forEach(item => item.classList.add('card--is-flipped'));
  }

  deletePair(arr, id) {
    arr.forEach(item => {
      if (item.dataset.id === id) item.firstElementChild.remove();
    });
  }

  clearContainer(container) {
    while (container.firstElementChild) container.firstElementChild.remove();
  }

  calculateScore(isGuessed, currentHand, numberOfPairCards) {
    const ratio = 42;
    const numberOfClosedPairs = currentHand.length / 2;
    const numberOfOpenedPairs = numberOfPairCards - numberOfClosedPairs;
    let score;

    if (isGuessed) {
      score = numberOfClosedPairs * ratio;
      this.score += score;
    } else {
      score = numberOfOpenedPairs * ratio;
      if (this.score - score < 0) {
        this.score = 0;
      } else {
        this.score -= score;
      }
    }
  }

  showScore() {
    this.output.textContent = this.score;
  }

  saveScore(score) {
    localStorage.setItem('score', JSON.stringify(score));
  }

  redirect() {
    window.location.href = 'http://localhost:8081/endpage.html';
  }

  onCardClick(e) {
    if (e.target.tagName !== 'IMG') return;

    const cardWrapper = e.target.closest('.gamepage__wrapper');
    const card = e.target.parentElement;
    const id = cardWrapper.dataset.id;
    const cards = document.querySelectorAll('.card');
    const cardWrappers = document.querySelectorAll('.gamepage__wrapper');

    if (this.guessedCard === null) {
      this.guessedCard = id;
      this.flipCard(card);
    } else {
      if (this.guessedCard === id) {
        this.flipCard(card);
        setTimeout(() => {
          this.calculateScore(true, cards, this.numberOfPairCards);
          this.showScore();
          this.deletePair(cardWrappers, id);
          this.guessedCard = null;
          if (cards.length === 2) {
            this.saveScore(this.score);
            this.redirect();
          }
        }, 2000);
      } else {
        this.flipCard(card);
        this.guessedCard = null;
        setTimeout(() => {
          this.calculateScore(false, cards, this.numberOfPairCards);
          this.showScore();
          this.hideAllCards(cards);
        }, 2000);
      }
    }
  }

  init() {
    this.createHand(this.hand, this.values, this.suits, this.numberOfPairCards);
    this.double();
    this.shuffle(this.hand);
    this.render(this.container, this.hand);
    setTimeout(() => {
      const cards = document.querySelectorAll('.card');

      this.flipCards(cards);
    }, this.timeToRemember);
  }

  reset() {
    this.hand = [];
    this.guessedCard = null;
    this.score = 0;
    this.output.textContent = this.score;
    this.clearContainer(this.container);
    this.init();
  }
}
