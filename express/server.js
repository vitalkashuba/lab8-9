const express = require("express");
const cors = require("cors");
const app = express();
const db = require("../database/db");

app.use(cors());
app.use(express.json());

app.get("/api/clips", (req, res) => {
  const { genre, releaseDate, artist, search, image } = req.query;
  let query = "SELECT * FROM items WHERE 1=1";
  const params = [];

  if (genre && genre !== "") {
    query += " AND genre = ?";
    params.push(genre);
  }
  if (releaseDate && releaseDate !== "") {
    query += " AND releaseDate = ?";
    params.push(releaseDate);
  }
  if (artist && artist !== "") {
    query += " AND artist = ?"; 
    params.push(artist);
  }
  if (image && image !== "") {
    query += " AND image = ?";
    params.push(image);
  }
  if (search && search !== "") {
    query += " AND (artist LIKE ? OR genre LIKE ? OR title LIKE ?)";
    const searchParam = `%${search}%`;
    params.push(searchParam, searchParam, searchParam);
  }

  db.query(query, params, (error, results) => {
    if (error) return res.status(500).json({ error: error.message });
    res.json(results);
  });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Internal server error" });
});

app.get("/api/health", (req, res) => {
  res.json({ message: "API is up and running" });
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));