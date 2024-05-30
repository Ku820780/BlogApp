const express = require("express");
const userRoute = express.Router();
const {
  userRegister, userLogin, getProfile, userLogout
} = require("../Controller/userController");
const verifyUser = require("../Middleware/verifyUser");

userRoute.post("/register", userRegister);
userRoute.post("/login", userLogin);
userRoute.get("/me", verifyUser, getProfile);
userRoute.get("/logout", userLogout);

module.exports = { userRoute };
