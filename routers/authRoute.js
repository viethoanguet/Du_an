const { Route } = require('express');
const express = require('express');
const {registerStore, login, registerCustomer} = require('../controllers/authController');

const Router = express.Router();

Router.route('/register/customer').post(registerCustomer);
Router.route('/register/store').post(registerStore);
Router.route('/login').post(login);

module.exports = Router;