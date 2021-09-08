const Pet = require('../models/Pet.model');

const petsGet = async(req, res, next) => {
    try {
        const pets = await Pet.find();

        return res.status(200).json(pets);
    } catch (error) {
        return next(error);
    }
}

const petDetailGet = async(req, res, next) => {

}