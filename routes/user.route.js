const { userController } = require('../controllers');
const express = require('express');
const { body } = require('express-validator');
const router = express.Router();

router.get('/', userController.findAll);

router.get('/:id', userController.findByPk);

router.put(
  '/:id',
  body('email').notEmpty().isEmail().normalizeEmail(),
  body('username').notEmpty(),
  body('password').notEmpty().isLength({ min: 6, max: 20 }),
  body('address').notEmpty(),
  body('phone').notEmpty().isNumeric(),
  body('gender').notEmpty().isIn([0, 1]),
  userController.updateById
);

router.delete('/:id', userController.delete);

module.exports = router;
