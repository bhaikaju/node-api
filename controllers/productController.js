const Product = require('../models/Product');
require('../models/Category');  // To make the populate work since category model is not yet used anywhere
const CustomError = require("../utilities/CustomError");
const asyncMiddleware = require('../middlewares/asyncMiddleware');

// To Get All Product
exports.getProducts = asyncMiddleware(async (req, res, next) => {
/*
    const prod = await Product.find({}).populate({
        path: 'category',
        select: 'title'
    });  // Array of products

    if (!prod) {
        const error = new CustomError(`Something went wrong, try again later.`, 500);
        res.status(error.statusCode).json({
            success: false,
            error: error.message
        });
    }
    res.status(200).json({
        success: true,
        count: prod.length,
        data: prod
    })*/

    res.status(200).json(res.moreResults);


});

// Get Single Product

exports.getSingleProduct = async (req, res) => {
    const prodId = req.params.id;
    const prod = await Product.findById(prodId);

    if (prod) {
        res.json({product: prod});
    } else {
        res.json({message: 'Product not found'})
    }
}

// Create New Product

exports.createProduct = asyncMiddleware(async (req, res, next) => {

    const product = await Product.create(req.body);

    if (product) {
        res.status(200).json({
            success: true,
            product: product
        })
    } else {
        next(new CustomError('Something went wrong, try again later', 500));
    }

})
