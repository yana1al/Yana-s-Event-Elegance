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
      const event = await Event.findById(req.params.id);
      if (event) {
        res.render('events/show', { event, title: event.name }); 
      } else {
        const error = {
          status: 404,
          stack: 'Event not found'
        };
        res.status(404).render('error', { message: 'Event not found', error });
      }
    } catch (error) {
      res.status(500).render('error', { message: 'Internal Server Error', error });
    }
  };
  

exports.createEvent = async (req, res) => {
  const event = new Event(req.body);
  try {
    const newEvent = await event.save();
    res.status(201).json(newEvent);
  } catch (error) {
    res.status(400).json({ message: error.message });
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
    res.status(400).json({ message: error.message });
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
