var express = require('express');
const localAuthGuard = require('../guards/local-auth.guard');
var router = express.Router();

router.get('/', function (req, res, next) {
  res.render('index');
});

router.get('/faq', (req, res, next) => {
  res.render('faq');
});

router.get('/admin', (req, res, next) => {
  res.render('admin');
});

router.get('/test', localAuthGuard, (req, res, next) => {
  res.render('test');
});

module.exports = router;
