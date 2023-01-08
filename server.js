const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("pool");
app.use(express.json());
app.use(cors());
const port = 5000;

app.get("/books", async (req, res) => {
  try {
  } catch (error) {
    console.error(error);
  }
});

app.get("/books/:id", async (req, res) => {
  try {
    const { id } = req.params;
  } catch (error) {
    console.error(error);
  }
});

app.post("/books", async (req, res) => {
  try {
    const { name, description } = req.body;
    res
      .status(201)
      .json({
        message: `book was created successfully ${name} ${description}`,
      });
  } catch (error) {
    console.error(error);
  }
});

app.listen(port, () => {
  console.log(`App listening on ${port}`);
});

pool;
