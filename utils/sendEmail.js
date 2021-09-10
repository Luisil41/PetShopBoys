const nodemailer = require("nodemailer");
const User = require("../models/User.model");
const Pet = require("../models/Pet.model");
const Shelter = require("../models/Shelter.model");
const hbs = require('nodemailer-express-handlebars');

const sendEmail = async(petId, shelterId, userId) => {
  const pet = await Pet.findById(petId);
  const shelter = await Shelter.findById(shelterId);
  const user = await User.findById(userId);

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  transporter.use('compile', hbs({ 
    viewEngine: 'express-handlebars',
    viewPath: '../views/'
   }))


  const mailOptions = {
    from: "upgradepets@gmail.com",
    to: "augustoperessutti@gmail.com",
    subject: "Hola chicos😄🥰",
    text: "que bien os veo",
    template: "email"
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return error;
    } else {
      res.json("funciono!!!!!!!");
    }
  });
};


module.exports = { sendEmail };