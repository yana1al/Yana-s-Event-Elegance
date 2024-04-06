const express = require('express');
const router = express.Router();
const eventsRouter = require('./events');
const subscribersRouter = require('./subscribers');
const reviewsRouter = require('./reviews');

router.use('/events', eventsRouter);
router.use('/subscribers', subscribersRouter);
router.use('/reviews', reviewsRouter);


router.get('/', async (req, res, next) => {
    try {
        // Fetch upcoming events
        const upcomingEvents = await Event.find({ date: { $gte: new Date() } });

        // Fetch past events
        const pastEvents = await Event.find({ date: { $lt: new Date() } });

        // Pass both upcoming and past events to the template
        const user = req.user || null;
        res.render('events/index', { title: 'Welcome', user: user, events: { upcoming: upcomingEvents, past: pastEvents } }); 
    } catch (error) {
        next(error); // Pass any errors to the error handler middleware
    }
});

module.exports = router;
