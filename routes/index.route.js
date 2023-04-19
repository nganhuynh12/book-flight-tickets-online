var express = require('express');
const localAuthGuard = require('../guards/local-auth.guard');
var router = express.Router();
const User = require('../models/index').users;

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

router.get('/aboutus', (req, res, next) => {
  res.render('aboutus');
});

router.get('/home', (req, res, next) => {
  res.render('home');
});

router.get('/searchticket', (req, res, next) => {
  res.render('searchticket');
});

router.get('/profile/:id', async (req, res, next) => {
  const userData = (await User.findByPk(req.params.id)).dataValues;
  console.log(userData);

  const lastName = userData.username.slice(userData.username.lastIndexOf(' '));
  const firstName = userData.username.slice(
    0,
    userData.username.lastIndexOf(' ')
  );
  const gender = userData.gender;
  const email = userData.email;
  const phone = userData.phone;
  const data = {
    firstName,
    lastName,
    gender,
    email,
    phone,
    address: userData.address,
  };

  res.render('profile', { data });
});

router.get('/inforbooking', async (req, res, next) => {
  const userData = (await User.findByPk(req.query.userId)).dataValues;
  console.log(userData);

  const lastName = userData.username.slice(userData.username.lastIndexOf(' '));
  const firstName = userData.username.slice(
    0,
    userData.username.lastIndexOf(' ')
  );
  const gender = userData.gender;
  const email = userData.email;
  const phone = userData.phone;
  const data = { firstName, lastName, gender, email, phone };
  console.log(data.gender);

  res.render('inforbooking', { data });
});

router.get('/searchflight', (req, res, next) => {
  res.render('search_flight');
});

router.get('/seatbooking', (req, res, next) => {
  res.render('seatbooking');
});

router.get('/signedluggage', (req, res, next) => {
  res.render('signedluggage');
});

module.exports = router;
