const express = require("express");
const { register, login, logout } = require("../controllers/auth.controller");

const Router = express.Router();

Router.route("/register").post(register);
Router.route("/logout").post(logout);
Router.route("/login").post(login);

module.exports = Router;
