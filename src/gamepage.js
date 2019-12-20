import './assets/scss/main.scss';
import './assets/img';

import { Table } from './js/gamepage/table';

const options = {
  timeToRemember: 2000,
  numberOfPairCards: 9
};

const table = new Table(options);

table.init();

