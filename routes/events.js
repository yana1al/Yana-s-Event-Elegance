// routes/events.js

const express = require('express');
const router = express.Router();
const eventsCtrl = require('../controllers/events');

// Route to render the form for creating a new event
router.get('/new', (req, res) => {
  res.render('events/new', { title: 'Create New Event' });
});

// Route to create a new event
router.post('/', eventsCtrl.createEvent);

// Route to get all events
router.get('/', eventsCtrl.getAllEvents);

// Route to get a specific event by ID
router.get('/:id', eventsCtrl.getEventById);

// Other routes...

module.exports = router;
