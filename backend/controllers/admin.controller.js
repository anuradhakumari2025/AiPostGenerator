const adminModel = require('../models/admin.model');
const { validationResult } = require('express-validator');
const adminServices = require('../services/admin.services');
const blacklistTokenModel = require('../models/blacklistToken.model');

module.exports.registerAdmin = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { name, email, password } = req.body;
  const isAdminAlreadyRegistered = await adminModel.findOne({ email });
  if (isAdminAlreadyRegistered) {
    return res.status(400).json({ msg: 'Admin already registered' });
  }
  //only one admin can register
  // const adminCount = await adminModel.countDocuments();
  // if (adminCount > 0) {
  //   return res.status(400).json({ msg: 'Only one admin can be registered' });
  // }
  
  const hashedPassword = await adminModel.hashPassword(password);
  const admin = await adminServices.createAdmin({
    name,
    email,
    password: hashedPassword,
  });
  const token = await admin.generateAuthToken();
  res.status(201).json({ admin, token });
};

module.exports.loginAdmin = async (req,res,next)=>{
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const {email,password} = req.body;
  if(!email || !password){
    return res.status(400).json({msg:"Please provide email and password"});
  }
  const admin = await adminModel.findOne({email}).select('+password');
  if(!admin){
    return res.status(401).json({msg:"Invalid credentials"});
  }
  const isMatch = await admin.comparePassword(password);
  if(!isMatch){
    return res.status(401).json({msg:"Invalid credentials"});
  }
  const token = await admin.generateAuthToken();
  res.cookie('token',token);
  // console.log(token);
  res.status(200).json({admin,token});
}

module.exports.getAdminProfile = async (req,res,next)=>{
  res.status(200).json({admin:req.admin});
}
module.exports.logoutAdmin = async (req,res,next)=>{
  const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
  await blacklistTokenModel.create({token});
  res.clearCookie('token');
  res.status(200).json({msg:"Logged out successfully"});  
}