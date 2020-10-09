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

// Load Routes
const productRoute = require('./routes/products');
app.use('/api/v1/products', productRoute);



// Define Port Number
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
