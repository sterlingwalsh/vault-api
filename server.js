const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const knex = require('knex');

const game = require('./routes/game');
const vault = require('./routes/vault');
const steamapi = require('./routes/steamapi');

require('dotenv').config();

const app = express();
app.use(bodyParser.json());

const whitelist = []
const corsOptions = {
    origin: function(origin, callback){
        if(whitelist.indexOf(origin) !== -1){
            callback(null, true)
        }else{
            callback(new Error('Not allowed by CORS'));
        }
    }
}

if(process.env.NODE_ENV === 'development'){
    app.use(cors());
}else if(process.env.NODE_ENV === 'production'){
    app.use(cors(corsOptions));
}

app.post('/:page?', (req, res) => vault.getVaultPage(req, res));
app.post('/game', (req, res) => game.getGameData(req, res));


app.listen(process.env.PORT);