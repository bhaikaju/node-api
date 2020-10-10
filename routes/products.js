const express = require('express');
const Product = require('../models/Product');
const router = express.Router();
const prodCont = require('../controllers/productController');

router.route('/')
    .get(prodCont.getProducts)
    .post(prodCont.createProduct);


router.route('/:id')
    .get(prodCont.getSingleProduct);

module.exports = router;
