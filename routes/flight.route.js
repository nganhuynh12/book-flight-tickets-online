const express = require('express');
const { body } = require('express-validator');
const { flightController } = require('../controllers');
const validationPipe = require('../pipes/validation.pipe');
const parseIntPipe = require('../pipes/parse-int.pipe');

const router = express.Router();

router.post(
  '/',
  body('startTime').exists(),
  body('arriveTime').exists(),
  body('startLocationId').exists().notEmpty(),
  body('arriveLocationId').exists().notEmpty(),
  validationPipe,
  flightController.add.bind(flightController)
);

router.get(
  '/',
  parseIntPipe('page'),
  parseIntPipe('per_page'),
  flightController.findAll.bind(flightController)
);

module.exports = router;
