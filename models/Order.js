const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    productId: {type: String},
    bookstoreId: {type: String},
    customerId: {type: String},
    quantity: {type: Number, min: [1, 'Invalid number']},
    paymentMethod: {type: String},
    delivery: {type: Number},
    status: {type: String, enum: [successful, cancelled, wait, ongoing]},
    review: {type: [{
        comment: {type: String},
        ranking: {type: Number, min: 1, max: 5}
    }]}
}, {timestamps: true})

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;