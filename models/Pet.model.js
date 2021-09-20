const mongoose = require('mongoose');

const { Schema } = mongoose;

const petSchema = new Schema({
    type: {
        type: String,
        enum: ['perro', 'gato', 'otro'],
        required: true,
    },
    name: { type: String, required: true },
    age: { type: Number },
    avatar: { type: String },
    sex: {
        type: String,
        enum: ['macho', 'hembra'],
        required: true,
    },
    breed: { type: String },
    size: {
        type: String,
        enum: ['pequeño', 'mediano', 'grande']
    },
    isVaccinated: { type: Boolean },
    isSterilized: { type: Boolean },
    isDewormed: { type: Boolean },
    microchip: { type: Boolean },
    province: { type: String, required: true },
    shelter: { type: mongoose.Types.ObjectId, ref: 'Shelter' },
    user: { type: mongoose.Types.ObjectId, ref: 'User' },
    status: {
        type: String,
        enum: ['adopción', 'en proceso de adopción', 'adoptado', 'casa de acogida', 'perdido', 'ambas']
    },
    requests: [{ type: mongoose.Types.ObjectId, ref: 'Request' }]
}, { timestamps: true });

const Pet = mongoose.model('Pet', petSchema);

module.exports = Pet;