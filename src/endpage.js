'use strict';

import './assets/scss/endpage.scss';
import './assets/img/Group.png';
import { gameSound } from './js/sounds';
import { Results } from './js/results';

const score = document.querySelector('.endpage__score');
const options = {
  url: 'results',
  mainContainer: document.getElementById('results'),
  listContainer: document.getElementById('results-list'),
  openButton: document.getElementById('open-results-btn'),
  closeButton: document.getElementById('close-results-btn')
};

const results = new Results(options);
results.enableListeners();

score.textContent = localStorage.getItem('score') || 0;
localStorage.removeItem('score');

gameSound.play('end');
