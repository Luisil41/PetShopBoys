const mongoose = require('mongoose');
const Request = require('../models/Request.model');
const db = require('../utils/mongodb');

const arrayRequest = [
    {
        userId: '6138b5c80dd45c8009c0e0ea',
        shelterId: '6138b5c3a11796907380fb4c',
        petId: '6138b9aeeb45c6a6e090789f'
    },
]

mongoose
    .connect(db.mongodb, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(async () => {
        const allReq = await Request.find();

        if(allReq.length != 0) {
            await Request.collection.drop();
            console.log('[Seed] Colección de peticiones eliminada.')
        } else {
            console.log('[Seed] No se encontraron peticiones.');
        }
    })
    .then(async () => {
        await Request.create(arrayRequest);
        console.log('[Seed] Array de peticiones añadido correctamente.');
    })
    .catch(error => console.log('[Seed]: Error añadiendo peticiones', error))
    .finally(() => mongoose.disconnect());