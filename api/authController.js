/**
 * This module contains all the functions to handle requests such as login, register
 * and requests related to user profile.
 */

const jwt = require('jsonwebtoken');
const config = require('../config/env'); // get config file
const userService = require('../services/userService'); // get user controller

/**
 * Define module
 */
const AuthController = {

  /**
     * Login controller for handling login request
     * @param req Http request
     * @param res Http response
     */
  login: function (req, res) {
    // get parameters
    const email = req.body.email || '';
    const password = req.body.password || '';
    // validate parameters
    if (email === '' || password === '') {
      return res.status(401).json({ auth: false, message: 'Email o contraseña incorrecto!' });
    }
    // validate user credential
    var user = userService.authenticate(email, password, function (err, data) {
      if (err) {
        res.status(200).json({ error: true, message: `Error inesperado. Intentelo más tarde! Error: ${err}` });
      } else if (!data) {
        // if login credential are not matched or found
        return res.status(401).json({ auth: false, message: 'Email o contraseña incorrecto!' });
      } else {
        const user = {
          id: data[0].id,
          name: `${data[0].nombre} ${data[0].apellido}`,
          email: data[0].email,
          role: data[0].role,
        };
        // user is authenticated, now generate access token
        // var token = jwt.sign(user, config.secret, { expiresIn: config.tokenExpireIn });
        const token = jwt.sign(user, config.secret);

        const userInfo = {
          name: `${data[0].nombre} ${data[0].apellido}`,
          email: data[0].email,
          role: data[0].role,
        };
        // send response back to client
        res.status(200).json({ auth: true, token: token, user_info: userInfo });
      }
    });
  },

  /**
     * Get user profile
     */
    getProfile: function (req, res) {
      var user = userService.findById(req.auth.id, function (err, data) {
      if (err) {
        res.status(200).json({ error: true, message: 'Error inesperado. Intentelo más tarde!' });
      } else if (!data) {
        res.status(200).json({ error: true, message: 'El usuario no fue encontrado!' });
      } else {
        res.status(200).json({ success: true, user: data[0] });
      }
    });
  },
  
}

// export this module
module.exports = AuthController;
