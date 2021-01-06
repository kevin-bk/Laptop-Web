const laptop = require('../models/laptop.js');

class laptopController {

    // [GET] /admin/Laptop/
    index(req, res,next) {
        laptop.get(req.con, function(err, laptops){
            laptops = laptops.map(laptop => {
                laptop.price = Intl.NumberFormat().format(laptop.price);
                return laptop;
            });
            res.render('admin/laptop/list',{ laptops, layout: 'admin' })
        })
    }

    // [GET] /admin/Laptop/brand/:id
    brand(req, res,next) {
        laptop.getByBrand(req.con, req.params.id, function(err, laptops){
            laptops = laptops.map(laptop => {
                laptop.price = Intl.NumberFormat().format(laptop.price);
                return laptop;
            });
            res.render('admin/laptop/list',{ 
                laptops,
                layout: 'admin',
                brand: req.params.id, 
            })
        })
    }

    // [GET] /admin/Laptop/detail/:id
    detail(req, res,next) {
        laptop.getById(req.con, req.params.id, function(err, laptop){
            res.render('admin/laptop/detail',{ 
                laptop,
                layout: 'admin', 
            })
        })
    }

    //  [GET] /admin/Laptop/create
    create(req, res,next) {
        res.render('admin/laptop/create', {layout: 'admin'});
    }

    // [POST] /admin/Laptop/store
    store(req, res, next) {
        if (!req.body.laptop_name) res.redirect("/admin/laptop/create");
        var body = req.body;
        body.price = body.price.replace(/\D/g,'');
        laptop.create(req.con, body, function(id) {
            res.redirect("/admin/laptop/detail/" + id);
            // res.redirect('/admin/laptop/create')
          })
    }

    // [GET] /admin/Laptop/edit
    edit(req, res,next) {
        laptop.getBySlug(req.con, req.params.id, function(err, laptop) {
            res.render("admin/laptop/edit", { laptop : laptop[0], layout: 'admin' });
        })
    }

    // [PUT] /admin/laptop/:id
    update(req, res,next) {
        laptop.update(req.con, req.body, req.params.id, function(err) {
            res.redirect("/admin/laptop")
        })
    }

    // [DELETE] /admin/laptop/delete/id
    delete(req, res, next) {
        laptop.delete(req.con, req.params.id, function(err){
            res.redirect('/admin/laptop')
        })
    }

    // [GET] /admin/Laptop/trash
    trash(req, res,next) {
        laptop.getTrash(req.con, function(err, laptops){
            res.render('admin/laptop/trash',{ laptops, layout: 'admin' })
        })
    }

    // [PATCH] /admin/laptop/:id/restore
    restore(req, res,next) {
        laptop.restore(req.con, req.params.id, function(err){
            res.redirect('/admin/laptop/trash');
        })
    }

    // [DESTROY] /admin/laptop/:id/force
    destroy(req, res, next) {
        laptop.destroy(req.con, req.params.id, function(err){
            res.redirect('/admin/laptop/trash');
        })
    }

}

module.exports = new laptopController;