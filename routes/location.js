const express = require('express');
const { body, validationResult } = require('express-validator');
const { addLocation } = require('../db/location');
const router = express.Router();

router.post('/', async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.json(errors.array());
  }

  const result = await addLocation(req.body);
  res.json(result);
});

module.exports = router;
