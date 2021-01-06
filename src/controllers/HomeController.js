// const data = require('../models/test.js');
const laptop = require('../models/laptop.js');

class HomeController {

    //  [GET] /
    index(req, res,next) {
        laptop.get(req.con, function(err, laptops){
            // console.log(laptops);
            laptops = laptops.map(laptop => {
                laptop.price = Intl.NumberFormat().format(laptop.price);
                return laptop;
            });
            res.render('home',{ laptops });
        })
    }

    search(req, res,next){
        laptop.search(req.con, req.query.key, function(err, laptops){
            laptops = laptops.map(laptop => {
                laptop.price = Intl.NumberFormat().format(laptop.price);
                return laptop;
            });
            res.render('home',{ 
                laptops,
             });
        })
    }
}

module.exports = new HomeController;
