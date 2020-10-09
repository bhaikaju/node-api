const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please enter a title']
    },
    category: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'category'
    }],
    price: {
        type: Number,
        required: [true, 'Please enter a price']
    },
    onSale: {
        type: Boolean,
        default: false,
        required: false
    },
    sale_price: {
        type: Number,
        default: 0.0,
        required: false
    },

    main_image: {
        type: String,
        required: false
    },
    images: [{
        type: String,
        required: false
    }],
    description: {
        type: String,
        required: [true, "Please enter a description"]
    },
    short_desc: {
        type: String,
        required: false
    }
});


module.exports = mongoose.model('product', ProductSchema);
