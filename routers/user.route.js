const express = require("express");
const user = require("../controllers/user.controller");

const Router = express.Router();


Router.route("/my-profile").get(user.myprofile);
Router.route("/").post(user.createUser);
Router.route("/:userId")
    .get(user.getUser)
    .put(user.updateUser)
    .delete(user.deleteUser);

module.exports = Router;
