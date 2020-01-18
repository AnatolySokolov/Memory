'use strict';

import { library } from '../library';
import { Card } from './Card';
import { gameSound } from '../sounds';

const timeToRemember = 5000,
  numberOfPairCards = 9,
  ratio = 42,
  container = document.getElementById('card-list'),
  startAgainButton = document.getElementById('start-again-btn'),
  output = document.getElementById('score'),
  values = ['2', '3', '4', '5', '6', '7', '8', '9', '0', 'J', 'Q', 'K', 'A'],
  suits = ['S', 'C', 'D', 'H'];

let hand = [],
  totalScore = 0,
  firstCard = null,
  firstCardIndex = null,
  eventListenerEnabled = true;

init();

function createHand(hand, values, suits, limit) {
  let i = 0;

  while (i < limit) {
    const el = library.getRandomElFromArr(values) + library.getRandomElFromArr(suits);

    if (hand.some(item => item === el)) continue;
    hand.push(el);
    i++;
  }
}

function double() {
  hand = hand.concat(hand);
}

function shuffle(hand) {
  for (let i = hand.length - 1; i > 0; i--) {
    let j = library.getRandomInt(i);

    [hand[i], hand[j]] = [hand[j], hand[i]];
  }
}

function render(container, hand) {
  container.innerHTML = hand.reduce((cards, value) => {
    const card = new Card(value);

    return cards + card.render();
  }, '');
}

function flipCard(card) {
  card.classList.toggle('card--is-flipped');
}

function hideAllCards(cards) {
  cards.forEach(card => card.classList.add('card--is-flipped'));
}

function deletePair(cards, id) {
  cards.forEach(card => {
    if (card.dataset.id === id) card.remove();
  });
}

function clearContainer(container) {
  while (container.firstElementChild) container.firstElementChild.remove();
}

function calculateScore(isGuessed, currentHand, numberOfPairCards, ratio) {
  const numberOfClosedPairs = currentHand.length / 2;
  const numberOfOpenedPairs = numberOfPairCards - numberOfClosedPairs;
  let score;

  if (isGuessed) {
    score = numberOfClosedPairs * ratio;
    totalScore += score;

    return;
  }

  score = numberOfOpenedPairs * ratio;

  if (totalScore - score < 0) {
    totalScore = 0;

    return;
  }

  totalScore -= score;
}

function saveScore(score) {
  localStorage.setItem('score', JSON.stringify(score));
}

function redirect() {
  window.location.href = '/endpage.html';
}

function onCardClick(e) {
  if (e.target.tagName !== 'IMG') return;

  const cards = document.querySelectorAll('.card');
  const card = e.target.parentElement;
  const id = card.dataset.id;
  const cardIndex = Array.from(cards).indexOf(card);
  let isGuessed = false;

  // click on the same card || multiple click
  if (firstCardIndex === cardIndex || !eventListenerEnabled) return;

  flipCard(card);
  gameSound.play('open');

  // first card
  if (firstCard === null) {
    firstCard = id;
    firstCardIndex = cardIndex;

    return;
  }

  // pair has been guessed
  if (firstCard === id) {
    isGuessed = true;
    setTimeout(() => {
      deletePair(cards, id);
      gameSound.play('plus');
    }, 2000);
  }

  // pair hasn`t been guessed
  if (firstCard !== id) {
    isGuessed = false;
    setTimeout(() => {
      hideAllCards(cards);
      gameSound.play('minus');
    }, 2000);
  }

  // last guessed pair, end game
  if (firstCard === id && cards.length === 2) {
    setTimeout(() => {
      saveScore(totalScore);
      redirect();
    }, 3000);
  }

  eventListenerEnabled = false;
  firstCard = null;
  firstCardIndex = null;
  calculateScore(isGuessed, cards, numberOfPairCards, ratio);
  setTimeout(() => {
    output.textContent = totalScore;
    eventListenerEnabled = true;
  }, 2000);
}

function init() {
  createHand(hand, values, suits, numberOfPairCards);
  double();
  shuffle(hand);
  render(container, hand);
  eventListenerEnabled = false;
  container.addEventListener('click', e => onCardClick(e));
  startAgainButton.addEventListener('click', reset);
  setTimeout(() => {
    const cards = document.querySelectorAll('.card');

    hideAllCards(cards);
    eventListenerEnabled = true;
  }, timeToRemember);
}

function reset() {
  hand = [];
  firstCard = null;
  totalScore = 0;
  output.textContent = totalScore;
  clearContainer(container);
  init();
}
