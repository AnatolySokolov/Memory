'use strict';

import './assets/scss/endpage.scss';
import './assets/img/Group 2.png';

const score = document.querySelector('.endpage__score');

score.textContent = localStorage.getItem('score') || 0;
localStorage.removeItem('score');
