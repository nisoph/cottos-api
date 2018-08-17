/**
 * This module provides methods to access user data and user authentication.
 * I have used array for storing user record, it should be replaced with database.
 * 
 */

var connectionFactory = require('../utils/connectionFactory');

/**
 * Define user authentication operations
 * @class
 */
var sadmincontroller = function () { };

/**
 * Get a user record for provided user id
 * @param id Id of the user
 * @param callback Callback function
 */
sadmincontroller.prototype.getCotosList = function (callback) {
    var findCotosQuery = 'SELECT c.id as id, c.nombre as coto, u.nombre, u.apellido, c.tel_contacto as telefono, u.email as correo FROM cotos c, cotos_admin ca, usuarios u WHERE c.id = ca.id_coto AND ca.id_usuario = u.id;';
    connectionFactory.getConnection(function (err, connection) {
        if (err) {
            callback(true, null);
        } else {
            console.log('HERE');
            connection.query(findCotosQuery, function (err, rows, fields) {
                console.log(err);
                if (err) {
                    connection.release();
                    callback(true, null);
                } else {
                    connection.release();
                    callback(null, rows);
                }
            });
        }

    });
}

module.exports = new sadmincontroller();