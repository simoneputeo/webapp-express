const connection = require("../data/db");

require("dotenv").config();
const BASE_URL = process.env.BASE_URL;

// Index

function index(req, res) {
  const sql = "SELECT * FROM movies";

  connection.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: "Internal server error" });
    const movies = results.map((movie) => {
      if (movie.image) {
        movie.image = `${BASE_URL}/img/movies_cover/${movie.image}`;
      }
      return movie;
    });
    res.json(movies);
  });
}

// Show

function show(req, res) {
  const id = req.params.id;

  const sql = `SELECT 

    movies.*, 
    reviews.id AS review_id, 
    reviews.movie_id, 
    reviews.name AS review_name, 
    reviews.text AS review_text, 
    reviews.vote AS review_vote, 

    ROUND(
    (SELECT AVG(r.vote) 
    FROM reviews r 
    WHERE r.movie_id = movies.id), 
    1) 
    AS average_vote 
    
    FROM movies 
    INNER JOIN reviews 
    ON movies.id = reviews.movie_id 
    WHERE movies.id = ?;`;
  connection.query(sql, [id], (err, results) => {
    if (err) return res.status(500).json({ error: "Database query failed" });
    if (results.length === 0)
      return res.status(404).json({ error: "Movie not found" });
    res.json(results);
  });
}

// Store

function store(req, res) {
  const movie_id = req.params.id;
  const { id, name, vote, text, validation, surname, email } = req.body;

  if (!name || !text || !surname || !email) {
    return res.status(400).json({ error: "Tutti i campi sono obbligatori." });
  }

  if (typeof vote !== "number" || vote < 1 || vote > 5) {
    return res
      .status(400)
      .json({ error: "Il voto deve essere un numero tra 1 e 5." });
  }

  const sql = `
    INSERT INTO reviews 
    (id, movie_id, name, vote, text, validation, surname, email)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;

  connection.query(
    sql,
    [id, movie_id, name, vote, text, validation, surname, email],
    (err, results) => {
      if (err) return res.status(500).json({ error: "Review posting failed" });

      res.status(201).json({
        message: "Review posted successfully",
        reviewId: results.insertId,
      });
    }
  );
}

module.exports = { index, show, store };
