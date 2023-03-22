const express = require('express');
const router = express.Router();
const locationController = require('../controllers/location.controller');

router.post('/', locationController.add);
router.get('/', locationController.findAll);
router.delete('/:id', locationController.deleteById);
router.put('/:id', locationController.updateById);

module.exports = router;
