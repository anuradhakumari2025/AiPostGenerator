const express = require("express");
const { authMiddlware } = require("../middlewares/auth.middleware");
const router = express.Router();

router.post("/", authMiddlware);

module.exports = router;
