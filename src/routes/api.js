const express = require('express');
const router = express.Router();

const apiController = require('../controllers/apiController');

router.get('/getLaptopList',apiController.getLaptopList);
router.get('/getLaptopByPrice',apiController.getLaptopByPrice);
router.get('/getLaptopById/:id',apiController.getLaptopById);
router.get('/getLaptopBySlug/:slug',apiController.getLaptopBySlug);
router.get('/getLaptopByBrand/:brand',apiController.getLaptopByBrand);

module.exports = router;