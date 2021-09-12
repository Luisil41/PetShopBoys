const nodemailer = require("nodemailer");

const sendEmail = async (htmlToSend, mail, title) => {
  
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });

  const mailOptions = {
    from: "UpgradePETS <upgradepets@gmail.com>",
    to: mail,
    subject: title,
    html: htmlToSend,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log('Funciona!');
    }
  });
};

module.exports = { sendEmail };
