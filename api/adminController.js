/**
 * This module contains all the functions to handle Administrators requests
 */
const md5 = require('md5');
const Busboy = require('busboy');
const adminService = require('../services/adminService'); // get admin service

/**
 * Define module
 */
const AdminController = {

  /**
   * Get a coto by id
   */
  getCotoInfo: function (req, res) {
    adminService.getCotoByUserId(req.auth.id, function (err, data) {
      if (err) {
        res.status(200).json({ error: true, message: 'Error inesperado. Intentelo más tarde!' });
      } else if (!data) {
        res.status(200).json({ error: true, message: 'El coto no fue encontrado!' });
      } else {
        res.status(200).json({ success: true, coto: data[0] });
      }
    });
  },

  getCotoProperties: function (req, res) {
    adminService.getCotoProperties(req.auth.id, function (err, data) {
      if (err) {
        res.status(200).json({ error: true, message: 'Error inesperado. Intentelo más tarde!' });
      } else if (!data) {
        res.status(200).json({ error: true, message: 'El coto no fue encontrado!' });
      } else {
        res.status(200).json({ success: true, properties: data });
      }
    });
  },

  /**
   * Add new coto
   */
  addProperty: function (req, res) {
    const busboy = new Busboy({ headers: req.headers });

    const userResidentInfo = {
      nombre: req.body.nombrePropietario || '',
      apellido: req.body.apellidoPropietario || '',
      email: req.body.propietarioEmail || '',
      contrasenaMD5: md5('mikonddify') || '',
      contrasena: 'mikonddify' || '',
    };

    const propertyInfo = {
      id_coto: parseInt(req.body.idCoto),
      id_propietario: '',
      calle: req.body.callePropCoto || '',
      numero_int: req.body.numeroPropCoto || '',
      terreno_mt2: req.body.terrenoPropMts || '',
      construccion_mt2: req.body.construccionPropMts || '',
    };

    adminService.addUserResidentCoto(userResidentInfo, function (err, data) {
      if (err) {
        res.status(200).json({ error: true, message: 'Error inesperado. Intentelo más tarde!' });
      } else if (!data) {
        res.status(200).json({ error: true, message: 'No se pudo crear el nuevo propietario!' });
      } else {
        // add new property for the resident just created
        propertyInfo.id_propietario = data.insertId;
        adminService.addPropertyToCoto(propertyInfo, function (err, data) {
          if (err) {
            res.status(200).json({ error: true, message: 'Error inesperado. Intentelo más tarde!' });
          } else if (!data) {
            res.status(200).json({ error: true, message: 'No se pudo crear la nueva propiedad!' });
          } else {
            res.status(200).json({ success: true, property: data });
          }
        });
      }
    });
  },
}

// export this module
module.exports = AdminController;
