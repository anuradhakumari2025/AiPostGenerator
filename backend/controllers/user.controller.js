const userModel = require("../models/user.model");
const userServices = require("../services/user.services");
const { validationResult } = require("express-validator");
const blacklistTokenModel = require("../models/blacklistToken.model");

// Example function for user registration
module.exports.registerUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { name, email, password } = req.body;
  const isUserAlreadyRegistered = await userModel.findOne({email});
  if(isUserAlreadyRegistered){
    return res.status(400).json({message:"User already registered"});
  }
  const hashedPassword = await userModel.hashPassword(password);
  const user = await userServices.createUser({
    name,
    email,
    password: hashedPassword,
  });
  const token = await user.generateAuthToken();
  res.status(201).json({ user, token });
  // try {
  //   const { name, email, password } = req.body;
  // const hashedPassword = await userModel.hashPassword(password);
  // const user = new userModel({ name, email, password: hashedPassword });
  //   await user.save();
  //   res.status(201).send({ message: "User registered successfully" });
  // } catch (error) {
  //   res.status(400).send({ error: error.message });
  // }
};

module.exports.loginUser = async(req,res,next)=>{
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    return res.status(400).json({errors:errors.array()});
  }
  const {email,password} = req.body;
  const user = await userModel.findOne({email}).select('+password');
  if(!user){
    return res.status(401).json({message:"Invalid credentials"});
  }
  const isMatch = await user.comparePassword(password);
  if(!isMatch){
    return res.status(401).json({message:"Invalid credentials"});
  }
  const token = user.generateAuthToken();
  res.cookie('token',token);
  res.status(200).json({user,token});
}

module.exports.getUserProfile = async(req,res,next)=>{
  res.status(200).json(req.user);
}

module.exports.logoutUser = async(req,res,next)=>{
  res.clearCookie('token');
  const token = req.cookies.token || req.headers.authorization.split(' ')[1];
  await blacklistTokenModel.create({token});
  res.status(200).json({message:"Logged out successfully"});
}
