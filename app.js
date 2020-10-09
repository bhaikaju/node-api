const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

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
