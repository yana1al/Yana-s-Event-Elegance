const express = require('express');
const passport = require('passport');
const router = express.Router();

// Google OAuth authentication route
router.post('/google', passport.authenticate('google-id-token'), (req, res) => {
  // If authentication is successful, send success response
  res.json({ success: true });
});

module.exports = router;
