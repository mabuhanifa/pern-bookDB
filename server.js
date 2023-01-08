const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("pool");
app.use(express.json());
app.use(cors());
const port = 5000;

app.get("/", (req, res) => {
  res.send("Application Working");
});

app.listen(port, () => {
  console.log(`App listening on ${port}`);
});

pool;