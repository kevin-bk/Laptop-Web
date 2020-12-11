const express = require('express');
const router = express.Router();

const searchController = require('../controllers/searchController');

router.get('/address/tinh/get',searchController.getTinh);
router.get('/address/huyen/:id',searchController.addressHuyen);
router.get('/address/xa/:id',searchController.addressXa);

module.exports = router;
