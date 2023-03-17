const express = require('express');
const { addFlight } = require('../db/flight');
const { body, validationResult } = require('express-validator');

const router = express.Router();

router.post(
  '/',
  body('startTime').exists().isDate({ format: 'YYYY-MM-DD hh:mm:ss' }),
  body('arriveState').exists().isDate({ format: 'YYYY-MM-DD hh:mm:ss' }),
  body('startDestination').exists().notEmpty(),
  body('arriveDestination').exists().notEmpty(),
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.json(errors.array());
    }

    const result = await addFlight(req.body);
    res.json(result);
  }
);

module.exports = router;
