const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const validateRequest = require("../middleware/validateRequest");
const { authSchemas } = require("../validators/schemas");

router.post(
  "/register",
  validateRequest({ body: authSchemas.register }),
  authController.register,
);
router.post(
  "/login",
  validateRequest({ body: authSchemas.login }),
  authController.login,
);
// router.post("/logout", authController.logout);

module.exports = router;
