/**
 * This module contains all the functions to handle Administrators requests
 */
// const Busboy = require('busboy');
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

  /**
   * Add new coto
   */
  addProperty: function (req, res) {
    /* const busboy = new Busboy({ headers: req.headers });

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

    adminService.addCoto(cotoInfo, function (err, data) {
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
        adminService.addUserAdminCoto(userAdminInfo, function (err, data) {
          if (err) {
            res.status(200).json({ error: true, message: 'Error inesperado. Intentelo más tarde!' });
          } else if (!data) {
            res.status(200).json({ error: true, message: 'No se pudo crear el nuevo usuario!' });
          } else {
            res.status(200).json({ success: true, user: data });
          }
        });
      }
    }); */
  },
}

// export this module
module.exports = AdminController;
