module.exports = {
    get: function (con, callback) {
        con.query(`SELECT * FROM sessions`, callback);
    },

    find: function (con, data, callback) {
        con.query(`SELECT * FROM sessions where sessionId = '${data.sessionId}'`, callback);
    },

    create: function (con, data, callback) {
        con.query(
            `INSERT INTO sessions SET sessionId = '${data.sessionId}', value = "{}"`,
            callback
        )
    },

    update: function (con, value, sessionId, callback) {
        con.query(
            `UPDATE sessions SET value = '${value}' WHERE sessionId = '${sessionId}'`,
            callback
        )
    },
}