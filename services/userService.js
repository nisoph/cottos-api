/**
 * This module provides methods to access user data and user authentication.
 * I have used array for storing user record, it should be replaced with database.
 *
 */

const connectionFactory = require('../utils/connectionFactory');

/**
 * Define user authentication operations
 * @class
 */
var userservice = function () { };

/**
 * Create a user record
 * @param userInfo Id of the user
 * @param callback Callback function
 */
userservice.prototype.createUser = function (userInfo, callback) {
  const userInsertSql = 'INSERT INTO usuarios SET ?';
  connectionFactory.getConnection(function (err, connection) {
    if (err) {
      callback(true, null);
    } else {
      connection.query(userInsertSql, userInfo, function (err, rows, fields) {
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
 * Get a user record for provided user id
 * @param id Id of the user
 * @param callback Callback function
 */
userservice.prototype.findById = function (userId, callback) {
  const findUserQuery = 'SELECT u.id as `id`,u.nombre,u.apellido,u.email,u.perfil_img,r.nombre_rol as `role` FROM usuarios u,roles r WHERE u.id_rol = r.id AND u.id=?';
  const params = [userId];
  connectionFactory.getConnection(function (err, connection) {
    if (err) {
      callback(true, null);
    } else {
      connection.query(findUserQuery, params, function (err, rows, fields) {
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
 * Authenticate users login credentials
 * @param email Email of the user
 * @param password Password of the user
 * @param callback Callback function
 */
userservice.prototype.authenticate = function (email, password, callback) {
  const authQuery = 'SELECT u.id,u.nombre,u.apellido,u.email,r.nombre_rol as `role` FROM usuarios u, auth a, roles r WHERE u.id=a.id_usuario AND u.id_rol = r.id AND u.email=? AND a.contrasena=md5(?)';
  const params = [email, password];
  connectionFactory.getConnection(function (err, connection) {
    if (err) {
      callback(true, null);
    } else {
      connection.query(authQuery, params, function (err, rows, fields) {
        if (err) {
          connection.release();
          callback(true, null);
        } else {
          connection.release();
          if (rows.length > 0) {
            callback(null, rows);
          } else {
            callback(false, null);
          }
        }
      });
    }
  });
}

module.exports = new userservice();