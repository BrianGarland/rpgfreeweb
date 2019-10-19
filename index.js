
const RPG = require('./rpg/RPG');

const bodyParser = require('body-parser');
const express = require('express')
const app = express();
const port = 9765;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', express.static('public'));

app.post('/convert', function(req, res) {
  var lines = req.body.lines;

  lines.push('', '');

  var conv = new RPG(lines);
  conv.parse();

  res.send({lines, messages: conv.messages});
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))