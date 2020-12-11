module.exports.requireAuth = function (req, res, next) {
    if (!req.signedCookies.admin) {
        res.redirect('/admin/login');
    }
    next();
}