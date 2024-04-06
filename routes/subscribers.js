// subscribers.js
const express = require('express');
const router = express.Router();
const subscribersCtrl = require('../controllers/subscribers');
const authMiddleware = require('./authMiddleware'); // Adjust the path as needed

// Route to display sign up form
router.get('/new', subscribersCtrl.new);

// Route to handle sign up form submission
router.post('/', authMiddleware.isAuthenticated, subscribersCtrl.create);

// Route to add subscriber to an event
router.post('/events/:id', authMiddleware.isAuthenticated, subscribersCtrl.addToMember);

module.exports = router;
