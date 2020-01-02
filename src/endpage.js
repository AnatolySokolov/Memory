import './assets/scss/main.scss';
import './assets/img';

const score = document.querySelector('.endpage__score');

score.textContent = localStorage.getItem('score');
localStorage.removeItem('score');
