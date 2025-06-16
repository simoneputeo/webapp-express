const connection = require("../data/db");

// Index

function index(req, res) {
  const sql = "SELECT * FROM movies";

  connection.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: "Internal server error" });
    const movies = results.map((movie) => {
      if (movie.cover) {
        movie.cover = `${BASE_URL}/img/movies_cover/${movie.cover}`;
      }
      return movie;
    });
    res.json(movies);
  });
}

// Show

function show(req, res) {
  const id = req.params.id;

  const sql =
    "SELECT * FROM movies INNER JOIN reviews ON movies.id = reviews.movie_id WHERE movies.id = ?";

  connection.query(sql, [id], (err, results) => {
    if (err) return res.status(500).json({ error: "Database query failed" });
    if (results.length === 0)
      return res.status(404).json({ error: "Movie not found" });
    res.json(results[0]);
  });
}

module.exports = { index, show };
