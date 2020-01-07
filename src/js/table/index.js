'use strict';

import { Card } from '../card';

export class Table {
  constructor(options) {
    this.numberOfPairCards = options.numberOfPairCards;
    this.timeToRemember = options.timeToRemember;
    this.ratio = options.ratio;
    this.values = ['2', '3', '4', '5', '6', '7', '8', '9', '0', 'J', 'Q', 'K', 'A'];
    this.suits = ['S', 'C', 'D', 'H'];
    this.container = document.getElementById('card-list');
    this.output = document.getElementById('score');
    this.hand = [];
    this.score = 0;
    this.firstCard = null;
    this.firstCardIndex = null;
    this.eventListenerEnabled = true;
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

  flipCards(cards) {
    cards.forEach(card => card.classList.toggle('card--is-flipped'));
  }

  hideAllCards(cards) {
    cards.forEach(card => card.classList.add('card--is-flipped'));
  }

  deletePair(cards, id) {
    cards.forEach(card => {
      if (card.dataset.id === id) card.remove();
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
    const cardIndex = Array.from(cards).indexOf(card);
    let isGuessed = false;

    // click on the same card || multiple click
    if (this.firstCardIndex === cardIndex || !this.eventListenerEnabled) return;

    this.flipCard(card);

    // first card
    if (this.firstCard === null) {
      this.firstCard = id;
      this.firstCardIndex = cardIndex;

      return;
    }

    // pair has been guessed
    if (this.firstCard === id) {
      isGuessed = true;
      setTimeout(() => this.deletePair(cards, id), 2000);
    }

    // pair hasn`t been guessed
    if (this.firstCard !== id) {
      isGuessed = false;
      setTimeout(() => this.hideAllCards(cards), 2000);
    }

    // last guessed pair, end game
    if (this.firstCard === id && cards.length === 2) {
      setTimeout(() => {
        this.saveScore(this.score);
        this.redirect();
      }, 3000);
    }

    this.eventListenerEnabled = false;
    this.firstCard = null;
    this.firstCardIndex = null;
    this.calculateScore(isGuessed, cards, this.numberOfPairCards, this.ratio);
    setTimeout(() => {
      this.showScore();
      this.eventListenerEnabled = true;
    }, 2000);
  }

  init() {
    this.createHand(this.hand, this.values, this.suits, this.numberOfPairCards);
    this.double();
    this.shuffle(this.hand);
    this.render(this.container, this.hand);
    this.eventListenerEnabled = false;
    setTimeout(() => {
      const cards = document.querySelectorAll('.card');

      this.hideAllCards(cards);
      this.eventListenerEnabled = true;
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
