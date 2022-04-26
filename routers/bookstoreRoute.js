const { Route } = require('express');
const express = require('express');
const { getBookstore, updateBookstore, createProduct, updateProduct, deleteProduct } = require('../controllers/bookstoreController');
const { verifyToken } = require('../middlewares/verifyToken')
const Router = express.Router();

Router.route('/').get(verifyToken, getBookstore).put(verifyToken, updateBookstore);
Router.route('/product').post(verifyToken, createProduct);
Router.route('/product/:productId').put(updateProduct).delete(deleteProduct);

module.exports = Router;