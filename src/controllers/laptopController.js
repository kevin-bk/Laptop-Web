
class LaptopController {

    // [GET] /brand/:brand
    brand(req,res) {
        res.render('laptop_brand', {
            brand: req.params.brand,
        });
    }

    // [GET] /filter
    filter(req,res) {
        res.render('laptop_filter', {
            a: req.query.a, 
            b: req.query.b,
        });
    }

    // [GET] /:slug
    detail(req,res) {
        res.render('laptop_detail', {
            slug: req.params.slug
        });
    }
}

module.exports = new LaptopController;
