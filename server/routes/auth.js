const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
// For demo only: implement real DB logic
router.post('/register', async (req, res) => {
  // TODO: save user to DB with hashed password
  return res.json({message: 'register endpoint (implement DB logic)'});
});
router.post('/login', async (req, res) => {
  // TODO: verify user, return JWT
  return res.json({message: 'login endpoint (implement DB logic)'});
});
module.exports = router;
