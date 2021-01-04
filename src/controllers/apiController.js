const laptop = require('../models/laptop.js');

class apiController {

    //  [GET] /getLaptopList
    getLaptopList(req, res) {
        laptop.get(req.con, function(err, laptops){
            res.json(laptops)
        })
    }

    //  [GET] /getLaptopById/:id
    getLaptopById(req, res) {
        laptop.getById(req.con, req.params.id, function(err, laptop){
            res.json(laptop[0]);
        })
    }
    
    //  [GET] /getLaptopBySlug/:slug
    getLaptopBySlug(req, res) {
        laptop.getBySlug(req.con, req.params.slug, function(err, laptop){
            res.json(laptop[0]);
        })
    }

    //  [GET] /getLaptopByBrand/:brand
    getLaptopByBrand(req, res) {
        laptop.getByBrand(req.con, req.params.brand, function(err, laptop){
            res.json(laptop);
        })
    }

    //  [GET] /getLaptopByPrice
    getLaptopByPrice(req, res) {
        let price = {
            a: req.query.a * 1000000,
            b: req.query.b * 1000000,
        }
        laptop.getByPrice(req.con, price, function(err, laptop){
            res.json(laptop);
        })
    }
}

module.exports = new apiController;
