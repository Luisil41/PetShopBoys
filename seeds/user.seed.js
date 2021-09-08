const mongoose = require('mongoose');
const User = require('../models/User.model');
const db = require('../utils/mongodb');

const arrayUser = [{
        fullName: 'Pepe Pepón',
        birthdate: '1999-04-07',
        email: 'pepe@mail.com',
        password: '1234',
        avatar: '',
        phone: '8483587372',
        province: 'Malaga',
        interest: 'adoption',
        verified: false,
    },
    {
        fullName: 'Maria Díaz',
        birthdate: '1996-09-30',
        email: 'marieta@mail.com',
        password: '1234',
        avatar: '',
        phone: '984746363',
        province: 'Cataluña',
        interest: 'hosting',
        verified: true,
    },
]

mongoose
    .connect(db.mongodb, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(async() => {
        const allUsers = await User.find();

        if (allUsers.length != 0) {
            await User.collection.drop();
            console.log('[Seed] Colección de usuarios eliminada.')
        } else {
            console.log('[Seed] No se encontraron usuarios.');
        }
    })
    .then(async() => {
        await User.create(arrayUser);
        console.log('[Seed] Array de usuarios añadido correctamente.');
    })
    .catch(error => console.log('[Seed]: Error añadiendo usuarios', error))
    .finally(() => mongoose.disconnect());