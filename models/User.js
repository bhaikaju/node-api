const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: [true, "Please enter first name"]
    },
    last_name: {
        type: String,
        required: [true, "Please enter last name"]
    },
    email: {
        type: String,
        required: [true, "Please provide the email"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Please enter a password"],
        select: false
    }
}, {
    toJSON: {virtuals: true},
    toObject: {virtuals: true}
});

// Show Virtual Property Of Display Name
UserSchema.virtual('full_name').get(function (){
    return this.first_name + ' ' + this.last_name;
});



// Mongoose Middleware To Encrypt Password
UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

module.exports = mongoose.model('user', UserSchema);
