const session = require('../models/session.js');
const laptop = require('../models/laptop.js');
const order = require('../models/order.js');

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
            let total_price = 0;
            for (const dt in data) {
                let product = {};
                product.id = dt;
                product.value = data[dt];
                laptop.getById(req.con, product.id, function(err, laptops){
                    product.name = laptops[0].laptop_name;
                    product.image = laptops[0].img;
                    total_price = Number(total_price) + Number(laptops[0].price) * Number(product.value);
                    product.price = Intl.NumberFormat().format(laptops[0].price);
                    products.push(product);
                });
            }
            setTimeout(() => {
                total_price = Intl.NumberFormat().format(total_price);
                res.render('cart',
                    {   layout: 'cart',
                        products : products,
                        total_price : total_price, 
                        order:sessions[0].value
                });
            }, 100);
        })
    }

    // [GET] /cart/nocart
    nocart(req, res) {
        res.render('cart_no', { layout:'cart'});
    }

    // [GET] /cart/add/:id
    add(req,res,next) {
        const productId = req.params.id;
        const sessionId = req.signedCookies.sessionId;
        var value;
        if (!sessionId) {res.redirect("/"); return;}

        laptop.getById(req.con, productId, function(err, laptops){
            var laptop = laptops[0];
            value = laptop.cnt;
        })

        setTimeout(function(){
            session.find(req.con, {sessionId}, function(err, sessions) {
                if (err) console.log(err);
                let data = JSON.parse(sessions[0].value);
                if (data[productId]){
                    if (data[productId] < value) data[productId]++;
                }
                else data[productId] = 1;
                let text = JSON.stringify(data);
                session.update(req.con, text, sessionId, function(err){
                    if (err) console.log(err);
                    res.redirect("/cart");
                })
            });
        }, 200);
    }

    // [GET] /cart/sub/:id
    sub(req,res,next) {
        const productId = req.params.id;
        const sessionId = req.signedCookies.sessionId;
        if (!sessionId) {res.redirect("/"); return;}
        session.find(req.con, {sessionId}, function(err, sessions) {
            if (err) console.log(err);
            let data = JSON.parse(sessions[0].value);
            if (data[productId] > 1) data[productId]--;
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

    // POST /cart/order
    order(req,res,next){
    }
}

module.exports = new cartController;
