const shortId = require('shortid');
const session = require('../models/session.js');

module.exports = function(req, res,next) {
    if (!req.signedCookies.sessionId) {
        const sessionId = shortId.generate();
        res.cookie('sessionId',sessionId, {
            signed: true
        });

        session.create(req.con, {sessionId}, function(err) {
            if (err) console.log(err);
            else {
                next();
            }
        })
    }
    else next();
}