const Pet = require('../models/Pet.model');
const Shelter = require('../models/Shelter.model');

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
        return res.json(pet);
    } catch (error) {
        return next(error);
    }

}

const petCreatePost = async(req, res, next) => {
    const { type, name, age, sex, breed, size, isVaccinated, isSterilized, isDewormed, microchip, province, shelter, status } = req.body;

    try {

        const newPet = new Pet({
            type,
            name,
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

        return res.redirect(`/pet/${createdPet._id}`);
    }catch (error) {
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

        const updatedPet = await Pet.findByIdAndUpdate(id, update, { new: true });

        return res.redirect(`/pet/${updatedPet.id}`);

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
            return res.redirect(`/pet/all`); // Revisar redirect más adelante
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

        return res.json(filtered);

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