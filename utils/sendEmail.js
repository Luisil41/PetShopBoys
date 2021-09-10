const nodemailer = require("nodemailer");
const User = require("../models/User.model");
const Pet = require("../models/Pet.model");
const Shelter = require("../models/Shelter.model");
const path = require('path');

const sendEmail = async(petId, shelterId, userId) => {
  const pet = await Pet.findById(petId);
  const shelter = await Shelter.findById(shelterId);
  const user = await User.findById(userId);

    contentHTML = `<h1>hola</h1>
                  <p>Le informamos que ha sido registrado correctamente en nuestra base de datos<p>`;


  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

//   const direccion = path.join(__dirname, 'views')
//   console.log(direccion);


//   transporter.use('compile', hbs({ 
//     viewEngine: 'express-handlebars',
//     viewPath: '/views/'
//    }))


  const mailOptions = {
    from: "upgradepets@gmail.com",
    to: "augustoperessutti@gmail.com",
    subject: "Hola chicos😄🥰",
    text: "que bien os veo",
    html: contentHTML
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