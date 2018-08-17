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
     * Get user profile
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
    }
}

// export this module
module.exports = SAdminController;