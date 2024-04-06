const express = require('express');
const router = express.Router();
const eventsCtrl = require('../controllers/events');


// Define  array of events
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
// Route to render the form for creating a new event
router.get('/new', (req, res) => {
    res.render('events/new', { title: 'Create New Event' });
  });
// Assuming app is your Express application instance
router.get('/views/home', function(req, res) {
  // Render the home.ejs file
  res.render('home', { title: 'WELCOME' });
});

  // Route to create a new event
  router.post('/', eventsCtrl.createEvent);
  
  // Route to get all events
  router.get('/', eventsCtrl.getAllEvents);
  
  // Route to handle updating an event
  router.put('/:id', eventsCtrl.updateEvent);
  
  // Route to handle deleting an event
  router.delete('/:id', eventsCtrl.deleteEvent);
  
  // Route to get a specific event by ID
  router.get('/:id', eventsCtrl.getEventById);
  
  module.exports = router;
