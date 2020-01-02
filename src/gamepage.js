import './assets/scss/main.scss';
import './assets/img';

import { Table } from './js/gamepage/table';

const options = {
  timeToRemember: 5000,
  numberOfPairCards: 9
};

const startAgain = document.querySelector('.gamepage__btn');
const cards = document.querySelector('.gamepage__cards');
const table = new Table(options);

table.init();
cards.addEventListener('click', e => table.onCardClick(e));
startAgain.addEventListener('click', () => table.reset());
