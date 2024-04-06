const express = require('express');
const router = express.Router();
const Event = require('../models/Event'); // Import the Event model
const eventsCtrl = require('../controllers/events');

// Define array of events
let events = [
  {
    id: 1,
    occasion: 'Weaning Ceremony',
    date: '2024-02-10',
    time: '18:00',
    venue: '123 Main Street',   
  },
  {
    id: 2,
    occasion: 'Wedding',
    date: '2024-04-15',
    time: '15:00',
    venue: '456 Elm Street',   
  },  
];

router.get('/new', (req, res) => {
  res.render('events/new', { title: 'Create New Event' });
});

// Route to render the home page
router.get('/views/home', function(req, res) {
  res.render('home', { title: 'WELCOME' });
});

// Route to create a new event
router.post('/', async (req, res) => {
  try {
      // Extract event data from the request body
      const eventData = req.body; // Assuming req.body contains all necessary event data

      // Create a new event in the database
      const newEvent = await Event.create(eventData);

      // Redirect the user to the "My Events" page
      res.redirect('/events/my-events');
  } catch (error) {
      // Handle any errors
      console.error('Error adding new event:', error);
      res.status(500).send('Error adding new event');
  }
});

// Route to get all events
router.get('/', eventsCtrl.getAllEvents);

// Route to handle updating an event
router.put('/:id', eventsCtrl.updateEvent);

// Route to handle deleting an event
router.delete('/:id', eventsCtrl.deleteEvent);

// Route to get a specific event by ID
router.get('/:id', eventsCtrl.getEventById);

module.exports = router;
