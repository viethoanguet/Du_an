const authRoute = require("./auth.route");
const userRoute = require("./user.route");
const productRoute = require("./product.route");
const cartRoute = require("./cart.route");
const orderRoute = require("./order.route");

route = (app) => {
    app.use("/auth", authRoute);
    app.use("/users", userRoute);
    app.use("/products", productRoute);
    app.use("/cart", cartRoute);
    app.use("/orders", orderRoute);
};

module.exports = route;
