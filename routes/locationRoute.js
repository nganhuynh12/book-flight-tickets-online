const express = require('express');
const router = express.Router();
const locationController = require('../controllers/locationController');

router.post('/', locationController.add);
router.get('/', locationController.find);
router.delete('/:id', locationController.delete);

module.exports = router;
