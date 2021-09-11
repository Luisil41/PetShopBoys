const Request = require("../models/Request.model");
const nodemailer = require("nodemailer");
const { sendEmail } = require('../utils/sendEmail');
const hbs = require("handlebars");
const fs = require("fs");
const path = require("path");
const emailTemplateSource = fs.readFileSync(
  path.join(__dirname, "../utils/template.hbs"),
  "utf8"
);
const User = require("../models/User.model");
const Shelter = require("../models/Shelter.model");
const Pet = require("../models/Pet.model");


const getId = async (req, res, next) => {
  const { id } = req.params;
  try {
    const request = await Request.findById(id)
      .populate("petId")
      .populate("userId")
      .populate("shelterId");
    return res.json(request);
  } catch (error) {
    return next(error);
  }
};

const deleteRequest = async (req, res, next) => {
  const { id } = req.params;
  try {
    const deletedRequest = await Request.findByIdAndDelete(id);

    if (!deletedRequest) {
      const error = new Error("Petición no encontrada.");
      return next.error(error);
    } else {
      return res.redirect("/");
    }
  } catch (error) {
    return next(error);
  }
};

const postRequest = async (req, res, next) => {
  const { petId, userId, shelterId } = req.body;
  
  const user = await User.findById(userId);
  const shelter = await Shelter.findById(shelterId);
  const pet = await Pet.findById(petId);


  const template = hbs.compile(emailTemplateSource);
  const htmlToUser = template({ message: `Hola, ${user.fullName}. Estamos revisando tu petición para adoptar/acoger a ${pet.name} del refugio ${shelter.name}. Gracias por tu solidaridad.` });
  const htmlToShelter = template({ message: `Hola, compañeros/as de ${shelter.name}, el usuario ${user.fullName} está interesado en adoptar/acoger a ${pet.name}. Qué emoción!`});

  try {
    const newRequest = new Request({
      petId,
      userId,
      shelterId,
    });

    const createdRequest = await newRequest.save();
    sendEmail(htmlToUser, user.email);
    sendEmail(htmlToShelter, shelter.email);
    return res.redirect(`/request/${createdRequest._id}`);
  } catch (error) {
    return next(error);
  }
};

const requestByUserId = async (req, res, next) => {
  const { id } = req.params;
  try {
    const requestUserId = await Request.find({ userId: id });

    return res.json(requestUserId);
  } catch (error) {
    return next(error);
  }
};

const requestByShelterId = async (req, res, next) => {
  const { id } = req.params;
  try {
    const requestUserId = await Request.find({ shelterId: id });

    return res.json(requestUserId);
  } catch (error) {
    return next(error);
  }
};

const requestByPetId = async (req, res, next) => {
  const { id } = req.params;
  try {
    const requestUserId = await Request.find({ petId: id });

    return res.json(requestUserId);
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  getId,
  deleteRequest,
  postRequest,
  requestByUserId,
  requestByShelterId,
  requestByPetId,
};
