const ROLE_SADMIN = 'SADMIN';
const ROLE_ADMIN = 'ADMIN';
const ROLE_RESIDENT = 'RESIDENT';
const ROLE_SECURITY = 'SECURITY';

/**
 * This module defines all the api routes
 */
const cors = require('cors');
const express = require('express');
const authController = require('./authController');
const sadminController = require('./sadminController');
const auth = require('../interceptors/auth');

/**
 * Define router
 */
const router = express.Router();
router.use(cors());

/**
 * Define api routes
 */
router.post('/api/v1/auth/login', authController.login);
router.get('/api/v1/profile', auth([ROLE_SADMIN, ROLE_ADMIN, ROLE_RESIDENT, ROLE_SECURITY]), authController.getProfile);
router.get('/api/v1/sadmin/cotos', auth([ROLE_SADMIN]), sadminController.getCotos);
router.post('/api/v1/sadmin/coto', auth([ROLE_SADMIN]), sadminController.addCoto);

module.exports = router;
