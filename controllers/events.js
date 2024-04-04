const Event = require('../models/event');

// Get all events
exports.getAllEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.render('events/index', { events, title: 'My Events' });
  } catch (error) {
    console.error('Error fetching all events:', error);
    res.status(500).render('error', { message: 'Internal Server Error' });
  }
};

// Get an event by ID
exports.getEventById = async (req, res) => {
  try {
    const eventId = req.params.id;
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }
    res.render('show', { event }); 
  } catch (error) {
    console.error('Error fetching event by ID:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Create a new event
exports.createEvent = async (req, res) => {
  // Validate input data
  const { occasion, date, time, venue, guestCount, rsvp, details } = req.body;
  if (!occasion || !date || !time || !venue) {
    return res.status(400).render('error', { message: 'Occasion, date, time, and venue are required' });
  }

  const event = new Event({
    occasion,
    date,
    time,
    venue,
    guestCount,
    rsvp,
    details
  });

  try {
    // Save the new event
    const newEvent = await event.save();
    res.redirect('/events'); 
  } catch (error) {
    console.error('Error creating event:', error);
    res.status(500).render('error', { message: 'Internal Server Error' });
  }
};

// Update an event
exports.updateEvent = async (req, res) => {
  try {
    // Update the event with new data
    const updatedEvent = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (updatedEvent) {
      res.render('events/show', { event: updatedEvent }); 
    } else {
      res.status(404).render('error', { message: 'Event not found' });
    }
  } catch (error) {
    console.error('Error updating event:', error);
    res.status(400).render('error', { message: 'Error updating event' });
  }
};

exports.deleteEvent = (req, res) => {
  const eventId = req.params.id;
  
  // Find the index of the event in the events array
  const eventIndex = events.findIndex(event => event.id === parseInt(eventId));
  
  // If the event is found, remove it from the events array
  if (eventIndex !== -1) {
    events.splice(eventIndex, 1);
    res.redirect('/events'); // Redirect to the events page after deletion
  } else {
    res.status(404).send('Event not found');
  }
};

