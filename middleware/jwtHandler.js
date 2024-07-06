const jwt = require("jsonwebtoken");

let token = "";
const secret = "mySecret";

// Generating token
const generateToken = (userData) => {
  return (token = jwt.sign({ userData }, secret));
};

// Validating token
const tokenValidation = (req, res, next) => {
  const userToken = req.headers.authorization;
  console.log("In token validation",userToken);
  if (!userToken) {
    return res.status(401).json({ message: "No token provided" });
  }
  try {
    const decoded = jwt.verify(userToken, secret);
    req.userData = decoded.userData;
    next();
  } catch (error) {
    res.status(400).json({ message: "Token is not valid" });
  }
};

// Module exports
module.exports = {
  generateToken,
  tokenValidation,
};
