var express = require('express');
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

router.get('/about', (req, res, next) => {
  res.render('aboutus');
});

router.get('/test', (req, res, next) => {
  res.render('test');
});

module.exports = router;
