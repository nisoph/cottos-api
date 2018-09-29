/**
 * SendGrid Setup and Options
 */

const config = require('../../config/env');

const options = {
  method: 'POST',
  hostname: 'api.sendgrid.com',
  port: null,
  path: '/v3/mail/send',
  headers: {
    authorization: `Bearer ${config.SENDGRID_API_KEY}`,
    'content-type': 'application/json',
  },
};

const from = {
  email: 'hola@konddify.net',
  name: 'Hola Konddify',
};

const replyTo = {
  email: 'hola@konddify.net',
  name: 'Hola Konddify',
};

const welcomeAdminTemplateId = 'd-6824a305eacd4743be8f4a141db63411';
const welcomeResidentTemplateId = 'd-6824a305eacd4743be8f4a141db63411';

module.exports = {
  options,
  from,
  replyTo,
  welcomeAdminTemplateId,
  welcomeResidentTemplateId,
};
