const Product = require('../models/Product');
const CustomError = require("../utilities/CustomError");
const asyncMiddleware = require('../middlewares/asyncMiddleware');

// To Get All Product
exports.getProducts = asyncMiddleware(async (req, res, next) => {

    const prod = await Product.find({});  // Array of products

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
        products: prod
    })

})
;

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

exports.createProduct = async (req, res) => {

    const product = await Product.create(req.body);

    if (!isEmptyObject(product)) {
        res.status(200).json({
            success: true,
            product: product
        })
    }

}
