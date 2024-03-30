const express = require('express');
const router = express.Router();
const reviewsCtrl = require('../controllers/reviews');

// POST /reviews (create review for the event app)
router.post('/reviews', reviewsCtrl.create);

module.exports = router;
