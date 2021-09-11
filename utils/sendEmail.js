const nodemailer = require("nodemailer");

const sendEmail = async (htmlToSend, mail) => {
  
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });

  

  const mailOptions = {
    from: "upgradepets@gmail.com",
    to: mail,
    subject: "Hola chicos😄🥰",
    html: htmlToSend,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    } else {
      res.json("funciono!!!!!!!");
    }
  });
};

module.exports = { sendEmail };
