const mongoose = require('mongoose');

const { Schema } = mongoose;

const petSchema = new Schema({
    type: {
        type: String,
        enum: ['dog', 'cat', 'other'],
        required: true,
    },
    name: { type: String, required: true },
    age: { type: Number },
    avatar: { type: String, required: true},
    sex: {
        type: String,
        enum: ['male', 'female'],
        required: true,
    },
    breed: { type: String },
    size: {
        type: String,
        enum: ['small', 'medium', 'large']
    },
    isVaccinated: { type: Boolean },
    isSterilized: { type: Boolean },
    isDewormed: { type: Boolean },
    microchip: { type: Boolean },
    province: { type: String, required: true },
    shelter: { type: mongoose.Types.ObjectId, ref: 'Shelter' }, // comprobar schema de Shelter
    status: {
        type: String,
        enum: ['forAdoption', 'adoptionProcess', 'adopted', 'hostHouse'] // definir las opciones de status
    }
}, { timestamps: true });

const Pet = mongoose.model('Pet', petSchema);

module.exports = Pet;