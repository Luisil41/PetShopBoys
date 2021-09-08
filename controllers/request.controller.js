const Request = require('../models/Request.model');

const getId = async (req, res, next) => {
    const { id } = req.params;
    try {
        const request = await Request.findById(id).populate('petId')
            .populate('userId')
            .populate('shelterId');
        return res.json(request);

    } catch (error) {
        return next(error);
    }
}

const deleteRequest = async (req, res, next) => {
    const { id } = req.params;
    try {
        const deletedRequest = await Request.findByIdAndDelete(id);

        if (!deletedRequest) {
            const error = new Error('Petición no encontrada.');
            return next.error(error)
        } else {
            return res.redirect('/')
        }

    } catch (error) {
        return next(error);
    }
}

const postRequest = async (req, res, next) => {
    const { petId, userId, shelterId } = req.body;
    console.log(petId, userId, shelterId);

    try {
        const newRequest = new Request({
            petId, userId, shelterId
        });

        const createdRequest = await newRequest.save();

        return res.redirect(`/request/${createdRequest._id}`);

    } catch (error) {
        return next(error);
    }
}

const requestByUserId = async (req, res, next) => {
    const { id } = req.params;
    try {
        const requestUserId = await Request.find({userId: id});

        return res.json(requestUserId);
    } catch (error) {
        return next(error);
    }
}

const requestByShelterId = async (req, res, next) => {
    const { id } = req.params;
    try {
        const requestUserId = await Request.find({shelterId: id});

        return res.json(requestUserId);
    } catch (error) {
        return next(error);
    }
}

const requestByPetId = async (req, res, next) => {
    const { id } = req.params;
    try {
        const requestUserId = await Request.find({petId: id});

        return res.json(requestUserId);
    } catch (error) {
        return next(error);
    }
}

module.exports = {
    getId,
    deleteRequest,
    postRequest,
    requestByUserId,
    requestByShelterId,
    requestByPetId
}