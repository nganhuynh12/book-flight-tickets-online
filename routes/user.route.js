const { userController } = require('../controllers');
const express = require('express');
const { body } = require('express-validator');
const validationPipe = require('../pipes/validation.pipe');
const router = express.Router();
const parseIntPipe = require('../pipes/parse-int.pipe');

router.get(
  '/',
  parseIntPipe('page'),
  parseIntPipe('per_page'),
  userController.findAll.bind(userController)
);

router.get('/:id', userController.findByPk.bind(userController));

router.put(
  '/:id',
  body('email').notEmpty().isEmail().normalizeEmail(),
  body('username').notEmpty(),
  body('address').notEmpty(),
  body('phone').notEmpty().isNumeric(),
  body('gender').notEmpty().isIn([0, 1]),
  validationPipe,
  userController.updateById.bind(userController)
);

router.delete('/:id', userController.delete.bind(userController));

module.exports = router;
