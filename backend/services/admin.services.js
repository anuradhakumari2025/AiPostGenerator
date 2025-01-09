const adminModel = require('../models/admin.model');
module.exports.createAdmin = async ({ name, email, password }) => {
  if (!name || !email || !password) {
    throw new Error("All input is required");
  }
  const admin = adminModel.create({ name, email, password });
  return admin;
};