const express = require('express');
const { findAllUser } = require('../db/user');
const router = express.Router();

router.get('/', async (req, res, next) => {
  const result = await findAllUser();
  res.json(result);
});

module.exports = router;
