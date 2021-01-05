const homeRouter = require('./home');
const apiRouter = require('./api');
const adminRouter = require('./admin');
const cartRouter = require('./cart');
const searchRouter = require('./search');
const laptopRouter = require('./laptop');
const orderRouter = require('./order');
const requireAdmin = require('../middlewares/admin');
const adminController = require('../controllers/adminController');

function route(app){
    app.get('/admin/login', adminController.login);
    app.post('/admin/login', adminController.postLogin);
    app.use('/admin',requireAdmin.requireAuth, adminRouter);
    app.use('/cart', cartRouter);
    app.use('/order', orderRouter);
    app.use('/api', apiRouter);
    app.use('/search', searchRouter);
    app.use('/laptop', laptopRouter);
    app.use('/', homeRouter);
}

module.exports = route;