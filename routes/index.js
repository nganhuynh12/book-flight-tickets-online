var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
  res.render('index');
});

router.get('/faq', (req, res, next) => {
  res.render('faq');
});

module.exports = router;
