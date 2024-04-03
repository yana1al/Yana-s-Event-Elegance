const Subscriber = require('../models/subscriber');

exports.new = (req, res) => {
  res.render('subscribers/new', { title: 'Sign Up' });
};

exports.create = async (req, res) => {
  const subscriber = new Subscriber(req.body);
  try {
    const newSubscriber = await subscriber.save();
    res.status(201).json(newSubscriber);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.addToMember = async (req, res) => {
  // Logic to add subscriber to event
};
