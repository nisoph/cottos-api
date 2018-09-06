const http = require('https');
const mailConfig = require('./mail-config');

const mailService = {

  sendAdminWelcomeEmail(emailDetails) {
    const req = http.request(mailConfig.options, function (res) {
      const chunks = [];
      res.on('data', function (chunk) {
        chunks.push(chunk);
      });

      res.on('end', function () {
        const body = Buffer.concat(chunks);
        console.log(body.toString());
      });
    });

    req.write(JSON.stringify({
      personalizations:
                [{
                  to:
                        [{ email: emailDetails.email, name: `${emailDetails.nombre} ${emailDetails.apellido}` }],
                  dynamic_template_data:
                    {
                      admin_user_name: `${emailDetails.nombre} ${emailDetails.apellido}`,
                      coto_name: emailDetails.nombreCoto,
                      admin_pwd: emailDetails.contrasena,
                      admin_email: emailDetails.email,
                    },
                }],
      from: { email: mailConfig.from.email, name: mailConfig.from.name },
      reply_to: { email: mailConfig.replyTo.email, name: mailConfig.replyTo.name },
      template_id: mailConfig.welcomeTemplateId,
    }));
    req.end();
  },

};

module.exports = mailService;
