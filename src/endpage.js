import './assets/scss/main.scss';
import './assets/img';

const score = document.querySelector('.endpage__score');
const results = document.querySelector('.results');
const openBtn = document.getElementById('open-results');
const closeBtn = document.getElementById('close-results');

const openResults = (container, className) => {
  container.classList.add(className);
};

const closeResults = (container, className) => {
  container.classList.remove(className);
};

const onOpenBtnClick = () => {
  openResults(results, 'results--opened');
};

const onCloseBtnClick = () => {
  closeResults(results, 'results--opened');
};

score.textContent = localStorage.getItem('score');
localStorage.removeItem('score');

openBtn.addEventListener('click', onOpenBtnClick);
closeBtn.addEventListener('click', onCloseBtnClick);
