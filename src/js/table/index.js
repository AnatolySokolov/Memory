'use strict';

import { Card } from '../card';

export class Table {
  constructor(options) {
    this.numberOfPairCards = options.numberOfPairCards;
    this.timeToRemember = options.timeToRemember;
    this.ratio = options.ratio;
    this.values = ['2', '3', '4', '5', '6', '7', '8', '9', '0', 'J', 'Q', 'K', 'A'];
    this.suits = ['S', 'C', 'D', 'H'];
    this.hand = [];
    this.firstCard = null;
    this.score = 0;
    this.container = document.getElementById('card-list');
    this.output = document.getElementById('score');
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

  deletePair(list, id) {
    list.forEach(item => {
      if (item.dataset.id === id) item.remove();
    });
  }

  clearContainer(container) {
    while (container.firstElementChild) container.firstElementChild.remove();
  }

  calculateScore(isGuessed, currentHand, numberOfPairCards, ratio) {
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
    window.location.href = '/endpage.html';
  }

  onCardClick(e) {
    if (e.target.tagName !== 'IMG') return;

    const cards = document.querySelectorAll('.card');
    const card = e.target.parentElement;
    const id = card.dataset.id;
    let isGuessed = false;

    this.flipCard(card);

    // first card
    if (this.firstCard === null) {
      this.firstCard = id;

      return;
    }

    // pair has been guessed
    if (this.firstCard === id) {
      isGuessed = true;
      setTimeout(() => {
        this.deletePair(cards, id);
        this.firstCard = null;
      }, 2000);
    }

    // pair hasn`t been guessed
    if (this.firstCard !== id) {
      isGuessed = false;
      this.firstCard = null;
      setTimeout(() => this.hideAllCards(cards), 2000);
    }

    setTimeout(() => {
      this.calculateScore(isGuessed, cards, this.numberOfPairCards, this.ratio);
      this.showScore();
    }, 2000);

    // last guessed pair, end game
    if (this.firstCard === id && cards.length === 2) {
      setTimeout(() => {
        this.saveScore(this.score);
        this.redirect();
      }, 3000);
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
    this.firstCard = null;
    this.score = 0;
    this.output.textContent = this.score;
    this.clearContainer(this.container);
    this.init();
  }
}
