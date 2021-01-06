const express = require('express');
const router = express.Router();

const apiController = require('../controllers/apiController');

router.get('/getLaptopList',apiController.getLaptopList);
router.get('/getLaptopByPrice',apiController.getLaptopByPrice);
router.get('/getCart',apiController.getCart);
router.get('/getLaptopById/:id',apiController.getLaptopById);
router.get('/getLaptopBySlug/:slug',apiController.getLaptopBySlug);
router.get('/getLaptopByBrand/:brand',apiController.getLaptopByBrand);
router.get('/getOrder/:id',apiController.getOrder);

module.exports = router;
