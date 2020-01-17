const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const port = 3000;
const app = express();

app.use(express.static('./public'));
app.use(bodyParser.json());

app.get('/results', (req, res) => {
  fs.readFile('./db/results.json', 'utf-8', (err, data) => {
    if (err) return console.log(err);
    res.send(data);
  });
});

app.post('/checkScore', (req, res) => {
  fs.readFile('./db/results.json', 'utf-8', (err, data) => {
    if (err) return console.log(err);

    const score = req.body.score;
    const results = JSON.parse(data);
    const isInTen = results.some(result => result.score < score);

    res.send(isInTen);
  });
});

app.post('/playerData', (req, res) => {
  fs.readFile('./db/results.json', 'utf-8', (err, data) => {
    if (err) return console.log(err);

    const results = JSON.parse(data);
    const playerData = {
      name: req.body.name,
      score: +req.body.score
    };

    results.push(playerData);

    function compareNumeric(a, b) {
      if (a.score < b.score) return 1;
      if (a.score === b.score) return 0;
      if (a.score > b.score) return -1;
    }

    results.sort(compareNumeric);
    if (results.length > 10) results.pop();

    fs.writeFile('./db/results.json', JSON.stringify(results), err => {
      if (err) return console.log(err);
    });

    res.send(results);
  });
});

app.listen(port, () => console.log(`Server has been started on port ${port}`));
