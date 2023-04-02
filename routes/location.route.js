const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const { locationController } = require('../controllers');
const validationPipe = require('../pipes/validation.pipe');
const parseIntPipe = require('../pipes/parse-int.pipe');

router.post(
  '/',
  body('value').exists().notEmpty(),
  validationPipe,
  locationController.add.bind(locationController)
);
router.get(
  '/',
  parseIntPipe('page'),
  parseIntPipe('per_page'),
  locationController.findAll.bind(locationController)
);
router.delete('/:id', locationController.deleteById.bind(locationController));
router.put('/:id', locationController.updateById.bind(locationController));

module.exports = router;
