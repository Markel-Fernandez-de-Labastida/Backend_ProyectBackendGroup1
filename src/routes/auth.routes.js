const { Router } = require("express");
const { check } = require("express-validator");
const { loginUser, getUsers } = require("../controllers/auth.controllers");
const { validateInput } = require("../middleware/validateInput");

const router = Router();

router.post(
  "/login",
  [
    check("email", "email requerido").notEmpty().isString(),
    check("password", "password requerido").notEmpty().isString(),
    validateInput,
  ],
  loginUser
);

router.get("/login", getUsers);

module.exports = router;
