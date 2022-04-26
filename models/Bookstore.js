const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const bookstoreSchema = new mongoose.Schema({
    name: {type: String, unique: true, trim: true, required: [true, 'Name must be required']},
    phone: {type: String, unique: true, trim: true, required: [true, 'Phone must be required']},
    address: {type: Object},
    avatar: {type: String},
    email: {type: String, unique: true, trim: true, required: [true, 'Email must be required']},
    username: {type: String, unique: true, trim: true, required: [true, 'Username must be required']},
    password: {type: String, trim: true, required: [true, 'Password must be required'], minlength: [8, 'Password must be at least 8 characters']},
    store: {type: Array},
    sales: {type: Number},
    history: {type: Array},
    process: {type: Array},
    follower: {type: Array}
}, {timestamps: true})

bookstoreSchema.pre('save', function (next) {
    let bookstore = this;
    bcrypt.hash(bookstore.password, 10, function(error, hash) {
        if (error) {
            return next(error);
        } else {
            bookstore.password = hash;
            next();
        }
    })
})

const Bookstore = mongoose.model('Bookstore', bookstoreSchema);

module.exports = Bookstore;