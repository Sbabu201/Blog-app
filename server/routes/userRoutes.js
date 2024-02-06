const express = require("express");
const { getAllusers, registerController, loginController, userByIdController } = require("../controllers/userController");
const router = express.Router();

router.get("/all-users", getAllusers)
router.get("/users/:id", userByIdController)
router.post("/register", registerController)
router.post("/login", loginController)


module.exports = router