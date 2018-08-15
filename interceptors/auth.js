/**
 * This module is a middleware to authenticate and autherize permission to 
 * various api.
 * 
 */

/**
 * Import required modules
 */
const jwt = require('jsonwebtoken');
const config = require('../config/env');

/**
     * This method authenticate whether the user is logged in or not
     * @param req Request object
     * @param res Response object
     * @param next Handler for next action
     * 
     */
function authenticate(roles) {
    return function (req, res, next) {
        // check authorization header
        var tokenWithBearer = req.headers.authorization;
        if (tokenWithBearer) {
            var token = tokenWithBearer.split(' ')[1];
            // verifies secret and checks exp
            jwt.verify(token, config.secret, function (err, decoded) {
                
                if (err) {
                    return res.status(401).send({ auth: false, message: 'Token de autorización invalido.' });
                } else {
                    if(roles.indexOf(decoded.role) >= 0) {
                        // if everything is good, save to request for use in other routes
                        req.auth = decoded;
                        next();
                    } else {
                        return res.status(401).send({ auth: false, message: 'Falló la autorización.' });
                    }
                }
            });
        } else {
            return res.status(403).send({ auth: false, message: 'Token de autorización no encontrado.' });
        }
    }
}

module.exports = authenticate;