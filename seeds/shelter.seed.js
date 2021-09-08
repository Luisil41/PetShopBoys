const mongoose = require('mongoose');
const Shelter = require('../models/Shelter.model');
const db = require('../utils/mongodb');

const arrayShelter = [
    {
        name: 'Protectora 1',
        email: 'protectora1@protectora.com',
        password: 'protectora123',
        address: 'Calle proteccion 123',
        description: 'La mejor protectora del mundo',
        avatar: 'src',
        phone: '12341234',
        pets: [],
        images: [],
    },
    {
        name: 'Protectora 2',
        email: 'protectora2@protectora.com',
        password: 'protectora123',
        address: 'Calle proteccion 456',
        description: 'La segunda mejor protectora del mundo',
        avatar: 'src',
        phone: '43214321',
        pets: [],
        images: [],
    },
]

mongoose
    .connect(db.mongodb, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(async () => {
        const allShelters = await Shelter.find();

        if(allShelters.length != 0) {
            await Shelter.collection.drop();
            console.log('[Seed] Colección de protectoras eliminada.')
        } else {
            console.log('[Seed] No se encontraron protectoras.');
        }
    })
    .then(async () => {
        await Shelter.create(arrayShelter);
        console.log('[Seed] Array de protectoras añadido correctamente.');
    })
    .catch(error => console.log('[Seed]: Error añadiendo protectoras', error))
    .finally(() => mongoose.disconnect());
