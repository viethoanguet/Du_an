const express = require("express");
const user = require("../controllers/user.controller");

const Router = express.Router();

Router.route("/my-profile").get(user.getProfile);
Router.route("/").post(user.createUser).get(user.queryUser);
Router.route("/:userId")
    .get(user.getUser)
    .put(user.updateUser)
    .delete(user.deleteUser);

module.exports = Router;
