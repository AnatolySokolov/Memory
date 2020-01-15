'use strict';

import './assets/scss/endpage.scss';
import './assets/img/Group.png';
import { gameSound } from './js/sounds';

const score = document.querySelector('.endpage__score');

score.textContent = localStorage.getItem('score') || 0;
localStorage.removeItem('score');
gameSound.play('end');
