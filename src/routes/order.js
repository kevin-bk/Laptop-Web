const express = require('express');
const router = express.Router();

const orderController = require('../controllers/orderController');

router.post('/create',orderController.store);
router.get('/delete/:id',orderController.delete);
router.get('/',orderController.index);

module.exports = router;
