/**
 * This module provides methods to access administrator data.
 * 
 */
const connectionFactory = require('../utils/connectionFactory');
const userService = require('./userService');
const emailService = require('./sendgrid/mail-service');

/**
 * Define user authentication operations
 * @class
 */
const adminservice = function () { };


adminservice.prototype.getCotoByUserId = function (userId, callback) {
  const findCotoQuery = 'SELECT c.id as id, c.nombre as nombre, c.coto_img FROM cotos c, cotos_admin ca, usuarios u WHERE c.id=ca.id_coto AND ca.id_usuario=u.id AND u.id=?;';
  connectionFactory.getConnection(function (err, connection) {
    if (err) {
      callback(true, null);
    } else {
      connection.query(findCotoQuery, userId, function (err, row, fields) {
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

adminservice.prototype.getCotoProperties = function (userId, callback) {
  const findPropertiesQuery = 'SELECT p.id as id, p.calle, p.numero_int FROM propiedades p, cotos c, cotos_admin ca, usuarios u WHERE p.id_coto=c.id AND c.id=ca.id_coto AND ca.id_usuario=u.id AND u.id=?;';
  connectionFactory.getConnection(function (err, connection) {
    if (err) {
      callback(true, null);
    } else {
      connection.query(findPropertiesQuery, userId, function (err, row, fields) {
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
 * Add a new Coto's Admnistrator User
 * @param userPropertyInfo details of the new coto
 * @param callback Callback function
 */
adminservice.prototype.addUserResidentCoto = function (userPropertyInfo, callback) {
  const userAuthInsertSql = 'INSERT INTO auth SET ?';

  const userInfo = {
    id_rol: '3',
    nombre: userPropertyInfo.nombre || '',
    apellido: userPropertyInfo.apellido || '',
    email: userPropertyInfo.email || '',
  };

  const userAuth = {
    id_usuario: '',
    contrasena: userPropertyInfo.contrasenaMD5 || '',
  };

  const emailInfo = {
    nombre: userPropertyInfo.nombre || '',
    apellido: userPropertyInfo.apellido || '',
    email: userPropertyInfo.email || '',
    contrasena: userPropertyInfo.contrasena || '',
    nombreCoto: userPropertyInfo.nombreCoto || '',
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
          connection.query(userAuthInsertSql, userAuth, function (err, rows, fields) {
            if (err) {
              connection.release();
              callback(true, null);
            } else {
              connection.release();
              callback(null, data);
              emailService.sendResidentWelcomeEmail(emailInfo);
            }
          });
        }
      });
    }
  });
}

/**
 * Add a new Property to Coto
 * @param propertyInfo details of the new property
 * @param callback Callback function
 */
adminservice.prototype.addPropertyToCoto = function (propertyInfo, callback) {
  const propertyInsertSql = 'INSERT INTO propiedades SET ?';

  connectionFactory.getConnection(function (err, connection) {
    if (err) {
      callback(true, null);
    } else {
      connection.query(propertyInsertSql, propertyInfo, function (err, row, fields) {
        if (err) {
          connection.release();
          callback(true, null);
        } else {
          connection.release();
          callback(null, row, fields);
          // emailService.sendResidentWelcomeEmail(emailInfo);
        }
      });
    }
  });
}

module.exports = new adminservice();
