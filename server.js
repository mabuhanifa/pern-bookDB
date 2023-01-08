const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");
const { v4: uuidv4 } = require("uuid");
app.use(express.json());
app.use(cors());
const port = 5000;

app.get("/books", async (req, res) => {
  try {
    const books = await pool.query("SELECT * FROM book");
    res.status(201).json({
      message: `success`,
      data: books.rows,
    });
  } catch (error) {
    console.error(error);
    res.json({ error: error.message });
  }
});

app.get("/books/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const book = await pool.query("SELECT * FROM book WHERE id=$1", [id]);
    res.status(201).json({
      message: `success`,
      data: book.rows,
    });
  } catch (error) {
    console.error(error);
    res.json({ error: error.message });
  }
});

app.delete("/books/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query("DELETE FROM book WHERE id=$1", [id]);
    res.status(201).json({
      message: `successfully deleted book ${id}`,
    });
  } catch (error) {
    console.error(error);
    res.json({ error: error.message });
  }
});

app.post("/books", async (req, res) => {
  try {
    const { name, description } = req.body;
    const id = uuidv4();
    const newBook = await pool.query(
      "INSERT INTO book (id,name, description) VALUES($1, $2, $3) RETURNING *",
      [id, name, description]
    );

    res.status(201).json({
      message: `book was created successfully ${id} ,${name}, ${description}`,
      data: newBook.rows,
    });
  } catch (error) {
    console.error(error);
    res.json({ error: error.message });
  }
});

app.put("/books/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;
    const updatedBook = await pool.query(
      "UPDATE book SET name=$1, description=$2 WHERE id=$3 RETURNING *",
      [name, description, id]
    );

    res.status(201).json({
      message: `book was updated successfully ${id} ,${name}, ${description}`,
      data: updatedBook.rows,
    });
  } catch (error) {
    console.error(error);
    res.json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`App listening on ${port}`);
});
