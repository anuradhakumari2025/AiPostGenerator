const ImageKit = require("imagekit");

const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});

module.exports.uploadFile = async (file, fileName) => {
  const response = await imagekit.upload({
    file: file, // base64 string or file path or URL
    fileName: fileName, // name of the file to be saved
    folder:"ai-post"
  });
  return response; // return the URL of the uploaded file
};
