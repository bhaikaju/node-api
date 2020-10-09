const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const dotenv = require('dotenv');
const db = require('./config/db');

// Load Config File
dotenv.config({path: './config/config.env'});

// Connect To Database
db().then();


// Express App
const app = express();

// Middlewares
app.use(express.json());

app.use(morgan('dev'));

app.use(cors());

app.get('/', (req, res) => {
    console.log('Got the request from default route');
})

app.listen(5000, () => {
    console.log('Server running on port 5000');
});
