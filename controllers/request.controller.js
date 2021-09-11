const Request = require("../models/Request.model");
const nodemailer = require("nodemailer");
const { sendEmail } = require('../utils/sendEmail');
const hbs = require("handlebars");
const fs = require("fs");
const path = require("path");
const templateUser = fs.readFileSync(path.join(__dirname, "../utils/templates/requests/requests-user.hbs"), "utf8");
const templateShelter = fs.readFileSync(path.join(__dirname, "../utils/templates/requests/requests-shelter.hbs"), "utf8");
const User = require("../models/User.model");
const Shelter = require("../models/Shelter.model");
const Pet = require("../models/Pet.model");


const getId = async(req, res, next) => {
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

const deleteRequest = async(req, res, next) => {
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

const postRequest = async(req, res, next) => {
    const { petId, userId, shelterId, message } = req.body;

    const user = await User.findById(userId);
    const shelter = await Shelter.findById(shelterId);
    const pet = await Pet.findById(petId);



    try {
        const newRequest = new Request({
            petId,
            userId,
            shelterId,
            message
        });

        const createdRequest = await newRequest.save();

        if (shelter) {
            const findShelter = await Shelter.findById(shelter._id)
            findShelter.requests.push(createdRequest._id);
            await Shelter.findByIdAndUpdate(shelter._id, findShelter, { new: true });
        }

        if (user) {
            const findUser = await User.findById(user._id)
            findUser.requests.push(createdRequest._id);
            await User.findByIdAndUpdate(user._id, findUser, { new: true });
        }

        if (pet) {
            const findPet = await Pet.findById(pet._id)
            findPet.requests.push(createdRequest._id);
            await Pet.findByIdAndUpdate(pet._id, findPet, { new: true });
        }
        const template = hbs.compile(templateUser);
        const htmlToUser = template({ user: user, pet: pet, shelter: shelter }, { allowedProtoMethods: { trim: true } });

        const template2 = hbs.compile(templateShelter);
        const htmlToShelter = template2({ user: user, pet: pet, shelter: shelter }, { allowedProtoMethods: { trim: true } });

        sendEmail(htmlToUser, user.email, `Tu solicitud por ${pet.name} fue enviada con éxito! 🐾`);
        sendEmail(htmlToShelter, shelter.email, `Has recibido una nueva solicitud por ${pet.name}!`);

        return res.redirect(`/request/${createdRequest._id}`);
    } catch (error) {
        return next(error);
    }
};

const requestByUserId = async(req, res, next) => {
    const { id } = req.params;
    try {
        const requestUserId = await Request.find({ userId: id });

        return res.json(requestUserId);
    } catch (error) {
        return next(error);
    }
};

const requestByShelterId = async(req, res, next) => {
    const { id } = req.params;
    try {
        const requestUserId = await Request.find({ shelterId: id });

        return res.json(requestUserId);
    } catch (error) {
        return next(error);
    }
};

const requestByPetId = async(req, res, next) => {
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