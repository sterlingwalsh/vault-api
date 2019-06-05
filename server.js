const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const knex = require('knex');

require('dotenv').config();

const app = express();
app.use(bodyParser.json());

const whitelist = ['http://localhost:3000']
const corsOptions = {
    origin: function(origin, callback){
        console.log(origin);
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


app.listen(process.env.PORT);