'use strct';

import { library } from '../library';

const storageName = 'score',
  form = document.forms.request,
  container = document.getElementById('request'),
  output = document.getElementById('score'),
  closeButton = document.getElementById('close-request-btn'),
  score = localStorage.getItem(storageName) || 0,
  url = {
    checkScore: 'checkScore',
    playerData: 'playerData'
  };

sendData(url.checkScore, { score: score })
  .then(data => data.json())
  .then(response => {
    output.textContent = score;
    localStorage.removeItem(storageName);
    if (response) library.openContainer(container, 'request--opened');
  });

form.addEventListener('submit', e => onFormSubmit(e));
closeButton.addEventListener('click', onCloseButtonClick);

function sendData(url, data) {
  return fetch(url, {
    method: 'post',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify(data)
  });
}

function onCloseButtonClick() {
  library.closeContainer(container, 'request--opened');
}

function onFormSubmit(e) {
  e.preventDefault();

  const playerData = {
    name: form.elements.name.value,
    score: score
  };

  sendData(url.playerData, playerData)
    .then(() => {
      onCloseButtonClick();
      form.elements.name.value = '';
    });
}
