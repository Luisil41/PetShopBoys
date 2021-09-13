const User = require("../models/User.model");
const Pet = require('../models/Pet.model');
const Shelter = require('../models/Shelter.model');
const { sendEmail } = require('../utils/sendEmail');
const hbs = require("handlebars");
const fs = require("fs");
const path = require("path");
const templateNewPet = fs.readFileSync(path.join(__dirname, "../utils/templates/pets/newpet.hbs"), "utf8");
const templateLostPet = fs.readFileSync(path.join(__dirname, "../utils/templates/pets/lostpet.hbs"), "utf8");

const petsGet = async(req, res, next) => {
    try {
        const pets = await Pet.find();

        return res.status(200).json(pets);
    } catch (error) {
        return next(error);
    }
}

const petDetailGet = async(req, res, next) => {
    const { id } = req.params;

    try {
        const pet = await Pet.findById(id).populate('shelter');
        return res.status(200).json(pet);
    } catch (error) {
        return next(error);
    }

}

const petCreatePost = async(req, res, next) => {
    const { type, name, avatar, age, sex, breed, size, isVaccinated, isSterilized, isDewormed, microchip, province, shelter, status } = req.body;

    try {

        const newPet = new Pet({
            type,
            name,
            avatar: req.imageUrl ? req.imageUrl : '',
            age,
            sex,
            breed,
            size,
            isVaccinated,
            isSterilized,
            isDewormed,
            microchip,
            province,
            shelter,
            status
        });

        const createdPet = await newPet.save();

        if (shelter) {
            const findShelter = await Shelter.findById(newPet.shelter).populate('pets');
            findShelter.pets.push(createdPet._id);
            await Shelter.findByIdAndUpdate(newPet.shelter, findShelter, { new: true });
        }

        const template = hbs.compile(templateNewPet);
        const template2 = hbs.compile(templateLostPet);

        const user = await User.find({ province: createdPet.province });
        if (createdPet.status == 'lost') {
            user.forEach((user) => {
                const htmlToUser = template2({ user: user, pet: createdPet });
                sendEmail(htmlToUser, user.email, 'Se ha perdido mascota en tu zona! ☹️');
            });
        } else {
            user.forEach((user) => {
                const htmlToUser = template({ user: user, pet: createdPet });
                sendEmail(htmlToUser, user.email, 'Hay nueva mascota en tu zona! 🤩');
            });
        }

        return res.status(201).json('Mascota creada correctamente');
    } catch (error) {
        return next(error);
    }

}

const petEditPut = async(req, res, next) => {
    const { id } = req.params;

    try {
        const { type, name, age, sex, breed, size, isVaccinated, isSterilized, isDewormed, microchip, province, shelter, status } = req.body;
        const update = {};

        if (type) update.type = type;
        if (name) update.name = name;
        if (age) update.age = age;
        if (sex) update.sex = sex;
        if (breed) update.breed = breed;
        if (size) update.size = size;
        if (isVaccinated) update.isVaccinated = isVaccinated;
        if (isSterilized) update.isSterilized = isSterilized;
        if (isDewormed) update.isDewormed = isDewormed;
        if (microchip) update.microchip = microchip;
        if (province) update.province = province;
        if (shelter) update.shelter = shelter;
        if (status) update.status = status;

        await Pet.findByIdAndUpdate(id, update, { new: true });

        return res.status(200).json('Mascota editada correctamente');

    } catch (error) {
        return next(error);
    }
}

const petDelete = async(req, res, next) => {
    const { id } = req.params;
    try {

        const deletedPet = await Pet.findByIdAndDelete(id);
        if (!deletedPet) {
            const error = new Error('Mascota no encontrada');
            return next(error);
        } else {
            return res.status(200).json('Mascota borrada correctamente');
        }
    } catch (error) {
        return next(error);
    }
}

const filteredPet = async(req, res, next) => {
    try {
        const { type, age, sex, breed, size, isVaccinated, isSterilized, isDewormed, microchip, province, status } = req.query;
        const request = {};

        if (type) request.type = type; // revisar si es necesario { $regex: new RegExp("^" + color.toLowerCase(), "i") };
        if (age) request.age = age;
        if (sex) request.sex = sex;
        if (breed) request.breed = breed;
        if (size) request.size = size;
        if (isVaccinated) request.isVaccinated = isVaccinated;
        if (isSterilized) request.isSterilized = isSterilized;
        if (isDewormed) request.isDewormed = isDewormed;
        if (microchip) request.microchip = microchip;
        if (province) request.province = province;
        if (status) request.status = status;

        const filtered = await Pet.find(request);

        return res.status(200).json(filtered);

    } catch (error) {
        return next(error);
    }
}

module.exports = {
    petsGet,
    petDetailGet,
    petCreatePost,
    petEditPut,
    petDelete,
    filteredPet,
}