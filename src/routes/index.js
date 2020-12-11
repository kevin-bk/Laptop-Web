const homeRouter = require('./home');
const adminRouter = require('./admin');
const cartRouter = require('./cart');
const requireAdmin = require('../middlewares/admin');
const adminController = require('../controllers/adminController');

function route(app){
    app.get('/admin/login', adminController.login);
    app.post('/admin/login', adminController.postLogin);
    app.use('/admin',requireAdmin.requireAuth, adminRouter);
    app.use('/cart', cartRouter);
    app.use('/', homeRouter);
}

module.exports = route;