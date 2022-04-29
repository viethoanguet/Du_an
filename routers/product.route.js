const express = require("express");
const product = require("../controllers/product.controller");

const Router = express.Router();

Router.route("/").get(product.getAllProduct).post(product.createProduct);
Router.route("/:productId")
    .get(product.getProduct)
    .put(product.updateProduct)
    .delete(product.deleteProduct);
// Router.route("/:productId/reviews").post(product.postReview);

module.exports = Router;
