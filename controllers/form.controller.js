const User = require("../models/User.model");
const Form = require("../models/Form.model");
const PDF = require('pdfkit');

const formById = async(req, res, next) => {
    const { id } = req.params;

    try {
        const user = await User.findById(id);
        const form = await Form.find({ userId: user._id });

        return res.status(200).json(form);
    } catch (error) {
        return next(error);
    }
}

const formDownload = async(req, res, next) => {
    const { id } = req.params;

    try {
        const doc = new PDF({ bufferPage: true });
        const form = await Form.findById(id);

        const filename = `Formulario.pdf`

        const stream = res.writeHead(200, {
            'Content-Type': 'application/pdf',
            'Content-disposition': `attachment;filename=${filename}`
        })

        const questionConfig = {
            align: 'left',
            continued: true,
            lineGap: 7
        };
        const answerConfig = {
            align: 'right',
            continued: false,
            lineGap: 7
        };

        const largeConfig = {
            align: 'left',
            continued: false,
            lineGap: 7
        };

        doc.on('data', (data) => { stream.write(data) });
        doc.on('end', () => { stream.end() });

        doc
            .fontSize(40)
            .text("PETShop Boys", 50, 45, { continued: true })
            .fontSize(10)
            .text("Formulario de adopción", { align: "right" })
            .text("Texto de prueba", { align: "right" })
            .text("Seguimos probando un poco", { align: "right" })
            .moveDown();

        doc
            .moveDown()
            .fontSize(20)
            .text("INFORMACIÓN DEL DEMANDANTE:");

        doc
            .fontSize(10)
            .font('Helvetica-Bold').text("Nombre completo:", questionConfig)
            .font('Helvetica').text(form.d1, answerConfig)
            .font('Helvetica-Bold').text("DNI / NIF / NIE:", questionConfig)
            .font('Helvetica').text(form.d2, answerConfig)
            .font('Helvetica-Bold').text("Domicilio:", questionConfig)
            .font('Helvetica').text(form.d3, answerConfig)
            .font('Helvetica-Bold').text("Ubicación:", questionConfig)
            .font('Helvetica').text(`${form.d4}, ${form.d5}, ${form.d6}`, answerConfig)
            .font('Helvetica-Bold').text("Fecha de nacimiento:", questionConfig)
            .font('Helvetica').text(formatDate(form.d7), answerConfig)
            .font('Helvetica-Bold').text("Estado Civil:", questionConfig)
            .font('Helvetica').text(form.d8, answerConfig)
            .font('Helvetica-Bold').text("Profesión / Estudios:", questionConfig)
            .font('Helvetica').text(form.d9, answerConfig)
            .font('Helvetica-Bold').text("Número de contacto:", questionConfig)
            .font('Helvetica').text(form.d10, answerConfig)
            .font('Helvetica-Bold').text("Correo electrónico:", questionConfig)
            .font('Helvetica').text(form.d11, answerConfig)
            .moveDown();

        doc
            .fontSize(20)
            .text("VIVIENDA:");
        
        doc
            .fontSize(10)
            .font('Helvetica-Bold').text("¿Vives en casa o piso?", questionConfig)
            .font('Helvetica').text(form.h1, answerConfig)
            .font('Helvetica-Bold').text("Si es piso, ¿permiten mascotas en el edificio?", questionConfig)
            .font('Helvetica').text(form.h2, answerConfig)
            .font('Helvetica-Bold').text("¿Tu vivienda es propia o alquilada?", questionConfig)
            .font('Helvetica').text(form.h3, answerConfig)
            .font('Helvetica-Bold').text("Si es alquilada, ¿tienes permiso del dueño?", questionConfig)
            .font('Helvetica').text(form.h4, answerConfig)
            .font('Helvetica-Bold').text("¿Es un lugar seguro para una mascota?, ¿tienes rejas o cercas que impidan que se escape?", questionConfig)
            .font('Helvetica').text(form.h5, answerConfig)
            .font('Helvetica-Bold').text("¿Tienes espacio suficiente para una mascota?", questionConfig)
            .font('Helvetica').text(form.h6, answerConfig)
            .font('Helvetica-Bold').text("¿Tiene actualmente otros animales en casa?", questionConfig)
            .font('Helvetica').text(form.h7, answerConfig)
            .font('Helvetica-Bold').text("En caso de que así sea, ¿cuántos son y de qué especie?", largeConfig)
            .font('Helvetica').text(form.h8, largeConfig)
            .moveDown();

        doc
            .fontSize(20)
            .text("FAMILIA:");
        
        doc
            .fontSize(10)
            .font('Helvetica-Bold').text("¿Cuántas personas viven contigo?", questionConfig)
            .font('Helvetica').text(form.f1, answerConfig)
            .font('Helvetica-Bold').text("¿Algún familiar enfermo en casa?", questionConfig)
            .font('Helvetica').text(form.f2, answerConfig)
            .font('Helvetica-Bold').text("¿Hay niños o personas de edad avanzada?", questionConfig)
            .font('Helvetica').text(form.f3, answerConfig)
            .font('Helvetica-Bold').text("¿Todos están de acuerdo en tener una mascota?", questionConfig)
            .font('Helvetica').text(form.f4, answerConfig)
            .font('Helvetica-Bold').text("¿Alguno es alérgico al pelo de mascotas?", questionConfig)
            .font('Helvetica').text(form.f5, answerConfig)
            .moveDown();

        doc
            .fontSize(20)
            .text("OCUPACIONES / TIEMPO LIBRE:");

        doc
            .fontSize(10)
            .font('Helvetica-Bold').text("¿Trabaja actualmente?", questionConfig)
            .font('Helvetica').text(form.o1, answerConfig)
            .font('Helvetica-Bold').text("Horario de trabajo", largeConfig)
            .font('Helvetica').text(form.o2, largeConfig)
            .font('Helvetica-Bold').text("¿Qué suele hacer en las vacaciones de verano?", largeConfig)
            .font('Helvetica').text(form.o3, largeConfig)
            .font('Helvetica-Bold').text("¿Cuánto tiempo pasaría el animal solo en casa?", largeConfig)
            .font('Helvetica').text(form.o4, largeConfig)
            .moveDown();

        doc
            .fontSize(20)
            .text("SOBRE ANIMALES EN GENERAL:");

        doc
            .fontSize(10)
            .font('Helvetica-Bold').text("¿Cuántos años cree que puede vivir una mascota?", questionConfig)
            .font('Helvetica').text(form.g1, answerConfig)
            .font('Helvetica-Bold').text("¿Qué necesidades cree que tiene?", largeConfig)
            .font('Helvetica').text(form.g2, largeConfig)
            .font('Helvetica-Bold').text("¿Quién será el responsable y se hará cargo de cubrir los gastos del adoptado?", largeConfig)
            .font('Helvetica').text(form.g3, largeConfig)
            .font('Helvetica-Bold').text("¿Qué aspecto negativo de los animales domésticos le molesta más? (el gasto que suponen, que hagan ruido, que suelten pelo, tener que sacarle a hacer sus necesidades...)", largeConfig)
            .font('Helvetica').text(form.g4, largeConfig)
            .moveDown();
        
        doc
            .fontSize(20)
            .text("SOBRE LA ADOPCIÓN:");

        doc
            .fontSize(10)
            .font('Helvetica-Bold').text("¿Por qué te decides a adoptar/acoger?", largeConfig)
            .font('Helvetica').text(form.a1, largeConfig)
            .font('Helvetica-Bold').text("¿Qué piensa acerca de adoptar a un animal adulto? Por favor, cite al menos una ventaja y un inconveniente que crea que tiene la adopción de un perro adulto:", largeConfig)
            .font('Helvetica').text(form.a2, largeConfig)
            .font('Helvetica-Bold').text("¿Ha visitado algún refugio de animales alguna vez?", questionConfig)
            .font('Helvetica').text(form.a3, answerConfig)
            .font('Helvetica-Bold').text("¿Es socio/a de algún refugio o protectora de animales?", questionConfig)
            .font('Helvetica').text(form.a4, answerConfig)
            .font('Helvetica-Bold').text("¿Piensa adoptar a algúna otra mascota después de esta?", questionConfig)
            .font('Helvetica').text(form.a5, answerConfig)
            .moveDown();

        doc
            .fontSize(20)
            .text("SOBRE COMPORTAMIENTO DE LA MASCOTA:");

        doc
            .fontSize(10)
            .font('Helvetica-Bold').text("Ante una inadaptación o problema de comportamiento en el animal que adopte, ¿qué hará usted?", largeConfig)
            .font('Helvetica').text(form.p1, largeConfig)
            .font('Helvetica-Bold').text("¿Cree que estos problemas tienen solución o, por el contrario, piensa que es imposible que desaparezca una mala conducta?", largeConfig)
            .font('Helvetica').text(form.p2, largeConfig)
            .moveDown();
            
        doc
            .fontSize(10)
            .font('Helvetica-Bold').text("¿Desea contarnos algo más?", largeConfig)
            .font('Helvetica').text(form.p1, largeConfig)
            .moveDown();
                
        doc
            .moveDown()
            .fontSize(10)
            .text("PetSHOP Boys footer de ejemplo a ver como funciona 2021.", { align: "center", width: 500 });

        doc.end();
    } catch (error) {
        return next(error);
    }

}

