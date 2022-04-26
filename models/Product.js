const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    bookstoreId: {type: String},
    name: {type: String, unique: true, trim: true, required: [true, 'Name must be required']},
    author: {type: String, trim: true, required: [true, 'Author must be required']},
    image: {type: String, required: [true, 'Image must be required']},
    translator: {type: String},
    price: {type: Number, required: [true, 'Price must be required']},
    description: {type: String, required: [true, 'Author must be required']}, 
    category: {type: Array, minItems: [1, 'Category must includes at least 1 item']},
    stock: {type: Number, min: [0, 'Invalid number']},
    review: {type: [{
        customerId: {type: String},
        orderId: {type: String},
        comment: {type: String},
        ranking: {type: Number, min: 1, max: 5}
    }]}
}, {timestamps: true})

const Product = mongoose.model('Product', productSchema);

module.exports = Product;