const express = require('express');
const { ticketController } = require('../controllers');
const { body } = require('express-validator');
const validationPipe = require('../pipes/validation.pipe');

const router = express.Router();

router.post(
  '/',
  body('type').exists().notEmpty().isIn([0, 1]),
  body('price').exists().notEmpty().isFloat(),
  body('flightId').exists().notEmpty(),
  body('userId').exists().notEmpty(),
  validationPipe,
  ticketController.add
);
router.get('/', ticketController.findAll);
router.delete('/:id', ticketController.deleteById);

module.exports = router;
