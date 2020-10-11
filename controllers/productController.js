const Product = require('../models/Product');
const {isEmptyObject} = require("mongoose");

// To Get All Product
exports.getProducts = async (req, res) => {
    try {
        const prod = await Product.find({});
        res.json({products: prod});
    } catch (err) {
        res.json({error: 'Something went wrong'});
    }

}

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
