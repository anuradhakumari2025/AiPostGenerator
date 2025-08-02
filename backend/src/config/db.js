const mongoose = require("mongoose");

function connectToDB() {
  mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => {
      console.log("Connected to DB");
    })
    .catch((err) => {
      console.log("Error", err);
      process.exit(1);
    });
}
module.exports = connectToDB;
