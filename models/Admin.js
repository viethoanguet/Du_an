const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    username: {type: String, unique: true, trim: true, required: [true, 'Username must be required']},
    password: {type: String, trim: true, required: [true, 'Password must be required'], minlength: [8, 'Password must be at least 8 characters']},
    customerList: {type: Array},
    bookstoreList: {type: Array},
    productList: {type: Array},
    orderList: {type: Array},
}, {timestamps: true})

const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;