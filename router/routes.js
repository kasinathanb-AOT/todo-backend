const express = require("express");
const {
  userSignup,
  getUsers,
  userLogin,
  getUserData,
} = require("../controller/userController");
const { userSignUpValidation } = require("../middleware/userHandler");
const { taskvalidation } = require("../middleware/taskHandler");
const { createTask, getTasks, updateTaskStatus, deleteTask, updateTask, deleteCompletedTasks } = require("../controller/taskController");
const { tokenValidation } = require("../middleware/jwtHandler");


const router = express.Router();

router.post("/signUp", userSignUpValidation, userSignup);

router.get("/getUsers", getUsers);

router.get("/user", tokenValidation, getUserData);

router.post("/login", userLogin);

router.post("/newTask", tokenValidation, createTask);

router.get("/getTask", tokenValidation, getTasks);

router.put("/task/:taskId", tokenValidation, updateTask);

router.put("/toggle/:id", tokenValidation, updateTaskStatus);

router.delete("/deleteTask", tokenValidation, deleteTask);

router.delete("/deleteCompletedTasks", tokenValidation, deleteCompletedTasks);



module.exports = router;