const express = require('express');
const cart = require('../controllers/cart.controller');
const { verifyToken } = require('../middlewares/verifyToken');
const { adminAuth } = require('../middlewares/adminPortal');

const Router = express.Router();
Router.route('/')
    .post(verifyToken, cart.createCart)
    .get(verifyToken, cart.showMyCart);
Router.route('/:cartId')
    .get(verifyToken, adminAuth, cart.getCart)
    .patch(verifyToken, cart.updateCart)
    .delete(verifyToken, cart.deleteCart);

module.exports = Router;
