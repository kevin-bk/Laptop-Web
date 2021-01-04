const express = require('express');
const router = express.Router();

const latopController = require('../controllers/laptopController');

router.get('/brand/:brand',latopController.brand);
router.get('/filter',latopController.filter);
router.get('/:slug',latopController.detail);

module.exports = router;
