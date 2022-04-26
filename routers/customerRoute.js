const { Route } = require('express');
const express = require('express');
const { getCustomerProfile, updateCustomerProfile } = require('../controllers/customerController');
const { verifyToken } = require('../middlewares/verifyToken');

const Router = express.Router();

Router.route('/').get(verifyToken, getCustomerProfile).put(verifyToken, updateCustomerProfile);

module.exports = Router;