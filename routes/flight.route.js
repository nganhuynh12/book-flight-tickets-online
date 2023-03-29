const express = require('express');
const { body } = require('express-validator');
const { flightController } = require('../controllers');
const validationPipe = require('../pipes/validation.pipe');

const router = express.Router();

router.post(
  '/',
  body('startTime').exists(),
  body('arriveTime').exists(),
  body('startLocationId').exists().notEmpty(),
  body('arriveLocationId').exists().notEmpty(),
  validationPipe,
  flightController.add
);

router.get('/', flightController.findAll);

module.exports = router;
