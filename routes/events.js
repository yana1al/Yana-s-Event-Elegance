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

// Route to create a new event
router.post('/', eventsCtrl.createEvent);

// Route to get all events
router.get('/', (req, res) => {
  const currentDate = new Date();
  const currentEvents = events.filter(event => new Date(event.date) >= currentDate);
  const upcomingEvents = events.filter(event => new Date(event.date) > currentDate);
  const pastEvents = events.filter(event => new Date(event.date) < currentDate);

  // Pass filtered events to the index.ejs template
  res.render('index', { events: { current: currentEvents, upcoming: upcomingEvents, past: pastEvents }, title: 'All Events'});
});

// Route to handle updating an event
router.post('/:id/edit', eventsCtrl.updateEvent);

// Route to handle deleting an event
router.delete('/:id', eventsCtrl.deleteEvent);

// Route to get a specific event by ID
router.get('/:id', eventsCtrl.getEventById);

module.exports = router;
