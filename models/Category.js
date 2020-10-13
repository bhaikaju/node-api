const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        required: [true, "Please enter the title"]
    },
    description: {
        type: String,
        required: false
    }
});



module.exports = mongoose.model('category', CategorySchema);
