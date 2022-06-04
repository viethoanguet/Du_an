const express = require('express');
const product = require('../controllers/product.controller');
const { verifyToken } = require('../middlewares/verifyToken');
const { adminAuth } = require('../middlewares/adminPortal');

const Router = express.Router();

Router.route('/')
    .get(product.queryProduct)
    .post(verifyToken, adminAuth, product.createProduct);
Router.route('/:productId')
    .get(product.getProduct)
    .put(verifyToken, adminAuth, product.updateProduct)
    .delete(verifyToken, adminAuth, product.deleteProduct);
Router.route('/:productId/reviews').post(verifyToken, product.reviewProduct);

module.exports = Router;
