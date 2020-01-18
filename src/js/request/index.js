'use strct';

const storageName = 'score',
  output = document.getElementById('score'),
  score = localStorage.getItem(storageName) || 0;

output.textContent = score;
