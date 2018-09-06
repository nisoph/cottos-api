/**
 * This module provides methods to access user data and user authentication.
 * I have used array for storing user record, it should be replaced with database.
 *
 */
const connectionFactory = require('../utils/connectionFactory');
const userService = require('./userService');
const emailService = require('../mail/mail-service');

/**
 * Define user authentication operations
 * @class
 */
const sadminservice = function () { };

/**
 * Get the list of cotos
 * @param callback Callback function
 */
sadminservice.prototype.getCotosList = function (callback) {
  const findCotosQuery = 'SELECT c.id as id, c.nombre as coto, u.nombre, u.apellido, c.tel_contacto as telefono, u.email as correo FROM cotos c, cotos_admin ca, usuarios u WHERE c.id = ca.id_coto AND ca.id_usuario = u.id;';
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
 * @param infoCoto details of the new coto
 * @param callback Callback function
 */
sadminservice.prototype.addCoto = function (infoCoto, callback) {
  const cotoInsertSql = 'INSERT INTO cotos SET ?';
  connectionFactory.getConnection(function (err, connection) {
    if (err) {
      callback(true, null);
    } else {
      connection.query(cotoInsertSql, infoCoto, function (err, rows, fields) {
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
 * Add a new Coto's Admnistrator User
 * @param userInfo details of the new coto
 * @param callback Callback function
 */
sadminservice.prototype.addUserAdminCoto = function (userAdminInfo, callback) {
  const userAuthInsertSql = 'INSERT INTO auth SET ?';
  const cotoAccessInsertSql = 'INSERT INTO cotos_admin SET ?';

  const userInfo = {
    id_rol: '2',
    nombre: userAdminInfo.nombre || '',
    apellido: userAdminInfo.apellido || '',
    email: userAdminInfo.email || '',
  };

  const userAuth = {
    id_usuario: '',
    contrasena: userAdminInfo.contrasenaMD5 || '',
  };

  const cotosAdmin = {
    id_coto: userAdminInfo.id_coto,
    id_usuario: '',
  };

  const emailInfo = {
    nombre: userAdminInfo.nombre || '',
    apellido: userAdminInfo.apellido || '',
    email: userAdminInfo.email || '',
    contrasena: userAdminInfo.contrasena || '',
    nombreCoto: userAdminInfo.nombreCoto || '',
  };

  connectionFactory.getConnection(function (err, connection) {
    if (err) {
      callback(true, null);
    } else {
      userService.createUser(userInfo, function (err, data) {
        if (err) {
          callback(true, null);
        } else if (!data) {
          callback(null, null);
        } else {
          userAuth.id_usuario = data.insertId;
          cotosAdmin.id_usuario = data.insertId;
          connection.query(userAuthInsertSql, userAuth, function (err, rows, fields) {
            if (err) {
              connection.release();
              callback(true, null);
            } else {
              connection.query(cotoAccessInsertSql, cotosAdmin, function (err, rows, fields) {
                if (err) {
                  connection.release();
                  callback(true, null);
                } else {
                  connection.release();
                  callback(null, rows, fields);
                  emailService.sendAdminWelcomeEmail(emailInfo);
                }
              });
            }
          });
        }
      });
    }
  });
}

module.exports = new sadminservice();
