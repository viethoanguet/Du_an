const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const customerSchema = new mongoose.Schema({
    name: {type: String, unique: true, trim: true, required: [true, 'Name must be required']},
    dob: {type: {
        day: {type: Number, min: [1, 'Invalid Number'], max: [31, 'Invalid Number']},
        month: {type: Number, min: [1, 'Invalid Number'], max: [12, 'Invalid Number']},
        year: {type: Number, min: [1890, 'Invalid Number'], max: [2022, 'Invalid Number']}
    }},
    gender: {type: String},
    phone: {type: String, unique: true, trim: true, required: [true, 'Phone must be required']},
    address: {type: {
        province: {type: String, required: [true, 'Province must be required']},
        district: {type: String, required: [true, 'District must be required']},
        street: {type: String, required: [true, 'Street must be required']},
        detail: {type: String, required: [true, 'Detail must be required']},
    }},
    avatar: {type: String, trim: true},
    email: {type: String, unique: true, trim: true, required: [true, 'Email must be required']},
    username: {type: String, unique: true, trim: true, required: [true, 'Username must be required']},
    password: {type: String, trim: true, required: [true, 'Password must be required'], minlength: [8, 'Password must be at least 8 characters']},
    cart: {type: [{
        productId: {type: String},
        quantity: {type: Number, min: [1, 'Invalid Number']}
    }]},
    favourite: {type: [{type: String}]},
    history: {type: [{type: String}]},
    process: {type: [{type: String}]},
    following: {type: [{type: String}]}
}, {timestamps: true})

customerSchema.pre('save', function (next) {
    let customer = this;
    bcrypt.hash(customer.password, 10, function(error, hash) {
        if (error) {
            return next(error);
        } else {
            customer.password = hash;
            next();
        }
    })
})

const Customer = mongoose.model('Customer', customerSchema);

module.exports = Customer;