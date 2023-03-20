const userController = require('../controllers/userController');
const express = require('express');
const { body } = require('express-validator');
const router = express.Router();

router.get('/', userController.findAllUser);

router.get('/:id', userController.findUserById);

router.put(
  '/:id',
  body('email').notEmpty().isEmail().normalizeEmail(),
  body('username').notEmpty(),
  body('password').notEmpty().isLength({ min: 6, max: 20 }),
  body('address').notEmpty(),
  body('phone').notEmpty().isNumeric(),
  body('gender').notEmpty().isIn([0, 1]),
  userController.updateUserById
);

router.delete('/:id', userController.deleteUserById);

module.exports = router;
