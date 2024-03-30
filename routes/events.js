const express = require('express');
const router = express.Router();
// You'll be creating this controller module next
const eventsCtrl = require('../controllers/events');
	
// GET /events
router.get('/', eventsCtrl.index);
// GET /events/new
router.get('/new', eventsCtrl.new);
// GET /events/:id (show functionality) MUST be below new route
router.get('/:id', eventsCtrl.show);
// POST /events
router.post('/', eventsCtrl.create);
	
module.exports = router;
