const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    totalPrice: {
        type: Number,
        required: [true, "Please enter a price"]
    },
    paid: {
        type: Boolean,
        default: false
    },
    items: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'product'
    }],
    dateOfOrder: {
        type: Date,
        default: Date.now()
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    }
});


module.exports = mongoose.model('order', OrderSchema);
