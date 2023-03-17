const express = require('express');
const { addTicket, findAllTicket } = require('../db/ticket');
const router = express.Router();

router.post('/', async (req, res, next) => {
  const result = await addTicket(req.body);
  res.json(result);
});

router.get('/', async (req, res, next) => {
  const result = await findAllTicket();
  res.json(result);
});

module.exports = router;
