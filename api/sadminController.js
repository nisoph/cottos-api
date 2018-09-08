/**
 * This module contains all the functions to handle requests such as login, register
 * and requests related to user profile.
 */
const md5 = require('md5');
const Busboy = require('busboy');
const sadminService = require('../services/sadminService'); // get super admin controller
const s3Service = require('../services/aws-s3/s3-service'); // get super admin controller

/**
 * Define module
 */
const SAdminController = {

  /**
   * Get list of cotos
   */
  getCotos: function (req, res) {
    sadminService.getCotosList(function (err, data) {
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
   * Get a coto by id
   */
  getCoto: function (req, res) {
    sadminService.getCotoById(req.params.cotoId, function (err, data) {
      if (err) {
        res.status(200).json({ error: true, message: 'Error inesperado. Intentelo más tarde!' });
      } else if (!data) {
        res.status(200).json({ error: true, message: 'No se encontró el Coto!' });
      } else {
        res.status(200).json({ success: true, coto: data });
      }
    });
  },

  /**
   * Add new coto
   */
  addCoto: function (req, res) {
    const busboy = new Busboy({ headers: req.headers });

    const cotoInfo = {
      nombre: req.body.nombreCoto || '',
      direccion: req.body.direccionCoto || '',
      numero_ext: req.body.numeroExtCoto || '',
      colonia: req.body.coloniaCoto || '',
      estado: req.body.estadoCoto || '',
      ciudad: req.body.ciudadCoto || '',
      cp: req.body.cpCoto || '',
      tel_contacto: req.body.telContactoCoto || '',
      tel_emergencia: req.body.telEmergenciaCoto || '',
      coto_img: req.files.imgCoto || '',
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

    const s3CotoDetails = {
      file: cotoInfo.coto_img,
      idCoto: '',
      nombreCoto: req.body.nombreCoto,
    };

    sadminService.addCoto(cotoInfo, function (err, data) {
      if (err) {
        res.status(200).json({ error: true, message: 'Error inesperado. Intentelo más tarde!' });
      } else if (!data) {
        res.status(200).json({ error: true, message: 'No se pudo crear el nuevo coto!' });
      } else {
        // Save logo to S3
        s3CotoDetails.idCoto = data.insertId;
        s3Service.addS3CotoLogo(s3CotoDetails);

        // Grant admin access to the Coto created
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
