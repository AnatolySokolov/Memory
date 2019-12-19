'use strict';

const cards = document.querySelector('.gamepage__cards');

const onCardsClick = e => {
  if (e.target.tagName !== 'IMG') return;

  const card = e.target.parentNode;

  card.classList.toggle('card--is-flipped');
};

cards.addEventListener('click', onCardsClick);
