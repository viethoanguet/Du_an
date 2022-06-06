const express = require('express');
const cart = require('../controllers/cart.controller');
const { verifyToken } = require('../middlewares/verifyToken');
const { adminAuth } = require('../middlewares/adminPortal');

const Router = express.Router();
Router.route('/')
    .post(verifyToken, cart.createCart)
    .get(verifyToken, cart.showMyCart)
    .put(verifyToken, cart.updateMyCart)
    .delete(verifyToken, cart.deleteMyCart);
Router.route('/:cartId')
    .get(verifyToken, adminAuth, cart.getCart)
    .put(verifyToken, cart.updateCart)
    .delete(verifyToken, cart.deleteCart);
Router.route('/all').get(verifyToken, adminAuth, cart.getAllCarts);

module.exports = Router;
