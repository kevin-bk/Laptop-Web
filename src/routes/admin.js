const express = require('express');
const router = express.Router();

const laptopController = require('../controllers/laptopCRUDController');
const orderController = require('../controllers/orderController');
const adminController = require('../controllers/adminController');

router.get('/login',adminController.login);
router.post('/login',adminController.postLogin);
router.get('/logout',adminController.logout);


router.get('/laptop',laptopController.index);
router.get('/laptop/trash',laptopController.trash);
router.get('/laptop/create',laptopController.create);
router.get('/laptop/brand/:id',laptopController.brand);
router.get('/laptop/detail/:id',laptopController.detail);
router.get('/laptop/:id/edit',laptopController.edit);
router.put('/laptop/:id',laptopController.update);
router.get('/laptop/delete/:id',laptopController.delete);
router.get('/laptop/:id/restore',laptopController.restore);
router.get('/laptop/:id/force',laptopController.destroy);
router.post('/laptop/store',laptopController.store);
router.post('/laptop/add/:id',laptopController.add);
router.post('/laptop/sub/:id',laptopController.sub);

router.get('/order/delete/:id',orderController.delete);
router.get('/order/trash',orderController.trash);
router.get('/order/:id/restore',orderController.restore);
router.get('/order/:id/force',orderController.destroy);
router.get('/order/detail/:id',orderController.detail);
router.get('/order/confirm/:id',orderController.confirm);
router.get('/order/status',orderController.status);
router.get('/order/doanhthu',orderController.doanhThu);
router.get('/order',orderController.index);

router.get('/',adminController.index);

module.exports = router;
