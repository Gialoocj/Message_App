const express = require("express");
const userController = require("../controllers/user.controller");
const userRouter = express.Router();

userRouter.route("/:userid").get(userController.getUser);
userRouter.route("/").get(userController.getAllUsers);

module.exports = userRouter;
