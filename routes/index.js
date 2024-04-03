const express = require('express');
const router = express.Router();

// Import route handlers
const eventsRouter = require('./events');
const subscribersRouter = require('./subscribers');
const reviewsRouter = require('./reviews');

// Mount route handlers
router.use('/events', eventsRouter);
router.use('/subscribers', subscribersRouter);
router.use('/reviews', reviewsRouter);

// Mount home page route
router.use('/', (req, res) => {
    
    res.render('home', {title: 'Please Sign Up Here'}); 
});

module.exports = router;
