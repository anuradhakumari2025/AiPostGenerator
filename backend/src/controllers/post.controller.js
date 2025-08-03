const post = require("../models/post.model");
const generatePostCaption = require("../services/ai.service");
const { uploadFile } = require("../services/storage.service");
const { v4: uuidv4 } = require("uuid");
module.exports.createPostController = async (req, res) => {
  try {
    const file = req.file;
    const base64Image = new Buffer.from(file.buffer).toString("base64");
    const caption = await generatePostCaption(base64Image);
    const result = await uploadFile(file.buffer, `${uuidv4()}`);
    const newPost = new post({
      caption: caption,
      image: result.url,
      user: req.user._id,
    });
    res.json({ message: "Post created successfully", newPost });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
