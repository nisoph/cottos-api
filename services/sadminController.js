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
 * Get the list of cotos
 * @param id Id of the user
 * @param callback Callback function
 */
sadmincontroller.prototype.getCotosList = function (callback) {
    var findCotosQuery = 'SELECT c.id as id, c.nombre as coto, u.nombre, u.apellido, c.tel_contacto as telefono, u.email as correo FROM cotos c, cotos_admin ca, usuarios u WHERE c.id = ca.id_coto AND ca.id_usuario = u.id;';
    connectionFactory.getConnection(function (err, connection) {
        if (err) {
            callback(true, null);
        } else {
            connection.query(findCotosQuery, function (err, rows, fields) {
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

/**
 * Add a new Coto
 * @param details details of the new coto
 * @param callback Callback function
 */
sadmincontroller.prototype.addCoto = function (details, callback) {
    /* var authQuery = 'SELECT u.id,u.nombre,u.apellido,u.email,r.nombre_rol as `role` FROM usuarios u, auth a, roles r WHERE u.id=a.id_usuario AND u.id_rol = r.id AND u.email=? AND a.contrasena=md5(?)';
    connectionFactory.getConnection(function (err, connection) {
        if (err) {
            callback(true, null);
        } else {
            connection.query(authQuery, details, function (err, rows, fields) {
                if (err) {
                    connection.release();
                    callback(true, null);
                } else {
                    connection.release();
                    callback(null, rows);
                }
            });
        }
    });*/
    console.log(details
    );
}

module.exports = new sadmincontroller();