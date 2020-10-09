const express = require('express');
const Product = require('../models/Product');
const router = express.Router();

router.get('/', async (req, res) => {
    const prod = await Product.find({});
    res.json({products: prod});
})

module.exports = router;
