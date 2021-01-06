const order = require('../models/order.js');
const laptop = require('../models/laptop.js');
class orderController {

    //  [GET] /
    index(req, res, next) {
        order.get(req.con, function (err, orders) {
            res.render('admin/order/list', { 
                orders, 
                layout: 'admin' ,
                message: 'Danh sách đơn hàng'
            })
        })
    }

    //  [GET] /status
    status(req, res, next) {
        order.getByStatus(req.con, req.query.status, function (err, orders) {
            res.render('admin/order/list', { 
                orders, 
                layout: 'admin',
                message: req.query.status
            })
        })
    }

    //  [GET] /order/detail/:id
    detail(req, res, next) {
        order.getByIdNoDelete(req.con, req.params.id, function (err, orders) {
            // orders.createAt = new Date();
            res.render('admin/order/detail', { id: req.params.id, orders, layout: 'admin'});
        })
        
    }

    // [GET] /order/confirm/:id
    confirm(req,res,next) {
        order.updateStatus(req.con, req.query.status ,req.params.id, function (err){
            res.redirect('/admin/order/status?status=' + req.query.status);
        })
    }

    // POST /order/store
    store(req, res, next) {
        order.create(req.con, req.query, function (id) {
            res.render('order', { data: req.query, id: id, layout: 'cart' });
        })
    }

    // GET /order/delete/:id
    delete(req, res) {
        order.delete(req.con, req.params.id, function () {
            res.redirect(req.header('Referer') || '/');
        })
    }

    // [GET] /admin/order/trash
    trash(req, res, next) {
        order.getTrash(req.con, function (err, orders) {
            res.render('admin/order/trash', { orders, layout: 'admin' })
        })
    }

    // [PATCH] /admin/order/:id/restore
    restore(req, res, next) {
        order.restore(req.con, req.params.id, function (err) {
            res.redirect('/admin/order/trash');
        })
    }

    // [DESTROY] /admin/order/:id/force
    destroy(req, res, next) {
        order.destroy(req.con, req.params.id, function (err) {
            res.redirect('/admin/order/trash');
        })
    }

}

module.exports = new orderController;
