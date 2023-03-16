const express = require('express');
const { register, login } = require('../db/user');
const router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('auth');
});

router.post('/register', async (req, res, next) => {
  const result = await register(req.body.username, req.body.password);
  res.status(201).json(result);
});

router.post('/login', async (req, res, next) => {
  const result = await login(req.body.username, req.body.password);
  res.json(result);
});

module.exports = router;
