const express = require('express');
const router = express.Router();
const pool = require('../db');

/**
 * GET /api/movies
 * - If no query param → returns all movies with shows
 * - If ?id=123 → returns array with one movie (with shows)
 */
router.get('/', async (req, res) => {
  const conn = await pool.getConnection();
  try {
    const movieId = req.query.id ? Number(req.query.id) : null;

    // Get movies
    const moviesQuery = movieId
      ? 'SELECT * FROM movies WHERE movie_id = ?'
      : 'SELECT * FROM movies ORDER BY release_date DESC, movie_id DESC';
    const [movies] = movieId
      ? await conn.query(moviesQuery, [movieId])
      : await conn.query(moviesQuery);

    if (!movies || movies.length === 0) {
      return res.json([]);
    }

    // Gather shows for these movies
    const movieIds = movies.map(m => m.movie_id);
    const [shows] = await conn.query(
      `SELECT show_id, movie_id, show_time, screen_no, ticket_price, total_seats, available_seats
       FROM shows
       WHERE movie_id IN (?)
       ORDER BY show_time`,
      [movieIds]
    );

    // Group shows by movie
    const showsByMovie = {};
    shows.forEach(s => {
      if (!showsByMovie[s.movie_id]) showsByMovie[s.movie_id] = [];
      showsByMovie[s.movie_id].push(s);
    });

    // Attach shows to movies
    const result = movies.map(m => ({
      ...m,
      shows: showsByMovie[m.movie_id] || []
    }));

    res.json(result);
  } catch (err) {
    console.error('GET /api/movies error:', err);
    res.status(500).json({ error: 'Database error' });
  } finally {
    conn.release();
  }
});

module.exports = router;