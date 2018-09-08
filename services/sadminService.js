/**
 * This module provides methods to access user data and user authentication.
 * I have used array for storing user record, it should be replaced with database.
 *
 */
const connectionFactory = require('../utils/connectionFactory');
const userService = require('./userService');
const emailService = require('./sendgrid/mail-service');

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
  const findCotosQuery = 'SELECT c.id as id, c.nombre as coto, c.colonia, u.nombre, u.apellido FROM cotos c, cotos_admin ca, usuarios u WHERE c.id = ca.id_coto AND ca.id_usuario = u.id;';
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

sadminservice.prototype.getCotoById = function (cotoId, callback) {
  const findCotoQuery = 'SELECT c.id as id, c.nombre as coto, c.direccion, c.numero_ext, c.colonia, c.cp, c.coto_img, c.estado, c.ciudad, c.tel_contacto, c.tel_emergencia, c.status, c.creado, (select count(pr.id) from propiedades pr, cotos co where co.id = pr.id_coto and co.id=c.id) as no_propiedades, u.nombre, u.apellido FROM cotos c, cotos_admin ca, usuarios u WHERE c.id=ca.id_coto AND ca.id_usuario=u.id AND c.id=?;';
  connectionFactory.getConnection(function (err, connection) {
    if (err) {
      callback(true, null);
    } else {
      connection.query(findCotoQuery, cotoId, function (err, row, fields) {
        if (err) {
          connection.release();
          callback(true, null);
        } else {
          connection.release();
          callback(null, row);
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
 * Add a new Coto
 * @param infoCoto details of the new coto
 * @param callback Callback function
 */
sadminservice.prototype.updateCotoLogo = function (infoCoto, callback) {
  const cotoInsertSql = 'UPDATE cotos SET coto_img=? WHERE id=?';
  connectionFactory.getConnection(function (err, connection) {
    if (err) {
      callback(true, null);
    } else {
      connection.query(cotoInsertSql, [infoCoto.coto_img, infoCoto.id], function (err, rows, fields) {
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
