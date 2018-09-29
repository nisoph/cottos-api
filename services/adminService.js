/**
 * This module provides methods to access administrator data.
 * 
 */
const connectionFactory = require('../utils/connectionFactory');
// const emailService = require('./sendgrid/mail-service');

/**
 * Define user authentication operations
 * @class
 */
const adminservice = function () { };


adminservice.prototype.getCotoByUserId = function (userId, callback) {
  const findCotoQuery = 'SELECT c.id as id, c.nombre as nombre FROM cotos c, cotos_admin ca, usuarios u WHERE c.id=ca.id_coto AND ca.id_usuario=u.id AND u.id=?;';
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

module.exports = new adminservice();