const formCreate = async(req, res, next) => {
    const { userId, d1, d2, d3, d4, d5, d6, d7, d8, d9, d10, d11, h1, h2, h3, h4, h5, h6, h7, h8, f1, f2, f3, f4, f5, o1, o2, o3, o4, g1, g2, g3, g4, a1, a2, a3, a4, a5, p1, p2, m1 } = req.body;
    
    try {
        const newForm = new Form({
            userId,
            d1,
            d2,
            d3,
            d4,
            d5,
            d6,
            d7,
            d8,
            d9,
            d10,
            d11,
            h1,
            h2,
            h3,
            h4,
            h5,
            h6,
            h7,
            h8,
            f1,
            f2,
            f3,
            f4,
            f5,
            o1,
            o2,
            o3,
            o4,
            g1,
            g2,
            g3,
            g4,
            a1,
            a2,
            a3,
            a4,
            a5,
            p1,
            p2,
            m1
        });

        const createdForm = await newForm.save();

        const findUser = await User.findById(userId);
        findUser.form = createdForm._id;
        findUser.verified = true;
        await User.findByIdAndUpdate(userId, findUser, { new: true });

        return res.status(200).json('Formulario creado');
    } catch (error) {
        return next(error);
    }

}

const formEdit = async(req, res, next) => {
    const { id } = req.params;

    try {
        const { d1, d2, d3, d4, d5, d6, d7, d8, d9, d10, d11, h1, h2, h3, h4, h5, h6, h7, h8, f1, f2, f3, f4, f5, o1, o2, o3, o4, g1, g2, g3, g4, a1, a2, a3, a4, a5, p1, p2, m1 } = req.body;
        const update = {};

        if (d1) update.d1 = d1;
        if (d2) update.d1 = d2;
        if (d3) update.d1 = d3;
        if (d4) update.d1 = d4;
        if (d5) update.d1 = d5;
        if (d6) update.d1 = d6;
        if (d7) update.d1 = d7;
        if (d8) update.d1 = d8;
        if (d9) update.d1 = d9;
        if (d10) update.d1 = d10;
        if (d11) update.d1 = d11;

        if (h1) update.h1 = h1;
        if (h2) update.h2 = h2;
        if (h3) update.h3 = h3;
        if (h4) update.h4 = h4;
        if (h5) update.h5 = h5;
        if (h6) update.h6 = h6;
        if (h7) update.h7 = h7;
        if (h8) update.h8 = h8;

        if (f1) update.f1 = f1;
        if (f2) update.f2 = f2;
        if (f3) update.f3 = f3;
        if (f4) update.f4 = f4;
        if (f5) update.f5 = f5;

        if (o1) update.o1 = o1;
        if (o2) update.o2 = o2;
        if (o3) update.o3 = o3;
        if (o4) update.o4 = o4;

        if (g1) update.g1 = g1;
        if (g2) update.g2 = g2;
        if (g3) update.g3 = g3;
        if (g4) update.g4 = g4;

        if (a1) update.a1 = a1;
        if (a2) update.a2 = a2;
        if (a3) update.a3 = a3;
        if (a4) update.a4 = a4;
        if (a5) update.a5 = a5;

        if (p1) update.p1 = p1;
        if (p2) update.p2 = p2;

        if (m1) update.m1 = m1;

        await Form.findByIdAndUpdate(id, update, { new: true });

        return res.status(200).json('Formulario editado correctamente'); 

    } catch (error) {
        return next(error);
    }
}

const formDelete = async(req, res, next) => {
    const { id } = req.params;
    try {

        const deletedForm = await Form.findByIdAndDelete(id);
        if (!deletedForm) {
            const error = new Error('Formulario no encontrado');
            return next(error);
        } else {
            return res.status(200).json('Formulario eliminado correctamente');
        }
    } catch (error) {
        return next(error);
    }
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