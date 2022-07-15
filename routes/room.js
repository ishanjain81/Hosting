const express = require('express');
const router = express.Router();
const roomController = require('../controllers/room_controller');

// route for rendering a video room
router.get('/:room_id',roomController.room_render);
// route for sending invite email
router.post('/invite',roomController.invite);

module.exports = router;