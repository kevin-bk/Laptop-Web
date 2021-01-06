const express = require('express');
const router = express.Router();

const cartController = require('../controllers/cartController');

router.get('/add/:id',cartController.add);
router.get('/sub/:id',cartController.sub);
router.post('/order',cartController.order);
router.get('/nocart',cartController.nocart);
router.post('/remove/:id',cartController.remove);
router.get('/',cartController.index);

module.exports = router;
