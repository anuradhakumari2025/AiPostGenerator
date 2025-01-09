const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const adminSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: [3, "Name should be at least 3 characters long"],
  },
  email: {
    type: String,
    required: true,
    unique: true,
    minlength: [5, "Email should be at least 5 characters long"],
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please add a valid email",
    ],
  },

  password: {
    type: String,
    required: true,
    select: false, //by default password will not be sent in response while finding user
  },
  socketId: {
    type: String,
  },
});
adminSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
    expiresIn: "24h",
  });
  return token;
};
adminSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};
adminSchema.statics.hashPassword = async function (password) {
  return await bcrypt.hash(password, 12);
};
const adminModel = mongoose.model('admin', adminSchema);
module.exports = adminModel;
