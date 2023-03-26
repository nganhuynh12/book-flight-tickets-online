const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const { locationController } = require('../controllers');
const validationPipe = require('../pipes/validation.pipe');

router.post(
  '/',
  body('value').exists().notEmpty(),
  validationPipe,
  locationController.add
);
router.get('/', locationController.findAll);
router.delete('/:id', locationController.deleteById);
router.put('/:id', locationController.updateById);

module.exports = router;
