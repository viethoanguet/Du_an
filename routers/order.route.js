const express = require('express');
const order = require('../controllers/order.controller');
const { adminAuth } = require('../middlewares/adminPortal');
const { verifyToken } = require('../middlewares/verifyToken');

const Router = express.Router();

Router.route('/')
    .post(verifyToken, order.createOrder)
    .get(verifyToken, order.getAllOrders);
Router.route('/:orderId')
    .get(verifyToken, adminAuth, order.getOrder)
    .patch(verifyToken, adminAuth, order.updateOrder)
    .delete(verifyToken, adminAuth, order.deleteOrder);

module.exports = Router;
