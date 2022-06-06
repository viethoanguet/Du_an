const express = require('express');
const order = require('../controllers/order.controller');
const { adminAuth } = require('../middlewares/adminPortal');
const { verifyToken } = require('../middlewares/verifyToken');

const Router = express.Router();

Router.route('/all').get(verifyToken, order.queryOrders);
Router.route('/')
    .post(verifyToken, order.createOrder)
    .get(verifyToken, order.getMyOrders);
Router.route('/:orderId')
    .get(verifyToken, order.getOrder)
    .patch(verifyToken, order.updateOrder)
    .delete(verifyToken, order.deleteOrder);

module.exports = Router;
