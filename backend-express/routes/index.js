const express = require("express");
const router = express.Router();

const registerController = require("../controller/register");
const loginController = require("../controller/login");

const { validateRegister, validateLogin } = require("../utils/validators/auth");

router.post("/login", validateLogin, loginController.login);

router.post("/register", validateRegister, registerController.register);

module.exports = router;
