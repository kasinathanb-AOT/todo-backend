const taskvalidation = (req, res, next) => {
  const { taskName } = req.body.taskData;
  if (!taskName) {
    return res.status(400).json({ error: "Please enter task name." });
  }
  next();
};

module.exports = {
  taskvalidation,
};