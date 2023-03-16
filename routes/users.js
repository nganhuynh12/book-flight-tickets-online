const express = require('express');
const { findAllUser, findUserById } = require('../db/user');
const router = express.Router();

router.get('/', async (req, res, next) => {
  const result = await findAllUser();
  res.json(result);
});

router.get('/:id', async (req, res, next) => {
  const result = await findUserById(req.params.id);
  console.log(result);
  res.json(result);
});

module.exports = router;
