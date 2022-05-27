const express = require("express");
const product = require("../controllers/product.controller");
const { verifyToken } = require("../middlewares/verifyToken");

const Router = express.Router();

Router.route("/")
    .get(product.queryProduct)
    .post(verifyToken, product.createProduct);
Router.route("/:productId")
    .get(product.getProduct)
    .put(verifyToken, product.updateProduct)
    .delete(verifyToken, product.deleteProduct);
Router.route("/:productId/reviews").post(verifyToken, product.reviewProduct);

module.exports = Router;
