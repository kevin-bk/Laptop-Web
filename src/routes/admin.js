const express = require('express');
const router = express.Router();

const laptopController = require('../controllers/laptopController');
const orderController = require('../controllers/orderController');
const adminController = require('../controllers/adminController');

router.get('/login',adminController.login);
router.post('/login',adminController.postLogin);
router.get('/logout',adminController.logout);


router.get('/laptop',laptopController.index);
router.get('/laptop/trash',laptopController.trash);
router.get('/laptop/create',laptopController.create);
router.get('/laptop/:id/edit',laptopController.edit);
router.put('/laptop/:id',laptopController.update);
router.delete('/laptop/:id',laptopController.delete);
router.patch('/laptop/:id/restore',laptopController.restore);
router.delete('/laptop/:id/force',laptopController.destroy);
router.post('/laptop/store',laptopController.store);

router.get('/order',orderController.index);

router.get('/',adminController.index);

module.exports = router;
