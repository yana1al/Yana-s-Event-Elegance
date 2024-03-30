const Event = require('../models/event');

// Controller methods for handling events
module.exports = {
  getAllEvents: async (req, res) => {
    try {
      const events = await Event.find();
      res.json(events);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  getEventById: async (req, res) => {
    try {
      const event = await Event.findById(req.params.id);
      if (event) {
        res.json(event);
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
      res.json(updatedEvent);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  deleteEvent: async (req, res) => {
    try {
      await Event.findByIdAndDelete(req.params.id);
      res.json({ message: 'Event deleted' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
};
