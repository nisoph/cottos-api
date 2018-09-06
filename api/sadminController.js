/**
 * This module contains all the functions to handle requests such as login, register
 * and requests related to user profile.
 */
const md5 = require('md5');
var sadminService = require('../services/sadminService'); // get super admin controller
/**
 * Define module
 */
const SAdminController = {

  /**
     * Get list of cotos
     */
    getCotos: function (req, res) {
      const cotos = sadminService.getCotosList(function (err, data) {
      if (err) {
        res.status(200).json({ error: true, message: 'Error inesperado. Intentelo más tarde!' });
      } else if (!data) {
        res.status(200).json({ error: true, message: 'No se encontraron Cotos registrados!' });
      } else {
        res.status(200).json({ success: true, cotos: data });
      }
    });
  },

  /**
     * Add new coto
     */
  addCoto: function (req, res) {
    const cotoInfo = {
      nombre: req.body.nombreCoto || '',
      direccion: req.body.direccionCoto || '',
      numero_ext: req.body.numeroExtCoto || '',
      colonia: req.body.coloniaCoto || '',
      coto_img: req.body.imgCoto || '',
      estado: req.body.estadoCoto || '',
      ciudad: req.body.ciudadCoto || '',
      cp: req.body.cpCoto || '',
      tel_contacto: req.body.telContactoCoto || '',
      tel_emergencia: req.body.telEmergenciaCoto || '',
    };

    const userAdminInfo = {
      id_coto: '',
      nombreCoto: req.body.nombreCoto || '',
      nombre: req.body.nombreAdminCoto || '',
      apellido: req.body.apellidoAdminCoto || '',
      email: req.body.adminCotoEmail || '',
      contrasenaMD5: md5('mikonddify') || '',
      contrasena: 'mikonddify' || '',
    };

    sadminService.addCoto(cotoInfo, function (err, data) {
      if (err) {
        res.status(200).json({ error: true, message: 'Error inesperado. Intentelo más tarde!' });
      } else if (!data) {
        res.status(200).json({ error: true, message: 'No se pudo crear el nuevo coto!' });
      } else {
        userAdminInfo.id_coto = data.insertId;
        sadminService.addUserAdminCoto(userAdminInfo, function (err, data) {
          if (err) {
            res.status(200).json({ error: true, message: 'Error inesperado. Intentelo más tarde!' });
          } else if (!data) {
            res.status(200).json({ error: true, message: 'No se pudo crear el nuevo usuario!' });
          } else {
            res.status(200).json({ success: true, user: data });
          }
        });
      }
    });
  },
}

// export this module
module.exports = SAdminController;
