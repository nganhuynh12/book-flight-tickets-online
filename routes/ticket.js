const express = require('express');
const ticketController = require('../controllers/ticketController');
const router = express.Router();

router.post('/', ticketController.addTicket);

router.get('/', ticketController.findAllTicket);

module.exports = router;
