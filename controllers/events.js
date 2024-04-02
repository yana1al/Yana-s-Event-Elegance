const Event = require('../models/event');

// Controller methods for handling events
module.exports = {
  getAllEvents: async (req, res) => {
    try {
      const events = await Event.find();
      res.render('events/index', { events, title: 'All Events' });

    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  getEventById: async (req, res) => {
    try {
      const event = await Event.findById(req.params.id);
      if (event) {
        res.render('events/show', { event, title: event.name }); 
      } else {
        res.status(404).json({ message: 'Event not found' });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  createEvent: async (req, res) => {
    const event = new Event(req.body);
    try {
      const newEvent = await event.save();
      res.status(201).json(newEvent);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  updateEvent: async (req, res) => {
    try {
      const updatedEvent = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
      res.render('events/show', { event: updatedEvent }); 
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  deleteEvent: async (req, res) => {
    try {
      await Event.findByIdAndDelete(req.params.id);
      res.render('events/index', { message: 'Event deleted' }); 
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
};
