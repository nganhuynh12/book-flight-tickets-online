const express = require('express');
const { body, validationResult } = require('express-validator');
const { addLocation, findAllLocation } = require('../db/location');
const router = express.Router();

router.post('/', async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.json(errors.array());
  }

  const result = await addLocation(req.body);
  res.json(result);
});

router.get('/', async (req, res, next) => {
  const result = await findAllLocation();
  res.json(result);
});

module.exports = router;
