const express = require('express');
const router = express.Router();
const eventsCtrl = require('../controllers/events');

// GET /events - Retrieve all events
router.get('/', eventsCtrl.getAllEvents);

// GET /events/:id - Retrieve a specific event by ID
router.get('/:id', eventsCtrl.getEventById);

// POST /events - Create a new event
router.post('/', eventsCtrl.createEvent);

// PUT /events/:id - Update an existing event
router.put('/:id', eventsCtrl.updateEvent);

// DELETE /events/:id - Delete an event
router.delete('/:id', eventsCtrl.deleteEvent);

module.exports = router;
