const express = require('express');
const {
  findAllUser,
  findUserById,
  updateUserById,
  deleteUserById,
} = require('../db/user');
const { body } = require('express-validator');
const router = express.Router();

router.get('/', async (req, res, next) => {
  const result = await findAllUser();
  res.json(result);
});

router.get('/:id', async (req, res, next) => {
  const result = await findUserById(req.params.id);
  res.json(result);
});

router.put(
  '/:id',
  body('email').notEmpty().isEmail().normalizeEmail(),
  body('username').notEmpty(),
  body('password').notEmpty().isLength({ min: 6, max: 20 }),
  body('address').notEmpty(),
  body('phone').notEmpty().isNumeric(),
  body('gender').notEmpty().isIn([0, 1]),
  async (req, res, next) => {
    const result = await updateUserById(req.params.id, req.body);
    res.json(result);
  }
);

router.delete('/:id', async (req, res, next) => {
  const result = await deleteUserById(req.params.id);
  res.json(result);
});

module.exports = router;
