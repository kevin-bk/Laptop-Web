module.exports = {

    findTinh: function (con, callback) {
        con.query(`SELECT ten_tinh FROM tinh`, callback);
    },

    findHuyen: function (con, data, callback) {
        con.query(`SELECT * FROM huyen,tinh where tinh.ma_tinh = huyen.ma_tinh and tinh.ten_tinh = '${data}'`, callback);
    },

    findXa: function (con, data, callback) {
        con.query(`SELECT * FROM xa,huyen where huyen.ma_huyen = xa.ma_huyen and huyen.ten_huyen = '${data}'`, callback);
    },

}