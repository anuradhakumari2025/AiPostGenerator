module.exports.authMiddlware = async (req, res,next) => {
  const token = req.cookies.token;

  if (!token) {
    return res
      .status(401)
      .json({ message: "Unauthorized access, please login first" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const newUser = await user.findById(decoded.id);
    console.log("Decoded User:", newUser);
    req.user = newUser;
    next();
  } catch (error) {
    return res
      .status(401)
      .json({ message: "Invalid token, please login again" });
  }
}