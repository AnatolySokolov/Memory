'use strict';

import './assets/scss/endpage.scss';
import './assets/img/Group.png';
import { gameSound } from './js/sounds';
import { Results } from './js/results';
import { Request } from './js/request';

const resultsOptions = {
  url: 'results',
  mainContainer: document.getElementById('results'),
  listContainer: document.getElementById('results-list'),
  openButton: document.getElementById('open-results-btn'),
  closeButton: document.getElementById('close-results-btn')
};

const scoreOptions = {
  storageName: 'score',
  url: {
    request: 'request',
    score: 'score'
  },
  output: document.getElementById('score'),
  container: document.getElementById('request'),
  closeButton: document.getElementById('close-request-btn'),
  form: document.forms.request
};

const results = new Results(resultsOptions);
results.enableListeners();

const request = new Request(scoreOptions);
request.init();

gameSound.play('end');
