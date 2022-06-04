const express = require("express");
const user = require("../controllers/user.controller");
const { adminAuth } = require("../middlewares/adminPortal");

const Router = express.Router();

Router.route("/profile").get(user.getProfile).put(user.updateProfile);
Router.route("/")
    .post(adminAuth, user.createUser)
    .get(adminAuth, user.queryUser);
Router.route("/:userId")
    .get(adminAuth, user.getUser)
    .put(adminAuth, user.updateUser)
    .delete(adminAuth, user.deleteUser);

module.exports = Router;
