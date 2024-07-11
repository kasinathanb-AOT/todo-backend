// taskController.js

const { v4 } = require("uuid");
const { userTable } = require("./userController");

// Create a new task
const createTask = (req, res) => {
  const { taskName, desc, dueDate } = req.body.taskData;
  const userName = req.userData;
  if (!userTable[userName]) {
    return res.status(404).json({ message: "User not found" });
  }

  try {
    const id = v4();
    const status = false;
    const task = {
      id,
      taskName,
      desc,
      dueDate,
      status,
    };

    if (userTable[userName].tasks) {
      userTable[userName].tasks.push(task);
    } else {
      userTable[userName].tasks = [task];
    }

    const addedTasks = userTable[userName].tasks;
    res.status(200).json({ message: "Task Added", tasks: addedTasks });
  } catch (error) {
    res.status(400).json({ message: "Error adding tasks.." });
  }
};

// Get tasks
const getTasks = (req, res) => {
  const userName = req.userData;
  if (!userTable[userName]) {
    return res.status(404).json({ message: "User not found" });
  }
  res.status(200).json({ Tasks: userTable[userName].tasks });
};

// Update task
const updateTask = (req, res) => {
  const { taskId } = req.params;
  const { taskName, desc, dueDate } = req.body.taskData;
  const userName = req.userData;

  if (!userTable[userName]) {
    return res.status(404).json({ message: "User not found" });
  }

  const taskIndex = userTable[userName].tasks.findIndex(
    (task) => task.id === taskId
  );
  if (taskIndex === -1) {
    return res.status(404).json({ message: "Task not found" });
  }

  userTable[userName].tasks[taskIndex] = {
    ...userTable[userName].tasks[taskIndex],
    taskName,
    desc,
    dueDate,
  };

  res
    .status(200)
    .json({ message: "Task Updated", tasks: userTable[userName].tasks });
};

// Delete single task
const deleteTask = (req, res) => {
  const { id } = req.body;
  const userName = req.userData;
  console.log("Id from req body : ", id);

  if (!userTable[userName]) {
    return res.status(404).json({ message: "User not found" });
  }

  const taskIndex = userTable[userName].tasks.findIndex(
    (task) => task.id === id
  );
  if (taskIndex === -1) {
    return res.status(404).json({ message: "Task not found" });
  }

  userTable[userName].tasks.splice(taskIndex, 1);
  res
    .status(200)
    .json({ message: "Task Deleted", tasks: userTable[userName].tasks });
};

// Delete all completed tasks
const deleteCompletedTasks = (req, res) => {
  const userName = req.userData;

  if (!userTable[userName]) {
    return res.status(404).json({ message: "User not found" });
  }

  // Filter out completed tasks
  userTable[userName].tasks = userTable[userName].tasks.filter(
    (task) => !task.status
  );

  res.status(200).json({
    message: "Completed Tasks Deleted",
    tasks: userTable[userName].tasks,
  });
};

// update task status
const updateTaskStatus = (req, res) => {
  const { id } = req.params;
  const userName = req.userData;

  if (!userTable[userName]) {
    return res.status(404).json({ message: "User not found" });
  }

  const taskIndex = userTable[userName].tasks.findIndex(
    (task) => task.id === id
  );

  if (taskIndex === -1) {
    return res.status(404).json({ message: "Task not found" });
  }
  
  // Toggle the task status
  userTable[userName].tasks[taskIndex].status =
    !userTable[userName].tasks[taskIndex].status;

  res
    .status(200)
    .json({ message: "Task Status Updated", tasks: userTable[userName].tasks });
};

module.exports = {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
  deleteCompletedTasks,
  updateTaskStatus,
};