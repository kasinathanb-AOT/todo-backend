const express = require("express");
const router = require("./router/routes");
const server = express();
const cors = require("cors");
const PORT = 5000;

const corOptions = {
  origin: "*"
}
server.use(cors(corOptions));

server.use(express.json());

server.use(router);

server.listen(`${PORT}`, (res) => {
  console.log(`Server is running on port ${PORT}`);
});