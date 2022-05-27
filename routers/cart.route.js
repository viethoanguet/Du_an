const express = require("express");
const cart = require("../controllers/cart.controller");
const { verifyToken } = require("../middlewares/verifyToken");

const Router = express.Router();
Router.route("/").post(verifyToken, cart.createCart);
Router.route("/my-carts").get(verifyToken, cart.showMyCart);
Router.route("/:cartId")
    .get(cart.getCart)
    .patch(cart.updateCart)
    .delete(cart.deleteCart);

module.exports = Router;
