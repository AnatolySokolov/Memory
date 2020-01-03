const express = require('express');
const fs = require('fs');

const app = express();

app.use(express.static('./public'));

app.get('/results', (req, res) => {
  fs.readFile('./db/results.json', 'utf-8', (err, data) => {
    if (err) return console.log(err);
    res.send(data);
  });
});

app.listen(3000, () => {
  console.log('Server has been started');
});
