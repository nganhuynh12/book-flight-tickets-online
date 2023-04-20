var express = require('express');
const localAuthGuard = require('../guards/local-auth.guard');
var router = express.Router();
const User = require('../models/index').users;
const Ticket = require('../models/index').tickets;
const Location = require('../models/index').locations;
const Flight = require('../models/index').flights;

router.get('/', function (req, res, next) {
  res.render('home');
});

router.get('/faq', (req, res, next) => {
  res.render('faq');
});

router.get('/admin', (req, res, next) => {
  res.render('admin', { layout: 'plain' });
});

router.get('/aboutus', (req, res, next) => {
  res.render('aboutus');
});

router.get('/home', localAuthGuard, (req, res, next) => {
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
  const userData = (await User.findByPk('47ee153f-f5af-4753-a16a-9893fac988ea'))
    .dataValues;
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

router.get('/bookinghistory', async (req, res, next) => {
  const ticketDatas = (
    await Ticket.findAll({
      where: { userId: req.user.id },
      include: [
        {
          model: Flight,
          include: [
            { model: Location, as: 'arriveLocation' },
            { model: Location, as: 'startLocation' },
          ],
        },
      ],
    })
  ).map((ticketData) => {
    ticketData.dataValues.flight = ticketData.dataValues.flight.dataValues;
    ticketData.dataValues.flight.startLocation =
      ticketData.dataValues.flight.startLocation.dataValues;
    ticketData.dataValues.flight.arriveLocation =
      ticketData.dataValues.flight.arriveLocation.dataValues;
    ticketData.dataValues.type = ticketData.dataValues.type
      ? 'Thương gia'
      : 'Phổ thông';

    return ticketData.dataValues;
  });
  console.log(ticketDatas[0]);
  res.render('bookinghistory', { ticketDatas, userId: req.user.id });
});

module.exports = router;
