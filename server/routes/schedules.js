const express = require('express');
const router = express.Router();
// TODO: replace with DB queries
router.get('/', (req, res) => {
  res.json([{id:1, movie_id:1, show_date: '2025-08-10', show_time: '18:00:00', ticket_price:150}]);
});
module.exports = router;
