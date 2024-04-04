const Event = require('../models/event');

exports.getAllEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.render('events/index', { events, title: 'My Events' });
  } catch (error) {
    res.status(500).render('error', { message: 'Internal Server Error' });
  }
};

exports.getEventById = async (req, res) => {
  try {
    const eventId = req.params.id;
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }
    res.render('show', { event }); // Assuming you're rendering a 'show' view
  } catch (error) {
    console.error('Error fetching event by ID:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
exports.createEvent = async (req, res) => {
  const { occassion, date, time, venue, guestCount, rsvp, details } = req.body;

  const event = new Event({
    occassion,
    date,
    time,
    venue,
    guestCount,
    rsvp,
    details
  });

  try {
    const newEvent = await event.save();
    res.redirect('/events'); // Redirect to the events index page after creating the event
  } catch (error) {
    res.status(400).render('error', { message: error.message });
  }
};


exports.updateEvent = async (req, res) => {
  try {
    const updatedEvent = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (updatedEvent) {
      res.render('events/show', { event: updatedEvent }); 
    } else {
      res.status(404).render('error', { message: 'Event not found' });
    }
  } catch (error) {
    res.status(400).render('error', { message: error.message });
  }
};

exports.deleteEvent = async (req, res) => {
  try {
    const deletedEvent = await Event.findByIdAndDelete(req.params.id);
    if (deletedEvent) {
      res.render('events/index', { message: 'Event deleted' });
    } else {
      res.status(404).render('error', { message: 'Event not found' });
    }
  } catch (error) {
    res.status(500).render('error', { message: 'Internal Server Error' });
  }
};
