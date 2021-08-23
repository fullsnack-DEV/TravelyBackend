const Nodemailer = require("nodemailer");

const sendEmail = (options) => {
  const transporter = Nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: "Pratik Patre<hello@pratik.io>",
    to: options.email,
    subject: options.subject,
    text: options.message,
  };
  //Sending mail
  transporter.sendMail(mailOptions, function (err, info) {
    if (err) {
      console.log(err);
    } else {
      console.log(info);
    }
  });
};

module.exports = sendEmail;
