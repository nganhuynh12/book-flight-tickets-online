const express = require('express');
const { addTicket } = require('../db/ticket');
const router = express.Router();

router.post('/', async (req, res, next) => {
  const result = await addTicket(req.body);
  res.json(result);
});

module.exports = router;
