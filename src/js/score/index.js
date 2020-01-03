'use strict';

const score = document.querySelector('.endpage__score');

score.textContent = localStorage.getItem('score') || 0;
localStorage.removeItem('score');
