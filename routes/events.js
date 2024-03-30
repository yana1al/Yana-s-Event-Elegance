const express = require('express');
const router = express.Router();

const eventsCtrl = require('../controllers/events');
	
// GET /events
router.get('/', eventsCtrl.index);
// GET /events/new
router.get('/new', eventsCtrl.new);

// POST /events
router.post('/', eventsCtrl.create);

// GET /events/:id (show functionality) MUST be below new route
router.get('/:id', eventsCtrl.show);


router.get('/some-route', (req, res) => {
  
});
	
module.exports = router;
