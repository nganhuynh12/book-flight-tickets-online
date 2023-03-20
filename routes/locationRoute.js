const express = require('express');
const router = express.Router();
const locationController = require('../controllers/locationController');

router.post('/', locationController.add);
router.get('/', locationController.find);

module.exports = router;
