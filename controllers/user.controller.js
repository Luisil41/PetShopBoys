const User = require("../models/User.model");

const getById = async(req, res, next) => {
    const { id } = req.params;

    try {
        const user = await User.findById(id);
        return res.status(200).json(user);
    } catch (error) {
        return next(error);
    }
};

const putById = async(req, res, next) => {
    const { id } = req.params;
    const { fullName, birthdate, email, password, avatar, phone, province, interest } = req.body

    try {

        const update = {};
        if (fullName) update.fullName = fullName;
        if (birthdate) update.birthdate = birthdate;
        if (email) update.email = email;
        //if(password) update.password = password;
        //if(avatar) update.avatar = avatar;
        if (phone) update.phone = phone;
        if (province) update.province = province;
        if (interest) update.interest = interest;


        await User.findByIdAndUpdate(id, update, { new: true });
        return res.status(200).json('Perfil editado correctamente');

    } catch (error) {
        return next(error)
    }


}

const deleteById = async(req, res, next) => {
    const { id } = req.params;

    try {
        const deleteUser = await User.findByIdAndDelete(id);
        if (!deleteUser) {
            const error = new Error('Usuario no encontrado');
            return next(error);
        } else {
            return res.status(200).json('Perfil borrado correctamente');
        }


    } catch (error) {
        return next(error);
    }
};
module.exports = { getById, putById, deleteById };