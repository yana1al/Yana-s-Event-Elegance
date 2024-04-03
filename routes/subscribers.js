const express = require('express');
const router = express.Router();
const subscribersCtrl = require('../controllers/subscribers');

// Route to display sign up form
router.get('/new', subscribersCtrl.new);

// Route to handle sign up form submission
router.post('/', subscribersCtrl.create);

// Route to add subscriber to an event
router.post('/events/:id', subscribersCtrl.addToMember);

module.exports = router;
