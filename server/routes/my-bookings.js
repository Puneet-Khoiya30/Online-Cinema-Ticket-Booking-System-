const express = require('express');
const router = express.Router();
const pool = require('../db');

/**
 * GET /api/my-bookings?user_id=<user_id>
 * Returns all bookings for a specific user with movie and show details
 */
router.get('/', async (req, res) => {
  const userId = req.query.user_id ? Number(req.query.user_id) : null;

  if (!userId) {
    return res.status(400).json({ error: 'user_id is required' });
  }

  const conn = await pool.getConnection();
  try {
    const [bookings] = await conn.query(
      `SELECT 
        b.booking_id,
        b.user_id,
        b.show_id,
        b.seats_booked,
        b.total_amount,
        b.booking_code,
        b.status,
        b.booking_time,
        m.title AS movie_title,
        m.genre,
        m.duration_minutes,
        s.show_time,
        s.screen_no,
        s.ticket_price
      FROM bookings b
      JOIN shows s ON b.show_id = s.show_id
      JOIN movies m ON s.movie_id = m.movie_id
      WHERE b.user_id = ?
      ORDER BY b.booking_time DESC`,
      [userId]
    );

    if (!bookings || bookings.length === 0) {
      return res.json([]);
    }

    res.json(bookings);
  } catch (err) {
    console.error('GET /api/my-bookings error:', err);
    res.status(500).json({ error: 'Database error while fetching bookings' });
  } finally {
    conn.release();
  }
});

module.exports = router;