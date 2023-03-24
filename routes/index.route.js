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

router.get('/test', (req, res, next) => {
  res.render('test');
});
router.get('/aboutus', (req, res, next) => {
  res.render('aboutus');
});
module.exports = router;
