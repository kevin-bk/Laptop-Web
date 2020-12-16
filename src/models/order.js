const shortId = require('shortid');

module.exports = {
    get: function (con, callback) {
        con.query("SELECT * FROM orders where isDelete = 0 ", callback);
    },

    getTrash: function (con, callback) {
        con.query("SELECT * FROM orders where isDelete = 1 ", callback);
    },

    getById: function (con, id, callback) {
        con.query(`SELECT * FROM orders where order_id = '${id}'`, callback);
    },

    create: function (con, data, callback) {
        const id = shortId.generate();
        con.query(
            `INSERT INTO orders SET 
          order_id = '${id}', 
          customer_name = '${data.customer_name}', 
          gender = '${data.gender}', 
          sdt = '${data.sdt}', 
          address = '${data.address}', 
          more_info = '${data.more_info}', 
          products = '${data.products}', 
          total_price = '${data.total_price}', 
          status = '${data.status}', 
          isDelete = 'false' `,
            callback
        )
    },

    update: function (con, data, id, callback) {
        con.query(
            `UPDATE orders SET 
            customer_name = '${data.customer_name}', 
            gender = '${data.gender}', 
            sdt = '${data.sdt}', 
            address = '${data.address}', 
            more_info = '${data.more_info}', 
            products = '${data.products}', 
            total_price = '${data.total_price}'
          WHERE order_id = '${id}'`,
            callback
        )
    },

    updateStatus: function (con, status, id, callback) {
        con.query(
            `UPDATE orders SET 
            status = '${status}'
          WHERE order_id = '${id}'`,
            callback
        )
    },

    delete: function (con, id, callback) {
        con.query(
            `UPDATE orders SET 
            isDelete = 1
            WHERE order_id = '${id}'`,
            callback
          )
    },

    restore: function (con, id, callback) {
        con.query(
            `UPDATE orders SET 
            isDelete = 0
            WHERE order_id = '${id}'`,
            callback
          )
    },

    destroy: function (con, id, callback) {
        con.query(`DELETE FROM orders WHERE order_id = '${id}'`, callback)
    }
}