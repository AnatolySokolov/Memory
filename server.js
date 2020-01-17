const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');

const app = express();

app.use(express.static('./public'));
app.use(bodyParser.json());

function compareNumeric(a, b) {
  if (a.score < b.score) return 1;
  if (a.score === b.score) return 0;
  if (a.score > b.score) return -1;
}

app.get('/results', (req, res) => {
  fs.readFile('./db/results.json', 'utf-8', (err, data) => {
    if (err) return console.log(err);
    res.send(data);
  });
});

app.post('/request', (req, res) => {
  fs.readFile('./db/results.json', 'utf-8', (err, data) => {
    if (err) return console.log(err);

    const score = req.body.score;
    const results = JSON.parse(data);
    const isInTen = results.some(result => result.score < score);

    res.send(isInTen);
  });
});

app.post('/score', (req, res) => {
  fs.readFile('./db/results.json', 'utf-8', (err, data) => {
    if (err) return console.log(err);

    const results = JSON.parse(data);
    const item = {
      name: req.body.name,
      score: +req.body.score
    };

    results.push(item);
    results.sort(compareNumeric);
    if (results.length > 10) results.pop();

    fs.writeFile('./db/results.json', JSON.stringify(results), err => {
      if (err) return console.log(err);
    });

    res.send(results);
  });
});

app.listen(3000, () => {
  console.log('Server has been started');
});
