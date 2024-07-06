const { userTable } = require("../controller/userController");

const userSignUpValidation = (req, res, next) => {
  const { userName, fullName, phoneNumber, email, password } = req.body;

  if (!userName || !fullName || !phoneNumber || !email || !password) {
    return res.status(400).json({ message: "Please fill all the fields." });
  }

  if (userTable[userName]) {
    return res.status(400).json({ message: "User name already exists." });
  }

  next();
};

module.exports = {
  userSignUpValidation,
};
