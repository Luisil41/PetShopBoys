const Pet = require('../models/Pet.model');

const petsGet = async(req, res, next) => {
    try {
        const pets = await Pet.find();

        return ///
    } catch (error) {
        return next(error);
    }
}

const pet