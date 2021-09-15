const Shelter = require('../models/Shelter.model');

const shelterGet = async(req, res, next) => {
    try {
        const shelter = await Shelter.find();

        return res.status(200).json(shelter);
    } catch (error) {
        return next(error);
    }
}

const shelterById = async(req, res, next) => {
    const { id } = req.params;
    try {
        const shelter = await Shelter.findById(id).populate('pets');
        return res.status(200).json(shelter);

    } catch (error) {
        return next(error);
    }
}

const shelterDeleteById = async(req, res, next) => {
    const { id } = req.params;
    try {
        const deletedShelter = await Shelter.findByIdAndDelete(id);

        if (!deletedShelter) {
            const error = new Error('Protectora no encontrada.');
            return next.error(error)
        } else {
            return res.status(200).json('Protectora borrada correctamente');
        }

    } catch (error) {
        return next(error);
    }
}

const shelterEditPut = async(req, res, next) => {
    try {
        const { id } = req.params;
        const { name, email, address, description, phone, province } = req.body;

        const update = {};
        if (name) update.name = name;
        if (description) update.description = description;
        if (email) update.email = email;
        if (address) update.address = address;
        // if ( req.imageUrl ) update.avatar = req.imageUrl;
        if (phone) update.phone = phone;
        if (province) update.province = province;

        await Shelter.findByIdAndUpdate(id, update, { new: true });

        return res.status(200).json('Protectora editada correctamente');

    } catch (error) {
        return next(error);
    }
}

module.exports = {
    shelterById,
    shelterDeleteById,
    shelterEditPut,
    shelterGet
}