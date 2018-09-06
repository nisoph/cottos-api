/**
 * This module stores all the configurations data.
 * These configuration can be changed according to your choice
 */
module.exports = {
  port: process.env.API_PORT, // server port
  secret: process.env.API_JWT_SECRET, // jwt secret
  tokenExpireIn: process.env.API_JWT_TOKEN_EXPIRATION_TIME, // 24 hours
  SENDGRID_API_KEY: process.env.EMAIL_SENDGRID_API_KEY,
};
