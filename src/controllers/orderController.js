const order = require('../models/order.js');

class orderController {

    //  [GET] /
    index(req, res,next) {
        order.get(req.con, function(err, orders){
            res.render('admin/order/test',{ orders, layout : 'admin' })
        })
    }

    // POST /order/store
    store(req,res,next){
        order.create(req.con, req.query, function(id){
            res.render('order', { data: req.query, id: id ,layout: 'cart'});
        })
    }

    // GET /order/delete/:id
    delete(req,res){
        order.destroy(req.con, req.params.id, function(){
            res.redirect('/admin/order');
        })
    }
}

module.exports = new orderController;
