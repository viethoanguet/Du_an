const Bookstore = require('../models/Bookstore');
const Product = require('../models/Product');

exports.getBookstore = async (req, res, next) => {
    try {
        const { bookstoreId } = req.bookstore;
        const bookstore = await Bookstore.findById(bookstoreId);
        res.status(200).json({
            status: 'success',
            data: { bookstore }
        })
    } catch (error) {
        res.json(error);
    }
}

exports.updateBookstore = async (req, res, next) => {
    try {

        const { bookstoreId } = req.bookstore;
        // console.log(bookstoreId)
        // const bookstore = await Bookstore.findById(bookstoreId);
        const newBookstore = await Bookstore.findByIdAndUpdate(bookstoreId, { ...req.body }, { new: true })
        res.status(200).json({
            status: 'success',
            data: { newBookstore }
        })

    } catch (error) {
        res.json(error);
    }
}

exports.createProduct = async (req, res, next) => {
    try {
        const { bookstoreId } = req.store;
        console.log(req.store);
        const product = await Product.create({ ...req.body, bookstoreId: bookstoreId });

        res.status(200).json({
            status: 'success',
            data: { product }
        })
    } catch (error) {
        res.json(error);
    }
}

exports.updateProduct = async (req, res, next) => {
    try {
        const { productId } = req.params;
        const { bookstoreId } = req.store;
        console.log(bookstoreId)
        const product = await Product.findById(productId);
        if (bookstoreId === product.bookstoreId) {
            const newProduct = await Product.updateOne(productId, { ...req.body }, { new: true, runValidators: true })
            res.status(200).json({
                status: 'success',
                data: { newProduct }
            })
        } else {
            console.log("false");
        }
    } catch (error) {
        res.json(error);
    }
}

exports.deleteProduct = async (req, res, next) => {
    try {
        const { productId } = req.params;
        await Product.findByIdAndDelete(productId);
        res.status(200).json({
            status: 'success',
            message: 'product has been deleted'
        })
    } catch (error) {
        res.json(error);
    }
} 
