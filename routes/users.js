const express = require('express');
const { findAllUser, findUserById, updateUserById } = require('../db/user');
const router = express.Router();

router.get('/', async (req, res, next) => {
  const result = await findAllUser();
  res.json(result);
});

router.get('/:id', async (req, res, next) => {
  const result = await findUserById(req.params.id);
  res.json(result);
});

router.put('/:id', async (req, res, next) => {
  const result = await updateUserById(req.body, req.params.id);
  res.json(result);
});

module.exports = router;
