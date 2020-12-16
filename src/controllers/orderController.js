const order = require('../models/order.js');

class orderController {

    //  [GET] /
    index(req, res,next) {
        order.get(req.con, function(err, orders){
            res.render('admin/order/list',{ orders, layout : 'admin' })
        })
    }
}

module.exports = new orderController;
