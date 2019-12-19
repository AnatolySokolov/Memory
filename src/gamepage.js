import './assets/scss/main.scss';
import './assets/img';

import { Table } from './js/gamepage/table';

const numberOfPairCards = 9;
const table = new Table(numberOfPairCards);

table.init();
