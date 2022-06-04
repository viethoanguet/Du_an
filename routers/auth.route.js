const { Route } = require("express");
const express = require("express");
const { register, login, logout } = require("../controllers/auth.controller");
const { checkCurrentUser } = require("../middlewares/checkCurrentUser");

const Router = express.Router();

Router.route("/register").post(register);
Router.route("/logout").post(logout);
Router.route("/login").post(login);
// Router.route("/current").post(checkCurrentUser);

module.exports = Router;
