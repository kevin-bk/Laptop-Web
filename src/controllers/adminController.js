
class adminController {

    // [GET] /admin/login
    login(req, res, next){
        if (req.signedCookies.admin) {
            res.redirect('/admin/laptop');
        }
        res.render('admin/login', {layout: 'blank_page'});
    }

    // [POST] /admin/login
    postLogin(req, res, next){
        const user = req.body.tk;
        const password = req.body.password;
        
        if (user != "admin"){
            res.render('admin/login', {
                err : ["Tên đăng nhập không đúng!"],
                user : user,
                layout: 'blank_page'
            });
            return;
        }
        if (password != "12345"){
            res.render('admin/login', {
                err : ["Sai mật khẩu!"],
                user : user,
                layout: 'blank_page'
            });
            return;
        }
        res.cookie('admin', 12345, {
            path: '/admin',
            signed: true
        });
        const before = req.query.r;
        // console.log(req.query);
        if (before) res.redirect("/" + before);
        else res.redirect('/admin/laptop');
    }

    // [GET] /admin
    index(req,res,next){
        res.render("admin/index", {layout: 'admin'});
    }

    // [GET] /admin/logout
    logout(req,res,next){
        res.clearCookie('admin', { path: '/admin' });
        res.redirect('/admin');
    }

}

module.exports = new adminController;