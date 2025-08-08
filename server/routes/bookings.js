const express = require('express');
const router = express.Router();
const pool = require('../db');

// Helper to generate a random 5-letter code
function generateBookingCode() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let code = '';
  for (let i = 0; i < 5; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

/**
 * POST /api/bookings
 * Body: { user_id, show_id, seats_booked }
 */
router.post('/', async (req, res) => {
  const { user_id, show_id, seats_booked } = req.body;

  if (!user_id || !show_id || !seats_booked || seats_booked <= 0) {
    return res.status(400).json({ error: 'user_id, show_id, and positive seats_booked are required' });
  }

  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();

    // Lock the show row for update
    const [showRows] = await conn.query(
      'SELECT show_id, ticket_price, total_seats, available_seats FROM shows WHERE show_id = ? FOR UPDATE',
      [show_id]
    );

    if (showRows.length === 0) {
      await conn.rollback();
      return res.status(404).json({ error: 'Show not found' });
    }

    const show = showRows[0];
    if (seats_booked > show.available_seats) {
      await conn.rollback();
      return res.status(400).json({ error: 'Not enough seats available' });
    }

    // Generate unique booking code
    let bookingCode;
    let isUnique = false;
    while (!isUnique) {
      bookingCode = generateBookingCode();
      const [existing] = await conn.query('SELECT 1 FROM bookings WHERE booking_code = ?', [bookingCode]);
      if (existing.length === 0) isUnique = true;
    }

    // Calculate total amount
    const totalAmount = (show.ticket_price * seats_booked).toFixed(2);

    // Insert booking
    const [result] = await conn.query(
      `INSERT INTO bookings (user_id, show_id, seats_booked, total_amount, booking_code, status)
       VALUES (?, ?, ?, ?, ?, 'booked')`,
      [user_id, show_id, seats_booked, totalAmount, bookingCode]
    );

    // Update available_seats in shows
    await conn.query(
      'UPDATE shows SET available_seats = available_seats - ? WHERE show_id = ?',
      [seats_booked, show_id]
    );

    await conn.commit();

    res.json({
      booking_id: result.insertId,
      user_id,
      show_id,
      seats_booked,
      total_amount: totalAmount,
      booking_code: bookingCode,
      status: 'booked'
    });

  } catch (err) {
    console.error('POST /api/bookings error:', err);
    await conn.rollback();
    res.status(500).json({ error: 'Database error while creating booking' });
  } finally {
    conn.release();
  }
});

module.exports = router;