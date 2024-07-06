const { v4 } = require("uuid");
const { generateToken } = require("../middleware/jwtHandler");
const userTable = {};

// User signup
const userSignup = (req, res) => {
  const { userName, fullName, phoneNumber, email, password } = req.body;

  const id = v4();
  const tasks = [];
  const userData = {
    id,
    userName,
    fullName,
    phoneNumber,
    email,
    password,
    tasks,
  };
  userTable[userName] = userData;
  let authToken = generateToken(userName);
  res.send({ message: "User Signed Up Successfully", userName, authToken });
};

// Get all users
const getUsers = (req, res) => {
  if (Object.keys(userTable).length === 0) {
    return res.send("No Users found");
  } else {
    res.send(userTable);
  }
};

// Get user Data
const getUserData = (req, res) => {
  const userName = req.userData;
  if (userTable[userName]) {
    const userData = {
      userName,
      fullName: userTable[userName].fullName,
      phoneNumber: userTable[userName].phoneNumber,
      email: userTable[userName].email,
    };
    res.send({ message: "User found", userData });
  } else {
    res.send({ message: "User not found" });
  }
};

//User login
const userLogin = (req, res) => {
  const { userName, password } = req.body;
  if (userTable[userName] && userTable[userName].password === password) {
    let authToken = generateToken(userName);
    res.send({ message: "User Logged In Successfully", authToken });
  } else {
    res.send({ message: "Invalid Credentials" });
  }
};

// module exports
module.exports = {
  userTable,
  userSignup,
  getUsers,
  userLogin,
  getUserData,
};
