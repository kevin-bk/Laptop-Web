const address = require('../models/address.js');

class searchController {

    //  [GET] /address/huyen/:id
    addressHuyen(req, res,next) {
        address.findHuyen(req.con, req.params.id, function (err, add){
            res.json({add})
        })
    }

    //  [GET] /address/xa/:id
    addressXa(req, res,next) {
        address.findXa(req.con, req.params.id, function (err, add){
            res.json({add})
        })
    }
    
    // [GET] address/tinh/get
    getTinh(req, res,next) {
        address.findTinh(req.con, function (err, add){
            res.json({add})
        })
    }
}

module.exports = new searchController;
