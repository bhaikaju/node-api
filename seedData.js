const dotenv = require('dotenv');
const fs = require('fs');
const colors = require('colors');
const db = require('./config/db');

// Load ENV variables
dotenv.config({path: './config/config.env'});

// Load Models
const Product = require('./models/Product');

// Connect to Mongo Database
db().then();

// Read The JSON files
const products = JSON.parse(fs.readFileSync(`${__dirname}/_seedData/products.json`, 'utf-8'));

// Import Sample Data In DB
const importData = async () => {
    try {
        await Product.create(products);
        console.log(`Data successfully imported`.green.inverse);
        process.exit();
    } catch (err) {
        console.log(err);
    }
}

// Delete the data from DB
const deleteData = async () => {
    try {
        await Product.deleteMany();
        console.log(`Data successfully deleted`.red.inverse);
        process.exit();
    } catch (err) {
        console.log(err);
    }
}

if (process.argv[2] === '-i') {
    importData().then();
} else if (process.argv[2] === '-d') {
    deleteData().then();
}
