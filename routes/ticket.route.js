const express = require('express');
const { ticketController } = require('../controllers');
const router = express.Router();

router.post('/', ticketController.add);
router.get('/', ticketController.findAll);
router.delete('/:id', ticketController.deleteById);

module.exports = router;
