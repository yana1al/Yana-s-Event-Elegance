const Event = require('../models/Event'); 
const mongoose = require('mongoose');



exports.getAllEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.render('events/index', { events, title: 'events' });
  } catch (error) {
    console.error('Error fetching all events:', error);
    res.status(500).render('error', { message: 'Internal Server Error' });
  }
};

exports.getEventById = async (req, res) => {
  try {
    const eventId = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(eventId)) {
      return res.status(400).json({ error: 'Invalid event ID' });
    }
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



exports.createEvent = async (req, res) => {
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
    const newEvent = await event.save();
    res.redirect('/events'); 
  } catch (error) {
    console.error('Error creating event:', error);
    res.status(500).render('error', { message: 'Internal Server Error' });
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
    console.error('Error updating event:', error);
    res.status(400).render('error', { message: 'Error updating event' });
  }
};

exports.deleteEvent = async (req, res) => {
  const eventId = req.params.id;
  
  try {
    const deletedEvent = await Event.findByIdAndDelete(eventId);
    if (deletedEvent) {
      res.redirect('/events'); 
    } else {
      res.status(404).send('Event not found');
    }
  } catch (error) {
    console.error('Error deleting event:', error);
    res.status(500).render('error', { message: 'Internal Server Error' });
  }
};
