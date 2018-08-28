/**
 * This module contains all the functions to handle requests such as login, register 
 * and requests related to user profile.
 */

var sadminController = require('../services/sadminController'); // get super admin controller

/**
 * Define module
 */
var SAdminController = {

    /**
     * Get list of cotos
     */
    getCotos: function (req, res) {
        var cotos = sadminController.getCotosList(function (err, data) {
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
        var nombreCoto = req.body.nombreCoto || '';
        var direccionCoto = req.body.direccionCoto || '';
        var numeroExtCoto = req.body.numeroExtCoto || '';
        var coloniaCoto = req.body.coloniaCoto || '';
        var estadoCoto = req.body.estadoCoto || '';
        var ciudadCoto = req.body.ciudadCoto || '';
        var cpCoto = req.body.cpCoto || '';
        var telContactoCoto = req.body.telContactoCoto || '';
        var telEmergenciaCoto = req.body.telEmergenciaCoto || '';
        var imgCoto = req.body.imcgCoto || '';

        var newCoto = sadminController.addCoto(req.body, function (err, data) {
            if (err) {
                res.status(200).json({ error: true, message: 'Error inesperado. Intentelo más tarde!' });
            } else if (!data) {
                res.status(200).json({ error: true, message: 'No se pudo creat el nuevo coto!' });
            } else {
                res.status(200).json({ success: true, cotos: data });
            }
        });
    }
}

// export this module
module.exports = SAdminController;