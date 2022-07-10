const nodemailer = require("nodemailer");

const sendEmail = async (mailOptions) =>{
    var transport = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS
        }
      });
    
      const message = {
        from: mailOptions.from,
        to: mailOptions.to,
        subject: mailOptions.subject,
        text: mailOptions.text,
        html: mailOptions.html
      }

      await transport.sendMail(message)
    
}

module.exports = sendEmail
