const nodemailer = require("nodemailer");
const User = require("../models/User.model");
const Pet = require("../models/Pet.model");
const Shelter = require("../models/Shelter.model");

const sendEmail = async(petId, shelterId, userId) => {
  const pet = await Pet.findById(petId);
  const shelter = await Shelter.findById(shelterId);
  const user = await User.findById(userId);

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "upgradepets@gmail.com",
      pass: "upgrade12345",
    },
  });

  const mailOptions = {
    from: "upgradepets@gmail.com",
    to: "augustoperessutti@gmail.com",
    subject: "Soy un correo de prueba si o no",
    text: "hola buenas tardes",
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.json("no funciono");
    } else {
      res.json("funciono!!!!!!!");
    }
  });
};


module.exports = { sendEmail };