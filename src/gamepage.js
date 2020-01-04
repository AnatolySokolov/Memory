'use strict';

import './assets/scss/gamepage.scss';
import './assets/img/cards';

import { Table } from './js/table';

const options = {
  timeToRemember: 5000,
  numberOfPairCards: 9,
  ratio: 42
};

const startAgainButton = document.getElementById('start-again-btn');
const cardList = document.getElementById('card-list');
const table = new Table(options);

table.init();
cardList.addEventListener('click', e => table.onCardClick(e));
startAgainButton.addEventListener('click', () => table.reset());
