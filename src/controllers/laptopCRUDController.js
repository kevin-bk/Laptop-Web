const laptop = require('../models/laptop.js');

class laptopController {

    // [GET] /admin/Laptop/
    index(req, res,next) {
        laptop.get(req.con, function(err, laptops){
            laptops = laptops.map(laptop => {
                laptop.price = Intl.NumberFormat().format(laptop.price);
                return laptop;
            });
            res.render('admin/laptop/test',{ laptops, layout: 'admin' })
        })
    }

    //  [GET] /admin/Laptop/create
    create(req, res,next) {
        res.render('admin/laptop/create', {layout: 'admin'});
    }

    // [POST] /admin/Laptop/store
    store(req, res, next) {
        if (!req.body.laptop_name) res.redirect("/admin/laptop/create");
        else laptop.create(req.con, req.body, function(err) {
            res.redirect("/admin/laptop")
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
            res.redirect(req.header('Referer') || '/');
        })
    }

    // [DELETE] /admin/laptop/:id
    delete(req, res, next) {
        laptop.delete(req.con, req.params.id, function(err){
            res.redirect(req.header('Referer') || '/');
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