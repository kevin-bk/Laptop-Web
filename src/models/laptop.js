const urlSlug = require('url-slug');
const shortId = require('shortid');

module.exports = {
    get: function (con, callback) {
        con.query("SELECT * FROM laptops where isDelete = 0 ", callback);
    },

    getTrash: function (con, callback) {
        con.query("SELECT * FROM laptops where isDelete = 1 ", callback);
    },

    getById: function (con, id, callback) {
        con.query(`SELECT * FROM laptops where id = '${id}'`, callback);
    },

    getBySlug: function (con, slug, callback) {
        con.query(`SELECT * FROM laptops where slug = '${slug}'`, callback);
    },

    create: function (con, data, callback) {
        const url = urlSlug(data.laptop_name);
        const id = shortId.generate();
        con.query(
            `INSERT INTO laptops SET 
          laptop_name = '${data.laptop_name}', 
          id = '${id}', 
          slug = '${url}', 
          price = '${data.price}', 
          cpu = '${data.cpu}', 
          cpu_speed = '${data.cpu_speed}', 
          ram = '${data.ram}', 
          ram_type = '${data.ram_type}', 
          ram_speed = '${data.ram_speed}', 
          ram_max = '${data.ram_max}', 
          hard_drive = '${data.hard_drive}', 
          screen_size = '${data.screen_size}', 
          screen_resolution = '${data.screen_resolution}', 
          card = '${data.card}', 
          sound = '${data.sound}', 
          connect_port = '${data.connect_port}', 
          wireless_connect = '${data.wireless_connect}', 
          model_charge = '${data.model_charge}', 
          pin_type = '${data.pin_type}', 
          os = '${data.os}', 
          size = '${data.size}', 
          weight = '${data.weight}', 
          material = '${data.material}', 
          year = '${data.year}', 
          img = '${data.img}', 
          isDelete = 'false', 
          brand = '${data.brand}'`,
            callback
        )
    },

    update: function (con, data, id, callback) {
        const url = urlSlug(data.laptop_name);
        con.query(
            `UPDATE laptops SET 
          laptop_name = '${data.laptop_name}', 
          slug = '${url}', 
          price = '${data.price}', 
          cpu = '${data.cpu}', 
          cpu_speed = '${data.cpu_speed}', 
          ram = '${data.ram}', 
          ram_type = '${data.ram_type}', 
          ram_speed = '${data.ram_speed}', 
          ram_max = '${data.ram_max}', 
          hard_drive = '${data.hard_drive}', 
          screen_size = '${data.screen_size}', 
          screen_resolution = '${data.screen_resolution}', 
          card = '${data.card}', 
          sound = '${data.sound}', 
          connect_port = '${data.connect_port}', 
          wireless_connect = '${data.wireless_connect}', 
          model_charge = '${data.model_charge}', 
          pin_type = '${data.pin_type}', 
          os = '${data.os}', 
          size = '${data.size}', 
          weight = '${data.weight}', 
          material = '${data.material}', 
          year = '${data.year}', 
          img = '${data.img}', 
          brand = '${data.brand}' 
          WHERE slug = '${id}'`,
            callback
        )
    },

    delete: function (con, id, callback) {
        // console.log(id);
        con.query(
            `UPDATE laptops SET 
            isDelete = 1
            WHERE slug = '${id}'`,
            callback
          )
    },

    restore: function (con, id, callback) {
        con.query(
            `UPDATE laptops SET 
            isDelete = 0
            WHERE slug = '${id}'`,
            callback
          )
    },

    destroy: function (con, id, callback) {
        con.query(`DELETE FROM laptops WHERE slug = '${id}'`, callback)
    }
}