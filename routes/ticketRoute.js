const express = require('express');
const ticketController = require('../controllers/ticketController');
const router = express.Router();

router.post('/', ticketController.add);
router.get('/', ticketController.find);
router.delete('/:id', ticketController.delete);

module.exports = router;
