const shortId = require('shortid');
const session = require('../models/session.js');

module.exports = function(req, res,next) {
    if (!req.signedCookies.sessionId) {
        const sessionId = shortId.generate();
        res.cookie('sessionId',sessionId, {
            signed: true,
            expires: new Date(Date.now() + 48 * 3600000)
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