// const data = require('../models/test.js');
const laptop = require('../models/laptop.js');

class HomeController {

    //  [GET] /
    index(req, res,next) {
        laptop.get(req.con, function(err, laptops){
            // console.log(laptops);
            res.render('home',{ laptops })
        })
    }
}

module.exports = new HomeController;
