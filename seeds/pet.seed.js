const mongoose = require('mongoose');
const Pet = require('../models/Pet.model');
const db = require('../utils/mongodb');

const arrayPet = [{
        type: 'dog',
        name: 'Luffy',
        age: 2,
        avatar: 'elo',
        sex: 'male',
        breed: 'galgo',
        size: 'medium',
        isVaccinated: true,
        isSterilized: true,
        isDewormed: false,
        microchip: true,
        province: 'Cataluña',
        shelter: '61386f5b361dae27f4f923fe', // comprobar schema de Shelter
        status: 'forAdoption' // definir las opciones de status

    },
    {
        type: 'cat',
        name: 'Tundra',
        age: 5,
        avatar: 'holi',
        sex: 'female',
        breed: 'egipcio',
        size: 'small',
        isVaccinated: false,
        isSterilized: true,
        isDewormed: false,
        microchip: false,
        province: 'Malaga',
        shelter: '61386f5b361dae27f4f923fd', // comprobar schema de Shelter
        status: 'adoptionProcess'
    },
]

mongoose
    .connect(db.mongodb, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(async() => {
        const allPets = await Pet.find();

        if (allPets.length != 0) {
            await Pet.collection.drop();
            console.log('[Seed] Colección de mascotas eliminada.')
        } else {
            console.log('[Seed] No se encontraron mascotas.');
        }
    })
    .then(async() => {
        await Pet.create(arrayPet);
        console.log('[Seed] Array de mascotas añadido correctamente.');
    })
    .catch(error => console.log('[Seed]: Error añadiendo mascotas', error))
    .finally(() => mongoose.disconnect());