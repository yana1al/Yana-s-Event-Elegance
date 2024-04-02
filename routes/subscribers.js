const express = require('express');
const router = express.Router();
const subscribersCtrl = require('../controllers/subscribers');

// This router is mounted to a "starts with" path of '/subscribers'

// GET /subscribers/new (new functionality)
router.get('/new', subscribersCtrl.new);

// POST /subscribers (create functionality)
router.post('/', subscribersCtrl.create);

// POST /events/:id/subscribers (add subscriber to event functionality)
router.post('/events/:id', subscribersCtrl.addToMember);

module.exports = router;