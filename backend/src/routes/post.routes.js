const express = require("express");
const { authMiddlware } = require("../middlewares/auth.middleware");
const router = express.Router();
const multer = require("multer");
const { createPostController } = require("../controllers/post.controller");

const upload = multer({
  storage: multer.memoryStorage()})  

router.post("/", authMiddlware, upload.single("image"), createPostController);

module.exports = router;
