const express = require('express');
const { addFlight } = require('../db/flight');
const { route } = require('./auth');

const router = express.Router();

router.post('/', async (req, res, next) => {
  const result = await addFlight(req.body);
  res.json(result);
});

module.exports = router;
