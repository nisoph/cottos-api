const ROLE_SADMIN = 'SADMIN';
const ROLE_ADMIN = 'ADMIN';
const ROLE_RESIDENT = 'RESIDENT';
const ROLE_SECURITY = 'SECURITY';

/**
 * This module defines all the api routes
 */
var cors = require('cors');
var express = require('express');
var authController = require('./authController');
var auth = require('../interceptors/auth');

/**
 * Define router
 */
var router = express.Router();
router.use(cors());

/**
 * Define api routes
 */
router.post('/api/v1/auth/login', authController.login);
router.get('/api/v1/profile', auth([ROLE_SADMIN, ROLE_ADMIN, ROLE_RESIDENT, ROLE_SECURITY]), authController.getProfile);

module.exports = router;