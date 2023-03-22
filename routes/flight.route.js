const express = require('express');
const { body, validationResult } = require('express-validator');
const flightController = require('../controllers/flight.controller');

const router = express.Router();

router.post(
  '/',
  body('startTime').exists(),
  body('arriveTime').exists(),
  body('startLocation').exists().notEmpty(),
  body('arriveLocation').exists().notEmpty(),
  flightController.add
);

router.get('/', flightController.findAll);

module.exports = router;
