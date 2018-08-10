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
var usercontroller = function () { };

/**
 * Get a user record for provided user id
 * @param id Id of the user
 * @param callback Callback function
 */
usercontroller.prototype.findById = function (userId, callback) {
    var findUserQuery = 'SELECT u.first_name as `nombre`,u.last_name as `apellido`,u.email,u.profile_img,r.role_name as `role` FROM users u,roles r WHERE u.role_id = r.id AND u.id=?';
    var params = [userId];
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
usercontroller.prototype.authenticate = function (email, password, callback) {
    var authQuery = 'SELECT u.first_name as `nombre`,u.last_name as `apellido`,u.email,r.role_name as `role` FROM users u, auth a, roles r WHERE u.id=a.user_id AND u.role_id = r.id AND u.email=? AND a.md5passwd=md5(?)';
    var params = [email, password];
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
                        callback(true, null);
                    }    
                }
            });
        }

    });
}

module.exports = new usercontroller();