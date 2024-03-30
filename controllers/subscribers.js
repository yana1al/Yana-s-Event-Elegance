const Subscriber = require('../models/subscriber');
const Event = require('../models/event');

// Function to add a subscriber to an event
async function addToMember(req, res) {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).send('Event not found');
    }
    const newSubscriber = await Subscriber.create(req.body);
    event.members.push(newSubscriber._id);
    await event.save();
    res.redirect(`/events/${event._id}`);
  } catch (err) {
    console.error('Error adding subscriber:', err);
    res.status(500).send('Error adding subscriber. Please try again later.');
  }
}

module.exports = {
  addToMember
};
