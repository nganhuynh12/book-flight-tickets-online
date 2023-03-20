const express = require('express');
const { body, validationResult } = require('express-validator');
const { findAllFlight } = require('../controllers/flightController');
const flightController = require('../controllers/flightController');

const router = express.Router();

router.post(
  '/',
  body('startTime').exists().isDate({ format: 'YYYY-MM-DD hh:mm:ss' }),
  body('arriveState').exists().isDate({ format: 'YYYY-MM-DD hh:mm:ss' }),
  body('startLocation').exists().notEmpty(),
  body('arriveLocation').exists().notEmpty(),
  flightController.addFlight
);

router.get('/', flightController.findAllFlight);

module.exports = router;
