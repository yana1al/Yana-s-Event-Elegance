const express = require('express');
const router = express.Router();
const Event = require('../models/Event'); // Import the Event model
const eventsRouter = require('./events');
const subscribersRouter = require('./subscribers');
const reviewsRouter = require('./reviews');

// Handle requests for specific routes
router.use('/events', eventsRouter);
router.use('/subscribers', subscribersRouter);
router.use('/reviews', reviewsRouter);

// Handle requests for the home page
router.get('/', async (req, res, next) => {
    try {
        // Fetch upcoming events
        const upcomingEvents = await Event.find({ date: { $gte: new Date() } });

        // Fetch past events
        const pastEvents = await Event.find({ date: { $lt: new Date() } });

        // Pass both upcoming and past events to the template
        const user = req.user || null;
        res.render('index', { title: 'Welcome', user: user, events: { upcoming: upcomingEvents, past: pastEvents } }); 
    } catch (error) {
        next(error); // Pass any errors to the error handler middleware
    }
});

module.exports = router;
