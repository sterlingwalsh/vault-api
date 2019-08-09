const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const knex = require('knex');

const game = require('./routes/game');
const vault = require('./routes/vault');
const steamapi = require('./routes/steamapi');
const inventory = require('./data/inventory');

require('dotenv').config();

const app = express();
app.use(bodyParser.json());

const whitelist = [];
const corsOptions = {
  origin: function(origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
};

if (process.env.NODE_ENV === 'development') {
  app.use(cors());
} else if (process.env.NODE_ENV === 'production') {
  app.use(cors(corsOptions));
}

app.get('/vault', (req, res) => vault.getVault(req, res));

app.post('/gameDetails', async (req, res) => {
  const data = await steamapi.getGameInfo(req.body.id);
  res.json(data);
});

app.listen(process.env.PORT);

console.log('Server started on port', process.env.PORT);
