const { Route } = require('express');
const express = require('express');
const {getProductInfo, getAllProductInfo} = require('../controllers/productController');

const Router = express.Router();

Router.route('/:productId').get(getProductInfo);
// Router.route('/all').get(getAllProductInfo);

module.exports = Router;