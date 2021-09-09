const User = require("../models/User.model");
const PDF = require('pdfkit');
const fs = require('fs');

const getById = async(req, res, next) => {
    const { id } = req.params;

    try {
        const user = await User.findById(id);
        return res.json(user);
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


        const updateUser = await User.findByIdAndUpdate(id, update, { new: true });
        return res.redirect(`/user/${updateUser._id}`);

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
            return res.redirect('/');
        }


    } catch (error) {
        return next(error);
    }
};

const getValidateForm = async(req, res, next) => {
    const user = {
        fullName: 'Pepe Pepón',
        birthdate: '1999-04-07',
        email: 'pepe@mail.com',
        password: '1234',
        avatar: '',
        phone: '8483587372',
        province: 'Malaga',
        interest: 'adoption',
        verified: false,
    };

    try {
        const doc = new PDF({bufferPage: true});

        const filename = 'prueba.pdf'

        const stream = res.writeHead(200, {
            'Content-Type': 'application/pdf',
            'Content-disposition': `attachment;filename=${filename}`
        })

        doc.on('data', (data) => {stream.write(data)});
        doc.on('end', () => {stream.end()});

        const config = {
            align: 'justify'
        }
        
        doc.text(`Nombre completo: ${user.fullName}`, config)
            .text(`Fecha de Nacimiento: ${user.birthdate}`, config)
            .text(`Correo electrónico: ${user.email}`, config)
            .text(`Número de contacto: ${user.phone}`, config);
        doc.end();
    } catch (error) {
        return next(error);
    }
};

module.exports = { getById, putById, deleteById, getValidateForm };