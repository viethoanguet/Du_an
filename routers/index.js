const authRoute = require("./auth.route");
const userRoute = require("./user.route");
const productRoute = require("./product.route");
const cartRoute = require("./cart.route");
const orderRoute = require("./order.route");
const { verifyToken } = require("../middlewares/verifyToken");

route = (app) => {
    app.use("/v1/auth", authRoute);
    app.use("/v1/users", verifyToken, userRoute);
    app.use("/v1/products", productRoute);
    app.use("/v1/cart", cartRoute);
    app.use("/v1/orders", orderRoute);
};

module.exports = route;
