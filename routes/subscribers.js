const express = require('express');
const router = express.Router();
const subscribersCtrl = require('../controllers/subscribers');

// This router is mounted to a "starts with" path of '/'

// GET /subscribers/new (new functionality)
router.get('/subscribers/new', subscribersCtrl.new);

// POST /subscribers (create functionality)
router.post('/subscribers', subscribersCtrl.create);

// POST /events/:id/subscribers (add subscriber to event functionality)
router.post('/events/:id/subscribers', subscribersCtrl.addToMember);

module.exports = router;
