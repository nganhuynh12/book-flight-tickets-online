const express = require('express');
const { ticketController } = require('../controllers');
const { body } = require('express-validator');
const validationPipe = require('../pipes/validation.pipe');
const { route } = require('./index.route');

const router = express.Router();

router.post(
  '/',
  body('type').exists().notEmpty().isIn([0, 1]),
  body('price').exists().notEmpty().isFloat(),
  body('flightId').exists().notEmpty(),
  body('userId').exists().notEmpty(),
  validationPipe,
  ticketController.add.bind(ticketController)
);
router.get('/', ticketController.findAll.bind(ticketController));
router.get('/:id', ticketController.findByPk.bind(ticketController));
router.delete('/:id', ticketController.deleteById.bind(ticketController));

module.exports = router;
