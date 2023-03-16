const express = require('express');
const { register } = require('../db/user');
const router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('auth');
});

router.post('/register', async (req, res, next) => {
  console.log(req.body);
  register(req.body.username, req.body.password, () => {
    res.json({
      success: true,
    });
  });
});

module.exports = router;
