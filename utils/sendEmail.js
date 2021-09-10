const nodemailer = require("nodemailer");
const User = require("../models/User.model");
const Pet = require("../models/Pet.model");
const Shelter = require("../models/Shelter.model");
const hbs = require("nodemailer-express-handlebars");

const sendEmail = async (petId, shelterId, userId) => {
  const pet = await Pet.findById(petId);
  const shelter = await Shelter.findById(shelterId);
  const user = await User.findById(userId);

  // contentHTML =`<h1>hola</h1>
  //               <p>Le informamos que ha sido registrado correctamente en nuestra base de datos<p>`;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });

  transporter.use(
    "compile",
    hbs({
      viewEngine: {
        partialsDir: "./views/",
        defaultLayout: "",
      },
      viewPath: "./views/",
      extName: ".handlebars",
      
    })
  );

    const hola = 'que tal como estan';


  const mailOptions = {
    from: "upgradepets@gmail.com",
    to: "augustoperessutti@gmail.com",
    subject: "Hola chicos😄🥰",
    text: "que bien os veo",
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
