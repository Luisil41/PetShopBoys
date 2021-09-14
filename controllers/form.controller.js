const User = require("../models/User.model");
const Form = require("../models/Form.model");
const PDF = require('pdfkit');

const formById = async(req, res, next) => {
    const { id } = req.params;

    try {
        const user = await User.findById(id);
        const form = await Form.find({userId: user._id});

        return res.status(200).json(pets);
    } catch (error) {
        return next(error);
    }
}

const formDownload = async(req, res, next) => {
    const { id } = req.params;

    try {
        const doc = new PDF({bufferPage: true});
        const form = await Form.findById(id);

        const filename = `Formulario.pdf`

        const stream = res.writeHead(200, {
            'Content-Type': 'application/pdf',
            'Content-disposition': `attachment;filename=${filename}`
        })

        doc.on('data', (data) => {stream.write(data)});
        doc.on('end', () => {stream.end()});

        doc
            .fontSize(40)
            .text("PETShop Boys", 50, 45)
            .fontSize(10)
            .text("Formulario de adopción", 200, 50, { align: "right" })
            .text("Texto de prueba", 200, 65, { align: "right" })
            .text("Seguimos probando un poco", 200, 80, { align: "right" })
            .moveDown();

        doc
            .fontSize(20)
            .text("INFORMACIÓN DEL DEMANDANTE:");
    
        generateHr(doc, 185);
    
        doc
            .fontSize(10)
            .text("Nombre completo:", { align: 'left', continued: true })
            .text(form.d1, { align: 'right', continued: false})
            .text("DNI / NIF / NIE:", { align: 'left', continued: true })
            .text(form.d2, { align: 'right', continued: false})
            .text("Domicilio:", { align: 'left', continued: true })
            .text(form.d3, { align: 'right', continued: false})
            .text("Ubicación:", { align: 'left', continued: true })
            .text(`${form.d4}, ${form.d5}, ${form.d6}`, { align: 'right', continued: false})
            .text("Fecha de nacimiento:", { align: 'left', continued: true })
            .text(formatDate(form.d7), { align: 'right', continued: false})
            .text("Estado Civil:", { align: 'left', continued: true })
            .text(form.d8, { align: 'right', continued: false})
            .text("Profesión / Estudios:", { align: 'left', continued: true })
            .text(form.d9, { align: 'right', continued: false})
            .text("Número de contacto:", { align: 'left', continued: true })
            .text(form.d10, { align: 'right', continued: false})
            .text("Correo electrónico:", { align: 'left', continued: true })
            .text(form.d11, { align: 'right', continued: false})
            .moveDown();
    
        doc
            .fontSize(20)
            .text("VIVIENDA:");
    
        generateHr(doc, 185);

        doc
            .fontSize(10)
            .text(
                "PetSHOP Boys footer de ejemplo a ver como funciona 2021.",
                50,
                780,
                { align: "center", width: 500 }
            );

        doc.end();
    } catch (error) {
        return next(error);
    }

}

const formCreate = async(req, res, next) => {
    const { d1, d2, d3, d4, d5, d6, d7, d8, d9, d10, d11, h1, h2, h3, h4, h5, h6, h7, h8, f1, f2, f3, f4, f5, o1, o2, o3, o4, g1, g2, g3, g4, a1, a2, a3, a4, a5, p1, p2, m1 } = req.body;

    try {
        const newForm = new Form({
            d1, d2, d3, d4, d5, d6, d7, d8, d9, d10, d11,
            h1, h2, h3, h4, h5, h6, h7, h8,
            f1, f2, f3, f4, f5,
            o1, o2, o3, o4,
            g1, g2, g3, g4,
            a1, a2, a3, a4, a5,
            p1, p2,
            m1
        });

        const createdForm = await newForm.save();

        return res.redirect(`/user/form/${createdForm._id}`);
    } catch (error) {
        return next(error);
    }

}

const formEdit = async(req, res, next) => {
    // const { id } = req.params;

    try {
        // const { type, name, age, sex, breed, size, isVaccinated, isSterilized, isDewormed, microchip, province, shelter, status } = req.body;
        // const update = {};

        // if (type) update.type = type;
        // if (name) update.name = name;
        // if (age) update.age = age;
        // if (sex) update.sex = sex;
        // if (breed) update.breed = breed;
        // if (size) update.size = size;
        // if (isVaccinated) update.isVaccinated = isVaccinated;
        // if (isSterilized) update.isSterilized = isSterilized;
        // if (isDewormed) update.isDewormed = isDewormed;
        // if (microchip) update.microchip = microchip;
        // if (province) update.province = province;
        // if (shelter) update.shelter = shelter;
        // if (status) update.status = status;

        // const updatedPet = await Pet.findByIdAndUpdate(id, update, { new: true });

        // return res.redirect(`/pet/${updatedPet._id}`);

    } catch (error) {
        return next(error);
    }
}

const formDelete = async(req, res, next) => {
    // const { id } = req.params;
    try {

        // const deletedPet = await Pet.findByIdAndDelete(id);
        // if (!deletedPet) {
        //     const error = new Error('Mascota no encontrada');
        //     return next(error);
        // } else {
        //     return res.redirect(`/pet/all`);
        // }
    } catch (error) {
        return next(error);
    }
}

function generateHr(doc, y) {
    doc
      .strokeColor("#aaaaaa")
      .lineWidth(1)
      .moveTo(50, y)
      .lineTo(550, y)
      .stroke();
}

function formatDate(date) {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
  
    return year + "/" + month + "/" + day;
}

module.exports = {
    formById,
    formDownload,
    formCreate,
    formEdit,
    formDelete,
}