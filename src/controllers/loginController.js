class loginController {
    
    index(req,res,next) {
        res.render('login');
    }
}

module.exports = new loginController;