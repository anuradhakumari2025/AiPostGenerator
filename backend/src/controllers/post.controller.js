const post = require("../models/post.model");
const generatePostCaption = require("../services/ai.service");

module.exports.createPostController = async(req,res)=>{
  try {
    const file = req.file;
    const base64Image = new Buffer.from(file.buffer).toString("base64");
    const caption = await generatePostCaption(base64Image);
    // console.log(caption);/
    res.json({message: "Post created successfully", caption});
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

