const express = require("express");
const router = express.Router();

const { verifyToken } = require("../middleware/index");

const registerController = require("../controller/register");
const loginController = require("../controller/login");

const userController = require("../controller/user");

const { validateRegister, validateLogin } = require("../utils/validators/auth");

router.post("/login", validateLogin, loginController.login);

router.post("/register", validateRegister, registerController.register);

router.get("/admin/users", verifyToken, userController.findUsers);

router.post("/admin/users", verifyToken, userController.createUser);

router.get("/admin/users/:id", verifyToken, userController.findUserById);

router.put("/admin/users/:id", verifyToken, userController.updateUser);

router.delete("/admin/users/:id", verifyToken, userController.deleteUser);

module.exports = router;
