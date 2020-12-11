const session = require('../models/session.js');
const laptop = require('../models/laptop.js');

class cartController {

    // [GET] /cart
    index(req,res,next){
        const sessionId = req.signedCookies.sessionId;
        if (!sessionId) {res.redirect("/"); return;}
        session.find(req.con, {sessionId}, function(err, sessions) {
            if (err) console.log(err);
            if (!sessions[0]){
                res.redirect("/");
                return;
            }
            let data = JSON.parse(sessions[0].value);
            let products = [];
            for (const dt in data) {
                let product = {};
                product.id = dt;
                product.value = data[dt];
                laptop.getById(req.con, product.id, function(err, laptops){
                    product.name = laptops[0].laptop_name;
                    product.image = laptops[0].img;
                    product.price = laptops[0].price;
                    // console.log(product);
                    products.push(product);
                });
            }
            res.render('cart', {products});
        })
    }

    // [GET] /cart/add/:id
    add(req,res,next) {
        const productId = req.params.id;
        const sessionId = req.signedCookies.sessionId;
        if (!sessionId) {res.redirect("/"); return;}
        session.find(req.con, {sessionId}, function(err, sessions) {
            if (err) console.log(err);
            let data = JSON.parse(sessions[0].value);
            if (data[productId]) data[productId]++;
            else data[productId] = 1;
            let text = JSON.stringify(data);
            session.update(req.con, text, sessionId, function(err){
                if (err) console.log(err);
                res.redirect("/cart");
            })
        });
    }

    // [POST] /cart/remove/:id
    remove(req,res,next) {
        const productId = req.params.id;
        const sessionId = req.signedCookies.sessionId;
        if (!sessionId) {res.redirect("/"); return;}
        session.find(req.con, {sessionId}, function(err, sessions) {
            if (err) console.log(err);
            let data = JSON.parse(sessions[0].value);
            if (data[productId]) delete data[productId];
            let text = JSON.stringify(data);
            session.update(req.con, text, sessionId, function(err){
                if (err) console.log(err);
                res.redirect("/cart");
            })
        });
    }
}

module.exports = new cartController;
