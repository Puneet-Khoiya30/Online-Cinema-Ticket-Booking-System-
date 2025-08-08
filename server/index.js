/**
 * index.js - Express server skeleton for Multiplex Booking System
 * - Basic routes: /api/auth, /api/movies, /api/schedules, /api/bookings
 * - Uses MySQL (mysql2). Configure via .env
 */
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 4000;

app.get('/api/health', (req, res) => res.json({status: 'ok'}));

// Placeholder routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/movies', require('./routes/movies'));
app.use('/api/schedules', require('./routes/schedules'));
app.use('/api/bookings', require('./routes/bookings'));
app.use('/api/my-bookings', require('./routes/my-bookings'));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
