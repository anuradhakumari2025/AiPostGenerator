const express = require("express");
const router = express.Router();
const adminController = require("../controllers/admin.controller");
const { body } = require("express-validator");
const authMiddleware = require("../middlewares/auth.middleware");

router.post(
  "/register",
  [
    body("name")
      .isLength({ min: 3 })
      .withMessage("Name must be atleast 3 characters"),
    body("email").isEmail().withMessage("Invalid Email"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be atleast 6 characters"),
  ],
  adminController.registerAdmin
);
router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Invalid Email"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be atleast 6 characters"),
  ],
  adminController.loginAdmin
);
router.get("/profile",authMiddleware.authAdmin, adminController.getAdminProfile);
router.get("/logout",authMiddleware.authAdmin, adminController.logoutAdmin);
module.exports = router;
